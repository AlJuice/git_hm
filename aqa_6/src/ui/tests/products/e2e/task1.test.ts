// Используя сервисную архитектуру создать е2е тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password 
//  - Создать продукт (модуль Products)
//  - Верифицировать текст нотификации и закрыть кликнув на крестик
//  - Открыть модалку Details для созданного продукта
//  - Верифицировать что все данные соответствуют продукту что вы создавали
//  - Закрыть модалку деталей
//  - Удалить продукт в afterHook

import { NOTIFICATIONS } from "../../../../data/notification"
import { generateProductData } from "../../../../data/products/generateProduct"
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";

//npm run test -- --spec="./src/ui/tests/products/task1.test.ts"
// setTimeout(function() {debugger;}, 0) 

describe('[UI] [AQA course] e2e test', async function () {
    const newProductData = generateProductData();

    beforeEach(async function (){
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it(`Should create && validate created product in module details`, async function () {
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED);
        await productsPageService.checkDetailsProductInModule(newProductData)
    }) 

    afterEach(async () => {
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})