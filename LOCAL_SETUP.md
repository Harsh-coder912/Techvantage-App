# DigiPratibha Education Platform - Local Setup Guide

This guide provides step-by-step instructions to set up and run the DigiPratibha Education Platform locally for hackathon demonstrations.

## 1️⃣ Environment Setup Instructions

### Prerequisites

- **Node.js**: v18.x or later
- **Python**: v3.10 or later
- **MongoDB**: v6.0 or later (local installation or MongoDB Atlas)

### Environment Files Setup

#### Backend (.env)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` file:
   ```
   # MongoDB Connection
   MONGODB_URL=mongodb://localhost:27017
   
   # JWT Settings
   JWT_SECRET=your_super_secret_key_change_in_production
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   
   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key
   ```

   > **Note**: If you don't have an OpenAI API key, the system will use mock AI responses. See the "Optional AI Features" section below.

#### Frontend (.env)

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

2. Add the following content:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

## 2️⃣ Database Setup

### Start MongoDB

1. Ensure MongoDB is running locally:
   ```bash
   # On Linux/macOS
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should be running as a service
   # Or start it manually from MongoDB Compass
   ```

2. Verify MongoDB connection:
   ```bash
   # The backend will automatically connect to MongoDB when started
   # You'll see connection logs when starting the backend
   ```

### Database Initialization

The database will be automatically initialized when you first start the backend. The application uses Beanie ODM with MongoDB, which will create collections as needed.

## 3️⃣ Start Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # On Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python main.py
   ```

5. Verify the backend is running at http://localhost:8000
   - You should see a message like: `INFO: Application startup complete.`
   - You can test the API by visiting http://localhost:8000/ in your browser, which should display: `{"message": "Welcome to Techvantage API"}`

## 4️⃣ Start Frontend

1. Open a new terminal and navigate to the project root:
   ```bash
   cd /path/to/project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Verify the frontend is running at http://localhost:5173
   - The Vite development server will display the URL in the terminal
   - Open this URL in your browser to access the application

## 5️⃣ Test Flow

### Seeded User Credentials

The system comes with pre-seeded user accounts for testing:

1. **Admin User**
   - Email: admin@demo.com
   - Password: admin123
   - Access: Full administrative access to all features

2. **Teacher User**
   - Email: teacher@demo.com
   - Password: teacher123
   - Access: Teacher dashboard and student management

3. **Student User**
   - Email: student@demo.com
   - Password: student123
   - Access: Student dashboard and learning resources

### Testing Steps

1. Open the application at http://localhost:5173
2. Click on "Login" in the navigation
3. Enter credentials for any of the user types above
4. Explore the role-specific dashboard and features
5. Test logout functionality
6. Try logging in with different user roles to see different dashboards

## 6️⃣ Optional AI Features

### OpenAI Integration

The platform includes AI-powered features that require an OpenAI API key:

1. If you have an OpenAI API key:
   - Add it to the backend `.env` file: `OPENAI_API_KEY=your_key_here`
   - Restart the backend server

2. If you don't have an OpenAI API key:
   - The system will automatically use mock AI responses
   - You'll see a message in the logs indicating mock mode is active
   - All AI features will return pre-defined responses for demonstration purposes

### Testing AI Features

1. Log in as any user
2. Navigate to the AI Assistant section
3. Try asking questions or requesting analysis
4. The system will either use the OpenAI API or mock responses based on your configuration

## 7️⃣ Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
   - Ensure MongoDB is running on the default port (27017)
   - Check your MongoDB connection string in the `.env` file

2. **Backend API Not Accessible**
   - Verify the backend is running on port 8000
   - Check for any error messages in the backend terminal

3. **Frontend Not Connecting to Backend**
   - Ensure the `VITE_API_URL` is correctly set in the frontend `.env` file
   - Check browser console for CORS or network errors

4. **Authentication Issues**
   - Clear browser localStorage and cookies
   - Restart both frontend and backend servers