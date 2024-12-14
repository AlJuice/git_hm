import { SalesPortalPage } from "../salesPortal.page"
import deleteProductModal from "./deleteProduct.modal";

class ProductsPage extends SalesPortalPage {
    readonly['Delete Modal'] = deleteProductModal
    readonly ['Add New Product'] = 'button.page-title-button'
    readonly Title = '//h2[normalize-space(.)="Products List"]'
    readonly ['Table Row'] = (productName: string) => `//tr[./td[.="${productName}"]]`;
    readonly ['Product Name in table'] = (productName: string) => `${this['Table Row'](productName)}/td[1]`;
    readonly ['Product Price in table'] =  (productName: string) => `${this['Table Row'](productName)}/td[2]`;
    readonly ['Product Manufacturer in table'] =  (productName: string) => `${this['Table Row'](productName)}/td[3]`;
    readonly ['Product Creation Date in table'] = (productName: string) => `${this['Table Row'](productName)}/td[4]`;
    readonly ['Product Delete Button in table'] = (productName: string) => `${this['Table Row'](productName)}//button[@title="Delete"]`;

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
}

export default new ProductsPage()
