
//npm run test -- --spec="./src/api/tests/products/smoke/create.test.ts"

import _ from "lodash"
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../../api/config/environment"
import { STATUS_CODES } from "../../../data/api/statusCodes"
import { generateProductData } from "../../../data/products/generateProduct"
import { productResponseSchema } from "../../../data/jsonSchemas/product.schema"
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation"
import { ICredentials } from "../../../data/types/login.types"
import ProductsController from "../../../controllers/products.controller";
import LoginController from "../../../controllers/login.controller";

describe("[API] [Products] Post", async function () {
    const loginBody: ICredentials = {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    };
  
    let token = "";
    let id = "";
  
    beforeEach(async function () {
      const loginResponse = await LoginController.login(loginBody);
      expect(loginResponse.status).toBe(STATUS_CODES.OK);
      token = loginResponse.headers.get("authorization")!;
      expect(token).not.toBe(undefined);
    });
  
    it("Should create product with smoke data", async function () {
      const productData = generateProductData();
      const createProductResponse = await ProductsController.create(productData, token);
      expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
      const body = await createProductResponse.json();
      id = body.Product._id;
      const createdProduct = body.Product;

      validateResponse(body, true, null);
      validateJsonSchema(productResponseSchema, body);
      expect(createdProduct).toMatchObject({ ...productData });
  
      //check isSuccess and ErrorMessage - done
      //check product response body
      //chech that product is created
      //check json schema
    });
  
    afterEach(async function () {
      const response = await ProductsController.delete(id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    });
  });