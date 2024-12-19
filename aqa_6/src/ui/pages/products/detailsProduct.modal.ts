import { SalesPortalPage } from "../salesPortal.page"

class DetailsProductModal extends SalesPortalPage {
    readonly ['Modal container'] = `//div[@id="details-modal-container"]`
    readonly ['Details Title'] = (productName: string) => `//h5[normalize-space(.)="${productName}"]`
    readonly ['Edit Button'] = `${this['Modal container']}//button[normalize-space(.)="Edit Product"]`
    readonly ['Cancel Button'] = `${this['Modal container']}//button[normalize-space(.)="Cancel"]`

    readonly ['Module Rows'] = `${this['Modal container']}//*[@class="details mb-3"]`;
    readonly ['Product Name in module'] = `${this['Module Rows']}[1]/*[@class="ms-4"]`;
    // //*[./strong[.="Name:"]]//following-sibling::p - как вариант селектора
    // Можно даже сделать методом и переиспользовать
    // await detailsProductModal["Value by field"]("Name");

    readonly ['Product Amount in module'] =  `${this['Module Rows']}[2]/*[@class="ms-4"]`;
    readonly ['Product Price in module'] =  `${this['Module Rows']}[3]/*[@class="ms-4"]`;
    readonly ['Product Manufacturer in module'] =  `${this['Module Rows']}[4]/*[@class="ms-4"]`;
    readonly ['Product Creation Date in module'] =  `${this['Module Rows']}[5]/*[@class="ms-4"]`;
    readonly ['Product Notes in module'] = `${this['Module Rows']}[6]/*[@class="ms-4"]`;

    async waitForPageOpened() {
        await this.waitForDisplayed(this['Modal container'])
    }

    async waitForDisappeared(){
        await this.waitForDisplayed(this["Modal container"], true)
    }

    async clickOnCancelButton(){
        await this.click(this['Cancel Button'])
    }

    async getTitleText(productName: string){
        await this.getText(this['Details Title'](productName))
    }

    async getDetailsData(){
        const [name, amount, price, manufacturer, notes] = await Promise.all([
            this.getText(this['Product Name in module']),
            this.getText(this['Product Amount in module']),
            this.getText(this['Product Price in module']),
            this.getText(this['Product Manufacturer in module']),
            this.getText(this['Product Notes in module']),

        ])
        return {
            name, 
            amount: +amount,
            price: +price, 
            manufacturer, 
            notes
        }
    }
}

export default new DetailsProductModal()