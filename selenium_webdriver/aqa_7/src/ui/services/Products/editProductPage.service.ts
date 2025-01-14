
import { logStep } from "../../../utils/reporter/decorator";
import editProductPage from "../../pages/products/editProduct.page";
import { SalesPortalPageService } from "../salesPortalPage.service";
import {faker} from '@faker-js/faker'

class editProductPageService extends SalesPortalPageService {
    private editProductPage = editProductPage

    @logStep("Validate Edit Product page title")
    async checkPageTitle(productName: string){
        const actualTitle = await this.editProductPage.getTitleText()
        const ecpectedTitle = `Edit ` + productName
        expect(actualTitle).toBe(ecpectedTitle)
    }

    @logStep("Set Random Value in Price Product")
    async setValueInPrice(){
        await $(this.editProductPage['Price input']).setValue(faker.number.int({min: 1000, max: 99999}),)
    }

    @logStep("Partial Edit Product")
    async editProduct(){
        await this.setValueInPrice()
        await this.editProductPage.clickOnSaveButton()
    }
}

export default new editProductPageService();