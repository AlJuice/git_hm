import { IProduct } from "../../../data/types/products.types"
import { SalesPortalPage } from "../salesPortal.page"

class AddNewProductPage extends SalesPortalPage {
    readonly ['Name input'] = '#inputName'
    readonly ['Manufacturer dropdown'] = '#inputManufacturer'
    readonly ['Price input'] = '#inputPrice'
    readonly ['Amount input'] = '#inputAmount'
    readonly ['Notes textarea'] = '#textareaNotes'
    readonly ['Save New Product Button'] = '#save-new-product'
    readonly Title = '//h2[normalize-space(.)="Add New Product"]';

    async waitForPageOpened() {
        await this.waitForDisplayed(this.Title)
        await this.waitForSpinnersToBeHidden('Products - add product')
    }

    async fillInputs(product: IProduct){
        await this.setValue(this['Name input'], product.Name)
        await this.selectDropdownValue(this['Manufacturer dropdown'], product.Manufacturer)
        await this.setValue(this['Price input'], product.Price)
        await this.setValue(this['Amount input'], product.Amount)
        if (product.Notes) {
            await this.setValue(this['Notes textarea'], product.Notes)
        }
    }

    async clickOnSaveButton(){
        await this.click(this['Save New Product Button'])
    }
}

export default new AddNewProductPage()


