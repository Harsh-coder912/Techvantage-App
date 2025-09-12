import os
from typing import List, Dict, Any, Optional
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

async def generate_lesson_plan(subject: str, grade: str, topic: str, duration: int) -> Dict[str, Any]:
    """
    Generate a lesson plan using OpenAI API
    """
    try:
        prompt = f"""Create a detailed lesson plan for a {duration}-minute class on {topic} for {grade} grade {subject} students.
        Include the following sections:
        1. Learning Objectives
        2. Materials Needed
        3. Introduction/Warm-up (5-10 minutes)
        4. Main Activities (step by step)
        5. Assessment/Evaluation
        6. Conclusion
        7. Homework/Extension Activities
        
        Make the lesson engaging, interactive, and aligned with educational standards.
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational consultant specializing in curriculum development."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.7
        )
        
        return {
            "lesson_plan": response.choices[0].message.content,
            "subject": subject,
            "grade": grade,
            "topic": topic,
            "duration": duration
        }
    except Exception as e:
        return {"error": str(e)}

async def generate_quiz_questions(subject: str, grade: str, topic: str, num_questions: int) -> Dict[str, Any]:
    """
    Generate quiz questions using OpenAI API
    """
    try:
        prompt = f"""Create {num_questions} quiz questions for {grade} grade {subject} students on the topic of {topic}.
        For each question, provide:
        1. The question
        2. Four multiple-choice options (A, B, C, D)
        3. The correct answer
        4. A brief explanation of why that answer is correct
        
        Make the questions varied in difficulty and aligned with educational standards.
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational assessment specialist."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.7
        )
        
        return {
            "quiz_questions": response.choices[0].message.content,
            "subject": subject,
            "grade": grade,
            "topic": topic,
            "num_questions": num_questions
        }
    except Exception as e:
        return {"error": str(e)}

async def analyze_student_performance(scores: List[Dict[str, Any]], subject: str) -> Dict[str, Any]:
    """
    Analyze student performance data using OpenAI API
    """
    try:
        # Format scores data for the prompt
        scores_text = "\n".join([f"Student {i+1}: {score['value']}/{score['max_value']} on {score['assessment_type']}" 
                              for i, score in enumerate(scores)])
        
        prompt = f"""Analyze the following student performance data for {subject}:
        
        {scores_text}
        
        Please provide:
        1. Statistical analysis (average, median, range)
        2. Strengths and weaknesses identified
        3. Recommendations for improvement
        4. Suggested differentiation strategies for struggling and advanced students
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational data analyst specializing in student performance."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0.7
        )
        
        return {
            "analysis": response.choices[0].message.content,
            "subject": subject,
            "num_scores_analyzed": len(scores)
        }
    except Exception as e:
        return {"error": str(e)}

async def generate_feedback(student_name: str, subject: str, performance: str, areas_to_improve: List[str]) -> Dict[str, Any]:
    """
    Generate personalized student feedback using OpenAI API
    """
    try:
        areas_text = "\n".join([f"- {area}" for area in areas_to_improve])
        
        prompt = f"""Generate personalized feedback for a student named {student_name} in {subject} class.
        
        Overall performance: {performance}
        
        Areas that need improvement:
        {areas_text}
        
        Please provide:
        1. A positive and encouraging opening statement
        2. Specific feedback on their performance
        3. Constructive suggestions for each area of improvement
        4. Specific strategies or resources they could use
        5. A motivating closing statement
        
        Keep the tone positive, specific, and actionable. The feedback should be appropriate for sharing with both the student and their parents.
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an experienced and empathetic teacher who provides constructive feedback."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        return {
            "feedback": response.choices[0].message.content,
            "student_name": student_name,
            "subject": subject
        }
    except Exception as e:
        return {"error": str(e)}