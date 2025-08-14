from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",          # Local dev frontend
        "https://ipcheck-nine.vercel.app" # Deployed frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],   # All HTTP methods
    allow_headers=["*"],   # All headers
)

app.include_router(router)

# uvicorn app.main:app --reload
# uvicorn app.main:app --host 0.0.0.0 --port $PORT
