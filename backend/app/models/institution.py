from typing import Optional, List
from datetime import datetime
from beanie import Document, Link
from pydantic import BaseModel, Field

class Institution(Document):
    """
    Institution model for educational institutions
    """
    name: str = Field(..., min_length=2, max_length=100)
    address: str
    city: str
    state: str
    country: str
    zip_code: str
    phone: str
    website: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "institutions"
        use_state_management = True

# Pydantic models for request/response
class InstitutionCreate(BaseModel):
    name: str
    address: str
    city: str
    state: str
    country: str
    zip_code: str
    phone: str
    website: Optional[str] = None

class InstitutionUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    zip_code: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None

class InstitutionResponse(BaseModel):
    id: str
    name: str
    address: str
    city: str
    state: str
    country: str
    zip_code: str
    phone: str
    website: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True