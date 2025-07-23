from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import StringIO

from preprocessing import preprocess_log_data
from model import predict_ip_risk
from location import get_ip_location  # Import the geolocation function

router = APIRouter()

@router.post("/upload")
async def upload_logs(file: UploadFile = File(...)):
    # Check file extension
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
    for row in response_data.itertuples(index=False):
        ip = row.IP_Address
        pred = row.Prediction
        score = row.Suspicion_Score
        
        # Get geolocation data
        loc_data = get_ip_location(ip)

        enriched_results.append({
            "ip": ip,
            "Prediction": pred,
            "Suspicion_Score": score,
            "latitude": loc_data.get("latitude"),
            "longitude": loc_data.get("longitude"),
            "location": loc_data.get("location")
        })

    return {"results": enriched_results}
