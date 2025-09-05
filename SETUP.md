# FINVO Setup Guide

## Prerequisites Installation

### 1. Install Node.js

**Option A: Download from Official Website**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended for most users)
3. Run the installer and follow the setup wizard
4. Make sure to check "Add to PATH" during installation

**Option B: Using Chocolatey (if you have it installed)**
```powershell
choco install nodejs
```

**Option C: Using Winget (Windows Package Manager)**
```powershell
winget install OpenJS.NodeJS
```

### 2. Verify Installation

After installation, restart your terminal/PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v18.17.0 for Node.js and 9.6.7 for npm).

## Setting Up FINVO

### 1. Install Dependencies

Once Node.js is installed, navigate to the FINVO directory and run:

```powershell
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Development Servers

From the root FINVO directory:

```powershell
# Start both frontend and backend
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend server on `http://localhost:3000`

### 3. Access the Application

1. Open your web browser
2. Go to `http://localhost:3000`
3. Use any email and password to login (demo mode)

## Troubleshooting

### Node.js not found
- Make sure Node.js is installed correctly
- Restart your terminal after installation
- Check if Node.js is added to your system PATH

### Port already in use
If you get "port already in use" errors:
- Change the port in the backend `.env` file
- Or kill the process using the port:
  ```powershell
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Permission errors
- Run PowerShell as Administrator
- Or use the following command to allow script execution:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

## Development Workflow

1. **Backend Development**
   ```powershell
   cd backend
   npm run dev
   ```

2. **Frontend Development**
   ```powershell
   cd frontend
   npm start
   ```

3. **Running Tests**
   ```powershell
   # Backend tests
   cd backend
   npm test

   # Frontend tests
   cd frontend
   npm test
   ```

## Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finvo
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

## Next Steps

After successful setup:

1. **Explore the Dashboard**: Check out the portfolio overview and metrics
2. **Review the Code**: Look at the component structure and API endpoints
3. **Customize**: Modify the UI, add new features, or integrate real data
4. **Database**: Set up MongoDB for persistent data storage
5. **AI Integration**: Implement the AI recommendation engine

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure ports are not in use
4. Check the Node.js and npm versions are compatible

---

**Happy coding! 🚀**







