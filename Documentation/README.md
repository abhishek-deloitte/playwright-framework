# Playwright BDD Framework with JavaScript

A comprehensive test automation framework using Playwright and Cucumber BDD for end-to-end testing.

**🎯 Configured for:** [SauceDemo](https://www.saucedemo.com/) - A sample e-commerce application

## 🚀 Features

- **Playwright** - Modern browser automation
- **Cucumber BDD** - Behavior-Driven Development with Gherkin syntax
- **Page Object Model** - Maintainable and reusable code structure
- **Multiple Browsers** - Support for Chromium, Firefox, and WebKit
- **Parallel Execution** - Run tests in parallel for faster execution
- **Rich Reporting** - HTML reports with screenshots and traces
- **Logging** - Winston logger for detailed test execution logs
- **Environment Configuration** - Easy configuration via .env file
- **Custom Hooks** - Before/After hooks for test setup and teardown
- **Screenshot on Failure** - Automatic screenshot capture on test failure
- **Video Recording** - Optional video recording of test execution
- **Trace Files** - Playwright trace files for debugging

## 📁 Project Structure

```
playwright-bdd-framework/
├── src/
│   ├── features/              # Cucumber feature files
│   │   ├── login.feature
│   │   ├── shopping.feature
│   │   └── inventory.feature
│   ├── steps/                 # Step definitions
│   │   ├── loginSteps.js
│   │   ├── shoppingSteps.js
│   │   ├── inventorySteps.js
│   │   └── commonSteps.js
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── support/               # Test support files
│   │   ├── hooks.js          # Cucumber hooks
│   │   └── world.js          # Custom world
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js
│   │   └── logger.js
│   └── reports/               # Report generation
│       └── generate-report.js
├── test-results/              # Test execution results
├── logs/                      # Test logs
├── .env                       # Environment variables
├── .gitignore
├── cucumber.js                # Cucumber configuration
├── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd self-healing-locator
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Configure environment variables:
```bash
# .env file is already configured for SauceDemo
# Review and modify if needed
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Browser Configuration
BROWSER=chromium          # Options: chromium, firefox, webkit
HEADLESS=true            # Run in headless mode
SLOW_MO=0                # Slow down operations by specified ms
TIMEOUT=30000            # Default timeout in ms

# Test Environment
BASE_URL=https://www.saucedemo.com
ENV=qa                   # Environment name

# Screenshot and Video
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure

# Report Configuration
REPORT_PATH=test-results
```

### Cucumber Configuration (cucumber.js)

The framework includes multiple profiles for different execution modes:
- `default` - Standard execution with HTML/JSON reports
- `chrome` - Run tests on Chrome/Chromium
- `firefox` - Run tests on Firefox
- `webkit` - Run tests on WebKit (Safari)
- `headed` - Run tests in headed mode

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests by browser
```bash
# Chrome/Chromium
npm run test:chrome

# Firefox
npm run test:firefox

# WebKit
npm run test:webkit
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests by tag
```bash
npm run test:tag "@smoke"
npm run test:tag "@login and @smoke"
npm run test:tag "not @negative"
```

### Run specific feature file
```bash
npx cucumber-js src/features/login.feature
```

### Generate HTML Report
```bash
npm run report
```

### Clean test results
```bash
npm run clean
```

## 📝 Writing Tests

### Feature Files

Feature files are written in Gherkin syntax:

```gherkin
Feature: Login Functionality for SauceDemo
  As a user of SauceDemo
  I want to log in to the application
  So that I can access the inventory and shop

  @smoke @login
  Scenario: Successful login with standard user
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
```

### Step Definitions

Step definitions implement the steps from feature files:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

Given('I am on the SauceDemo login page', async function () {
  const loginPage = new LoginPage(this.page);
  await this.page.goto('https://www.saucedemo.com');
  await loginPage.waitForPageLoad();
});
```

### Page Objects

Page objects encapsulate page interactions:

```javascript
const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = {
      inventoryItem: '.inventory_item',
      addToCartButton: '[data-test^="add-to-cart"]',
      shoppingCartBadge: '.shopping_cart_badge'
    };
  }

  async addProductToCart(productName) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.click(`[data-test="add-to-cart-${productId}"]`);
  }
}
```

## 🏷️ Tags

Use tags to organize and filter tests:

- `@smoke` - Smoke tests (critical functionality)
- `@regression` - Regression tests
- `@login` - Login related tests
- `@cart` - Shopping cart tests
- `@checkout` - Checkout process tests
- `@inventory` - Product inventory tests
- `@sorting` - Product sorting tests
- `@negative` - Negative test cases

## 📊 Reports

### HTML Report

After test execution, generate an HTML report:

```bash
npm run report
```

The report will be available at: `test-results/html-report/index.html`

### Screenshot and Videos

- Screenshots are automatically captured on test failure
- Videos can be enabled via environment variables
- Traces are saved for debugging in `test-results/traces/`

### Logs

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## 🔧 Advanced Features

### Custom World

The framework includes a custom World class with helper methods:

```javascript
// In step definitions
await this.navigate('/path');
await this.waitForElement('selector');
await this.clickElement('selector');
await this.fillInput('selector', 'text');
await this.takeScreenshot('name');
```

### Hooks

Hooks are defined in `src/support/hooks.js`:
- `BeforeAll` - Runs once before all scenarios
- `Before` - Runs before each scenario
- `After` - Runs after each scenario (captures screenshots on failure)
- `AfterAll` - Runs once after all scenarios

### Parallel Execution

Configure parallel execution in `cucumber.js`:

```javascript
parallel: 2  // Number of parallel workers
```

## 🤝 Best Practices

1. **Use Page Objects** - Keep selectors and interactions in page objects
2. **Write Descriptive Scenarios** - Use clear Given-When-Then structure
3. **Use Tags** - Organize tests with meaningful tags
4. **Keep Steps Reusable** - Write generic steps that can be reused
5. **Handle Waits Properly** - Use explicit waits instead of hardcoded delays
6. **Take Screenshots** - Capture evidence on failures
7. **Log Important Actions** - Use logger for debugging
8. **Keep Tests Independent** - Tests should not depend on each other

## 🐛 Debugging

### View Traces

Playwright traces are saved for each scenario. To view:

```bash
npx playwright show-trace test-results/traces/<trace-file>.zip
```

### Debug Mode

Run tests with debugging:

```bash
# Set HEADLESS=false in .env
HEADLESS=false npm test
```

### Slow Motion

Add delay between actions for better visibility:

```bash
# Set SLOW_MO in .env
SLOW_MO=1000 npm test
```

## 📦 Dependencies

### Main Dependencies
- `@playwright/test` - Playwright testing library
- `@cucumber/cucumber` - Cucumber BDD framework
- `winston` - Logging library

### Dev Dependencies
- `multiple-cucumber-html-reporter` - HTML report generation
- `dotenv` - Environment variable management
- `rimraf` - Cross-platform file cleanup

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the repository.

## 🎯 Roadmap

- [ ] Integration with Allure reporting
- [ ] API testing support
- [ ] Visual regression testing
- [ ] Database validation
- [ ] Mobile testing support
- [ ] Docker containerization
- [ ] Test data management
- [ ] Self-healing locators implementation

---

**Happy Testing! 🎭**

