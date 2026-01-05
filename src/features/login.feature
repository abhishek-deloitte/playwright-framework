Feature: Login Functionality for SauceDemo
  As a user of SauceDemo
  I want to log in to the application
  So that I can access the inventory and shop for products

  Background:
    Given I am on the SauceDemo login page

  @smoke @login
  Scenario: Successful login with standard user
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    And I should see the products page title

  @smoke @login @negative
  Scenario: Login attempt with locked out user
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."
    And I should remain on the login page

  @regression @login @negative
  Scenario: Login with invalid credentials
    When I enter username "invalid_user" and password "wrong_password"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @regression @login @negative
  Scenario: Login with empty username
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  @regression @login @negative
  Scenario: Login with empty password
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should see an error message "Epic sadface: Password is required"

  @regression @login
  Scenario Outline: Login with different user types
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see the login result "<result>"

    Examples:
      | username                | password     | result                    |
      | standard_user           | secret_sauce | success                   |
      | problem_user            | secret_sauce | success                   |
      | performance_glitch_user | secret_sauce | success                   |
      | locked_out_user         | secret_sauce | locked_out                |
      | invalid_user            | wrong_pass   | invalid_credentials       |

  @smoke @login
  Scenario: Successful logout
    When I login with username "standard_user" and password "secret_sauce"
    And I am on the inventory page
    And I click the menu button
    And I click the logout button
    Then I should be redirected back to the login page
    And I should see the login form

  @regression @login
  Scenario: Error message can be dismissed
    When I enter username "invalid_user" and password "wrong_password"
    And I click the login button
    Then I should see an error message
    When I click the error dismiss button
    Then the error message should disappear
