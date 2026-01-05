Feature: Product Inventory and Sorting for SauceDemo
  As a SauceDemo user
  I want to view and sort products
  So that I can find items I want to purchase

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  @smoke @inventory
  Scenario: View all products on inventory page
    Then I should see "6" products displayed
    And all products should have names
    And all products should have prices
    And all products should have descriptions

  @regression @sorting
  Scenario: Sort products by name A to Z
    When I sort products by "Name (A to Z)"
    Then products should be sorted alphabetically ascending

  @regression @sorting
  Scenario: Sort products by name Z to A
    When I sort products by "Name (Z to A)"
    Then products should be sorted alphabetically descending

  @regression @sorting
  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then products should be sorted by price ascending

  @regression @sorting
  Scenario: Sort products by price high to low
    When I sort products by "Price (high to low)"
    Then products should be sorted by price descending

  @smoke @inventory
  Scenario: Product details are displayed correctly
    Then product "Sauce Labs Backpack" should have price "$29.99"
    And product "Sauce Labs Bike Light" should have price "$9.99"
    And product "Sauce Labs Bolt T-Shirt" should have price "$15.99"
    And product "Sauce Labs Fleece Jacket" should have price "$49.99"

  @regression @inventory
  Scenario: All products have add to cart buttons
    Then all products should have "Add to cart" buttons
    And no products should have "Remove" buttons initially

  @regression @inventory
  Scenario: Add to cart button changes to remove button
    When I add "Sauce Labs Backpack" to cart
    Then product "Sauce Labs Backpack" should have "Remove" button
    And product "Sauce Labs Bike Light" should have "Add to cart" button

  @smoke @inventory
  Scenario: Reset app state clears cart
    When I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    And the cart badge should show "2"
    When I reset the app state
    Then the cart badge should not be visible
    And all products should have "Add to cart" buttons

  @regression @inventory
  Scenario: Menu navigation works correctly
    When I click the menu button
    Then I should see menu options:
      | All Items |
      | About     |
      | Logout    |
      | Reset App State |

  @regression @inventory
  Scenario: About link opens new page
    When I click the menu button
    And I click "About" in the menu
    Then I should be navigated to Sauce Labs website

  @smoke @inventory
  Scenario: Inventory page header shows app logo
    Then I should see the Swag Labs logo
    And I should see the shopping cart icon

  @regression @inventory
  Scenario Outline: Verify all product information
    Then product "<product>" should be visible
    And product "<product>" should have price "<price>"
    And product "<product>" should have an image

    Examples:
      | product                             | price   |
      | Sauce Labs Backpack                 | $29.99  |
      | Sauce Labs Bike Light               | $9.99   |
      | Sauce Labs Bolt T-Shirt             | $15.99  |
      | Sauce Labs Fleece Jacket            | $49.99  |
      | Sauce Labs Onesie                   | $7.99   |
      | Test.allTheThings() T-Shirt (Red)   | $15.99  |

