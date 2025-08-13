from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import StringIO

from app.preprocessing import preprocess_log_data
from app.model import predict_ip_risk
from app.location import get_ip_location

router = APIRouter()

@router.post("/upload")
async def upload_logs(file: UploadFile = File(...)):
    # Checking file extension
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are acceptable")

    content = await file.read()

    # Read CSV into DataFrame
    try:
        df = pd.read_csv(StringIO(content.decode('utf-8')))
    except Exception:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid CSV.")

    # Preprocessing to extract IP-level features
    try:
        preprocessed_df = preprocess_log_data(df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Preprocessing error: {e}")

    # Predicting risk and get scores
    try:
        results_df = predict_ip_risk(preprocessed_df)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

    # Prepare response: start with IP, prediction, score
    response_data = results_df[[
        'IP_Address', 'Prediction', 'Suspicion_Score'
    ]].copy()

    # Add latitude, longitude, location for each IP by calling get_ip_location()
    enriched_results = []
    missing = []

    # First pass
    for row in response_data.itertuples(index=False):
        ip = row.IP_Address
        pred = row.Prediction
        score = row.Suspicion_Score
    
        loc_data = get_ip_location(ip)
        data = {
            "ip": ip,
            "Prediction": pred,
            "Suspicion_Score": score,
            "latitude": loc_data.get("latitude"),
            "longitude": loc_data.get("longitude"),
            "location": loc_data.get("location")
        }
        # Only keep IPs w/ valid location
        if data["latitude"] is not None and data["longitude"] is not None:
            enriched_results.append(data)
        else:
            missing.append((ip, pred, score))

    # Second pass (retry failed lookups)
    for (ip, pred, score) in missing:
        loc_data = get_ip_location(ip)
        data = {
            "ip": ip,
            "Prediction": pred,
            "Suspicion_Score": score,
            "latitude": loc_data.get("latitude"),
            "longitude": loc_data.get("longitude"),
            "location": loc_data.get("location")
        }
        if data["latitude"] is not None and data["longitude"] is not None:
            enriched_results.append(data)
    # Return only entries with valid coordinates
    return {"results": enriched_results}
