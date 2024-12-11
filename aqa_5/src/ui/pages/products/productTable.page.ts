import { SalesPortalPage } from "../salesPortal.page";

class ProductTablePage extends SalesPortalPage {
    readonly Title = '//h2[normalize-space(.)="Products List"]'
    readonly ['Table Selector'] = '#table-products'
    readonly ['Headers Selector'] = `${this['Table Selector']} thead th`
    readonly ['First Row Selector'] = `${this['Table Selector']} tbody tr:first-child`
    readonly ['Cells Selector'] = `${this['First Row Selector']} td`

    async waitForPageOpened(){
        await this.waitForDisplayed(this.Title)
        await this.waitForSpinnersToBeHidden('Products - table')
    }

    async parsingTableData(){
        const headersText = await this.getTextFromArrayOfElements(
                            await this.findElements(this['Headers Selector']))

        const fileteredHeaders = await this.filterTableHeaders(headersText) 
        return await this.createTableObject(fileteredHeaders)
    }

    async filterTableHeaders(headers: string[]){
        const neededTableHeaders = ['Name', 'Manufacturer', 'Price']
        return headers.filter((el) => neededTableHeaders.includes(el))
    }

    async createTableObject(array: string[]){
        const tableData: Record<string, string>[] = []
        const cellsText = await this.getTextFromArrayOfElements(
                          await this.findElements(this['Cells Selector']))

        const rowObject = array.reduce((acc, header, i,) => {
            acc[header] = cellsText[i]
            return acc
        }, {} as Record<string, string>)

        tableData.push(rowObject)
        return tableData
    }

}

export default new ProductTablePage()
