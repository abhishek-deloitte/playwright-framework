const { setWorldConstructor, World } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.baseURL = null;
  }

  // Helper method to navigate
  async navigate(path = '') {
    const url = `${this.baseURL}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Helper method to wait for element
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  // Helper method to click element
  async clickElement(selector) {
    await this.page.click(selector);
  }

  // Helper method to fill input
  async fillInput(selector, text) {
    await this.page.fill(selector, text);
  }

  // Helper method to get text
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  // Helper method to check element visibility
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  // Helper method to take screenshot
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}_${Date.now()}.png`,
      fullPage: true 
    });
  }
}

setWorldConstructor(CustomWorld);

module.exports = CustomWorld;

