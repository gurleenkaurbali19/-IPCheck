from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ← import CORS
from app.routes import router

app = FastAPI()

#CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


#uvicorn app.main:app --reload
