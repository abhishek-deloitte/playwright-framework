# Contributing to Playwright BDD Framework

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Run tests**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots/videos if applicable

## 📝 Coding Standards

### JavaScript Style Guide

- Use ES6+ features
- Use `const` by default, `let` when needed
- Use async/await instead of promises
- Add JSDoc comments for functions
- Keep functions small and focused

### File Naming

- Use camelCase for file names: `myFile.js`
- Use PascalCase for classes: `MyClass.js`
- Use kebab-case for feature files: `my-feature.feature`

### Code Structure

```javascript
/**
 * Function description
 * @param {string} param1 - Description
 * @returns {Promise<void>}
 */
async function myFunction(param1) {
  // Implementation
}
```

### Test Guidelines

1. **Feature Files**
   - Use clear, descriptive scenario names
   - Follow Given-When-Then structure
   - Add appropriate tags (@smoke, @regression, etc.)
   - Keep scenarios focused and independent

2. **Step Definitions**
   - Reuse existing steps when possible
   - Create generic, reusable steps
   - Add clear parameter descriptions
   - Handle errors appropriately

3. **Page Objects**
   - Extend BasePage
   - Define all locators in constructor
   - Use semantic method names
   - Add JSDoc comments

## 🧪 Testing Your Changes

### Before Submitting PR

```bash
# Run all tests
npm test

# Run tests in all browsers
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Check for linting errors (if configured)
npm run lint

# Generate and review report
npm run report
```

### Writing Tests for Your Changes

- Add feature files for new functionality
- Update existing tests if behavior changes
- Ensure tests pass consistently
- Test across different browsers

## 📋 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated (README, comments, etc.)
- [ ] Commit messages are clear and descriptive
- [ ] No merge conflicts
- [ ] PR description explains the changes
- [ ] Screenshots/videos included if UI changes

## 🏷️ Commit Message Format

Use clear, descriptive commit messages:

```
Type: Brief description

Detailed description if needed

Fixes #123
```

**Types:**
- `Add:` New feature or functionality
- `Fix:` Bug fix
- `Update:` Changes to existing functionality
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Test:` Test additions or modifications
- `Chore:` Maintenance tasks

**Examples:**
```
Add: Implement API testing support

Added new feature to support API testing with Playwright's
request context. Includes examples and documentation.

Fixes #45
```

```
Fix: Screenshot capture on test failure

Fixed issue where screenshots were not being captured
correctly when tests failed in parallel execution.

Fixes #67
```

## 🌟 Areas for Contribution

We welcome contributions in these areas:

- **New Features**
  - API testing support
  - Visual regression testing
  - Mobile testing
  - Database validation
  - Performance testing

- **Improvements**
  - Better error messages
  - Enhanced reporting
  - Additional utility functions
  - More example tests

- **Documentation**
  - Tutorial videos
  - More examples
  - Translation to other languages
  - Best practices guide

- **Bug Fixes**
  - Fix reported issues
  - Improve stability
  - Cross-browser compatibility

## 📞 Getting Help

- Create an issue for questions
- Check existing documentation
- Review example tests and code

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## 🙏 Recognition

Contributors will be:
- Listed in project contributors
- Mentioned in release notes
- Acknowledged in documentation

Thank you for contributing to make this framework better! 🎉

