import { SalesPortalPage } from "../salesPortal.page"

class ProductsPage extends SalesPortalPage {
    readonly ['Add New Product'] = 'button.page-title-button'
    readonly Title = '//h2[normalize-space(.)="Products List"]'
    readonly ['Close Notification Button'] = 'button[title="Close"]'
    
    async clickOnAddNewProducts(){
        await this.click(this['Add New Product'])
    }

    async waitForPageOpened(){
        await this.waitForDisplayed(this.Title)
        await this.waitForSpinnersToBeHidden('Products')
    }

    async closeNotificationAfterAddedProducts(){
        await this.waitForDisplayed(this['Close Notification Button'])
        await this.click(this['Close Notification Button'])
    }
}

export default new ProductsPage()
