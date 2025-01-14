
//npm run test -- --spec="./src/ui/tests/products/smoke/create.test.ts"
// setTimeout(function() {debugger;}, 0) 

import { generateProductData } from "../../../../data/products/generateProduct";
import { NOTIFICATIONS } from "../../../../data/notifications";
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import { SignInApiService } from "../../../../api/api/service/signInApiService.service";
import AllureReporter from "@wdio/allure-reporter";
import productApiService from "../../../../api/api/service/productApiService.service";

describe('[UI] [AQA course] e2e test', async function () {
     const signInApiService = new SignInApiService()
    
    AllureReporter.addFeature('Products - Create')
    AllureReporter.addSuite('[UI] [Products]')

    const newProductData = generateProductData();

    beforeEach(async function (){
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        const token = await loginPageService.getToken()
        signInApiService.setToken(token)

        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it(`Should create product`, async function () {
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED)
    }) 

    afterEach(async () => {
        await productApiService.deleteProduct(signInApiService.getToken())
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})