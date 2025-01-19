import { test as servicesFixture, expect } from "../../../fixtures/services.fixture";
import { test as pagesFixture } from "../../../fixtures/pages.fixture";
import { COUNTRIES } from "../../../data/customers/countries";
import { mergeTests } from "@playwright/test";

const test = mergeTests(servicesFixture, pagesFixture);

test.describe('[UI] [Customers] [filter Customer]', async () => {
    test.beforeEach(async ({ 
      signInPage,
      homePage,
      customersPage,
     }) => {
      await signInPage.openLoginPage();
      await homePage.waitForOpened();
      await homePage.clickOnViewDetailsButton("Customers");
      await customersPage.waitForOpened();
    })

    for (const i in COUNTRIES) {
      const country = COUNTRIES[i];
      test(`Should filter customers table by country ${country}`, async ({ customersPage, customersPageService }) => {
        await customersPage.openModalFilter();
        await customersPage.chooseFilterCountry(country)
        await customersPage.clickOnApply()
        await customersPage.waitForOpened();
        await customersPageService.validateCustomersFromTable('country', country)
      });
    }
})