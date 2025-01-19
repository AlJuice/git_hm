import { apiConfig } from "../../../config/apiConfig";
import { emptyCustomersMock } from "../../../data/mock/emptyCustomers.mock";
import { STATUS_CODES } from "../../../data/statusCodes";
import { test } from "../../../fixtures/services.fixture";

test.describe(`[UI] [Home] Testing mocks`, async function () {
  test("Should check empty customers table on Customer Page", async function ({ 
    signInPageService, 
    mock, 
    homePageService, 
    customersPageService 
  }) {
    const mockData = structuredClone(emptyCustomersMock);
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Customers, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.openCustomersPage()
    await customersPageService.validateEmptyCustomers()
  });
  
});