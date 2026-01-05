const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const { testData } = require('../config/testData');

let loginPage;
let inventoryPage;

// Background steps
Given('I am on the SauceDemo login page', async function () {
  loginPage = new LoginPage(this.page);
  await this.page.goto('https://www.saucedemo.com');
  await loginPage.waitForPageLoad();
});

Given('I am logged in as {string}', async function (userType) {
  loginPage = new LoginPage(this.page);
  await this.page.goto('https://www.saucedemo.com');
  await loginPage.waitForPageLoad();
  
  const user = testData.users[userType] || testData.users.standardUser;
  await loginPage.login(user.username, user.password);
  
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.waitForPageLoad();
});

// When steps
When('I enter username {string} and password {string}', async function (username, password) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});

When('I login with username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

When('I click the menu button', async function () {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.openMenu();
});

When('I click the logout button', async function () {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});

When('I click the error dismiss button', async function () {
  await loginPage.closeErrorMessage();
});

// Then steps
Then('I should be redirected to the inventory page', async function () {
  await this.page.waitForTimeout(1000);
  const url = this.page.url();
  expect(url).toContain('/inventory.html');
});

Then('I should see the products page title', async function () {
  inventoryPage = new InventoryPage(this.page);
  const isVisible = await inventoryPage.isVisible(inventoryPage.locators.appLogo);
  expect(isVisible).toBeTruthy();
});

Then('I should see an error message {string}', async function (expectedMessage) {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});

Then('I should remain on the login page', async function () {
  const url = this.page.url();
  expect(url).not.toContain('/inventory.html');
  const isOnLoginPage = await loginPage.isOnLoginPage();
  expect(isOnLoginPage).toBeTruthy();
});

Then('I should see an error message', async function () {
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBeTruthy();
});

Then('the error message should disappear', async function () {
  await this.page.waitForTimeout(500);
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBeFalsy();
});

Then('I should see the login result {string}', async function (result) {
  await this.page.waitForTimeout(1000);
  const url = this.page.url();
  
  if (result === 'success') {
    expect(url).toContain('/inventory.html');
  } else if (result === 'locked_out') {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  } else if (result === 'invalid_credentials') {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('do not match');
  }
});

Then('I should be redirected back to the login page', async function () {
  await this.page.waitForTimeout(1000);
  const url = this.page.url();
  expect(url).toBe('https://www.saucedemo.com/');
});

Then('I should see the login form', async function () {
  loginPage = new LoginPage(this.page);
  const isOnLoginPage = await loginPage.isOnLoginPage();
  expect(isOnLoginPage).toBeTruthy();
});

When('I am on the inventory page', async function () {
  inventoryPage = new InventoryPage(this.page);
  await inventoryPage.waitForPageLoad();
});
