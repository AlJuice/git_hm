import { NOTIFICATIONS } from "../../../../data/notifications";
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import EditProductPage  from "../../../pages/products/editProduct.page";
import editProductPageService from "../../../services/Products/editProductPage.service";
import { SignInApiService } from "../../../../api/api/service/signInApiService.service";
import AllureReporter from "@wdio/allure-reporter";
import productApiService from "../../../../api/api/service/productApiService.service";
import _ from "lodash";

//npm run test -- --spec="./src/ui/tests/products/smoke/edit.test.ts"

describe('[UI] [AQA course] e2e test', async function () {
    const signInApiService = new SignInApiService()
    
    AllureReporter.addFeature('Products - Update')
    AllureReporter.addSuite('[UI] [Products]')

    beforeEach(async function (){
        const token = await signInApiService.signInAsAdmin();
        await productApiService.createProduct(token);
        signInApiService.setToken(token)
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
    })

    it(`Should edit product`, async function () {
        await productsPageService.openEditProduct(productApiService.getCreatedProduct().name)
        await editProductPageService.checkPageTitle(productApiService.getCreatedProduct().name)

        const actualObject = await EditProductPage.getDataProduct()
        expect(actualObject).toMatchObject({ ..._.omit(productApiService.getCreatedProduct(), ["_id", "createdOn"]) })

        await editProductPageService.editProduct()
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_EDITED);
    }) 

    afterEach(async () => {
        await productApiService.deleteProduct(signInApiService.getToken())
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})