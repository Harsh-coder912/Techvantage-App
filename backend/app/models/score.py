from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel, Field
from enum import Enum

class ScoreType(str, Enum):
    EXAM = "exam"
    QUIZ = "quiz"
    ASSIGNMENT = "assignment"
    PROJECT = "project"

class Score(Document):
    """
    Score model for student assessments
    """
    student_id: str = Field(..., index=True)
    subject: str
    score_value: float
    max_score: float
    score_type: ScoreType
    date: datetime
    teacher_id: str
    comments: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "scores"
        use_state_management = True

# Pydantic models for request/response
class ScoreCreate(BaseModel):
    student_id: str
    subject: str
    score_value: float
    max_score: float
    score_type: ScoreType
    date: datetime
    teacher_id: str
    comments: Optional[str] = None

class ScoreUpdate(BaseModel):
    score_value: Optional[float] = None
    max_score: Optional[float] = None
    comments: Optional[str] = None

class ScoreResponse(BaseModel):
    id: str
    student_id: str
    subject: str
    score_value: float
    max_score: float
    score_type: ScoreType
    date: datetime
    teacher_id: str
    comments: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True