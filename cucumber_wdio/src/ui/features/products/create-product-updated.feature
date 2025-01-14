# @run

Feature: [UI] [Products] [Create Updated]
  Background:
   Given I open Sales Portal
   And I login as Admin

  Scenario: Create products with valid data
    And I open "Products" page
    And I open "Add New Product" page
    When I create new product on "Add New Product" page
    Then I should see notification with text "Product was successfully created" on "Sign In" page
    And I should see created product in table on "Products" page
    When I open "Edit Product" page for created product on "Products" page
    # Then I wait for "5" seconds