from fastapi import HTTPException, status
from typing import List, Optional

from app.models.student import Student, StudentCreate, StudentUpdate, StudentResponse
from app.config.auth import TokenData

async def create_student(student_data: StudentCreate, current_user: TokenData = None) -> StudentResponse:
    """
    Create a new student
    """
    # Only admins and teachers can create students
    if current_user and current_user.role not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Check if student with same email exists
    existing_student = await Student.find_one({"email": student_data.email})
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student with this email already exists"
        )
    
    # Create new student
    new_student = Student(
        first_name=student_data.first_name,
        last_name=student_data.last_name,
        email=student_data.email,
        date_of_birth=student_data.date_of_birth,
        gender=student_data.gender,
        address=student_data.address,
        phone=student_data.phone,
        institution_id=student_data.institution_id,
        grade=student_data.grade,
        enrollment_date=student_data.enrollment_date,
        parent_guardian_name=student_data.parent_guardian_name,
        parent_guardian_phone=student_data.parent_guardian_phone,
        parent_guardian_email=student_data.parent_guardian_email
    )
    
    await new_student.insert()
    
    return StudentResponse(
        id=str(new_student.id),
        first_name=new_student.first_name,
        last_name=new_student.last_name,
        email=new_student.email,
        date_of_birth=new_student.date_of_birth,
        gender=new_student.gender,
        address=new_student.address,
        phone=new_student.phone,
        institution_id=new_student.institution_id,
        grade=new_student.grade,
        enrollment_date=new_student.enrollment_date,
        parent_guardian_name=new_student.parent_guardian_name,
        parent_guardian_phone=new_student.parent_guardian_phone,
        parent_guardian_email=new_student.parent_guardian_email,
        created_at=new_student.created_at,
        updated_at=new_student.updated_at
    )

async def get_students(skip: int = 0, limit: int = 100, institution_id: Optional[str] = None) -> List[StudentResponse]:
    """
    Get all students with pagination and optional filtering by institution
    """
    if institution_id:
        students = await Student.find({"institution_id": institution_id}).skip(skip).limit(limit).to_list()
    else:
        students = await Student.find_all().skip(skip).limit(limit).to_list()
    
    return [
        StudentResponse(
            id=str(student.id),
            first_name=student.first_name,
            last_name=student.last_name,
            email=student.email,
            date_of_birth=student.date_of_birth,
            gender=student.gender,
            address=student.address,
            phone=student.phone,
            institution_id=student.institution_id,
            grade=student.grade,
            enrollment_date=student.enrollment_date,
            parent_guardian_name=student.parent_guardian_name,
            parent_guardian_phone=student.parent_guardian_phone,
            parent_guardian_email=student.parent_guardian_email,
            created_at=student.created_at,
            updated_at=student.updated_at
        ) for student in students
    ]

async def get_student_by_id(student_id: str) -> StudentResponse:
    """
    Get a student by ID
    """
    student = await Student.get(student_id)
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    return StudentResponse(
        id=str(student.id),
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        date_of_birth=student.date_of_birth,
        gender=student.gender,
        address=student.address,
        phone=student.phone,
        institution_id=student.institution_id,
        grade=student.grade,
        enrollment_date=student.enrollment_date,
        parent_guardian_name=student.parent_guardian_name,
        parent_guardian_phone=student.parent_guardian_phone,
        parent_guardian_email=student.parent_guardian_email,
        created_at=student.created_at,
        updated_at=student.updated_at
    )

async def update_student(student_id: str, student_data: StudentUpdate, current_user: TokenData = None) -> StudentResponse:
    """
    Update a student
    """
    # Only admins and teachers can update students
    if current_user and current_user.role not in ["admin", "teacher"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    student = await Student.get(student_id)
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Update student fields
    update_data = student_data.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(student, field, value)
    
    await student.save()
    
    return StudentResponse(
        id=str(student.id),
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        date_of_birth=student.date_of_birth,
        gender=student.gender,
        address=student.address,
        phone=student.phone,
        institution_id=student.institution_id,
        grade=student.grade,
        enrollment_date=student.enrollment_date,
        parent_guardian_name=student.parent_guardian_name,
        parent_guardian_phone=student.parent_guardian_phone,
        parent_guardian_email=student.parent_guardian_email,
        created_at=student.created_at,
        updated_at=student.updated_at
    )

async def delete_student(student_id: str, current_user: TokenData = None) -> dict:
    """
    Delete a student
    """
    # Only admins can delete students
    if current_user and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    student = await Student.get(student_id)
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    await student.delete()
    
    return {"message": "Student deleted successfully"}