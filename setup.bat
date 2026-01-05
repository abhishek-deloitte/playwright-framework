@echo off
REM Playwright BDD Framework Setup Script for Windows
REM This script will set up the entire framework

echo ==================================
echo Playwright BDD Framework Setup
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo [OK] npm version:
npm --version
echo.

REM Install dependencies
echo [*] Installing dependencies...
call npm install

if errorlevel 1 (
    echo [X] Failed to install dependencies
    exit /b 1
)
echo [OK] Dependencies installed successfully
echo.

REM Install Playwright browsers
echo [*] Installing Playwright browsers...
call npx playwright install

if errorlevel 1 (
    echo [X] Failed to install Playwright browsers
    exit /b 1
)
echo [OK] Playwright browsers installed successfully
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo [*] Creating .env file...
    (
        echo # Browser Configuration
        echo BROWSER=chromium
        echo HEADLESS=true
        echo SLOW_MO=0
        echo TIMEOUT=30000
        echo.
        echo # Test Environment
        echo BASE_URL=https://www.example.com
        echo ENV=qa
        echo.
        echo # Screenshot and Video
        echo SCREENSHOT=only-on-failure
        echo VIDEO=retain-on-failure
        echo.
        echo # Report Configuration
        echo REPORT_PATH=test-results
    ) > .env
    echo [OK] .env file created
) else (
    echo [i] .env file already exists
)
echo.

REM Create necessary directories
echo [*] Creating directories...
if not exist test-results mkdir test-results
if not exist test-results\screenshots mkdir test-results\screenshots
if not exist test-results\videos mkdir test-results\videos
if not exist test-results\traces mkdir test-results\traces
if not exist logs mkdir logs

echo [OK] Directories created
echo.

echo ==================================
echo [OK] Setup completed successfully!
echo ==================================
echo.
echo Next steps:
echo 1. Update BASE_URL in .env file with your application URL
echo 2. Run 'npm test' to execute tests
echo 3. Run 'npm run report' to generate HTML report
echo.
echo For more information, see:
echo - README.md for full documentation
echo - QUICKSTART.md for quick start guide
echo.
echo Happy Testing!

pause

