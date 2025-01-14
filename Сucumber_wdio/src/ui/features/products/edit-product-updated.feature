@smoke @regression @run

Feature: [UI] [Products] [Edit Updated]

  Scenario: Edit created product with valid data
    Given I create product via API
    And I open Sales Portal
    When I login as Admin
    And I open "Products" page
    And I open "Details Modal" page for created product on "Products" page
    # - Завалидировать данные в сравнении с созданными через апи данными (Используя ИМПЕРАТИВНЫЙ подход)
    Then I verify created product's value "Name" on "Details modal" page
    And I verify created product's value "Amount" on "Details modal" page
    And I verify created product's value "Price" on "Details modal" page
    And I verify created product's value "Manufacturer" on "Details modal" page
    And I verify created product's value "Notes" on "Details modal" page
    And I click on "Cancel Button" on "Details modal" page
    And I open "Edit Product" page for created product on "Products" page
    When I update product inputs on "Edit Product" page with following values:
      | manufacturer | Tesla                 |
      | price        | 150                   |
      | amount       | 500                   |
    And I click on "Save Product button" on "Edit Product" page
    Then I should see notification with text "Product was successfully updated" on "Products" page
    When I open "Details Modal" page for created product on "Products" page
    # - Завалидировать данные (Используя ДЕКЛАРАТИВНЫЙ подход)
    Then I verify all product's data on "Details modal" page
    And I click on "Cancel Button" on "Details modal" page
