
//npm run test -- --spec="./src/api/tests/products/smoke/create.test.ts"

import _ from "lodash"
import { STATUS_CODES } from "../../../../data/api/statusCodes"
import { generateProductData } from "../../../../data/products/generateProduct"
import { productResponseSchema } from "../../../../data/jsonSchemas/product.schema"
import { validateJsonSchema, validateResponse } from "../../../../utils/validation/apiValidation"
import ProductsController from "../../../api/controllers/products.controller";
import { SignInApiService } from '../../../api/service/signInApiService.service';
import ProductApiService from "../../../api/service/productApiService.service";

describe("[API] [Products] Post", async function () {
  const signInApiService = new SignInApiService();
  let id = '';
  let token = ''

  beforeEach(async function () {
    token = await signInApiService.signInAsAdmin();
  });

  it("Should create product with smoke data", async function () {
    const productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);
    id = createProductResponse.body.Product._id;
    const createdProduct = createProductResponse.body.Product;

    validateResponse(createProductResponse, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, createProductResponse);
    expect(createdProduct).toMatchObject({ ...productData });
  });

  afterEach(async function () {
    await ProductApiService.deleteProduct(token);
  });
});