const BasePage = require('./BasePage');

/**
 * Login Page Object for SauceDemo
 * URL: https://www.saucedemo.com/
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators based on SauceDemo website
    this.locators = {
      usernameInput: '#user-name',
      passwordInput: '#password',
      loginButton: '#login-button',
      errorMessage: '[data-test="error"]',
      errorButton: '.error-button',
      loginLogo: '.login_logo',
      loginCredentials: '#login_credentials',
      loginPassword: '.login_password'
    };
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await super.waitForPageLoad();
    await this.waitForElement(this.locators.loginLogo);
    await this.waitForElement(this.locators.usernameInput);
  }

  /**
   * Enter username
   * @param {string} username - Username
   */
  async enterUsername(username) {
    await this.fill(this.locators.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password - Password
   */
  async enterPassword(password) {
    await this.fill(this.locators.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.click(this.locators.loginButton);
    // Wait for navigation or error message
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    try {
      return await this.getText(this.locators.errorMessage);
    } catch (error) {
      return '';
    }
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.isVisible(this.locators.errorMessage);
  }

  /**
   * Click error button to close error message
   */
  async closeErrorMessage() {
    if (await this.isVisible(this.locators.errorButton)) {
      await this.click(this.locators.errorButton);
    }
  }

  /**
   * Get available usernames from the page
   * @returns {Promise<string>} Available usernames text
   */
  async getAvailableUsernames() {
    return await this.getText(this.locators.loginCredentials);
  }

  /**
   * Get password information from the page
   * @returns {Promise<string>} Password info text
   */
  async getPasswordInfo() {
    return await this.getText(this.locators.loginPassword);
  }

  /**
   * Perform complete login action
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if login button is enabled
   * @returns {Promise<boolean>} True if button is enabled
   */
  async isLoginButtonEnabled() {
    return await this.isEnabled(this.locators.loginButton);
  }

  /**
   * Clear username input
   */
  async clearUsername() {
    await this.fill(this.locators.usernameInput, '');
  }

  /**
   * Clear password input
   */
  async clearPassword() {
    await this.fill(this.locators.passwordInput, '');
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    await this.clearUsername();
    await this.clearPassword();
  }

  /**
   * Check if on login page
   * @returns {Promise<boolean>} True if on login page
   */
  async isOnLoginPage() {
    return await this.isVisible(this.locators.loginLogo);
  }
}

module.exports = LoginPage;
