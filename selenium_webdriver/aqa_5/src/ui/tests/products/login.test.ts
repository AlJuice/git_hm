// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import loginPageService from "../../services/loginPage.service";
import homePageService from "../../services/homePage.service";
import productsPageService from "../../services/Products/productsPage.service";

describe('[UI] [AQA course] Sign in', async function () {
    it(`Should sign in with valid credentials`, async function () {
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
    }) 
})

