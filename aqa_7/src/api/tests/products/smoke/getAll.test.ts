//npm run test -- --spec="./src/api/tests/products/smoke/getAll.test.ts"

import { STATUS_CODES } from "../../../../data/api/statusCodes";
import { validateResponse } from "../../../../utils/validation/apiValidation";
import { SignInApiService } from '../../../api/service/signInApiService.service';
import ProductApiService from "../../../api/service/productApiService.service";
import productsController from "../../../api/controllers/products.controller";
import { MANUFACTURERS } from "../../../../data/types/product.types";

describe("[API] [Products] Get all products", async function () {
  const signInApiService = new SignInApiService();
  let token = "";

  beforeEach(async function () {
    token = await signInApiService.signInAsAdmin();
  });

  it("Should get all products", async function () {
    await ProductApiService.createProduct(signInApiService.getToken());
    const getAllProductResponse = await productsController.getAll(token);
    const receivedProducts = getAllProductResponse.body.Products;
    validateResponse(getAllProductResponse, STATUS_CODES.OK, true, null);
    expect(receivedProducts.length).toBeGreaterThan(0);
  });

  it("Should get products with search param: name", async function () {
    await ProductApiService.createProduct(token);
    const product = ProductApiService.getCreatedProduct()
    const response = await productsController.getAll(token, {search: product.name})
    validateResponse(response, STATUS_CODES.OK, true, null)
    expect(response.body.Products).toHaveLength(1);
  })

  it("Should get products with param: manufacturer", async function () {
    await ProductApiService.createProduct(token);
    const product = ProductApiService.getCreatedProduct()
    const response = await productsController.getAll(token, {manufacturer: product.manufacturer})
    validateResponse(response, STATUS_CODES.OK, true, null)
    expect(response.body.Products.length).toBeGreaterThan(0);
    expect(response.body.Products.every(p => p.manufacturer === product.manufacturer)).toBe(true)
  })

  it("Should get products with param: 2 manufacturers", async function () {
    const product1 = await ProductApiService.createProduct(token, { manufacturer: MANUFACTURERS.AMAZON })
    const product2 = await ProductApiService.createProduct(token, { manufacturer: MANUFACTURERS.APPLE });
    const response = await productsController.getAll(token, {manufacturer: [product1.manufacturer, product2.manufacturer]})
    validateResponse(response, STATUS_CODES.OK, true, null)
    expect(response.body.Products.length).toBeGreaterThan(0);
    expect(response.body.Products.every(p => p.manufacturer === product1.manufacturer || p.manufacturer === product2.manufacturer)).toBe(true)
  })

  it("Should get sorted products by Price asc with param: sortField and sortOrder", async function () {
    const response = await productsController.getAll(token, {
      sortField: 'price', 
      sortOrder: 'asc'
    })
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p1.price - p2.price)

    validateResponse(response, STATUS_CODES.OK, true, null)
    expect(sortedResponse.every((p, i) => p.price === response.body.Products[i].price)).toBe(true)
  })

  it("Should get sorted products by Price desc with param: sortField and sortOrder", async function () {
    const response = await productsController.getAll(token, {
      sortField: 'price', 
      sortOrder: 'desc'
    })
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p2.price - p1.price)

    validateResponse(response, STATUS_CODES.OK, true, null)
    expect(sortedResponse.every((p, i) => p.price === response.body.Products[i].price)).toBe(true)
  })
  
  it("Should get products sorted by manufacturer in asc order", async function () {
    const response = await productsController.getAll(signInApiService.getToken(), {
      sortField: "manufacturer",
      sortOrder: "asc",
    });
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p1.manufacturer.localeCompare(p2.manufacturer));

    validateResponse(response, STATUS_CODES.OK, true, null);
    expect(sortedResponse.every((p, i) => p.manufacturer === response.body.Products[i].manufacturer)).toBe(true);
  });

  it("Should get products sorted by manufacturer in desc order", async function () {
    const response = await productsController.getAll(signInApiService.getToken(), {
      sortField: "manufacturer",
      sortOrder: "desc",
    });
    const sortedResponse = response.body.Products.toSorted((p1, p2) => p2.manufacturer.localeCompare(p1.manufacturer));

    validateResponse(response, STATUS_CODES.OK, true, null);
    expect(sortedResponse.every((p, i) => p.manufacturer === response.body.Products[i].manufacturer)).toBe(true);
  });

  afterEach(async function () {
    await ProductApiService.deleteProduct(token);
  });
});