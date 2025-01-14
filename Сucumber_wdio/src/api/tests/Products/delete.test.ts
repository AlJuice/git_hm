//npm run test -- --spec="./src/api/tests/products/smoke/delete.test.ts"

import { STATUS_CODES } from "../../../data/api/statusCodes";
import ProductsController from "../../controllers/products.controller";
import { SignInApiService } from '../../service/signInApiService.service';
import ProductApiService from "../../service/productApiService.service";
import productsController from "../../controllers/products.controller";
import { validateResponse } from "../../../utils/validation/apiValidation";
import { ERROR_MESSAGES } from "../../../data/types/errorMessages";

describe("[API] [Products] Delete", async function () {
  const signInApiService = new SignInApiService();
  let token = ''
  let id = ''

  beforeEach(async function () {
    await signInApiService.signInAsAdmin();
    token = signInApiService.getToken()
    await ProductApiService.createProduct(token);
    id = ProductApiService.getCreatedProduct()._id;
  });

  it("Should delete created product", async function () {
    const deleteProductResponse = await ProductsController.delete(id, token);
    expect(deleteProductResponse.status).toBe(STATUS_CODES.DELETED);
    expect(deleteProductResponse.body).toBe(null)

    const getReponse = await productsController.get(id, token)
    validateResponse(getReponse, STATUS_CODES.NOT_FOUND, false, ERROR_MESSAGES.PRODUCT_NOT_FOUND(id))
  });
});