import _ from "lodash";
import { IProduct } from "../../../data/types/products.types"
import addNewProductPage from "../../pages/products/addNewProduct.page"
import productsPage from "../../pages/products/products.page"
import { SalesPortalPageService } from "../salesPortalPage.service";

class productPageService extends SalesPortalPageService {
    private productsPage = productsPage
    private addNewProductPage = addNewProductPage

    async openAddNewProductPage(){
        await this.productsPage.clickOnAddNewProducts()
        await this.addNewProductPage.waitForPageOpened()
    }

    async checkProductInTable(product: IProduct){
        const actualProductData = await this.productsPage.getProductFromTable(product.name)
        const expectedProductData = _.pick(product, ["name", "price", "manufacturer"])
        expect(actualProductData).toEqual(expectedProductData)
    }

    async deleteProduct(productName: string){
        await this.productsPage.clickOnDeleteProductButton(productName)
        await this.productsPage['Delete Modal'].waitForPageOpened()
        await this.productsPage['Delete Modal'].clickOnDeleteButton()
        await this.productsPage["Delete Modal"].waitForDisappeared();
        await this.productsPage.waitForPageOpened();
    }
}

export default new productPageService()