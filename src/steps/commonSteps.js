const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Common step definitions that can be reused across features

Given('I wait for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('I navigate to {string}', async function (path) {
  await this.navigate(path);
});

When('I click on element with selector {string}', async function (selector) {
  await this.page.click(selector);
});

When('I fill {string} with {string}', async function (selector, text) {
  await this.page.fill(selector, text);
});

When('I press {string} key', async function (key) {
  await this.page.keyboard.press(key);
});

When('I hover over element {string}', async function (selector) {
  await this.page.hover(selector);
});

When('I select {string} from dropdown {string}', async function (option, selector) {
  await this.page.selectOption(selector, option);
});

When('I check checkbox {string}', async function (selector) {
  await this.page.check(selector);
});

When('I uncheck checkbox {string}', async function (selector) {
  await this.page.uncheck(selector);
});

When('I upload file {string} to {string}', async function (filePath, selector) {
  await this.page.setInputFiles(selector, filePath);
});

When('I switch to frame {string}', async function (selector) {
  const frame = await this.page.frameLocator(selector);
  this.currentFrame = frame;
});

Then('I should see element {string}', async function (selector) {
  const isVisible = await this.page.isVisible(selector);
  expect(isVisible).toBeTruthy();
});

Then('I should not see element {string}', async function (selector) {
  const isVisible = await this.page.isVisible(selector);
  expect(isVisible).toBeFalsy();
});

Then('element {string} should contain text {string}', async function (selector, expectedText) {
  const text = await this.page.textContent(selector);
  expect(text).toContain(expectedText);
});

Then('element {string} should have attribute {string} with value {string}', async function (selector, attribute, value) {
  const attributeValue = await this.page.getAttribute(selector, attribute);
  expect(attributeValue).toBe(value);
});

Then('the page title should be {string}', async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toBe(expectedTitle);
});

Then('the URL should contain {string}', async function (urlPart) {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(urlPart);
});

Then('I take a screenshot with name {string}', async function (name) {
  await this.takeScreenshot(name);
});

Then('element {string} should be enabled', async function (selector) {
  const isEnabled = await this.page.isEnabled(selector);
  expect(isEnabled).toBeTruthy();
});

Then('element {string} should be disabled', async function (selector) {
  const isDisabled = await this.page.isDisabled(selector);
  expect(isDisabled).toBeTruthy();
});

Then('the count of elements {string} should be {int}', async function (selector, expectedCount) {
  const count = await this.page.locator(selector).count();
  expect(count).toBe(expectedCount);
});

