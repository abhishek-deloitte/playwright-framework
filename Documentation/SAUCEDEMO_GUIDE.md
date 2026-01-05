# 🎭 SauceDemo Test Automation Framework

## Overview

This Playwright BDD framework has been configured to test the **[SauceDemo](https://www.saucedemo.com/)** e-commerce application. SauceDemo is a sample application provided by Sauce Labs for testing purposes.

## 🌐 Application Under Test

**URL:** https://www.saucedemo.com/

SauceDemo is a fully functional e-commerce website that allows you to:
- Login with different user types
- Browse product inventory
- Add/remove products to/from cart
- Sort products by name and price
- Complete checkout process

## 👥 Test Users

The following test users are available in SauceDemo:

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard user with full access |
| `locked_out_user` | `secret_sauce` | User that has been locked out |
| `problem_user` | `secret_sauce` | User with problematic behavior |
| `performance_glitch_user` | `secret_sauce` | User experiencing performance issues |

## 📝 Test Coverage

### 1. Login Tests (`login.feature`)

**Scenarios:**
- ✅ Successful login with standard user
- ✅ Login with locked out user (negative)
- ✅ Login with invalid credentials (negative)
- ✅ Login with empty username (negative)
- ✅ Login with empty password (negative)
- ✅ Login with different user types (scenario outline)
- ✅ Successful logout
- ✅ Error message dismissal

**Tags:** `@smoke`, `@login`, `@regression`, `@negative`

### 2. Shopping Cart Tests (`shopping.feature`)

**Scenarios:**
- ✅ Add single product to cart
- ✅ Add multiple products to cart
- ✅ Remove product from cart on inventory page
- ✅ Remove product from cart page
- ✅ Complete checkout with valid information
- ✅ Checkout validation errors (missing first name, last name, postal code)
- ✅ Cart persistence across pages
- ✅ Complete end-to-end purchase flow
- ✅ Continue shopping from cart
- ✅ Empty cart validation
- ✅ Cancel checkout

**Tags:** `@smoke`, `@cart`, `@checkout`, `@regression`, `@negative`

### 3. Inventory Tests (`inventory.feature`)

**Scenarios:**
- ✅ View all products
- ✅ Sort products by name (A-Z, Z-A)
- ✅ Sort products by price (low-high, high-low)
- ✅ Verify product details (names, prices, descriptions)
- ✅ Add to cart button functionality
- ✅ Reset app state
- ✅ Menu navigation
- ✅ Verify all product information (scenario outline)

**Tags:** `@smoke`, `@inventory`, `@sorting`, `@regression`

## 🗂️ Page Objects

### 1. LoginPage.js
Handles login page interactions:
- Enter username and password
- Click login button
- View error messages
- Clear form fields
- Get available credentials info

### 2. InventoryPage.js
Handles product inventory page:
- View all products
- Add/remove products to/from cart
- Sort products
- Navigate to cart
- Open/close burger menu
- Logout
- Reset app state

### 3. CartPage.js
Handles shopping cart page:
- View cart items
- Remove items from cart
- Continue shopping
- Proceed to checkout
- Verify cart contents

### 4. CheckoutPage.js
Handles checkout process (Steps 1, 2, and Complete):
- Fill customer information
- View order summary
- Complete purchase
- View confirmation
- Handle validation errors

## 📊 Test Data Configuration

Located in `src/config/testData.js`:

```javascript
// User credentials
users: {
  standardUser: { username: 'standard_user', password: 'secret_sauce' },
  lockedOutUser: { username: 'locked_out_user', password: 'secret_sauce' },
  // ... more users
}

// Product data
products: {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
  bikeLight: { name: 'Sauce Labs Bike Light', price: '$9.99' },
  // ... more products
}

// Checkout data
checkout: {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
}
```

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Feature
```bash
npx cucumber-js src/features/login.feature
npx cucumber-js src/features/shopping.feature
npx cucumber-js src/features/inventory.feature
```

### Run by Tags
```bash
# Smoke tests only
npm run test:tag "@smoke"

# Login tests
npm run test:tag "@login"

# Cart and checkout tests
npm run test:tag "@cart or @checkout"

# Exclude negative tests
npm run test:tag "not @negative"

# Smoke and login tests
npm run test:tag "@smoke and @login"
```

### Run in Different Browsers
```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# WebKit (Safari)
npm run test:webkit
```

### Run in Headed Mode
```bash
npm run test:headed
```

## 📈 Test Execution Flow

### Example: Complete Purchase Flow

```gherkin
Scenario: Complete end-to-end purchase flow
  When I add "Sauce Labs Backpack" to cart
  And I add "Sauce Labs Fleece Jacket" to cart
  And the cart badge should show "2"
  And I navigate to the cart page
  And the cart should contain "2" items
  When I click checkout
  And I complete checkout with "John" "Doe" "12345"
  Then I should see order complete message
  When I click back to products
  Then I should be on the inventory page
  And the cart badge should not be visible
```

## 🎯 Test Statistics

- **Total Feature Files:** 3
- **Total Scenarios:** 35+
- **Page Objects:** 4
- **Step Definition Files:** 4
- **Test Users:** 4
- **Products Covered:** 6

## 📸 Evidence Collection

### Automatic Captures:
- **Screenshots:** Captured on test failure
- **Videos:** Optional, configurable via `.env`
- **Traces:** Playwright trace files for debugging
- **Logs:** Winston logger with detailed execution logs

### Locations:
- Screenshots: `test-results/screenshots/`
- Videos: `test-results/videos/`
- Traces: `test-results/traces/`
- Logs: `logs/combined.log` and `logs/error.log`

## 🔧 Configuration

### Environment Variables (`.env`)

```env
# Browser Configuration
BROWSER=chromium
HEADLESS=true
SLOW_MO=0
TIMEOUT=30000

# Test Environment
BASE_URL=https://www.saucedemo.com
ENV=qa

# Screenshot and Video
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure

# Report Configuration
REPORT_PATH=test-results
```

## 📊 Reporting

### Generate HTML Report
```bash
npm run report
```

The report will include:
- Test execution summary
- Pass/fail statistics
- Duration and timing
- Screenshots for failures
- Scenario details
- Tag-based filtering

**Report Location:** `test-results/html-report/index.html`

## 🧪 Example Test Execution

### Smoke Tests (Quick Validation)
```bash
npm run test:tag "@smoke"
```

**Runs:**
- Login with standard user
- Add product to cart
- View inventory
- Logout

**Duration:** ~2-3 minutes

### Full Regression Suite
```bash
npm test
```

**Runs:** All scenarios across all features

**Duration:** ~10-15 minutes (with parallel execution)

## 🐛 Debugging

### View Playwright Trace
```bash
npx playwright show-trace test-results/traces/<trace-file>.zip
```

### Run in Headed Mode with Slow Motion
Update `.env`:
```env
HEADLESS=false
SLOW_MO=1000
```

Then run:
```bash
npm test
```

## 📋 Best Practices

1. **Start with Smoke Tests** - Run `@smoke` tagged tests first
2. **Use Appropriate Tags** - Tag scenarios for easy filtering
3. **Review Logs** - Check `logs/` directory for execution details
4. **Check Screenshots** - Review failure screenshots for debugging
5. **Reset State** - Tests automatically reset between scenarios
6. **Parallel Execution** - Configured for 2 parallel workers

## 🔄 CI/CD Integration

The framework is ready for CI/CD with GitHub Actions workflow included.

**Workflow Features:**
- Multi-browser testing
- Parallel execution
- Artifact upload (reports, screenshots, traces)
- Scheduled runs
- Pull request validation

## 📦 Project Structure

```
src/
├── features/
│   ├── login.feature          # Login test scenarios
│   ├── shopping.feature       # Cart and checkout scenarios
│   └── inventory.feature      # Product inventory scenarios
├── pages/
│   ├── BasePage.js           # Base page object
│   ├── LoginPage.js          # Login page object
│   ├── InventoryPage.js      # Inventory page object
│   ├── CartPage.js           # Cart page object
│   └── CheckoutPage.js       # Checkout page object
├── steps/
│   ├── loginSteps.js         # Login step definitions
│   ├── shoppingSteps.js      # Shopping step definitions
│   ├── inventorySteps.js     # Inventory step definitions
│   └── commonSteps.js        # Common reusable steps
└── config/
    └── testData.js           # Test data configuration
```

## ✅ Quick Validation

Run this command to validate the setup:

```bash
# Run a single smoke test
npx cucumber-js src/features/login.feature --tags "@smoke" --name "Successful login"
```

Expected result: ✅ Test passes with user logged in successfully

## 🎓 Next Steps

1. **Run Tests Locally**
   ```bash
   npm install
   npx playwright install
   npm test
   ```

2. **View Results**
   ```bash
   npm run report
   ```

3. **Customize Tests**
   - Add new scenarios to feature files
   - Extend page objects with new methods
   - Add custom step definitions

4. **Integrate with CI/CD**
   - Push to GitHub
   - GitHub Actions will run automatically
   - View results in Actions tab

## 📞 Support

- **Application URL:** https://www.saucedemo.com/
- **Framework Documentation:** See README.md
- **Quick Start:** See QUICKSTART.md
- **Playwright Docs:** https://playwright.dev/
- **Cucumber Docs:** https://cucumber.io/docs/cucumber/

---

**Framework Version:** 1.0.0  
**Target Application:** SauceDemo (https://www.saucedemo.com/)  
**Last Updated:** January 5, 2026  
**Status:** ✅ Ready for Testing

**Happy Testing! 🎭**

