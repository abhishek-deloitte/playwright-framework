const BasePage = require('./BasePage');

/**
 * Cart Page Object for SauceDemo
 * URL: https://www.saucedemo.com/cart.html
 */
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators
    this.locators = {
      // Cart header
      title: '.title',
      cartList: '.cart_list',
      cartItem: '.cart_item',
      cartQuantity: '.cart_quantity',
      
      // Cart items
      inventoryItemName: '.inventory_item_name',
      inventoryItemDesc: '.inventory_item_desc',
      inventoryItemPrice: '.inventory_item_price',
      removeButton: '[data-test^="remove"]',
      
      // Buttons
      continueShoppingButton: '#continue-shopping',
      checkoutButton: '#checkout',
      
      // Shopping cart badge
      shoppingCartBadge: '.shopping_cart_badge'
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
   * Get cart item count
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount() {
    try {
      return await this.getCount(this.locators.cartItem);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get all product names in cart
   * @returns {Promise<string[]>} Array of product names
   */
  async getCartProductNames() {
    return await this.getAllTexts(this.locators.inventoryItemName);
  }

  /**
   * Get all product prices in cart
   * @returns {Promise<string[]>} Array of product prices
   */
  async getCartProductPrices() {
    return await this.getAllTexts(this.locators.inventoryItemPrice);
  }

  /**
   * Remove product from cart by name
   * @param {string} productName - Product name
   */
  async removeProductFromCart(productName) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const removeButtonSelector = `[data-test="remove-${productId}"]`;
    await this.click(removeButtonSelector);
  }

  /**
   * Check if product is in cart
   * @param {string} productName - Product name
   * @returns {Promise<boolean>} True if product is in cart
   */
  async isProductInCart(productName) {
    const products = await this.getCartProductNames();
    return products.includes(productName);
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping() {
    await this.click(this.locators.continueShoppingButton);
  }

  /**
   * Click checkout button
   */
  async clickCheckout() {
    await this.click(this.locators.checkoutButton);
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isCartEmpty() {
    const count = await this.getCartItemCount();
    return count === 0;
  }

  /**
   * Get cart badge count
   * @returns {Promise<number>} Cart badge count
   */
  async getCartBadgeCount() {
    try {
      const badgeText = await this.getText(this.locators.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title text
   */
  async getPageTitle() {
    return await this.getText(this.locators.title);
  }

  /**
   * Remove all products from cart
   */
  async removeAllProducts() {
    const productNames = await this.getCartProductNames();
    for (const productName of productNames) {
      await this.removeProductFromCart(productName);
    }
  }
}

module.exports = CartPage;

