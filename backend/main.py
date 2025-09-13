from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Import models
from app.models.user import User
from app.models.institution import Institution
from app.models.student import Student
from app.models.score import Score

# Import routers
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.institutions import router as institutions_router
from app.routers.students import router as students_router
from app.routers.ai import router as ai_router

# Load environment variables
load_dotenv()

# Database initialization
async def init_db():
    # MongoDB connection
    client = AsyncIOMotorClient(os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
    await init_beanie(
        database=client.techvantage,
        document_models=[
            User,
            Institution,
            Student,
            Score
        ]
    )

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database connection
    await init_db()
    yield
    # Clean up resources if needed

# Create FastAPI app
app = FastAPI(
    title="Techvantage API",
    description="API for Techvantage educational platform",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(institutions_router, prefix="/api/institutions", tags=["Institutions"])
app.include_router(students_router, prefix="/api/students", tags=["Students"])
app.include_router(ai_router, prefix="/api/ai", tags=["AI Integration"])

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to Techvantage API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)