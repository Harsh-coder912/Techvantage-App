from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.models.user import UserCreate, UserResponse
from app.controllers.auth_controller import register_user, login_user

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """
    Register a new user
    """
    return await register_user(user_data)

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate a user and return a JWT token
    """
    return await login_user(form_data.username, form_data.password)