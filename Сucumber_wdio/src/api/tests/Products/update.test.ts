
//npm run test -- --spec="./src/api/tests/products/smoke/update.test.ts"
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import ProductsController from "../../controllers/products.controller";
import { SignInApiService } from '../../service/signInApiService.service';
import ProductApiService from "../../service/productApiService.service";
import { productsResponseSchema } from "../../../data/jsonSchemas/products.schema";

describe("[API] [Products] Put", async function () {
  const signInApiService = new SignInApiService();
  let token = "";
  let id = "";

  beforeEach(async function () {
    token = await signInApiService.signInAsAdmin();
  });

  it("Should update created product", async function () {
    const productData = await ProductApiService.createProduct(token);
    id = ProductApiService.getCreatedProduct()._id;
    const putProductResponse = await ProductsController.update(productData, id, token);
    
    validateResponse(putProductResponse, STATUS_CODES.OK, true,  null);
    validateJsonSchema(productsResponseSchema, putProductResponse)
    expect(putProductResponse.body.Product).toMatchObject({...productData})
  });

  afterEach(async function () {
    await ProductApiService.deleteProduct(token);
  });
});