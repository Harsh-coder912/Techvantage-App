from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel, Field

class Student(Document):
    """
    Student model for educational platform
    """
    user_id: str = Field(..., index=True)
    institution_id: str = Field(..., index=True)
    grade: str
    enrollment_year: int
    graduation_year: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "students"
        use_state_management = True

# Pydantic models for request/response
class StudentCreate(BaseModel):
    user_id: str
    institution_id: str
    grade: str
    enrollment_year: int
    graduation_year: Optional[int] = None

class StudentUpdate(BaseModel):
    grade: Optional[str] = None
    enrollment_year: Optional[int] = None
    graduation_year: Optional[int] = None

class StudentResponse(BaseModel):
    id: str
    user_id: str
    institution_id: str
    grade: str
    enrollment_year: int
    graduation_year: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True