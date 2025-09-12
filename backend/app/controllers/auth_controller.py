from fastapi import HTTPException, status, Depends
from datetime import timedelta

from app.models.user import User, UserCreate, UserResponse
from app.config.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

async def register_user(user_data: UserCreate) -> UserResponse:
    """
    Register a new user
    """
    # Check if user with email already exists
    existing_user = await User.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username is taken
    existing_username = await User.find_one({"username": user_data.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    
    new_user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        role=user_data.role,
        institution_id=user_data.institution_id
    )
    
    await new_user.insert()
    
    return UserResponse(
        id=str(new_user.id),
        email=new_user.email,
        username=new_user.username,
        first_name=new_user.first_name,
        last_name=new_user.last_name,
        role=new_user.role,
        is_active=new_user.is_active,
        created_at=new_user.created_at,
        updated_at=new_user.updated_at,
        institution_id=new_user.institution_id
    )

async def authenticate_user(username: str, password: str):
    """
    Authenticate a user by username and password
    """
    user = await User.find_one({"username": username})
    
    if not user:
        return False
    
    if not verify_password(password, user.hashed_password):
        return False
    
    return user

async def login_user(username: str, password: str):
    """
    Login a user and return access token
    """
    user = await authenticate_user(username, password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": str(user.id), "role": user.role},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}