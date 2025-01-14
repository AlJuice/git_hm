import { Then } from "@wdio/cucumber-framework";
import productsPageService from "../../services/Products/productsPage.service";

Then(/^I delete created product with name "([^"]*)" via UI$/, async function (productName: string) {
  await productsPageService.deleteProduct(productName)
});
