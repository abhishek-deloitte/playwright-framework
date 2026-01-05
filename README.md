# 🎭 Playwright BDD Framework for SauceDemo

A production-ready test automation framework using **Playwright** and **Cucumber BDD** for testing the [SauceDemo](https://www.saucedemo.com/) e-commerce application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Run Tests
```bash
# Run all tests
npm test

# Run smoke tests
npm run test:tag "@smoke"

# Run specific feature
npx cucumber-js src/features/login.feature
```

### 3. View Reports
```bash
npm run report
```

## 📊 Test Coverage

**Application Under Test:** [https://www.saucedemo.com/](https://www.saucedemo.com/)

- ✅ **35+ Test Scenarios**
- ✅ **3 Feature Files** (Login, Shopping, Inventory)
- ✅ **4 Page Objects** (Login, Inventory, Cart, Checkout)
- ✅ **Multiple Test Users** (standard, locked_out, problem, performance_glitch)
- ✅ **End-to-End Flows** (Browse → Add to Cart → Checkout → Purchase)

## 🎯 Key Features

- 🎭 **Playwright** - Modern browser automation
- 🥒 **Cucumber BDD** - Behavior-Driven Development with Gherkin
- 📦 **Page Object Model** - Maintainable architecture
- 🌐 **Multi-Browser** - Chromium, Firefox, WebKit
- ⚡ **Parallel Execution** - Fast test runs
- 📊 **Rich Reporting** - HTML reports with screenshots
- 📝 **Logging** - Winston logger with detailed logs
- 🐳 **Docker Ready** - Containerized execution
- 🔄 **CI/CD** - GitHub Actions workflow included

## 📁 Project Structure

```
self-healing-locator/
├── Documentation/           # 📚 All documentation files
│   ├── README.md           # Complete framework guide
│   ├── SAUCEDEMO_GUIDE.md  # SauceDemo testing guide
│   ├── QUICKSTART.md       # Quick start guide
│   ├── STRUCTURE.md        # Project structure details
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   ├── CHANGELOG.md        # Version history
│   └── SETUP_COMPLETE.md   # Setup summary
├── src/
│   ├── features/           # BDD feature files
│   ├── pages/              # Page Object Models
│   ├── steps/              # Step definitions
│   ├── support/            # Hooks and World
│   ├── utils/              # Helper utilities
│   └── config/             # Test configuration
├── test-results/           # Test reports and evidence
├── logs/                   # Test execution logs
├── .github/workflows/      # CI/CD pipeline
├── package.json            # Dependencies and scripts
└── cucumber.js             # Cucumber configuration
```

## 🧪 Running Tests

### By Scope
```bash
# All tests
npm test

# Smoke tests only (quick validation)
npm run test:tag "@smoke"

# Login tests
npm run test:tag "@login"

# Shopping cart and checkout
npm run test:tag "@cart or @checkout"

# Regression suite
npm run test:tag "@regression"
```

### By Browser
```bash
npm run test:chrome      # Chrome/Chromium
npm run test:firefox     # Firefox
npm run test:webkit      # WebKit (Safari)
```

### By Feature
```bash
npx cucumber-js src/features/login.feature
npx cucumber-js src/features/shopping.feature
npx cucumber-js src/features/inventory.feature
```

### In Headed Mode
```bash
npm run test:headed      # See browser in action
```

## 📚 Documentation

Comprehensive documentation is available in the **`Documentation/`** folder:

| Document | Description |
|----------|-------------|
| **[README.md](Documentation/README.md)** | Complete framework documentation |
| **[SAUCEDEMO_GUIDE.md](Documentation/SAUCEDEMO_GUIDE.md)** | SauceDemo-specific testing guide |
| **[QUICKSTART.md](Documentation/QUICKSTART.md)** | Get started in 5 minutes |
| **[STRUCTURE.md](Documentation/STRUCTURE.md)** | Detailed project structure |
| **[CONTRIBUTING.md](Documentation/CONTRIBUTING.md)** | How to contribute |
| **[CHANGELOG.md](Documentation/CHANGELOG.md)** | Version history |
| **[SETUP_COMPLETE.md](Documentation/SETUP_COMPLETE.md)** | Setup summary |

## 🎓 Example Test Scenario

```gherkin
Feature: Shopping Cart and Checkout for SauceDemo
  
  @smoke @cart
  Scenario: Complete end-to-end purchase flow
    Given I am logged in as "standard_user"
    When I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Fleece Jacket" to cart
    And the cart badge should show "2"
    And I navigate to the cart page
    And I click checkout
    And I complete checkout with "John" "Doe" "12345"
    Then I should see order complete message
    When I click back to products
    Then I should be on the inventory page
```

## 👥 Test Users

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard user with full access |
| `locked_out_user` | `secret_sauce` | Locked out user (for negative tests) |
| `problem_user` | `secret_sauce` | User with problematic behavior |
| `performance_glitch_user` | `secret_sauce` | User with performance issues |

## 📊 Reporting

### Generate HTML Report
```bash
npm run report
```

**Report Location:** `test-results/html-report/index.html`

**Report Features:**
- Test execution summary
- Pass/fail statistics with charts
- Duration and timing information
- Screenshots for failures
- Detailed scenario breakdowns
- Tag-based filtering

### Evidence Collection
- **Screenshots:** `test-results/screenshots/` (on failure)
- **Videos:** `test-results/videos/` (optional)
- **Traces:** `test-results/traces/` (for debugging)
- **Logs:** `logs/combined.log` and `logs/error.log`

## 🐛 Debugging

### View Playwright Trace
```bash
npx playwright show-trace test-results/traces/<trace-file>.zip
```

### Run with Slow Motion
Edit `.env`:
```env
HEADLESS=false
SLOW_MO=1000
```

Then run:
```bash
npm test
```

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:chrome` | Run in Chrome browser |
| `npm run test:firefox` | Run in Firefox browser |
| `npm run test:webkit` | Run in WebKit browser |
| `npm run test:headed` | Run with visible browser |
| `npm run test:tag "@smoke"` | Run tests by tag |
| `npm run report` | Generate HTML report |
| `npm run clean` | Clean test results |

## ⚙️ Configuration

Configuration is managed via `.env` file:

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
```

## 🐳 Docker Support

### Using Docker Compose
```bash
docker-compose up
```

### Using Dockerfile
```bash
docker build -t playwright-tests .
docker run playwright-tests
```

## 🔄 CI/CD Integration

GitHub Actions workflow is included in `.github/workflows/playwright-tests.yml`

**Features:**
- Multi-browser testing (Chromium, Firefox, WebKit)
- Parallel execution
- Artifact upload (reports, screenshots, traces)
- Scheduled runs
- Pull request validation

## 🏷️ Test Tags

Organize and filter tests using tags:

- `@smoke` - Critical smoke tests
- `@regression` - Full regression suite
- `@login` - Login functionality
- `@cart` - Shopping cart tests
- `@checkout` - Checkout process
- `@inventory` - Product inventory tests
- `@sorting` - Product sorting tests
- `@negative` - Negative test scenarios

## 📈 Test Statistics

- **Total Scenarios:** 35+
- **Feature Files:** 3
- **Page Objects:** 4
- **Step Definitions:** 3 files
- **Test Users:** 4
- **Products Tested:** 6

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](Documentation/CONTRIBUTING.md) for guidelines.

## 📄 License

ISC

## 🔗 Links

- **SauceDemo Application:** https://www.saucedemo.com/
- **Playwright Documentation:** https://playwright.dev/
- **Cucumber Documentation:** https://cucumber.io/docs/cucumber/
- **GitHub Actions:** https://docs.github.com/en/actions

## 📞 Support

For detailed guides and documentation, check the **`Documentation/`** folder:
- [Complete Framework Guide](Documentation/README.md)
- [SauceDemo Testing Guide](Documentation/SAUCEDEMO_GUIDE.md)
- [Quick Start Guide](Documentation/QUICKSTART.md)

## ✨ Quick Validation

Run this to validate your setup:

```bash
# Install dependencies
npm install
npx playwright install

# Run a smoke test
npm run test:tag "@smoke"

# Generate report
npm run report
```

Expected: ✅ Tests pass successfully with detailed HTML report

---

**Framework Version:** 1.0.0  
**Target Application:** SauceDemo (https://www.saucedemo.com/)  
**Status:** ✅ Production Ready  
**Last Updated:** January 5, 2026

**Happy Testing! 🎭**

#   p l a y w r i g h t - f r a m e w o r k  
 