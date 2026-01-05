/**
 * Base Page class - Contains common methods that all page objects can use
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElementHidden(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Input selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.waitForElement(selector);
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    await this.waitForElement(selector);
    return await this.page.textContent(selector);
  }

  /**
   * Get all text contents of multiple elements
   * @param {string} selector - Element selector
   * @returns {Promise<string[]>} Array of text contents
   */
  async getAllTexts(selector) {
    await this.waitForElement(selector);
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if visible, false otherwise
   */
  async isVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if element is enabled
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if enabled, false otherwise
   */
  async isEnabled(selector) {
    return await this.page.isEnabled(selector);
  }

  /**
   * Get attribute value of an element
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @returns {Promise<string>} Attribute value
   */
  async getAttribute(selector, attribute) {
    await this.waitForElement(selector);
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Dropdown selector
   * @param {string} option - Option to select
   */
  async selectOption(selector, option) {
    await this.waitForElement(selector);
    await this.page.selectOption(selector, option);
  }

  /**
   * Check a checkbox
   * @param {string} selector - Checkbox selector
   */
  async check(selector) {
    await this.waitForElement(selector);
    await this.page.check(selector);
  }

  /**
   * Uncheck a checkbox
   * @param {string} selector - Checkbox selector
   */
  async uncheck(selector) {
    await this.waitForElement(selector);
    await this.page.uncheck(selector);
  }

  /**
   * Hover over an element
   * @param {string} selector - Element selector
   */
  async hover(selector) {
    await this.waitForElement(selector);
    await this.page.hover(selector);
  }

  /**
   * Press a keyboard key
   * @param {string} key - Key to press
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Type text with delay between keystrokes
   * @param {string} selector - Input selector
   * @param {string} text - Text to type
   * @param {number} delay - Delay between keystrokes in ms
   */
  async type(selector, text, delay = 100) {
    await this.waitForElement(selector);
    await this.page.type(selector, text, { delay });
  }

  /**
   * Get count of elements matching selector
   * @param {string} selector - Element selector
   * @returns {Promise<number>} Count of elements
   */
  async getCount(selector) {
    return await this.page.locator(selector).count();
  }

  /**
   * Take screenshot
   * @param {string} path - Path to save screenshot
   */
  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for network idle
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current URL
   * @returns {string} Current URL
   */
  getUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Go forward in browser history
   */
  async goForward() {
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
  }
}

module.exports = BasePage;

