#!/bin/bash

# Playwright BDD Framework Setup Script
# This script will set up the entire framework

echo "=================================="
echo "Playwright BDD Framework Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Install Playwright browsers
echo "🎭 Installing Playwright browsers..."
npx playwright install

if [ $? -eq 0 ]; then
    echo "✅ Playwright browsers installed successfully"
else
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Browser Configuration
BROWSER=chromium
HEADLESS=true
SLOW_MO=0
TIMEOUT=30000

# Test Environment
BASE_URL=https://www.example.com
ENV=qa

# Screenshot and Video
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure

# Report Configuration
REPORT_PATH=test-results
EOL
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi
echo ""

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p test-results/screenshots
mkdir -p test-results/videos
mkdir -p test-results/traces
mkdir -p logs

echo "✅ Directories created"
echo ""

echo "=================================="
echo "✅ Setup completed successfully!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Update BASE_URL in .env file with your application URL"
echo "2. Run 'npm test' to execute tests"
echo "3. Run 'npm run report' to generate HTML report"
echo ""
echo "For more information, see:"
echo "- README.md for full documentation"
echo "- QUICKSTART.md for quick start guide"
echo ""
echo "Happy Testing! 🎭"

