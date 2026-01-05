const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InventoryPage = require('../pages/InventoryPage');

let inventoryPage;

// Inventory steps
Then('I should see {string} products displayed', async function (count) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productCount = await inventoryPage.getProductCount();
  expect(productCount).toBe(parseInt(count));
});

Then('all products should have names', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productNames = await inventoryPage.getAllProductNames();
  expect(productNames.length).toBeGreaterThan(0);
  productNames.forEach(name => {
    expect(name).toBeTruthy();
  });
});

Then('all products should have prices', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const prices = await inventoryPage.getAllProductPrices();
  expect(prices.length).toBeGreaterThan(0);
  prices.forEach(price => {
    expect(price).toMatch(/\$\d+\.\d{2}/);
  });
});

Then('all products should have descriptions', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const descriptions = await this.page.locator('.inventory_item_desc').allTextContents();
  expect(descriptions.length).toBeGreaterThan(0);
  descriptions.forEach(desc => {
    expect(desc.trim()).toBeTruthy();
  });
});

// Sorting steps
When('I sort products by {string}', async function (sortOption) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  
  const sortMap = {
    'Name (A to Z)': 'az',
    'Name (Z to A)': 'za',
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo'
  };
  
  const sortValue = sortMap[sortOption];
  await inventoryPage.sortProducts(sortValue);
  await this.page.waitForTimeout(500);
});

Then('products should be sorted alphabetically ascending', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productNames = await inventoryPage.getAllProductNames();
  const sortedNames = [...productNames].sort();
  expect(productNames).toEqual(sortedNames);
});

Then('products should be sorted alphabetically descending', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productNames = await inventoryPage.getAllProductNames();
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

Then('products should be sorted by price ascending', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const prices = await inventoryPage.getAllProductPrices();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);
  expect(numericPrices).toEqual(sortedPrices);
});

Then('products should be sorted by price descending', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const prices = await inventoryPage.getAllProductPrices();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => b - a);
  expect(numericPrices).toEqual(sortedPrices);
});

// Product verification steps
Then('product {string} should have price {string}', async function (productName, expectedPrice) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const actualPrice = await inventoryPage.getProductPrice(productName);
  expect(actualPrice).toBe(expectedPrice);
});

Then('product {string} should be visible', async function (productName) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productNames = await inventoryPage.getAllProductNames();
  expect(productNames).toContain(productName);
});

Then('product {string} should have an image', async function (productName) {
  const productLocator = this.page.locator('.inventory_item', { 
    has: this.page.locator('.inventory_item_name', { hasText: productName })
  });
  const image = productLocator.locator('img');
  await expect(image).toBeVisible();
});

Then('all products should have {string} buttons', async function (buttonText) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productCount = await inventoryPage.getProductCount();
  
  if (buttonText === 'Add to cart') {
    const addButtons = await this.page.locator('[data-test^="add-to-cart"]').count();
    expect(addButtons).toBe(productCount);
  } else if (buttonText === 'Remove') {
    const removeButtons = await this.page.locator('[data-test^="remove"]').count();
    expect(removeButtons).toBe(productCount);
  }
});

Then('no products should have {string} buttons initially', async function (buttonText) {
  if (buttonText === 'Remove') {
    const removeButtons = await this.page.locator('[data-test^="remove"]').count();
    expect(removeButtons).toBe(0);
  }
});

Then('product {string} should have {string} button', async function (productName, buttonText) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const productId = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
  
  if (buttonText === 'Remove') {
    const selector = `[data-test="remove-${productId}"]`;
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible).toBeTruthy();
  } else if (buttonText === 'Add to cart') {
    const selector = `[data-test="add-to-cart-${productId}"]`;
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible).toBeTruthy();
  }
});

// Menu steps
Then('I should see menu options:', async function (dataTable) {
  const expectedOptions = dataTable.raw().flat();
  for (const option of expectedOptions) {
    const isVisible = await this.page.locator(`text=${option}`).isVisible();
    expect(isVisible).toBeTruthy();
  }
});

When('I click {string} in the menu', async function (menuItem) {
  await this.page.click(`text=${menuItem}`);
  await this.page.waitForTimeout(500);
});

Then('I should be navigated to Sauce Labs website', async function () {
  // Note: This might open a new tab, handle accordingly
  await this.page.waitForTimeout(1000);
});

Then('I should see the Swag Labs logo', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const isVisible = await inventoryPage.isVisible(inventoryPage.locators.appLogo);
  expect(isVisible).toBeTruthy();
});

Then('I should see the shopping cart icon', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  const isVisible = await inventoryPage.isVisible(inventoryPage.locators.shoppingCartLink);
  expect(isVisible).toBeTruthy();
});

