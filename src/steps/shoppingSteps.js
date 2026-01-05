const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { testData } = require('../config/testData');

let inventoryPage;
let cartPage;
let checkoutPage;

// Inventory steps
When('I am on the inventory page', async function () {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.waitForPageLoad();
});

When('I add {string} to cart', async function (productName) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await inventoryPage.addProductToCart(productName);
  await this.page.waitForTimeout(300);
});

When('I remove {string} from cart', async function (productName) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await inventoryPage.removeProductFromCart(productName);
  await this.page.waitForTimeout(300);
});

When('I navigate to the cart page', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await inventoryPage.clickShoppingCart();
  cartPage = new CartPage(this.page);
  await cartPage.waitForPageLoad();
});

When('I remove {string} from the cart page', async function (productName) {
  cartPage = cartPage || new CartPage(this.page);
  await cartPage.removeProductFromCart(productName);
});

When('I click checkout', async function () {
  cartPage = cartPage || new CartPage(this.page);
  await cartPage.clickCheckout();
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.waitForPageLoad();
});

When('I enter checkout information:', async function (dataTable) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  const data = dataTable.hashes()[0];
  await checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
});

When('I complete checkout with {string} {string} {string}', async function (firstName, lastName, postalCode) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.completeCheckout(firstName, lastName, postalCode);
});

When('I enter first name {string} and postal code {string}', async function (firstName, postalCode) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.enterFirstName(firstName);
  await checkoutPage.enterPostalCode(postalCode);
});

When('I enter last name {string} and postal code {string}', async function (lastName, postalCode) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.enterLastName(lastName);
  await checkoutPage.enterPostalCode(postalCode);
});

When('I enter first name {string} and last name {string}', async function (firstName, lastName) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.enterFirstName(firstName);
  await checkoutPage.enterLastName(lastName);
});

When('I click continue on checkout', async function () {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.clickContinue();
});

When('I click finish on checkout', async function () {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.clickFinish();
});

When('I click cancel on checkout', async function () {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.clickCancel();
  await this.page.waitForTimeout(500);
});

When('I click continue shopping', async function () {
  cartPage = cartPage || new CartPage(this.page);
  await cartPage.clickContinueShopping();
});

When('I click back to products', async function () {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await checkoutPage.clickBackHome();
});

When('I reset the app state', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await inventoryPage.resetAppState();
});

// Then steps
Then('the cart badge should show {string}', async function (count) {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await this.page.waitForTimeout(500);
  const cartCount = await inventoryPage.getCartItemCount();
  expect(cartCount).toBe(parseInt(count));
});

Then('the cart badge should not be visible', async function () {
  inventoryPage = inventoryPage || new InventoryPage(this.page);
  await this.page.waitForTimeout(500);
  const isVisible = await inventoryPage.isCartBadgeVisible();
  expect(isVisible).toBeFalsy();
});

Then('the cart should contain {string}', async function (productNameOrCount) {
  cartPage = cartPage || new CartPage(this.page);
  
  if (!isNaN(productNameOrCount)) {
    // It's a count
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(parseInt(productNameOrCount));
  } else {
    // It's a product name
    const isInCart = await cartPage.isProductInCart(productNameOrCount);
    expect(isInCart).toBeTruthy();
  }
});

Then('the cart should contain {string} items', async function (count) {
  cartPage = cartPage || new CartPage(this.page);
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(parseInt(count));
});

Then('the cart should be empty', async function () {
  cartPage = cartPage || new CartPage(this.page);
  const isEmpty = await cartPage.isCartEmpty();
  expect(isEmpty).toBeTruthy();
});

Then('I should see order complete message', async function () {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  await this.page.waitForTimeout(500);
  const isComplete = await checkoutPage.isOrderComplete();
  expect(isComplete).toBeTruthy();
});

Then('I should see {string} header', async function (headerText) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  const header = await checkoutPage.getCompleteHeader();
  expect(header).toContain(headerText);
});

Then('I should see checkout error {string}', async function (errorMessage) {
  checkoutPage = checkoutPage || new CheckoutPage(this.page);
  const error = await checkoutPage.getErrorMessage();
  expect(error).toContain(errorMessage);
});

Then('I should be on the inventory page', async function () {
  await this.page.waitForTimeout(500);
  const url = this.page.url();
  expect(url).toContain('/inventory.html');
});

Then('I should be on the cart page', async function () {
  await this.page.waitForTimeout(500);
  const url = this.page.url();
  expect(url).toContain('/cart.html');
});

