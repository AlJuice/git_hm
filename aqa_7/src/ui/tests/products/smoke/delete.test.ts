import { NOTIFICATIONS } from "../../../../data/notifications";
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import { SignInApiService } from "../../../../api/api/service/signInApiService.service";
import AllureReporter from "@wdio/allure-reporter";
import productApiService from "../../../../api/api/service/productApiService.service";

//npm run test -- --spec="./src/ui/tests/products/smoke/delete.test.ts"
// setTimeout(function() {debugger;}, 0) 

describe('[UI] [AQA course] e2e test', async function () {
    const signInApiService = new SignInApiService()

    AllureReporter.addFeature('Products - Delete')
    AllureReporter.addSuite('[UI] [Products]')

    beforeEach(async function (){
        // console.log(process) // обращаемся к node.js 
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        const token = await loginPageService.getToken()
        signInApiService.setToken(token)
        await productApiService.createProduct(signInApiService.getToken());
        await homePageService.openProductsPage();
    })

    it("Should delete created product", async function () {
        await productsPageService.deleteProduct(productApiService.getCreatedProduct().name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        productApiService.removeStoredProduct()
    })

    afterEach(async () => {
        await productApiService.deleteProduct(signInApiService.getToken())
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})