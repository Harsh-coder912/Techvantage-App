from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.models.institution import InstitutionCreate, InstitutionUpdate, InstitutionResponse
from app.controllers.institution_controller import (
    create_institution,
    get_institutions,
    get_institution_by_id,
    update_institution,
    delete_institution
)
from app.config.auth import get_current_user, TokenData

router = APIRouter()

@router.post("/", response_model=InstitutionResponse, status_code=status.HTTP_201_CREATED)
async def create_institution_endpoint(
    institution_data: InstitutionCreate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Create a new institution
    """
    return await create_institution(institution_data, current_user)

@router.get("/", response_model=List[InstitutionResponse])
async def read_institutions(skip: int = 0, limit: int = 100):
    """
    Get all institutions with pagination
    """
    return await get_institutions(skip, limit)

@router.get("/{institution_id}", response_model=InstitutionResponse)
async def read_institution(institution_id: str):
    """
    Get an institution by ID
    """
    return await get_institution_by_id(institution_id)

@router.put("/{institution_id}", response_model=InstitutionResponse)
async def update_institution_endpoint(
    institution_id: str,
    institution_data: InstitutionUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Update an institution
    """
    return await update_institution(institution_id, institution_data, current_user)

@router.delete("/{institution_id}", response_model=dict)
async def delete_institution_endpoint(
    institution_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Delete an institution
    """
    return await delete_institution(institution_id, current_user)