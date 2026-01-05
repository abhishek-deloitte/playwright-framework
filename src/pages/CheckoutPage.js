const BasePage = require('./BasePage');

/**
 * Checkout Page Object for SauceDemo
 * Handles checkout steps 1, 2, and complete
 */
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators
    this.locators = {
      // Step 1 - Your Information
      title: '.title',
      firstNameInput: '#first-name',
      lastNameInput: '#last-name',
      postalCodeInput: '#postal-code',
      continueButton: '#continue',
      cancelButton: '#cancel',
      errorMessage: '[data-test="error"]',
      errorButton: '.error-button',
      
      // Step 2 - Overview
      summarySubtotal: '.summary_subtotal_label',
      summaryTax: '.summary_tax_label',
      summaryTotal: '.summary_total_label',
      finishButton: '#finish',
      
      // Cart items in overview
      cartItem: '.cart_item',
      inventoryItemName: '.inventory_item_name',
      inventoryItemPrice: '.inventory_item_price',
      cartQuantity: '.cart_quantity',
      
      // Payment and shipping info
      paymentInfo: '.summary_value_label',
      
      // Complete
      completeHeader: '.complete-header',
      completeText: '.complete-text',
      backHomeButton: '#back-to-products'
    };
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await super.waitForPageLoad();
    await this.waitForElement(this.locators.title);
  }

  /**
   * Fill checkout information (Step 1)
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.locators.firstNameInput, firstName);
    await this.fill(this.locators.lastNameInput, lastName);
    await this.fill(this.locators.postalCodeInput, postalCode);
  }

  /**
   * Enter first name
   * @param {string} firstName - First name
   */
  async enterFirstName(firstName) {
    await this.fill(this.locators.firstNameInput, firstName);
  }

  /**
   * Enter last name
   * @param {string} lastName - Last name
   */
  async enterLastName(lastName) {
    await this.fill(this.locators.lastNameInput, lastName);
  }

  /**
   * Enter postal code
   * @param {string} postalCode - Postal code
   */
  async enterPostalCode(postalCode) {
    await this.fill(this.locators.postalCodeInput, postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.click(this.locators.continueButton);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.click(this.locators.cancelButton);
  }

  /**
   * Get error message
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
   * @returns {Promise<boolean>} True if error is visible
   */
  async isErrorMessageVisible() {
    return await this.isVisible(this.locators.errorMessage);
  }

  /**
   * Get subtotal amount
   * @returns {Promise<string>} Subtotal text
   */
  async getSubtotal() {
    return await this.getText(this.locators.summarySubtotal);
  }

  /**
   * Get tax amount
   * @returns {Promise<string>} Tax text
   */
  async getTax() {
    return await this.getText(this.locators.summaryTax);
  }

  /**
   * Get total amount
   * @returns {Promise<string>} Total text
   */
  async getTotal() {
    return await this.getText(this.locators.summaryTotal);
  }

  /**
   * Get all product names in overview
   * @returns {Promise<string[]>} Array of product names
   */
  async getOverviewProductNames() {
    return await this.getAllTexts(this.locators.inventoryItemName);
  }

  /**
   * Get product count in overview
   * @returns {Promise<number>} Number of products
   */
  async getOverviewProductCount() {
    return await this.getCount(this.locators.cartItem);
  }

  /**
   * Click finish button
   */
  async clickFinish() {
    await this.click(this.locators.finishButton);
    await this.page.waitForTimeout(500);
  }

  /**
   * Get complete header text
   * @returns {Promise<string>} Complete header text
   */
  async getCompleteHeader() {
    return await this.getText(this.locators.completeHeader);
  }

  /**
   * Get complete message text
   * @returns {Promise<string>} Complete message text
   */
  async getCompleteText() {
    return await this.getText(this.locators.completeText);
  }

  /**
   * Check if order is complete
   * @returns {Promise<boolean>} True if on complete page
   */
  async isOrderComplete() {
    return await this.isVisible(this.locators.completeHeader);
  }

  /**
   * Click back home button
   */
  async clickBackHome() {
    await this.click(this.locators.backHomeButton);
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    return await this.getText(this.locators.title);
  }

  /**
   * Complete checkout process
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinue();
    await this.page.waitForTimeout(500);
    await this.clickFinish();
  }
}

module.exports = CheckoutPage;

