import { apiConfig } from "../../../config/apiConfig";
import { createdOrdersPerDayMock } from "../../../data/mock/createdOrdersPerDay.mock";
import { STATUS_CODES } from "../../../data/statusCodes";
import { test } from "../../../fixtures/services.fixture";

test.describe(`[UI] [Home] Testing mockst`, async function () {
  test("Should check layout of Orders Created per Day on  Home Page", async function ({ 
    signInPageService, 
    mock, 
    homePageService 
  }) {
    const mockData = structuredClone(createdOrdersPerDayMock);
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkOrdersLayout();
  });
  
});