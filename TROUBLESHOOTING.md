# DigiPratibha Hackathon Demo Troubleshooting Guide

This guide provides solutions for common issues that may arise during your hackathon demonstration of the DigiPratibha platform.

## Quick Reference

| Issue | Quick Solution |
|-------|---------------|
| Backend won't start | Check MongoDB connection, verify Python environment |
| Frontend won't load | Verify API URL, check Node.js version |
| Authentication fails | Clear browser storage, check JWT settings |
| MongoDB connection error | Verify connection string, check network access |
| AI features not working | Verify OpenAI API key, check rate limits |
| Slow performance | Close unnecessary applications, check network speed |
| Demo data missing | Run seed scripts or create essential demo entities |

## Backend Issues

### Backend Server Won't Start

**Symptoms:**
- Error messages when running `python main.py`
- Server starts but immediately crashes
- Port conflicts

**Solutions:**

1. **Check Python Environment:**
   ```bash
   # Verify Python version
   python --version  # Should be 3.8+
   
   # Ensure virtual environment is activated
   # Windows
   venv\Scripts\activate
   
   # Verify dependencies
   pip list | findstr fastapi
   pip list | findstr uvicorn
   ```

2. **Verify MongoDB Connection:**
   ```bash
   # Check if MongoDB URL is correct in .env
   type backend\.env | findstr MONGODB_URL
   
   # Test MongoDB connection
   # Install MongoDB tools if needed
   mongosh "your-connection-string"
   ```

3. **Check Port Availability:**
   ```bash
   # Check if port 8000 is already in use
   netstat -ano | findstr :8000
   
   # If port is in use, find and stop the process
   taskkill /PID <process_id> /F
   ```

4. **Debug Mode:**
   ```bash
   # Run with debug logging
   python -m uvicorn app.main:app --reload --log-level debug
   ```

### Database Connection Issues

**Symptoms:**
- Backend starts but shows database connection errors
- API calls fail with database-related errors
- "Cannot connect to MongoDB" messages

**Solutions:**

1. **Verify Connection String:**
   - Check `.env` file for correct MongoDB URL
   - Ensure username/password are URL-encoded if they contain special characters
   - Verify the database name is correct

2. **Network Issues:**
   - If using MongoDB Atlas, ensure your IP is whitelisted
   - Check firewall settings for local MongoDB
   - Verify internet connection if using cloud database

3. **MongoDB Service:**
   ```bash
   # Check if MongoDB service is running (Windows)
   net start | findstr MongoDB
   
   # Start MongoDB service if needed
   net start MongoDB
   ```

4. **Alternative Connection:**
   - Try connecting with MongoDB Compass to verify credentials
   - Use a local MongoDB instance as fallback

## Frontend Issues

### Frontend Won't Load

**Symptoms:**
- Blank page when accessing frontend URL
- JavaScript console errors
- Stuck on loading screen

**Solutions:**

1. **Verify Node.js Environment:**
   ```bash
   # Check Node.js version
   node --version  # Should be 14+
   
   # Verify npm
   npm --version
   
   # Reinstall dependencies if needed
   npm ci
   ```

2. **Check Frontend Environment:**
   ```bash
   # Verify API URL setting
   type .env | findstr VITE_API_URL
   
   # Create or update .env if needed
   echo VITE_API_URL=http://localhost:8000/api > .env
   ```

3. **Clear Browser Cache:**
   - Open browser developer tools (F12)
   - Go to Application tab > Clear Storage
   - Select all items and click "Clear site data"
   - Hard refresh (Ctrl+Shift+R)

4. **Try Different Port:**
   ```bash
   # Start Vite on a different port
   npm run dev -- --port 3000
   ```

### API Connection Issues

**Symptoms:**
- Frontend loads but shows API errors
- Network tab shows failed requests
- "Cannot connect to API" messages

**Solutions:**

1. **CORS Issues:**
   - Verify backend CORS settings in `main.py`
   - Ensure frontend URL is allowed in CORS configuration
   - Check for exact protocol/port match

2. **API URL Configuration:**
   - Verify `VITE_API_URL` in frontend `.env`
   - Ensure it includes the correct protocol (http/https)
   - Check for trailing slashes consistency

3. **Network Issues:**
   - Check if backend is accessible from browser
   - Try accessing `http://localhost:8000/` directly
   - Verify no firewall/proxy is blocking requests

## Authentication Issues

### Login Failures

**Symptoms:**
- Cannot log in with correct credentials
- JWT token errors
- Redirect loops after login

**Solutions:**

