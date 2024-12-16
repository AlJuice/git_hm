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

    async checkDetailsProductInModule(product: IProduct){
        await this.openDetailsProduct(product.name)
        const actualProductData = await this.productsPage['Details Modal'].getProductFromModal()
        const expectedProductData = _.pick(product, ["name", "amount", "price", "manufacturer", "notes"])
        expect(actualProductData).toEqual(expectedProductData)
        await this.closeDetailsProduct()
    }

    async checkLengthResultOfSearch(number: number){
        const rows = await this.productsPage.findElements(this.productsPage['Table Rows']);
        const lengthOfRows = rows.length;
        expect (lengthOfRows).toBe(number);
    }

    async deleteProduct(productName: string){
        await this.productsPage.clickOnDeleteProductButton(productName)
        await this.productsPage['Delete Modal'].waitForPageOpened()
        await this.productsPage['Delete Modal'].clickOnDeleteButton()
        await this.productsPage['Delete Modal'].waitForDisappeared();
        await this.productsPage.waitForPageOpened();
    }


    async openDetailsProduct(productName: string){
        await this.productsPage.clickOnDetailsProductButton(productName)
        await this.productsPage['Details Modal'].waitForPageOpened()
    }

    async closeDetailsProduct(){
        await this.productsPage['Details Modal'].clickOnCancelButton()
        await this.productsPage['Details Modal'].waitForDisappeared()
        await this.productsPage.waitForPageOpened();
    }

    async searchProduct(productName: string){
        await this.productsPage.fillSearchWitData(productName)
        await this.productsPage.clickOnSearchButton()
        await this.productsPage.waitForPageOpened()
    }
}

export default new productPageService()