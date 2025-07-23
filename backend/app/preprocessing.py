import pandas as pd

def status_class(code: int) -> str:
    if 400 <= code < 500:
        return "4xx"
    elif 500 <= code < 600:
        return "5xx"
    else:
        return "Other"

def preprocess_log_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Transform raw log data into IP-level feature set for model prediction.
    Args:
        df (pd.DataFrame): Raw log data.

    Returns:
        pd.DataFrame: Feature-engineered IP-level data.
    """
    required_columns = ['IP_Address', 'Request_Type', 'Status_Code', 'User_Agent', 'Session_ID', 'Location']
    for col in required_columns:
        if col not in df.columns:
            raise ValueError(f"Missing required column: {col}")

    # Group by IP
    grouped = df.groupby("IP_Address")

    # Total number of requests
    total_requests = grouped.size().rename("Total_Requests")

    # Request type percentages
    req_type = grouped['Request_Type'].value_counts().unstack(fill_value=0)
    req_type_perc = req_type.div(req_type.sum(axis=1), axis=0)
    req_type_perc.columns = [f"{col}_Perc" for col in req_type_perc.columns]

    # Status class categorization
    df['Status_Class'] = df['Status_Code'].apply(status_class)
    status_class_counts = df.groupby('IP_Address')['Status_Class'].value_counts().unstack(fill_value=0)
    status_class_perc = status_class_counts.div(status_class_counts.sum(axis=1), axis=0)
    status_class_perc.columns = [f"{col}_Perc" for col in status_class_perc.columns]


    # Unique counts
    unique_agents = grouped['User_Agent'].nunique().rename("Unique_User_Agents")
    unique_sessions = grouped['Session_ID'].nunique().rename("Unique_Sessions")
    unique_locations = grouped['Location'].nunique().rename("Unique_Locations")

    # Most common (top) user agent and location
    top_agent = grouped['User_Agent'].agg(lambda x: x.value_counts().idxmax()).rename("Top_User_Agent")
    top_location = grouped['Location'].agg(lambda x: x.value_counts().idxmax()).rename("Top_Location")

    # Concatenate all features
    ip_level_df = pd.concat([
        total_requests,
        req_type_perc,
        status_class_perc,
        unique_agents,
        unique_sessions,
        unique_locations,
        top_agent,
        top_location
    ], axis=1)

    
    ip_level_df.fillna(0, inplace=True)
    ip_level_df.reset_index(inplace=True)

    return ip_level_df
