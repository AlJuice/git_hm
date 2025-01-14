import { AddEditProductPage } from "./addEditProduct.page";

class EditProductPage extends AddEditProductPage {
  readonly ["Title"] = "h2.page-title-text";
  readonly ["Save Product button"] = "#save-product-changes";
  readonly ['Name input'] = '#inputName'
  readonly ['Manufacturer dropdown'] = '#inputManufacturer'
  readonly ['Price input'] = '#inputPrice'
  readonly ['Amount input'] = '#inputAmount'
  readonly ['Notes textarea'] = '#textareaNotes'

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async waitForPageOpened() {
    await this.waitForDisplayed(this.Title)
    await this.waitForSpinnersToBeHidden('Edit Product Page')
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
      await this.click(this['Save Product Button'])
  }
}

export default new EditProductPage();