1. **Clear Browser Storage:**
   ```javascript
   // Run in browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

2. **Check JWT Configuration:**
   - Verify JWT settings in backend `.env`
   - Ensure JWT_SECRET is set correctly
   - Check token expiration time

3. **Verify User Credentials:**
   - Confirm user exists in database
   - Reset password if necessary
   - Check for case sensitivity in email

4. **Debug Authentication Flow:**
   - Check network requests during login
   - Verify token is being stored correctly
   - Check for proper token inclusion in API requests

## AI Feature Issues

### AI Features Not Working

**Symptoms:**
- AI assessment generation fails
- Recommendations not appearing
- Timeout errors on AI requests

**Solutions:**

1. **OpenAI API Key:**
   - Verify OPENAI_API_KEY in backend `.env`
   - Check API key validity and quota
   - Ensure key has necessary permissions

2. **Rate Limiting:**
   - Check if you're hitting OpenAI rate limits
   - Implement request throttling if needed
   - Consider using a different API key

3. **Network Issues:**
   - Ensure backend can reach OpenAI API
   - Check for proxy/firewall blocking API calls
   - Verify internet connection

4. **Fallback Content:**
   - Prepare pre-generated AI responses
   - Have screenshots of AI features working
   - Be ready to explain the feature conceptually

## Performance Issues

### Slow Application Performance

**Symptoms:**
- Long loading times
- Laggy UI interactions
- Delayed API responses

**Solutions:**

1. **Optimize Demo Environment:**
   - Close unnecessary applications
   - Ensure sufficient system resources
   - Use a wired internet connection if possible

2. **Reduce Database Load:**
   - Limit demo data to essentials
   - Add database indexes if missing
   - Optimize heavy queries

3. **Frontend Optimization:**
   - Use production build for demo
   ```bash
   npm run build
   npm run preview
   ```
   - Disable unnecessary browser extensions
   - Use a performance-optimized browser

4. **Backend Optimization:**
   - Increase uvicorn workers if needed
   - Optimize heavy API endpoints
   - Consider using async operations

## Demo Data Issues

### Missing or Incorrect Demo Data

**Symptoms:**
- Empty dashboards or lists
- Missing test accounts
- Incomplete information

**Solutions:**

1. **Run Seed Scripts:**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Run seed script if available
   python -m app.utils.seed_data
   ```

2. **Manual Data Creation:**
   - Create essential entities through the UI
   - Follow a predefined script for consistent demo data
   - Document created entities for reference

3. **Database Reset:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Select and reset database
   use digipratibha
   db.dropDatabase()
   exit
   
   # Run seed script again
   python -m app.utils.seed_data
   ```

4. **Backup and Restore:**
   - Keep a backup of a working demo database
   - Restore before presentation if needed

## Presentation Environment Issues

### Display and Projection Problems

**Symptoms:**
- Display resolution issues
- Projection not working
- Screen sharing problems

**Solutions:**

1. **Resolution Adjustment:**
   - Set display resolution to standard (1920x1080)
   - Adjust browser zoom level (Ctrl + or Ctrl -)
   - Use responsive design mode in browser

2. **Projection Setup:**
   - Test projection equipment beforehand
   - Bring necessary adapters (HDMI, USB-C, etc.)
   - Know how to extend/duplicate displays

3. **Screen Sharing:**
   - Test screen sharing software beforehand
   - Close unnecessary applications
   - Prepare window arrangements for demo

4. **Backup Plan:**
   - Have screenshots/video ready
   - Prepare to demo on different device if needed
   - Have presentation slides as fallback

## Emergency Recovery

### Complete Demo Failure

If everything fails during the presentation:

1. **Stay Calm and Acknowledge:**
   - Briefly acknowledge the issue
   - Avoid lengthy explanations or apologies
   - Pivot to backup materials

2. **Switch to Backup:**
   - Use prepared screenshots/videos
   - Switch to presentation slides
   - Describe features conceptually

3. **Focus on Value Proposition:**
   - Emphasize the problem being solved
   - Discuss technical architecture
   - Highlight business potential

4. **Offer Post-Demo Access:**
   - Provide access to working demo after presentation
   - Share GitHub repository if appropriate
   - Offer to schedule a follow-up demonstration

## Pre-Demo Checklist

To prevent issues, complete this checklist before your presentation:

- [ ] Test complete demo flow on presentation device
- [ ] Verify all credentials work
- [ ] Check internet connection reliability
- [ ] Ensure MongoDB connection is stable
- [ ] Verify OpenAI API key and quota
- [ ] Close unnecessary applications
- [ ] Prepare backup materials (screenshots, videos)
- [ ] Test projection/screen sharing
- [ ] Have troubleshooting guide accessible
- [ ] Assign a team member as technical support

## Quick Recovery Commands

### Backend Reset

```bash
# Stop current process (if running)
# Press Ctrl+C in terminal

# Restart backend
cd backend
venv\Scripts\activate
python main.py
```

### Frontend Reset

```bash
# Stop current process (if running)
# Press Ctrl+C in terminal

# Clear node modules (extreme case)
# npm ci

# Restart frontend
npm run dev
```

### Full System Reset

```bash
# For Windows
start-local.bat

# For Linux/macOS
# ./start-local.sh
```

## Contact Information

If you need urgent assistance during the hackathon:

- Technical Support: [Your Technical Lead's Contact]
- Presentation Lead: [Your Presentation Lead's Contact]
- Backup Device: [Details of Backup Device]

Remember: Technical issues happen even in professional settings. How you handle them shows your problem-solving abilities and preparation level. Stay calm, follow the troubleshooting steps, and focus on demonstrating the value of DigiPratibha even if some features encounter issues.