from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional

from app.models.student import StudentCreate, StudentUpdate, StudentResponse
from app.controllers.student_controller import (
    create_student,
    get_students,
    get_student_by_id,
    update_student,
    delete_student
)
from app.config.auth import get_current_user, TokenData

router = APIRouter()

@router.post("/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_student_endpoint(
    student_data: StudentCreate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Create a new student
    """
    return await create_student(student_data, current_user)

@router.get("/", response_model=List[StudentResponse])
async def read_students(
    skip: int = 0, 
    limit: int = 100,
    institution_id: Optional[str] = Query(None, description="Filter by institution ID")
):
    """
    Get all students with pagination and optional filtering by institution
    """
    return await get_students(skip, limit, institution_id)

@router.get("/{student_id}", response_model=StudentResponse)
async def read_student(student_id: str):
    """
    Get a student by ID
    """
    return await get_student_by_id(student_id)

@router.put("/{student_id}", response_model=StudentResponse)
async def update_student_endpoint(
    student_id: str,
    student_data: StudentUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Update a student
    """
    return await update_student(student_id, student_data, current_user)

@router.delete("/{student_id}", response_model=dict)
async def delete_student_endpoint(
    student_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Delete a student
    """
    return await delete_student(student_id, current_user)