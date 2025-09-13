# DigiPratibha Education Platform

## Overview

DigiPratibha is a comprehensive education platform designed for hackathon demonstrations. It serves as a dual-role web application that supports both student portfolio management and institutional administration. The platform features AI-powered recommendations, analytics dashboards, and modern portfolio building tools to enhance the educational experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router DOM for client-side navigation with protected routes
- **UI Components**: Radix UI primitives with custom styling for accessible, reusable components
- **Styling**: Tailwind CSS with custom design system including dark theme optimization
- **State Management**: React Context API for authentication and user state management
- **Charts & Visualization**: Recharts library for analytics and data visualization

### Backend Architecture
- **Framework**: FastAPI (Python) for high-performance RESTful API development
- **Authentication**: JWT-based authentication with OAuth2 password flow
- **Password Security**: bcrypt for secure password hashing with proper salt rounds
- **Database ODM**: Beanie (built on Motor) for MongoDB document modeling
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation through FastAPI

### Database Design
- **Primary Database**: MongoDB for flexible document storage suitable for educational data
- **Document Models**: 
  - Users (authentication and role management)
  - Institutions (educational organization profiles)
  - Students (student records and portfolio data)
  - Scores (assessment and performance tracking)
- **Indexing Strategy**: Optimized indexes on user IDs, institution IDs, and frequently queried fields

### Authentication & Authorization
- **Token-based Authentication**: JWT tokens with configurable expiration times
- **Role-based Access Control**: Support for admin, teacher, institution, and student roles
- **Protected Routes**: Frontend route protection based on authentication status and user roles
- **Password Security**: Industry-standard bcrypt hashing with appropriate complexity

### AI Integration Architecture
- **Primary AI Service**: OpenAI GPT integration for content generation and recommendations
- **Fallback AI**: Google Gemini AI as alternative AI provider
- **AI Features**:
  - Lesson plan generation for educators
  - Quiz question creation
  - Student performance analysis
  - Portfolio content suggestions
- **Mock AI Responses**: Fallback system when API keys are unavailable for demo purposes

## External Dependencies

### Core Technologies
- **Node.js**: Runtime environment for frontend development and build processes
- **Python 3.8+**: Backend runtime with modern async/await support
- **MongoDB**: Primary database for all application data storage

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router for core functionality
- **UI Libraries**: Radix UI component primitives for accessible interface elements
- **Styling**: Tailwind CSS with custom configuration for design system
- **HTTP Client**: Axios for API communication with interceptors for authentication
- **Form Handling**: React Hook Form for efficient form state management
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Web Framework**: FastAPI with Uvicorn ASGI server
- **Database**: Motor (async MongoDB driver) with Beanie ODM
- **Authentication**: python-jose for JWT handling, passlib for password hashing
- **Environment**: python-dotenv for configuration management
- **Testing**: pytest with httpx for API testing

### AI Services
- **OpenAI API**: GPT models for advanced AI features (requires API key)
- **Google Generative AI**: Gemini models as alternative AI provider
- **Configuration**: Environment-based API key management with graceful fallbacks

### Development & Deployment
- **Development Server**: Vite dev server with hot module replacement
- **API Server**: Uvicorn with auto-reload for development
- **Environment Configuration**: Separate .env files for frontend and backend
- **CORS Configuration**: Configured for development and production cross-origin requests

### Optional Integrations
- **MongoDB Atlas**: Cloud database option as alternative to local MongoDB
- **Replit Deployment**: Optimized configuration for Replit hosting environment
- **File Upload**: Support for portfolio images and certificate uploads