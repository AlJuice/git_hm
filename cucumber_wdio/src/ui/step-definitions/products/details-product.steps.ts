import { Then } from "@wdio/cucumber-framework";
import detailsProductModal from "../../pages/Products/detailsProduct.modal";
import productsPageService from "../../services/Products/productsPage.service";


Then(/^I verify created product's value "([^"]*)" on "Details modal" page$/, async function (value: string) {
  const createdProduct = this.createdProduct
  const actualData = await detailsProductModal.getDetailsData()
  expect(actualData[value]).toEqual(createdProduct[value])
});

Then(/^I verify all product's data on "Details modal" page$/, async function () {
  const createdProduct = this.createdProduct
  await productsPageService.checkProductInTable(createdProduct)
});



