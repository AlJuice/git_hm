
//npm run test -- --spec="./src/api/tests/products/smoke/put.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import { generateProductData } from "../../../data/products/generateProduct";
import { IProduct } from "../../../data/types/products.types";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { validateResponse } from "../../../utils/validation/apiValidation";
import ProductsController from "../../../controllers/products.controller";
import LoginController from "../../../controllers/login.controller";


describe("[API] [Products] Put", async function () {
  const loginBody = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };

  let token = "";
  let id = "";
  let productData: IProduct;

  beforeEach(async function () {
    const loginResponse = await LoginController.login(loginBody);
    expect(loginResponse.status).toBe(STATUS_CODES.OK);
    const responseToken = loginResponse.headers.get("authorization");
    token = responseToken!;
    productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);
    expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
    const body = await createProductResponse.json();
    id = body.Product._id;
  });

  it("Should update created product", async function () {
    const putProductResponse = await ProductsController.put(id, token);
    expect(putProductResponse.status).toBe(STATUS_CODES.OK);
    const body = await putProductResponse.json();
    console.log(body)
    validateResponse(body, true, null);
  });

afterEach(async function () {
    const response = await ProductsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    });
});