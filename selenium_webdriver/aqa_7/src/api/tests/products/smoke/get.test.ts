
//npm run test -- --spec="./src/api/tests/products/smoke/get.test.ts"

import { STATUS_CODES } from "../../../../data/api/statusCodes";
import { validateResponse } from "../../../../utils/validation/apiValidation";
import ProductsController from "../../../api/controllers/products.controller";
import ProductApiService from "../../../api/service/productApiService.service";
import { SignInApiService } from '../../../api/service/signInApiService.service';

describe("[API] [Products] Get", async function () {
  const signInApiService = new SignInApiService();
  let token = ''
  let id = ''

  beforeEach(async function () {
    token = await signInApiService.signInAsAdmin();
    await ProductApiService.createProduct(token);
    id = ProductApiService.getCreatedProduct()._id;
  });

  it("Should get created product", async function () {
    const getProductResponse = await ProductsController.get(id, token);
    const createdProduct = getProductResponse.body.Product;

    validateResponse(getProductResponse, STATUS_CODES.OK, true, null);
    expect(createdProduct).toMatchObject({ ...ProductApiService.getCreatedProduct() });
  });

  afterEach(async function () {
    await ProductApiService.deleteProduct(token);
  });
});