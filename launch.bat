@echo off
echo ===================================================
echo   Starting Adjunct Platform (Express + React + Node)
echo ===================================================

SET "PATH=%~dp0node_local\node-v20.11.1-win-x64;%PATH%"

echo [1/2] Starting Express API Server on http://localhost:5000...
start "Express Backend" cmd /k "cd /d %~dp0server && node index.js"

echo [2/2] Starting React Frontend on http://localhost:5173...
start "React Client" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo All services launched!
echo - Express Backend: http://localhost:5000
echo - React Frontend:  http://localhost:5173
echo ===================================================
