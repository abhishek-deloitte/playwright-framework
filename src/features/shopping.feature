Feature: Shopping Cart and Checkout for SauceDemo
  As a SauceDemo user
  I want to add products to my cart and complete checkout
  So that I can purchase items

  Background:
    Given I am logged in as "standard_user"

  @smoke @cart
  Scenario: Add single product to cart
    When I am on the inventory page
    And I add "Sauce Labs Backpack" to cart
    Then the cart badge should show "1"
    And the cart should contain "Sauce Labs Backpack"

  @smoke @cart
  Scenario: Add multiple products to cart
    When I am on the inventory page
    And I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    And I add "Sauce Labs Bolt T-Shirt" to cart
    Then the cart badge should show "3"
    And the cart should contain "3" items

  @regression @cart
  Scenario: Remove product from cart on inventory page
    When I am on the inventory page
    And I add "Sauce Labs Backpack" to cart
    And the cart badge should show "1"
    When I remove "Sauce Labs Backpack" from cart
    Then the cart badge should not be visible

  @regression @cart
  Scenario: Remove product from cart page
    When I am on the inventory page
    And I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    And I navigate to the cart page
    When I remove "Sauce Labs Backpack" from the cart page
    Then the cart should contain "1" items
    And the cart should contain "Sauce Labs Bike Light"

  @smoke @checkout
  Scenario: Complete checkout with valid information
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click checkout
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click continue on checkout
    And I click finish on checkout
    Then I should see order complete message
    And I should see "Thank you for your order!" header

  @regression @checkout @negative
  Scenario: Checkout with missing first name
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click checkout
    And I enter last name "Doe" and postal code "12345"
    And I click continue on checkout
    Then I should see checkout error "Error: First Name is required"

  @regression @checkout @negative
  Scenario: Checkout with missing last name
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click checkout
    And I enter first name "John" and postal code "12345"
    And I click continue on checkout
    Then I should see checkout error "Error: Last Name is required"

  @regression @checkout @negative
  Scenario: Checkout with missing postal code
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click checkout
    And I enter first name "John" and last name "Doe"
    And I click continue on checkout
    Then I should see checkout error "Error: Postal Code is required"

  @regression @cart
  Scenario: Cart persists across pages
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click continue shopping
    Then the cart badge should show "1"
    When I navigate to the cart page
    Then the cart should contain "Sauce Labs Backpack"

  @regression @checkout
  Scenario: Complete end-to-end purchase flow
    When I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Fleece Jacket" to cart
    And the cart badge should show "2"
    And I navigate to the cart page
    And the cart should contain "2" items
    When I click checkout
    And I complete checkout with "John" "Doe" "12345"
    Then I should see order complete message
    When I click back to products
    Then I should be on the inventory page
    And the cart badge should not be visible

  @regression @cart
  Scenario: Continue shopping from cart
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click continue shopping
    Then I should be on the inventory page

  @smoke @cart
  Scenario: Empty cart shows no badge
    When I am on the inventory page
    Then the cart badge should not be visible
    When I navigate to the cart page
    Then the cart should be empty

  @regression @checkout
  Scenario: Cancel checkout returns to cart
    When I add "Sauce Labs Backpack" to cart
    And I navigate to the cart page
    And I click checkout
    And I click cancel on checkout
    Then I should be on the cart page
    And the cart should contain "Sauce Labs Backpack"

