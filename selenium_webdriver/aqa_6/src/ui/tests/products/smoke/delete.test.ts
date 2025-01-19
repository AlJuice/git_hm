import { NOTIFICATIONS } from "../../../../data/notification"
import { generateProductData } from "../../../../data/products/generateProduct"
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";

//npm run test -- --spec="./src/ui/tests/products/smoke/delete.test.ts"
// setTimeout(function() {debugger;}, 0) 

describe('[UI] [AQA course] e2e test', async function () {
    beforeEach(async function (){
        // console.log(process) // обращаемся к node.js 
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it("Should delete created product", async function () {
        const newProductData = generateProductData();
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED);
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
    })

    afterEach(async () => {
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})