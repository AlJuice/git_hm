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
import { VALID_CREDENTIALS } from "../../../data/credentials";
import { IProduct } from "../../../data/types/products.types";
import homePage from "../../pages/home.page"
import LoginPage from "../../pages/login.page"
import addNewProductPage from "../../pages/products/addNewProduct.page"
import productPage from "../../pages/products/products.page"
import ProductTablePage from "../../pages/products/productTable.page"
import DeleteProductPage from "../../pages/products/deleteProduct.page"

describe('[UI] [AQA course] e2e test', async function () {
    beforeEach(async function (){
        await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#')
        await LoginPage.fillCredentials(VALID_CREDENTIALS.EMAIL, VALID_CREDENTIALS.PASSWORD)
        await LoginPage.clickOnLoginButton()
        await homePage.waitForPageOpened()
    })

    it(`Should create product with smoke data`, async function () {
        await homePage.clickOnMenuButton('Products')
        await productPage.waitForPageOpened()
        await productPage.clickOnAddNewProducts()
        await addNewProductPage.waitForPageOpened()

        const newProductData = generateProductData()
        await addNewProductPage.fillInputs(newProductData)
        await addNewProductPage.clickOnSaveButton()
        
        const notificationText = await productPage.getNotificationText()
        expect(notificationText).toBe(NOTIFICATIONS.PRODUCT_CREATED)

        await productPage.closeNotificationAfterAddedProducts()
        await productPage.waitForPageOpened()

        const tableData = await ProductTablePage.parsingTableData()
        tableData.forEach((expectedEl: Partial<IProduct>) => {
            expect(expectedEl.Name).toEqual(newProductData.Name)
            expect(expectedEl.Manufacturer).toEqual(newProductData.Manufacturer)
            expect(expectedEl.Price).toEqual(`$${newProductData.Price}`)
        })
        
        await DeleteProductPage.clickOnDeleteIcon()
        await DeleteProductPage.waitForPageOpened()
        await DeleteProductPage.clickOnDeleteButton()
        await ProductTablePage.waitForPageOpened()
    }) 
})