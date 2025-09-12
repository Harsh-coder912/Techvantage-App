@echo off
setlocal

echo 🚀 Starting DigiPratibha Education Platform setup...

:: Check for required tools
echo 📋 Checking prerequisites...

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js is not installed. Please install Node.js v18 or later.
  exit /b 1
)

where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Python is not installed. Please install Python 3.10 or later.
  exit /b 1
)

where pip >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ❌ pip is not installed. Please install pip.
  exit /b 1
)

:: Setup environment files if they don't exist
echo 🔧 Setting up environment files...

:: Backend .env
if not exist .\backend\.env (
  echo Creating backend .env file...
  copy .\backend\.env.example .\backend\.env
  echo ✅ Backend .env created. Please check the file for any required modifications.
)

:: Frontend .env
if not exist .\.env (
  echo Creating frontend .env file...
  echo VITE_API_URL=http://localhost:8000/api > .env
  echo ✅ Frontend .env created.
)

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

:: Setup backend
echo 🐍 Setting up backend...
cd backend

:: Create virtual environment if it doesn't exist
if not exist venv (
  echo Creating Python virtual environment...
  python -m venv venv
)

:: Activate virtual environment
echo Activating virtual environment...
call .\venv\Scripts\activate.bat

:: Install backend dependencies
echo 📦 Installing backend dependencies...
pip install -r requirements.txt

:: Return to root directory
cd ..

:: Check if concurrently is installed, if not install it
npm list -g concurrently >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo 📦 Installing concurrently package...
  call npm install -g concurrently
)

:: Start both servers
echo 🚀 Starting servers...
echo 📝 Backend will run on http://localhost:8000
echo 📝 Frontend will run on http://localhost:5173
echo 📝 Press Ctrl+C to stop both servers

:: Use concurrently to run both servers
concurrently "cd backend && call .\venv\Scripts\activate.bat && python main.py" "npm run dev"