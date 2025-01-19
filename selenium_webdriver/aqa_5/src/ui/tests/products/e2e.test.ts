// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password 
//  - Создать продукт (модуль Products)
//  - Верифицировать текст нотификации и закрыть кликнув на крестик
//  - Верифицировать созданный продукт в таблице (должен быть самым верхним)
//  - Удалить продукт через ui (кликнув по икнонке урны в таблице и далее в модалке)
// setTimeout(function() {debugger;}, 0) 

import { NOTIFICATIONS } from "../../../data/notification"
import { generateProductData } from "../../../data/products/generateProduct"
import homePageService from "../../services/homePage.service";
import loginPageService from "../../services/loginPage.service";
import productsPageService from "../../services/Products/productsPage.service";
import addNewProductPageService from "../../services/Products/addNewProductPage.service";

//npm run test -- --spec="./src/ui/tests/products/e2e.test.ts"
// setTimeout(function() {debugger;}, 0) 

describe('[UI] [AQA course] e2e test', async function () {
    beforeEach(async function (){
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it(`Should create product with smoke data`, async function () {
        const newProductData = generateProductData();

        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED);
        await productsPageService.checkProductInTable(newProductData);
    }) 

    it("Should delete created product", async function () {
        const newProductData = generateProductData();

        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED);
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        // await browser.pause(5000)
    })

    afterEach(async () => {
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})