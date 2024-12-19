import _ from "lodash";
import { IProduct } from "../../../data/types/products.types"
import addNewProductPage from "../../pages/products/addNewProduct.page"
import productsPage from "../../pages/products/products.page"
import EditProductPage from "../../pages/products/editProduct.page"
import { SalesPortalPageService } from "../salesPortalPage.service";
import { logStep } from "../../../utils/reporter/decorator";

class productPageService extends SalesPortalPageService {
    private productsPage = productsPage
    private addNewProductPage = addNewProductPage
    private EditProductPage = EditProductPage

    @logStep("Open Add New Product Page")
    async openAddNewProductPage(){
        await this.productsPage.clickOnAddNewProducts()
        await this.addNewProductPage.waitForPageOpened()
    }

    @logStep("Open Edit Product Page")
    async openEditProduct(productName: string){
        await this.productsPage.clickOnEditProductButton(productName)
        await this.EditProductPage.waitForPageOpened()
    }

    @logStep("Check Product In Table")
    async checkProductInTable(product: IProduct){
        const actualProductData = await this.productsPage.getProductFromTable(product.name)
        const expectedProductData = _.pick(product, ["name", "price", "manufacturer"])
        expect(actualProductData).toEqual(expectedProductData)
    }

    @logStep("Check Product In Module details")
    async checkDetailsProductInModule(product: IProduct){
        await this.openDetailsProduct(product.name)
        const actualProductData = await this.productsPage['Details Modal'].getDetailsData()
        const expectedProductData = _.pick(product, ["name", "amount", "price", "manufacturer", "notes"])
        expect(actualProductData).toEqual(expectedProductData)
        await this.closeDetailsProduct()
    }

    @logStep("Check Length Results of Search")
    async checkLengthResultOfSearch(number: number){
        const rows = await this.productsPage.findElements(this.productsPage['Table Rows']);
        const lengthOfRows = rows.length;
        expect (lengthOfRows).toBe(number);
    }

    @logStep("Delete Product via UI")
    async deleteProduct(productName: string){
        await this.productsPage.clickOnDeleteProductButton(productName)
        await this.productsPage['Delete Modal'].waitForPageOpened()
        await this.productsPage['Delete Modal'].clickOnDeleteButton()
        await this.productsPage['Delete Modal'].waitForDisappeared();
        await this.productsPage.waitForPageOpened();
    }

    @logStep("Open Details Product")
    async openDetailsProduct(productName: string){
        await this.productsPage.clickOnDetailsProductButton(productName)
        await this.productsPage['Details Modal'].waitForPageOpened()
    }

    @logStep("Close Details Product")
    async closeDetailsProduct(){
        await this.productsPage['Details Modal'].clickOnCancelButton()
        await this.productsPage['Details Modal'].waitForDisappeared()
        await this.productsPage.waitForPageOpened();
    }

    @logStep("Search Product")
    async searchProduct(productName: string){
        await this.productsPage.fillSearchWitData(productName)
        await this.productsPage.clickOnSearchButton()
        await this.productsPage.waitForPageOpened()
    }
}

export default new productPageService()