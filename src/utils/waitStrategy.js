/**
 * Wait Strategy - Different wait strategies for element interactions
 */

class WaitStrategy {
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForVisible(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForHidden(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForAttached(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'attached', timeout });
  }

  /**
   * Wait for element to be detached from DOM
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForDetached(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { state: 'detached', timeout });
  }

  /**
   * Wait for URL to contain specific text
   * @param {string} urlPart - Part of URL to wait for
   * @param {number} timeout - Timeout in ms
   */
  async waitForUrl(urlPart, timeout = 30000) {
    await this.page.waitForURL(`**/${urlPart}**`, { timeout });
  }

  /**
   * Wait for navigation to complete
   * @param {Function} action - Action that triggers navigation
   */
  async waitForNavigation(action) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      action()
    ]);
  }

  /**
   * Wait for network to be idle
   * @param {number} timeout - Timeout in ms
   */
  async waitForNetworkIdle(timeout = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM to be ready
   */
  async waitForDomReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForFullLoad() {
    await this.page.waitForLoadState('load');
  }

  /**
   * Custom wait for condition
   * @param {Function} condition - Condition function that returns boolean
   * @param {number} timeout - Timeout in ms
   * @param {number} interval - Polling interval in ms
   */
  async waitForCondition(condition, timeout = 30000, interval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await this.page.waitForTimeout(interval);
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Wait for element count
   * @param {string} selector - Element selector
   * @param {number} expectedCount - Expected element count
   * @param {number} timeout - Timeout in ms
   */
  async waitForElementCount(selector, expectedCount, timeout = 30000) {
    await this.waitForCondition(
      async () => {
        const count = await this.page.locator(selector).count();
        return count === expectedCount;
      },
      timeout
    );
  }

  /**
   * Wait for text to be present
   * @param {string} selector - Element selector
   * @param {string} text - Expected text
   * @param {number} timeout - Timeout in ms
   */
  async waitForText(selector, text, timeout = 30000) {
    await this.page.waitForSelector(`${selector}:has-text("${text}")`, { timeout });
  }

  /**
   * Wait for element to be enabled
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForEnabled(selector, timeout = 30000) {
    await this.waitForCondition(
      async () => await this.page.isEnabled(selector),
      timeout
    );
  }

  /**
   * Wait for element to be disabled
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForDisabled(selector, timeout = 30000) {
    await this.waitForCondition(
      async () => await this.page.isDisabled(selector),
      timeout
    );
  }
}

module.exports = WaitStrategy;

