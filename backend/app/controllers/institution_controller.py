from fastapi import HTTPException, status
from typing import List, Optional

from app.models.institution import Institution, InstitutionCreate, InstitutionUpdate, InstitutionResponse
from app.config.auth import TokenData

async def create_institution(institution_data: InstitutionCreate, current_user: TokenData = None) -> InstitutionResponse:
    """
    Create a new institution
    """
    # Only admins can create institutions
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Check if institution with same name exists
    existing_institution = await Institution.find_one({"name": institution_data.name})
    if existing_institution:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Institution with this name already exists"
        )
    
    # Create new institution
    new_institution = Institution(
        name=institution_data.name,
        address=institution_data.address,
        city=institution_data.city,
        state=institution_data.state,
        country=institution_data.country,
        postal_code=institution_data.postal_code,
        phone=institution_data.phone,
        email=institution_data.email,
        website=institution_data.website,
        type=institution_data.type
    )
    
    await new_institution.insert()
    
    return InstitutionResponse(
        id=str(new_institution.id),
        name=new_institution.name,
        address=new_institution.address,
        city=new_institution.city,
        state=new_institution.state,
        country=new_institution.country,
        postal_code=new_institution.postal_code,
        phone=new_institution.phone,
        email=new_institution.email,
        website=new_institution.website,
        type=new_institution.type,
        created_at=new_institution.created_at,
        updated_at=new_institution.updated_at
    )

async def get_institutions(skip: int = 0, limit: int = 100) -> List[InstitutionResponse]:
    """
    Get all institutions with pagination
    """
    institutions = await Institution.find_all().skip(skip).limit(limit).to_list()
    
    return [
        InstitutionResponse(
            id=str(institution.id),
            name=institution.name,
            address=institution.address,
            city=institution.city,
            state=institution.state,
            country=institution.country,
            postal_code=institution.postal_code,
            phone=institution.phone,
            email=institution.email,
            website=institution.website,
            type=institution.type,
            created_at=institution.created_at,
            updated_at=institution.updated_at
        ) for institution in institutions
    ]

async def get_institution_by_id(institution_id: str) -> InstitutionResponse:
    """
    Get an institution by ID
    """
    institution = await Institution.get(institution_id)
    
    if not institution:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Institution not found"
        )
    
    return InstitutionResponse(
        id=str(institution.id),
        name=institution.name,
        address=institution.address,
        city=institution.city,
        state=institution.state,
        country=institution.country,
        postal_code=institution.postal_code,
        phone=institution.phone,
        email=institution.email,
        website=institution.website,
        type=institution.type,
        created_at=institution.created_at,
        updated_at=institution.updated_at
    )

async def update_institution(institution_id: str, institution_data: InstitutionUpdate, current_user: TokenData = None) -> InstitutionResponse:
    """
    Update an institution
    """
    # Only admins can update institutions
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    institution = await Institution.get(institution_id)
    
    if not institution:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Institution not found"
        )
    
    # Update institution fields
    update_data = institution_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(institution, field, value)
    
    await institution.save()
    
    return InstitutionResponse(
        id=str(institution.id),
        name=institution.name,
        address=institution.address,
        city=institution.city,
        state=institution.state,
        country=institution.country,
        postal_code=institution.postal_code,
        phone=institution.phone,
        email=institution.email,
        website=institution.website,
        type=institution.type,
        created_at=institution.created_at,
        updated_at=institution.updated_at
    )

async def delete_institution(institution_id: str, current_user: TokenData = None) -> dict:
    """
    Delete an institution
    """
    # Only admins can delete institutions
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    institution = await Institution.get(institution_id)
    
    if not institution:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Institution not found"
        )
    
    await institution.delete()
    
    return {"message": "Institution deleted successfully"}