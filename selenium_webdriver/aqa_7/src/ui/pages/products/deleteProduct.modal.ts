import { SalesPortalPage } from "../salesPortal.page"

class DeleteProductModal extends SalesPortalPage {
    readonly ['Modal container'] = `//div[@role="dialog"]`
    readonly ['Delete Title'] = '//h5[normalize-space(.)="Delete Product"]'
    readonly ['Delete Button'] = `${this['Modal container']}//button[@type="submit"]`
    readonly ['Cancel Button'] = `${this['Modal container']}//button[contains(@class, "btn-secondary")]`

    async waitForPageOpened() {
        await this.waitForDisplayed(this['Delete Title'])
    }

    async waitForDisappeared(){
        await this.waitForDisplayed(this["Modal container"], true)
    }

    async clickOnDeleteButton(){
        await this.click(this['Delete Button'])
    }
}

export default new DeleteProductModal()