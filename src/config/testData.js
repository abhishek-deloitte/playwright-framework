/**
 * Test Data Configuration
 * Contains test data for different environments and test scenarios
 */

const testData = {
  // User credentials for SauceDemo
  users: {
    standardUser: {
      username: 'standard_user',
      password: 'secret_sauce',
      description: 'Standard user with full access'
    },
    lockedOutUser: {
      username: 'locked_out_user',
      password: 'secret_sauce',
      description: 'User that has been locked out'
    },
    problemUser: {
      username: 'problem_user',
      password: 'secret_sauce',
      description: 'User with issues'
    },
    performanceGlitchUser: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
      description: 'User with performance issues'
    },
    invalidUser: {
      username: 'invalid_user',
      password: 'wrong_password',
      description: 'Invalid credentials'
    }
  },

  // Product data for SauceDemo
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      price: '$29.99',
      id: 'sauce-labs-backpack'
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      price: '$9.99',
      id: 'sauce-labs-bike-light'
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
      id: 'sauce-labs-bolt-t-shirt'
    },
    fleeceJacket: {
      name: 'Sauce Labs Fleece Jacket',
      price: '$49.99',
      id: 'sauce-labs-fleece-jacket'
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      price: '$7.99',
      id: 'sauce-labs-onesie'
    },
    tShirtRed: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: '$15.99',
      id: 'test.allthethings()-t-shirt-(red)'
    }
  },

  // URLs for SauceDemo
  urls: {
    base: 'https://www.saucedemo.com',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkout: 'https://www.saucedemo.com/checkout-step-one.html'
  },

  // Checkout data
  checkout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },

  // Sort options
  sortOptions: {
    nameAZ: 'az',
    nameZA: 'za',
    priceLowHigh: 'lohi',
    priceHighLow: 'hilo'
  },

  // Test timeouts
  timeouts: {
    short: 5000,
    medium: 15000,
    long: 30000,
    extraLong: 60000
  },

  // Error messages
  errorMessages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required'
  }
};

/**
 * Get test data by key path
 * @param {string} path - Dot notation path to data (e.g., 'users.validUser.username')
 * @returns {*} Test data value
 */
function getTestData(path) {
  return path.split('.').reduce((obj, key) => obj[key], testData);
}

/**
 * Get user by type
 * @param {string} userType - Type of user (standardUser, lockedOutUser, etc.)
 * @returns {Object} User object
 */
function getUser(userType) {
  return testData.users[userType] || testData.users.standardUser;
}

/**
 * Get product by name
 * @param {string} productKey - Product key
 * @returns {Object} Product object
 */
function getProduct(productKey) {
  return testData.products[productKey];
}

/**
 * Get URL by page
 * @param {string} page - Page name (base, inventory, cart, checkout)
 * @returns {string} URL
 */
function getUrl(page = 'base') {
  return testData.urls[page] || testData.urls.base;
}

module.exports = {
  testData,
  getTestData,
  getUser,
  getProduct,
  getUrl
};

