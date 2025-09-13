from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv(dotenv_path="backend/.env")

# Create FastAPI app
app = FastAPI(
    title="Techvantage API",
    description="API for Techvantage educational platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to Techvantage API"}

@app.get("/api/health", tags=["Health"])
async def health():
    return {"status": "healthy", "message": "Techvantage API is running"}

# Basic auth endpoints for testing
@app.post("/api/auth/login", tags=["Authentication"])
async def login():
    return {"access_token": "test_token", "token_type": "bearer", "message": "Login successful"}

@app.post("/api/auth/register", tags=["Authentication"])
async def register():
    return {"message": "Registration successful"}

@app.get("/api/users/me", tags=["Users"])
async def get_current_user():
    return {"id": "1", "username": "test_user", "email": "test@example.com", "role": "student"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("simple_main:app", host="0.0.0.0", port=8000, reload=True)