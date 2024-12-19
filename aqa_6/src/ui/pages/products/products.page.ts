import { SalesPortalPage } from "../salesPortal.page"
import deleteProductModal from "./deleteProduct.modal";
import detailsProductModal from "./detailsProduct.modal";

class ProductsPage extends SalesPortalPage {
    readonly['Delete Modal'] = deleteProductModal
    readonly['Details Modal'] = detailsProductModal
    readonly ['Add New Product'] = 'button.page-title-button'
    readonly Title = '//h2[normalize-space(.)="Products List"]'
    readonly ['Search Input'] = 'input[type="search"]'
    readonly ['Search Button'] = 'button#search-products'
    readonly ['Table Rows'] = '//tbody/tr'
    readonly ['Table Product Row'] = (productName: string) => `//tr[./td[.="${productName}"]]`;
    readonly ['Product Name in table'] = (productName: string) => `${this['Table Product Row'](productName)}/td[1]`;
    readonly ['Product Price in table'] =  (productName: string) => `${this['Table Product Row'](productName)}/td[2]`;
    readonly ['Product Manufacturer in table'] =  (productName: string) => `${this['Table Product Row'](productName)}/td[3]`;
    readonly ['Product Creation Date in table'] = (productName: string) => `${this['Table Product Row'](productName)}/td[4]`;
    readonly ['Product Delete Button in table'] = (productName: string) => `${this['Table Product Row'](productName)}//button[@title="Delete"]`;
    readonly ['Product Details Button in table'] = (productName: string) => `${this['Table Product Row'](productName)}//button[@title="Details"]`;
    readonly ['Product Edit Button in table'] = (productName: string) => `${this['Table Product Row'](productName)}//button[@title="Edit"]`;

    async waitForPageOpened(){
        await this.waitForDisplayed(this.Title)
        await this.waitForSpinnersToBeHidden('Products')
    }

    async clickOnAddNewProducts(){
        await this.click(this['Add New Product'])
    }

    async getProductFromTable(productName: string){
        const [name, price, manufacturer] = await Promise.all([
            this.getText(this['Product Name in table'](productName)),
            this.getText(this['Product Price in table'](productName)),
            this.getText(this['Product Manufacturer in table'](productName)),
            // this.getText(this['Product Creation Date in table'](productName)),
        ])
        return {
            name, 
            price: +price.replace("$", ""), 
            manufacturer, 
            // createdOn
        }
    }

    async clickOnDeleteProductButton(productName: string){
        await this.click(this['Product Delete Button in table'](productName))
    }

    async clickOnDetailsProductButton(productName: string){
        await this.click(this['Product Details Button in table'](productName))
    }

    async fillSearchWitData(data: string){
        data && (await this.setValue(this['Search Input'], data))
    }

    async clickOnSearchButton(){
        await this.click(this['Search Button'])
    }

    async clickOnEditProductButton(productName: string){
        await this.click(this['Product Edit Button in table'](productName))
    }

}

export default new ProductsPage()
