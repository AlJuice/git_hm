
//npm run test -- --spec="./src/ui/tests/products/task1.test.ts"
// setTimeout(function() {debugger;}, 0) 

import { NOTIFICATIONS } from "../../../../data/notification";
import { generateProductData } from "../../../../data/products/generateProduct";
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";

describe('[UI] [AQA course] e2e test', async function () {
    const newProductData = generateProductData();
    beforeEach(async function (){
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it(`Should create product`, async function () {
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED)
    }) 

    afterEach(async () => {
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})