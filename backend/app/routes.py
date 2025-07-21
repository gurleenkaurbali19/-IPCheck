from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from io import StringIO

router=APIRouter()

@router.post("/upload")
async def upload_logs(file:UploadFile=File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400,detail="Only CSV files are acceptable")

    content=await file.read()

    try:
        df = pd.read_csv(StringIO(content.decode('utf-8')))
    except Exception:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid CSV.")

    return {"rows": len(df), "columns": list(df.columns)}

