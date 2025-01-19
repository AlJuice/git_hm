import { SalesPortalPage } from "../salesPortal.page";

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly "Add New Customer button" = "button.page-title-header";
  readonly "Empty table message" = "td.fs-italic";
  readonly "Modal Filter" = "#filter"
  readonly "Modal Apply" = "#apply-filters"
  readonly "Modal Clear Filters" = "#clear-filters"
  readonly "Filter Checkbox" =  (country: string) => `.modal-filters-body [id="${country}-filter"]
`
  readonly "Edit button by table row" = (customer: string) =>
    `${this["Table row selector"](customer)}//button[@title="Edit"]`;

  readonly ['Table Row'] = (customer?: string) => `//tr[./td[.="${customer}"]]`;
  readonly ['Email in table'] = (customer: string) => `${this['Table Row'](customer)}/td[1]`;
  readonly ['Name in table'] =  (customer: string) => `${this['Table Row'](customer)}/td[2]`;
  readonly ['Country in table'] =  (customer: string) => `${this['Table Row'](customer)}/td[3]`;
  readonly ['Creation Date in table'] = (customer: string) => `${this['Table Row'](customer)}/td[4]`;
  readonly ['Delete Button in table'] = (customer: string) => `${this['Table Row'](customer)}//button[@title="Delete"]`;
  readonly ['Details Button in table'] = (customer: string) => `${this['Table Row'](customer)}//button[@title="Details"]`;
  readonly ['Edit Button in table'] = (customer: string) => `${this['Table Row'](customer)}//button[@title="Edit"]`;

  readonly ['Table Rows'] = '//tbody/tr'

  async clickOnAddNewCustomer() {
    await this.click(this["Add New Customer button"]);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this["Edit button by table row"](customerName));
  }

  async openModalFilter() {
    await this.click(this["Modal Filter"]);
  }

  async getEmptyTableMessage() {
    return this.getText(this["Empty table message"]);
  }

  async chooseFilterCountry(country: string) {
    await this.click(this["Filter Checkbox"](country));
  }

  async clickOnApply() {
    await this.click(this["Modal Apply"]);
  }

  async clearFilters() {
    await this.click(this["Modal Clear Filters"]);
  }

  async getCustomersFromTable(customer: string){
    const [email, name, country, createdOn] = await Promise.all([
        this.getText(this['Email in table'](customer)),
        this.getText(this['Name in table'](customer)),
        this.getText(this['Country in table'](customer)),
        this.getText(this['Creation Date in table'](customer)),
    ])
    return {
        email, 
        name, 
        country, 
        createdOn
    }
  }

  async getAllCustomersFromTable(){
    const tableRows = await this.findElementArray(this['Table Rows']);
    const table = await Promise.all(
      await tableRows.map(async (el, i) => {
        const email = await this.getText(`${this['Table Rows']}[${i + 1}]/td[1]`);
        const name = await this.getText(`${this['Table Rows']}[${i + 1}]/td[2]`);
        const country = await this.getText(`${this['Table Rows']}[${i + 1}]/td[3]`);
        const createdOn = await this.getText(`${this['Table Rows']}[${i + 1}]/td[4]`);
        return {
          email,
          name,
          country,
          createdOn
        };
      })
    );
    return table;
  }


}