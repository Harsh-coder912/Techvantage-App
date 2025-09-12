# DigiPratibha Demo Environment Setup Guide

This document provides detailed technical instructions for setting up the DigiPratibha platform for a hackathon demonstration.

## Prerequisites

Ensure you have the following installed on your demo machine:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local installation or cloud account)
- **Git** (for version control)
- **npm** or **yarn** (for frontend package management)
- **pip** (for Python package management)

## Step 1: Clone and Prepare the Repository

```bash
# If you don't have the repository yet
git clone <repository-url> c:\Users\harsh\Downloads\Techvantage

# Navigate to project directory
cd c:\Users\harsh\Downloads\Techvantage

# If you already have the repository, pull latest changes
git pull
```

## Step 2: Backend Setup

### Configure Environment Variables

1. Navigate to the backend directory:
   ```bash
   cd c:\Users\harsh\Downloads\Techvantage\backend
   ```

2. Create a `.env` file from the example:
   ```bash
   copy .env.example .env
   ```

3. Edit the `.env` file with appropriate values:
   ```
   # MongoDB Connection
   MONGODB_URL=mongodb://localhost:27017/digipratibha
   # or use your MongoDB Atlas connection string
   # MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/digipratibha
   
   # JWT Settings
   JWT_SECRET=your_secure_jwt_secret_for_demo
   JWT_ALGORITHM=HS256
   JWT_EXPIRES_IN=3600
   
   # OpenAI API Key (for AI features)
   OPENAI_API_KEY=your_openai_api_key
   ```

### Create Python Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows
venv\Scripts\activate

# For Linux/macOS
# source venv/bin/activate
```

### Install Backend Dependencies

```bash
pip install -r requirements.txt
```

## Step 3: Frontend Setup

### Install Frontend Dependencies

```bash
cd c:\Users\harsh\Downloads\Techvantage
npm install
```

### Create Frontend Environment File (if needed)

Create a `.env` file in the root directory:

```bash
echo VITE_API_URL=http://localhost:8000/api > .env
```

## Step 4: Database Setup

### Option 1: Local MongoDB

1. Ensure MongoDB service is running:
   ```bash
   # For Windows (if installed as a service)
   net start MongoDB
   
   # For Linux
   # sudo systemctl start mongod
   ```

2. Create the database (if not using an existing one):
   ```bash
   mongosh
   > use digipratibha
   > exit
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a cluster in MongoDB Atlas
2. Create a database user
3. Whitelist your IP address
4. Get the connection string and update it in the backend `.env` file

## Step 5: Seed Demo Data (Optional)

If you have seed scripts, run them to populate the database with demo data:

```bash
cd c:\Users\harsh\Downloads\Techvantage\backend
python -m app.utils.seed_data
```

If no seed script exists, manually create test accounts through the application interface after starting the servers.

## Step 6: Start the Application

### Option 1: Using Start Scripts

```bash
# For Windows
c:\Users\harsh\Downloads\Techvantage\start-local.bat

# For Linux/macOS
# ./start-local.sh
```

### Option 2: Starting Servers Manually

1. Start the backend server:
   ```bash
   cd c:\Users\harsh\Downloads\Techvantage\backend
   # Activate virtual environment if not already activated
   venv\Scripts\activate
   python main.py
   ```

2. In a separate terminal, start the frontend server:
   ```bash
   cd c:\Users\harsh\Downloads\Techvantage
   npm run dev
   ```

## Step 7: Verify the Setup

1. Backend API should be running at: `http://localhost:8000`
   - Test with: `http://localhost:8000/` (should show API root response)

2. Frontend should be running at: `http://localhost:5173`
   - Open in browser to see the login page

## Step 8: Demo Accounts

Use these pre-configured accounts for the demo (if using seed data):

1. **Admin Account**
   - Email: admin@digipratibha.com
   - Password: admin123

2. **Teacher Account**
   - Email: teacher@digipratibha.com
   - Password: teacher123

3. **Student Account**
   - Email: student@digipratibha.com
   - Password: student123

If these accounts don't exist, create them through the registration process.

## Step 9: Prepare for Demo Scenarios

### Scenario 1: Institution Management

1. Login as admin
2. Navigate to Institutions section
3. Create a new institution with sample data
4. Show institution details and analytics

### Scenario 2: Student Management

1. Login as admin or teacher
2. Navigate to Students section
3. Register a new student
4. Show student profile and performance tracking

### Scenario 3: AI Features

1. Login as teacher
2. Select a student
3. Generate AI assessment
4. Show personalized recommendations

## Step 10: Troubleshooting Common Issues

### Backend Not Starting

1. Check if MongoDB is running
2. Verify Python version compatibility
3. Check for errors in the terminal output
4. Ensure all environment variables are set correctly

### Frontend Not Loading

1. Check if Node.js version is compatible
2. Verify all dependencies are installed
3. Check for JavaScript console errors
4. Ensure the API URL is correctly set in the environment

### Authentication Issues

1. Clear browser cookies and local storage
2. Verify JWT settings in backend `.env`
3. Check if the backend API is accessible

### Database Connection Issues

1. Verify MongoDB connection string
2. Check if MongoDB service is running
3. Ensure network allows connection to MongoDB

## Step 11: Backup Plan

1. Prepare screenshots of key features
2. Record a video demonstration as backup
3. Have a presentation ready that doesn't rely on live demo

## Step 12: Final Checks Before Demo

- [ ] Backend server is running without errors
- [ ] Frontend application loads correctly
- [ ] All demo accounts are accessible
- [ ] Key features are working as expected
- [ ] Network connectivity is stable
- [ ] Demo device has sufficient battery/power
- [ ] Browser cache is cleared for fresh experience
- [ ] All team members know the demo flow

## Additional Resources

- Project Documentation: `c:\Users\harsh\Downloads\Techvantage\README.md`
- API Documentation: Available at `http://localhost:8000/docs` when backend is running
- Local Setup Guide: `c:\Users\harsh\Downloads\Techvantage\LOCAL_SETUP.md`
- Hackathon Preparation Guide: `c:\Users\harsh\Downloads\Techvantage\HACKATHON_PREP.md`