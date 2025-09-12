from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from dotenv import load_dotenv

# Import models
from app.models.user import User
from app.models.institution import Institution
from app.models.student import Student
from app.models.score import Score

# Load environment variables
load_dotenv()

async def init_db():
    """
    Initialize database connection
    """
    # MongoDB connection
    client = AsyncIOMotorClient(os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
    
    # Initialize Beanie with the document models
    await init_beanie(
        database=client.techvantage,
        document_models=[
            User,
            Institution,
            Student,
            Score
        ]
    )
    
    return client