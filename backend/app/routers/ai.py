from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from pydantic import BaseModel

from app.services.ai_service import (
    generate_lesson_plan,
    generate_quiz_questions,
    analyze_student_performance,
    generate_feedback
)
from app.config.auth import get_current_user, TokenData

router = APIRouter()

# Request and response models
class LessonPlanRequest(BaseModel):
    subject: str
    grade: str
    topic: str
    duration: int

class QuizRequest(BaseModel):
    subject: str
    grade: str
    topic: str
    num_questions: int

class ScoreData(BaseModel):
    value: float
    max_value: float
    assessment_type: str

class PerformanceAnalysisRequest(BaseModel):
    scores: List[ScoreData]
    subject: str

class FeedbackRequest(BaseModel):
    student_name: str
    subject: str
    performance: str
    areas_to_improve: List[str]

@router.post("/lesson-plan", response_model=Dict[str, Any])
async def create_lesson_plan(
    request: LessonPlanRequest,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Generate a lesson plan using AI
    """
    # Only teachers and admins can generate lesson plans
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return await generate_lesson_plan(
        request.subject,
        request.grade,
        request.topic,
        request.duration
    )

@router.post("/quiz", response_model=Dict[str, Any])
async def create_quiz(
    request: QuizRequest,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Generate quiz questions using AI
    """
    # Only teachers and admins can generate quizzes
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return await generate_quiz_questions(
        request.subject,
        request.grade,
        request.topic,
        request.num_questions
    )

@router.post("/analyze-performance", response_model=Dict[str, Any])
async def analyze_performance(
    request: PerformanceAnalysisRequest,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Analyze student performance data using AI
    """
    # Only teachers and admins can analyze performance
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return await analyze_student_performance(
        [score.dict() for score in request.scores],
        request.subject
    )

@router.post("/feedback", response_model=Dict[str, Any])
async def create_feedback(
    request: FeedbackRequest,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Generate personalized student feedback using AI
    """
    # Only teachers and admins can generate feedback
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return await generate_feedback(
        request.student_name,
        request.subject,
        request.performance,
        request.areas_to_improve
    )