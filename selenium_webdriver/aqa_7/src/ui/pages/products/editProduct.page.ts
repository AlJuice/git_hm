import { SalesPortalPage } from "../salesPortal.page"

class EditProductPage extends SalesPortalPage {
    readonly Title = 'h2.page-title-text';
    readonly ['Name input'] = '#inputName'
    readonly ['Manufacturer dropdown'] = '#inputManufacturer'
    readonly ['Price input'] = '#inputPrice'
    readonly ['Amount input'] = '#inputAmount'
    readonly ['Notes textarea'] = '#textareaNotes'
    readonly ['Save New Product Button'] = '#save-product-changes'


    async waitForPageOpened() {
        await this.waitForDisplayed(this.Title)
        await this.waitForSpinnersToBeHidden('Edit Product Page')
    }

    async getTitleText(){
        return await this.getText(this.Title)
    }

    async getDataProduct(){
        const [name, amount, price, manufacturer, notes] = await Promise.all([
             $(this['Name input']).getValue(),
             $(this['Amount input']).getValue(),
             $(this ['Price input'] ).getValue(),
             $(this['Manufacturer dropdown']).getValue() ,
             $(this['Notes textarea']).getValue(),
        ])
        return {
            name, 
            amount: +amount,
            price: +price, 
            manufacturer, 
            notes
        }
    }

    async clickOnSaveButton(){
        await this.click(this['Save New Product Button'])
    }
}

export default new EditProductPage()