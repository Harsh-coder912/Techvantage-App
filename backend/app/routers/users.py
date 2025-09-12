from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.models.user import UserUpdate, UserResponse
from app.controllers.user_controller import get_users, get_user_by_id, update_user, delete_user
from app.config.auth import get_current_user, TokenData

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def read_users(
    skip: int = 0, 
    limit: int = 100,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Get all users with pagination
    """
    return await get_users(skip, limit, current_user)

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(
    user_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Get a user by ID
    """
    return await get_user_by_id(user_id, current_user)

@router.put("/{user_id}", response_model=UserResponse)
async def update_user_endpoint(
    user_id: str,
    user_data: UserUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Update a user
    """
    return await update_user(user_id, user_data, current_user)

@router.delete("/{user_id}", response_model=dict)
async def delete_user_endpoint(
    user_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Delete a user
    """
    return await delete_user(user_id, current_user)