# Quick Start Guide

This guide will help you get started with the Playwright BDD framework quickly.

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 2. Configure Environment

```bash
# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# Update BASE_URL to your application URL
```

### 3. Run Your First Test

```bash
# Run all tests
npm test

# Run in headed mode to see the browser
npm run test:headed
```

## 📝 Creating Your First Test

### Step 1: Write a Feature File

Create a new file in `src/features/` directory:

**src/features/my-feature.feature**
```gherkin
Feature: My First Test
  As a user
  I want to test my application
  
  @smoke
  Scenario: Visit homepage
    Given I navigate to "/"
    Then the page title should be "Welcome"
    And I should see element "h1"
```

### Step 2: Implement Step Definitions

Create a step definition file in `src/steps/`:

**src/steps/mySteps.js**
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Most common steps are already implemented in commonSteps.js
// Add your custom steps here if needed
```

### Step 3: Run Your Test

```bash
# Run specific feature file
npx cucumber-js src/features/my-feature.feature

# Or run with tag
npm run test:tag "@smoke"
```

## 🎯 Common Test Patterns

### Login Test Pattern

```gherkin
Scenario: User login
  Given I am on the login page
  When I enter "user@example.com" in the username field
  And I enter "password123" in the password field
  And I click the login button
  Then I should see element ".dashboard"
```

### Form Submission Pattern

```gherkin
Scenario: Submit contact form
  Given I navigate to "/contact"
  When I fill "#name" with "John Doe"
  And I fill "#email" with "john@example.com"
  And I fill "#message" with "Hello World"
  And I click on element with selector "button[type='submit']"
  Then I should see element ".success-message"
```

### Search Pattern

```gherkin
Scenario: Search functionality
  Given I navigate to "/"
  When I fill "#search" with "playwright"
  And I press "Enter" key
  Then element ".results" should contain text "playwright"
```

## 🔧 Common Commands

```bash
# Run all tests
npm test

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run with tags
npm run test:tag "@smoke"
npm run test:tag "@regression"
npm run test:tag "not @skip"

# Run in headed mode (see the browser)
npm run test:headed

# Generate HTML report
npm run report

# Clean test results
npm run clean
```

## 📊 Viewing Results

### After test execution:

1. **View console output** - See immediate results in terminal
2. **Generate HTML report** - Run `npm run report`
3. **Open report** - Open `test-results/html-report/index.html` in browser
4. **View screenshots** - Check `test-results/screenshots/` for failure screenshots
5. **View traces** - Use `npx playwright show-trace test-results/traces/<file>.zip`

## 🐛 Debugging Tips

### 1. Run in Headed Mode
```bash
# Edit .env file
HEADLESS=false

# Or set environment variable
HEADLESS=false npm test
```

### 2. Slow Down Execution
```bash
# Edit .env file
SLOW_MO=1000

# This adds 1 second delay between actions
```

### 3. Take Screenshots
```gherkin
Then I take a screenshot with name "debug-screenshot"
```

### 4. View Playwright Trace
```bash
# Traces are automatically saved for each scenario
npx playwright show-trace test-results/traces/Scenario_Name_12345.zip
```

### 5. Add Debug Logs
```javascript
const logger = require('../utils/logger');
logger.info('Debug message here');
```

## 📦 Project Structure Reference

```
src/
├── features/          # Gherkin feature files (.feature)
├── steps/            # Step definitions (.js)
├── pages/            # Page Object Models
├── support/          # Hooks and world configuration
├── utils/            # Helper utilities
├── config/           # Configuration files
└── reports/          # Report generation scripts
```

## ✅ Best Practices

1. **Use Page Objects** - Keep all selectors in page object classes
2. **Reuse Steps** - Use common steps from `commonSteps.js`
3. **Tag Your Tests** - Use `@smoke`, `@regression`, etc.
4. **Write Clear Scenarios** - Use descriptive Given-When-Then
5. **Keep Tests Independent** - Each test should work standalone
6. **Use Explicit Waits** - Let Playwright handle waiting automatically

## 🆘 Troubleshooting

### Problem: Tests are failing with timeout
**Solution:** 
- Increase timeout in `.env`: `TIMEOUT=60000`
- Check if selectors are correct
- Ensure application is accessible

### Problem: Browser not opening
**Solution:**
- Run `npx playwright install` again
- Check `HEADLESS` setting in `.env`
- Try running with `npm run test:headed`

### Problem: Screenshots not being captured
**Solution:**
- Check `test-results/screenshots/` directory
- Verify write permissions
- Screenshots only capture on failure by default

### Problem: Can't find step definition
**Solution:**
- Check if step is implemented in `src/steps/`
- Use common steps from `commonSteps.js`
- Implement custom step if needed

## 🎓 Next Steps

1. **Explore Examples** - Check `src/features/` for example tests
2. **Read Full README** - See `README.md` for complete documentation
3. **Customize Configuration** - Modify `cucumber.js` and `.env`
4. **Add Page Objects** - Create page objects for your application
5. **Set up CI/CD** - Use the GitHub Actions workflow in `.github/workflows/`

## 📚 Useful Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Page Object Pattern](https://playwright.dev/docs/pom)

---

**Need help?** Create an issue in the repository or refer to the full README.md

**Happy Testing! 🎭**

