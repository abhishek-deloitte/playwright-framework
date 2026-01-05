const BasePage = require('./BasePage');

/**
 * Inventory/Products Page Object for SauceDemo
 * URL: https://www.saucedemo.com/inventory.html
 */
class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators
    this.locators = {
      // Header
      appLogo: '.app_logo',
      shoppingCartBadge: '.shopping_cart_badge',
      shoppingCartLink: '.shopping_cart_link',
      burgerMenuButton: '#react-burger-menu-btn',
      
      // Products
      inventoryContainer: '.inventory_container',
      inventoryList: '.inventory_list',
      inventoryItem: '.inventory_item',
      inventoryItemName: '.inventory_item_name',
      inventoryItemDesc: '.inventory_item_desc',
      inventoryItemPrice: '.inventory_item_price',
      addToCartButton: '[data-test^="add-to-cart"]',
      removeButton: '[data-test^="remove"]',
      
      // Sorting
      productSortContainer: '.product_sort_container',
      
      // Menu
      logoutLink: '#logout_sidebar_link',
      allItemsLink: '#inventory_sidebar_link',
      aboutLink: '#about_sidebar_link',
      resetLink: '#reset_sidebar_link',
      closeMenuButton: '#react-burger-cross-btn'
    };
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await super.waitForPageLoad();
    await this.waitForElement(this.locators.inventoryContainer);
  }

  /**
   * Get all product names
   * @returns {Promise<string[]>} Array of product names
   */
  async getAllProductNames() {
    return await this.getAllTexts(this.locators.inventoryItemName);
  }

  /**
   * Get product count
   * @returns {Promise<number>} Number of products
   */
  async getProductCount() {
    return await this.getCount(this.locators.inventoryItem);
  }

  /**
   * Add product to cart by name
   * @param {string} productName - Product name
   */
  async addProductToCart(productName) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const addButtonSelector = `[data-test="add-to-cart-${productId}"]`;
    await this.click(addButtonSelector);
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
   * Get cart item count
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount() {
    try {
      const badgeText = await this.getText(this.locators.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Check if cart badge is visible
   * @returns {Promise<boolean>} True if cart badge is visible
   */
  async isCartBadgeVisible() {
    return await this.isVisible(this.locators.shoppingCartBadge);
  }

  /**
   * Click on shopping cart
   */
  async clickShoppingCart() {
    await this.click(this.locators.shoppingCartLink);
  }

  /**
   * Sort products
   * @param {string} sortOption - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(sortOption) {
    await this.selectOption(this.locators.productSortContainer, sortOption);
  }

  /**
   * Open burger menu
   */
  async openMenu() {
    await this.click(this.locators.burgerMenuButton);
    await this.waitForElement(this.locators.logoutLink);
  }

  /**
   * Close burger menu
   */
  async closeMenu() {
    await this.click(this.locators.closeMenuButton);
  }

  /**
   * Logout
   */
  async logout() {
    await this.openMenu();
    await this.click(this.locators.logoutLink);
  }

  /**
   * Reset app state
   */
  async resetAppState() {
    await this.openMenu();
    await this.click(this.locators.resetLink);
    await this.closeMenu();
  }

  /**
   * Get product price by name
   * @param {string} productName - Product name
   * @returns {Promise<string>} Product price
   */
  async getProductPrice(productName) {
    const products = await this.page.locator(this.locators.inventoryItem).all();
    for (const product of products) {
      const name = await product.locator(this.locators.inventoryItemName).textContent();
      if (name === productName) {
        return await product.locator(this.locators.inventoryItemPrice).textContent();
      }
    }
    return '';
  }

  /**
   * Check if product is in cart
   * @param {string} productName - Product name
   * @returns {Promise<boolean>} True if product has remove button
   */
  async isProductInCart(productName) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const removeButtonSelector = `[data-test="remove-${productId}"]`;
    return await this.isVisible(removeButtonSelector);
  }

  /**
   * Click on product name to view details
   * @param {string} productName - Product name
   */
  async clickProductName(productName) {
    const products = await this.page.locator(this.locators.inventoryItem).all();
    for (const product of products) {
      const name = await product.locator(this.locators.inventoryItemName).textContent();
      if (name === productName) {
        await product.locator(this.locators.inventoryItemName).click();
        break;
      }
    }
  }

  /**
   * Get all product prices
   * @returns {Promise<string[]>} Array of product prices
   */
  async getAllProductPrices() {
    return await this.getAllTexts(this.locators.inventoryItemPrice);
  }
}

module.exports = InventoryPage;

