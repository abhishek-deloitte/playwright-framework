# Framework Structure Overview

## Complete Project Structure

```
self-healing-locator/
│
├── .github/
│   └── workflows/
│       └── playwright-tests.yml          # GitHub Actions CI/CD workflow
│
├── .vscode/
│   ├── extensions.json                   # Recommended VS Code extensions
│   └── settings.json                     # VS Code settings for the project
│
├── logs/
│   ├── .gitkeep                         # Keeps directory in git
│   ├── combined.log                     # All logs (generated)
│   └── error.log                        # Error logs only (generated)
│
├── src/
│   ├── config/
│   │   └── testData.js                  # Test data configuration
│   │
│   ├── features/                        # Cucumber feature files (Gherkin)
│   │   ├── login.feature                # Login test scenarios
│   │   └── search.feature               # Search test scenarios
│   │
│   ├── pages/                           # Page Object Models
│   │   ├── BasePage.js                  # Base page with common methods
│   │   ├── DashboardPage.js             # Dashboard page object
│   │   ├── LoginPage.js                 # Login page object
│   │   └── SearchPage.js                # Search page object
│   │
│   ├── reports/
│   │   └── generate-report.js           # HTML report generation script
│   │
│   ├── steps/                           # Cucumber step definitions
│   │   ├── commonSteps.js               # Common reusable steps
│   │   ├── loginSteps.js                # Login-specific steps
│   │   └── searchSteps.js               # Search-specific steps
│   │
│   ├── support/                         # Test support files
│   │   ├── hooks.js                     # Before/After hooks
│   │   └── world.js                     # Custom World with helper methods
│   │
│   └── utils/                           # Utility functions
│       ├── assertionHelper.js           # Custom assertion helpers
│       ├── helpers.js                   # General helper functions
│       ├── logger.js                    # Winston logger configuration
│       └── waitStrategy.js              # Wait strategy utilities
│
├── test-results/                        # Test execution results (generated)
│   ├── .gitkeep
│   ├── cucumber-report.html             # HTML report
│   ├── cucumber-report.json             # JSON report
│   ├── cucumber-report.xml              # JUnit XML report
│   ├── html-report/                     # Multi-cucumber HTML report
│   ├── screenshots/                     # Test failure screenshots
│   ├── traces/                          # Playwright trace files
│   └── videos/                          # Test execution videos
│
├── .gitignore                           # Git ignore file
├── .prettierignore                      # Prettier ignore file
├── .prettierrc                          # Prettier configuration
├── CHANGELOG.md                         # Project changelog
├── CONTRIBUTING.md                      # Contribution guidelines
├── cucumber.js                          # Cucumber configuration
├── docker-compose.yml                   # Docker Compose configuration
├── Dockerfile                           # Docker configuration
├── package.json                         # Node.js dependencies and scripts
├── QUICKSTART.md                        # Quick start guide
├── README.md                            # Main documentation
├── setup.bat                            # Windows setup script
└── setup.sh                             # Unix/Linux/Mac setup script
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies, scripts, and metadata |
| `cucumber.js` | Cucumber test runner configuration with multiple profiles |
| `.prettierrc` | Code formatting rules |
| `docker-compose.yml` | Docker container orchestration |
| `Dockerfile` | Docker image definition |

### Source Files (`src/`)

#### Features (`src/features/`)
- Gherkin syntax feature files
- Business-readable test scenarios
- Tagged for easy filtering (@smoke, @regression, etc.)

#### Steps (`src/steps/`)
- JavaScript implementations of Gherkin steps
- Reusable step definitions
- Integration with page objects

#### Pages (`src/pages/`)
- Page Object Model pattern
- Encapsulated page interactions
- Reusable locators and methods

#### Support (`src/support/`)
- Test lifecycle hooks (Before, After, BeforeAll, AfterAll)
- Custom World class for shared context
- Browser initialization and cleanup

#### Utils (`src/utils/`)
- Helper functions (random data, waits, etc.)
- Winston logger configuration
- Custom assertions
- Wait strategies

#### Config (`src/config/`)
- Test data management
- Environment-specific configurations

#### Reports (`src/reports/`)
- Report generation scripts
- Custom report formatting

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Complete framework documentation |
| `QUICKSTART.md` | Quick start guide for new users |
| `CONTRIBUTING.md` | Guidelines for contributors |
| `CHANGELOG.md` | Version history and changes |

### Setup Scripts

| File | Purpose |
|------|---------|
| `setup.sh` | Automated setup for Unix/Linux/Mac |
| `setup.bat` | Automated setup for Windows |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/playwright-tests.yml` | GitHub Actions workflow for automated testing |

## Key Features by Component

### 1. Test Execution
- **Cucumber.js**: BDD test runner with multiple profiles
- **Hooks**: Lifecycle management, browser setup/teardown
- **World**: Shared context across steps

### 2. Page Objects
- **BasePage**: Common methods inherited by all pages
- **Specific Pages**: Login, Search, Dashboard pages
- **Encapsulation**: Locators and actions in one place

### 3. Reporting
- **HTML Reports**: Multi-cucumber HTML reporter
- **JSON/XML**: For CI/CD integration
- **Screenshots**: Automatic capture on failure
- **Traces**: Playwright debugging traces
- **Videos**: Optional video recording

### 4. Utilities
- **Logger**: Winston-based logging
- **Helpers**: Random data, dates, retries
- **Assertions**: Custom assertion helpers
- **Waits**: Various wait strategies

### 5. Configuration
- **Environment Variables**: `.env` file for settings
- **Test Data**: Centralized test data management
- **Browser Config**: Multiple browser support
- **Execution Profiles**: Different run configurations

### 6. CI/CD Integration
- **GitHub Actions**: Automated testing on push/PR
- **Docker**: Containerized test execution
- **Parallel Execution**: Run tests in parallel
- **Artifact Upload**: Save test results

## Workflow

```
1. Feature Files (Gherkin)
   ↓
2. Step Definitions (JavaScript)
   ↓
3. Page Objects (Playwright Actions)
   ↓
4. Browser Automation
   ↓
5. Test Results & Reports
```

## Technology Stack

- **Test Framework**: Cucumber.js (BDD)
- **Automation Tool**: Playwright
- **Language**: JavaScript (Node.js)
- **Reporting**: Multiple-Cucumber-HTML-Reporter
- **Logging**: Winston
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Best Practices Implemented

✅ Page Object Model for maintainability
✅ BDD approach for business-readable tests
✅ Reusable step definitions
✅ Environment-based configuration
✅ Comprehensive logging
✅ Automatic screenshots on failure
✅ Parallel test execution
✅ CI/CD ready
✅ Docker support
✅ Rich reporting with traces
✅ Utility helpers for common tasks
✅ Custom assertions for clarity

## Getting Started

1. **Install**: Run `setup.bat` (Windows) or `setup.sh` (Unix/Linux/Mac)
2. **Configure**: Update `.env` with your settings
3. **Run**: Execute `npm test`
4. **Report**: Generate with `npm run report`

For detailed instructions, see `QUICKSTART.md`

