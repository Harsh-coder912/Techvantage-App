from fastapi import HTTPException, status, Depends
from typing import List, Optional

from app.models.user import User, UserUpdate, UserResponse
from app.config.auth import get_current_user, TokenData

async def get_users(skip: int = 0, limit: int = 100, current_user: TokenData = None) -> List[UserResponse]:
    """
    Get all users with pagination
    """
    # Only admins can see all users
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    users = await User.find_all().skip(skip).limit(limit).to_list()
    
    return [
        UserResponse(
            id=str(user.id),
            email=user.email,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at,
            institution_id=user.institution_id
        ) for user in users
    ]

async def get_user_by_id(user_id: str, current_user: TokenData = None) -> UserResponse:
    """
    Get a user by ID
    """
    # Users can only see their own profile unless they are admins
    if current_user and current_user.role != "admin" and current_user.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    user = await User.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        id=str(user.id),
        email=user.email,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at,
        institution_id=user.institution_id
    )

async def update_user(user_id: str, user_data: UserUpdate, current_user: TokenData = None) -> UserResponse:
    """
    Update a user
    """
    # Users can only update their own profile unless they are admins
    if current_user and current_user.role != "admin" and current_user.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    user = await User.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user fields
    update_data = user_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(user, field, value)
    
    await user.save()
    
    return UserResponse(
        id=str(user.id),
        email=user.email,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at,
        institution_id=user.institution_id
    )

async def delete_user(user_id: str, current_user: TokenData = None) -> dict:
    """
    Delete a user
    """
    # Only admins can delete users
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    user = await User.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    await user.delete()
    
    return {"message": "User deleted successfully"}