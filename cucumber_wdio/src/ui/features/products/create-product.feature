# Создайте 2 продукта (шаги как в Task 1) с граничными значениями для полей используя Scenario Outline
@run

Feature: [UI] [Products] [Create]

  Background:
    Given I open Sales Portal
    And I login as Admin
    And I should see "Logged User label" contains text "AQA " on "Home" page
    When I open "Products" page
    And I open "Add New Product" page

  Scenario Outline: Create two products with valid data
    When I enter "<Name>" to "Name input" on "Add New Product" page
    And I select "<Manufacturer>" from "Manufacturer dropdown" on "Add New Product" page
    And I enter "<Price>" to "Price input" on "Add New Product" page
    And I enter "<Amount>" to "Amount input" on "Add New Product" page
    And I enter "<Notes>" to "Notes textarea" on "Add New Product" page
    And I click on "Save Product Button" on "Add New Product" page
    Then I should see notification with text "Product was successfully created" on "Products" page
    And I should see product with name "<Name>" in table on "Products" page

    Then I delete created product with name "<Name>" via UI

    Examples:
      | Name               | Manufacturer | Price | Amount | Notes |   
      | IPhone Pro Max 100 | Apple        | 10000 | 1      |       |
      | Pixel Google 1000  | Google       | 9999  | 2      | Latest model with advanced features |

