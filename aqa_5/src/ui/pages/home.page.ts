import { MenuItemNames } from "../../data/types/home.types";
import { SalesPortalPage } from "./salesPortal.page";

class HomePage extends SalesPortalPage {
    readonly ['Menu Button'] = (menuItemName: MenuItemNames) => `[name="${menuItemName}"]`;
    readonly ['Welcome Label'] = '.welcome-text'

    async waitForPageOpened(){
        await this.waitForDisplayed(this["Welcome Label"])
        await this.waitForSpinnersToBeHidden('Home')
    }

    async clickOnMenuButton(menuItemName: MenuItemNames){
        await this.click(this['Menu Button'](menuItemName))
    }
}

export default new HomePage()