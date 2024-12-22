import _ from "lodash";
import { Direction, SortHeaders} from "../../../data/types/sorting.types";
import addNewProductPage from "../../pages/products/addNewProduct.page"
import productsPage from "../../pages/products/products.page"
import EditProductPage from "../../pages/products/editProduct.page"
import { SalesPortalPageService } from "../salesPortalPage.service";
import { logStep } from "../../../utils/reporter/decorator";
import { IProduct } from "../../../data/types/products.types";

class productPageService extends SalesPortalPageService {
    private productsPage = productsPage
    private addNewProductPage = addNewProductPage
    private EditProductPage = EditProductPage

    @logStep("Open Add New Product Page")
    async openAddNewProductPage(){
        await this.productsPage.clickOnAddNewProducts()
        await this.addNewProductPage.waitForPageOpened()
    }

    @logStep("Open Edit Product Page")
    async openEditProduct(productName: string){
        await this.productsPage.clickOnEditProductButton(productName)
        await this.EditProductPage.waitForPageOpened()
    }

    @logStep("Check Product In Table")
    async checkProductInTable(product: IProduct){
        const actualProductData = await this.productsPage.getProductFromTable(product.name)
        const expectedProductData = _.pick(product, ["name", "price", "manufacturer"])
        expect(actualProductData).toEqual(expectedProductData)
    }

    @logStep("Check Product In Module details")
    async checkDetailsProductInModule(product: IProduct){
        await this.openDetailsProduct(product.name)
        const actualProductData = await this.productsPage['Details Modal'].getDetailsData()
        const expectedProductData = _.pick(product, ["name", "amount", "price", "manufacturer", "notes"]) // _.omit(product, ['createdOn']);
        expect(actualProductData).toEqual(expectedProductData)
        await this.closeDetailsProduct()
    }

    @logStep("Check Length Results of Search")
    async checkLengthResultOfSearch(number: number){
        const rows = await this.productsPage.findElements(this.productsPage['Table Rows']);
        const lengthOfRows = rows.length;
        expect (lengthOfRows).toBe(number);
    }

    @logStep("Delete Product via UI")
    async deleteProduct(productName: string){
        await this.productsPage.clickOnDeleteProductButton(productName)
        await this.productsPage['Delete Modal'].waitForPageOpened()
        await this.productsPage['Delete Modal'].clickOnDeleteButton()
        await this.productsPage['Delete Modal'].waitForDisappeared();
        await this.productsPage.waitForPageOpened();
    }

    @logStep("Open Details Product")
    async openDetailsProduct(productName: string){
        await this.productsPage.clickOnDetailsProductButton(productName)
        await this.productsPage['Details Modal'].waitForPageOpened()
    }

    @logStep("Close Details Product")
    async closeDetailsProduct(){
        await this.productsPage['Details Modal'].clickOnCancelButton()
        await this.productsPage['Details Modal'].waitForDisappeared()
        await this.productsPage.waitForPageOpened();
    }

    @logStep("Search Product")
    async searchProduct(productName: string){
        await this.productsPage.fillSearchWitData(productName)
        await this.productsPage.clickOnSearchButton()
        await this.productsPage.waitForPageOpened()
    }

    @logStep("Sort Table By Header")
    async sortTable(headerName: SortHeaders, direction: Direction){
        return await browser.waitUntil( 
            async () => {
                if (headerName == "CreatedOn") headerName = "Created On" as SortHeaders
                const currentDirection = await this.productsPage.getSortDirection(headerName)
                if (currentDirection === direction) { 
                    return true; 
                } 
                await this.productsPage.clickOnSortingHeader(headerName)
                return false
            }, 
            { 
                timeout: 30000, 
                interval: 500,
                timeoutMsg: `Could not set header ${headerName} to direction ${direction} within the timeout.` 
            } 
        );
    }

    @logStep("Sort Products")
    async sortProducts(direction: Direction, initialColumn: string[], sortedColumn: string[]){
        if (direction === "asc"){
            initialColumn.sort((a, b) => a.localeCompare(b) );
            expect(initialColumn).toEqual(sortedColumn)

        } else {
            initialColumn.sort((a, b) => b.localeCompare(a) );
            expect(initialColumn).toEqual(sortedColumn)
        }
    }

    @logStep("Filter Table Columns to one needed")
    async filterTableColumns(headerName: SortHeaders, table: { Name: string;
                                                              Price: number;
                                                              Manufacturer: string;
                                                              CreatedOn: string;
                                                            }[]){
        return table.map(row => row[headerName].toString())
    }
    

    @logStep("Check Sorted Table")
    async checkSortingTable(headerName: SortHeaders, direction: Direction){
        const initialTable =  await this.productsPage.getAllProductsFromTable()
        const initialColumn = await this.filterTableColumns(headerName, initialTable)
        const isSorted = await this.sortTable(headerName, direction)

        if (isSorted){
            const sortedTable  = await this.productsPage.getAllProductsFromTable() 
            const sortedColumn = await this.filterTableColumns(headerName, sortedTable)
            this.sortProducts(direction, initialColumn, sortedColumn)
        }
    }
}

export default new productPageService()