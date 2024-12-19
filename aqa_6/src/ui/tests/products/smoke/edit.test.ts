import { NOTIFICATIONS } from "../../../../data/notification";
import { generateProductData } from "../../../../data/products/generateProduct";
import { IProduct,  } from "../../../../data/types/products.types";
import homePageService from "../../../services/homePage.service";
import loginPageService from "../../../services/loginPage.service";
import addNewProductPageService from "../../../services/Products/addNewProductPage.service";
import productsPageService from "../../../services/Products/productsPage.service";
import EditProductPage  from "../../../pages/products/editProduct.page";
import editProductPageService from "../../../services/Products/editProductPage.service";

//npm run test -- --spec="./src/ui/tests/products/smoke/edit.test.ts"

describe('[UI] [AQA course] e2e test', async function () {
    let newProductData: IProduct 

    beforeEach(async function (){
        newProductData = generateProductData();
        await loginPageService.openSalesPortal();
        await loginPageService.loginAsAdmin();
        await homePageService.openProductsPage();
        await productsPageService.openAddNewProductPage();
        await addNewProductPageService.populate(newProductData);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_CREATED)
    })

    it(`Should edit product`, async function () {
        await productsPageService.openEditProduct(newProductData.name)
        await editProductPageService.checkPageTitle(newProductData.name)

        const actualObject = await EditProductPage.getDataProduct()
        expect(actualObject).toMatchObject({ ...newProductData })

        await editProductPageService.editProduct()
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_EDITED);
    }) 

    afterEach(async () => {
        await productsPageService.deleteProduct(newProductData.name);
        await productsPageService.validateNotification(NOTIFICATIONS.PRODUCT_DELETED);
        await homePageService.validateUserName()
        await loginPageService.signOut();
    });
})