// - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
// - Войти в приложения используя учетные данные aqacourse@gmail.com / password 
// - Создать продукт (модуль Products)
// - Верифицировать текст нотификации и закрыть кликнув на крестик
// - Ввести название созданного продукта в поле search
// - Кликнуть по кнопке Search
// - Дождаться загрузки данных
// - Верифицировать, что:
//    1. Только 1 продукт в таблице
//    2. Продукт соответствует созданному вами
// - Удалить продукт в afterHook

import { NOTIFICATIONS } from "../../../../data/notifications";
import { generateProductData } from "../../../../data/products/generateProduct"
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";

//npm run test -- --spec="./src/ui/tests/products/e2e/task2.test.ts"
// setTimeout(function() {debugger;}, 0) 

describe('[UI] [AQA course] e2e test', async function () {
    const newProductData = generateProductData();

    beforeEach(async function (){
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    })

    it(`Should create && find new product with search in table`, async function () {
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED);
        await productsPageService.searchProduct(newProductData.name);
        await productsPageService.checkLengthResultOfSearch(1)
    }) 

    afterEach(async () => {
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})