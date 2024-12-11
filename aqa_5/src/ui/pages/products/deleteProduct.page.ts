import { SalesPortalPage } from "../salesPortal.page"

class DeleteProductPage extends SalesPortalPage {
    readonly ['Delete Icon Selector'] = `button[title="Delete"]`
    readonly ['Delete Module Title'] = '//h5[normalize-space(.)="Delete Product"]'
    readonly ['Delete Module Button Selector'] = '//button[normalize-space(.)="Yes, Delete"]'

    async waitForPageOpened() {
        await this.waitForDisplayed(this['Delete Module Title'])
        await this.waitForSpinnersToBeHidden('Products - delete product')
    }

    async clickOnDeleteIcon(){
        await this.click(this['Delete Icon Selector'])
    }

    async clickOnDeleteButton(){
        await this.click(this['Delete Module Button Selector'])
    }
}

export default new DeleteProductPage()