from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel, EmailStr, Field
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"

class User(Document):
    """
    User model for authentication and authorization
    """
    email: EmailStr = Field(..., unique=True, index=True)
    username: str = Field(..., min_length=3, max_length=50, unique=True, index=True)
    hashed_password: str
    first_name: str
    last_name: str
    role: UserRole
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    institution_id: Optional[str] = None
    
    class Settings:
        name = "users"
        use_state_management = True

# Pydantic models for request/response
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    first_name: str
    last_name: str
    role: UserRole
    institution_id: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = None
    institution_id: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: datetime
    institution_id: Optional[str] = None
    
    class Config:
        from_attributes = True