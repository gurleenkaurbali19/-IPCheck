import pandas as pd
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # goes up to IPCheck/
MODEL_PATH = os.path.join(BASE_DIR, "Model", "random_forest_model.joblib")

model = joblib.load(MODEL_PATH)

MODEL_FEATURES = [
    "DELETE_Perc",
    "GET_Perc",
    "POST_Perc",
    "PUT_Perc",
    "4xx_Perc",
    "5xx_Perc",
    "Other_Perc"
]

def predict_ip_risk(ip_df: pd.DataFrame) -> pd.DataFrame:
    # Checking for required columns
    missing = [col for col in MODEL_FEATURES if col not in ip_df.columns]
    if missing:
        raise ValueError(f"Missing columns for prediction: {missing}")

    X = ip_df[MODEL_FEATURES]

    # Predicting label and probability
    y_pred = model.predict(X)
    y_proba = model.predict_proba(X)[:, 1]  # Probability for class 1 (normal)

    # Add predictions to DataFrame
    ip_df["Prediction"] = y_pred
    ip_df["Suspicion_Score"] = 1 - y_proba  # Higher = more suspicious

    return ip_df