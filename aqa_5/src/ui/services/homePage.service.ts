import homePage from "../pages/home.page"
import productsPage from "../pages/products/products.page"
import { SalesPortalPageService } from "./salesPortalPage.service";

class HomePageService extends SalesPortalPageService {
    private homePage = homePage
    private productsPage = productsPage

    async openProductsPage(){
        await this.homePage.clickOnMenuButton("Products");
        await this.productsPage.waitForPageOpened()
    }

    async validateUserName(){
        const actualName = await this.homePage.getUserName()
        const expectedName = 'AQA User'
        expect(actualName).toBe(expectedName)
    }
}

export default new HomePageService()