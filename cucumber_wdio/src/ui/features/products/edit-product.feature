# @smoke @regression @run

Feature: [UI] [Products] [Edit]

  Scenario: Edit created product with valid data
    Given I create product via API
    And I open Sales Portal
    And I login as Admin
    And I open "Products" page
    And I open "Edit Product" page for created product on "Products" page
    When I fill product inputs on "Edit Product" page with following values:
      | name         | a1b2c34                |
      | manufacturer | Tesla                 |
      | price        | 150                   |
      | amount       | 500                   |
      | Notes        | Test Notes from Table |

    # When Test cucumber table with values:
    # | name         | a1b2c3                |
    # | manufacturer | Tesla                 |
    # | price        | 150                   |
    # | amount       | 500                   |
    # | Notes        | Test Notes from Table |
    # Then I wait for "5" seconds
    And I click on "Save Product button" on "Edit Product" page
    Then I should see notification with text "Product was successfully updated" on "Products" page
    And I should see created product in table on "Products" page