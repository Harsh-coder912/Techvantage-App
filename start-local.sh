#!/bin/bash

# DigiPratibha Education Platform - Local Startup Script
# This script sets up and runs both frontend and backend components

echo "🚀 Starting DigiPratibha Education Platform setup..."

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "📋 Checking prerequisites..."

if ! command_exists node; then
  echo "❌ Node.js is not installed. Please install Node.js v18 or later."
  exit 1
fi

if ! command_exists python3; then
  echo "❌ Python 3 is not installed. Please install Python 3.10 or later."
  exit 1
fi

if ! command_exists pip; then
  echo "❌ pip is not installed. Please install pip."
  exit 1
fi

# Setup environment files if they don't exist
echo "🔧 Setting up environment files..."

# Backend .env
if [ ! -f "./backend/.env" ]; then
  echo "Creating backend .env file..."
  cp ./backend/.env.example ./backend/.env
  echo "✅ Backend .env created. Please check the file for any required modifications."
fi

# Frontend .env
if [ ! -f "./.env" ]; then
  echo "Creating frontend .env file..."
  echo "VITE_API_URL=http://localhost:8000/api" > ./.env
  echo "✅ Frontend .env created."
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Setup backend
echo "🐍 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install backend dependencies
echo "📦 Installing backend dependencies..."
pip install -r requirements.txt

# Return to root directory
cd ..

# Check if concurrently is installed, if not install it
if ! npm list -g concurrently > /dev/null 2>&1; then
  echo "📦 Installing concurrently package..."
  npm install -g concurrently
fi

# Start both servers
echo "🚀 Starting servers..."
echo "📝 Backend will run on http://localhost:8000"
echo "📝 Frontend will run on http://localhost:5173"
echo "📝 Press Ctrl+C to stop both servers"

# Use concurrently to run both servers
concurrently \
  "cd backend && source venv/bin/activate && python main.py" \
  "npm run dev"