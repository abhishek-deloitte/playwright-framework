/**
 * Assertion Helper - Custom assertions for better test readability
 */

const { expect } = require('@playwright/test');

class AssertionHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Assert element is visible
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertVisible(selector, message = '') {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible, message || `Element ${selector} should be visible`).toBeTruthy();
  }

  /**
   * Assert element is not visible
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertNotVisible(selector, message = '') {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible, message || `Element ${selector} should not be visible`).toBeFalsy();
  }

  /**
   * Assert element contains text
   * @param {string} selector - Element selector
   * @param {string} expectedText - Expected text
   * @param {string} message - Custom error message
   */
  async assertTextContains(selector, expectedText, message = '') {
    const text = await this.page.textContent(selector);
    expect(text, message || `Element ${selector} should contain text "${expectedText}"`).toContain(expectedText);
  }

  /**
   * Assert element text equals
   * @param {string} selector - Element selector
   * @param {string} expectedText - Expected text
   * @param {string} message - Custom error message
   */
  async assertTextEquals(selector, expectedText, message = '') {
    const text = await this.page.textContent(selector);
    expect(text?.trim(), message || `Element ${selector} should equal text "${expectedText}"`).toBe(expectedText);
  }

  /**
   * Assert element has attribute
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @param {string} expectedValue - Expected value
   * @param {string} message - Custom error message
   */
  async assertAttribute(selector, attribute, expectedValue, message = '') {
    const value = await this.page.getAttribute(selector, attribute);
    expect(value, message || `Element ${selector} should have ${attribute}="${expectedValue}"`).toBe(expectedValue);
  }

  /**
   * Assert element is enabled
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertEnabled(selector, message = '') {
    const isEnabled = await this.page.isEnabled(selector);
    expect(isEnabled, message || `Element ${selector} should be enabled`).toBeTruthy();
  }

  /**
   * Assert element is disabled
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertDisabled(selector, message = '') {
    const isDisabled = await this.page.isDisabled(selector);
    expect(isDisabled, message || `Element ${selector} should be disabled`).toBeTruthy();
  }

  /**
   * Assert element count
   * @param {string} selector - Element selector
   * @param {number} expectedCount - Expected count
   * @param {string} message - Custom error message
   */
  async assertCount(selector, expectedCount, message = '') {
    const count = await this.page.locator(selector).count();
    expect(count, message || `Count of ${selector} should be ${expectedCount}`).toBe(expectedCount);
  }

  /**
   * Assert URL contains
   * @param {string} urlPart - Part of URL
   * @param {string} message - Custom error message
   */
  assertUrlContains(urlPart, message = '') {
    const url = this.page.url();
    expect(url, message || `URL should contain "${urlPart}"`).toContain(urlPart);
  }

  /**
   * Assert URL equals
   * @param {string} expectedUrl - Expected URL
   * @param {string} message - Custom error message
   */
  assertUrlEquals(expectedUrl, message = '') {
    const url = this.page.url();
    expect(url, message || `URL should equal "${expectedUrl}"`).toBe(expectedUrl);
  }

  /**
   * Assert page title
   * @param {string} expectedTitle - Expected title
   * @param {string} message - Custom error message
   */
  async assertTitle(expectedTitle, message = '') {
    const title = await this.page.title();
    expect(title, message || `Title should be "${expectedTitle}"`).toBe(expectedTitle);
  }

  /**
   * Assert page title contains
   * @param {string} titlePart - Part of title
   * @param {string} message - Custom error message
   */
  async assertTitleContains(titlePart, message = '') {
    const title = await this.page.title();
    expect(title, message || `Title should contain "${titlePart}"`).toContain(titlePart);
  }

  /**
   * Assert element is checked
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertChecked(selector, message = '') {
    const isChecked = await this.page.isChecked(selector);
    expect(isChecked, message || `Element ${selector} should be checked`).toBeTruthy();
  }

  /**
   * Assert element is not checked
   * @param {string} selector - Element selector
   * @param {string} message - Custom error message
   */
  async assertNotChecked(selector, message = '') {
    const isChecked = await this.page.isChecked(selector);
    expect(isChecked, message || `Element ${selector} should not be checked`).toBeFalsy();
  }

  /**
   * Assert element has class
   * @param {string} selector - Element selector
   * @param {string} className - Expected class name
   * @param {string} message - Custom error message
   */
  async assertHasClass(selector, className, message = '') {
    const classAttribute = await this.page.getAttribute(selector, 'class');
    expect(classAttribute, message || `Element ${selector} should have class "${className}"`).toContain(className);
  }

  /**
   * Assert value equals
   * @param {string} selector - Element selector
   * @param {string} expectedValue - Expected value
   * @param {string} message - Custom error message
   */
  async assertValue(selector, expectedValue, message = '') {
    const value = await this.page.inputValue(selector);
    expect(value, message || `Element ${selector} should have value "${expectedValue}"`).toBe(expectedValue);
  }
}

module.exports = AssertionHelper;

