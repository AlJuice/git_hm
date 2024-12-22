// - Дописать смоук тесты для эндпоинта продуктов с 5 тестами:
//   -- Создать продукт
//   -- Получить продукт по айди
//   -- Получить все продукты
//   -- Изменить продукт
//   -- Удалить продукт

// - Проверять статус код, IsSuccess, ErrorMessage
// - Токен для запросов брать из респонса login запроса в before hook
// - После тестов удалять созданный продукт
// Написать JSON схему для getAllProducts респонса (приходит массив продуктов)
// Использовать ее в тесте на получение всех продуктов

//npm run test -- --spec="./src/api/tests/products/smoke/getAllProducts.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import ProductsController from "../../../controllers/products.controller";
import LoginController from "../../../controllers/login.controller";
import { MANUFACTURERS } from "../../../data/types/products.types";
import { generateProductData } from "../../../data/products/generateProduct";
import { productsResponseSchema } from "../../../data/jsonSchemas/products.schema";


describe("[API] [Products] Get all products", async function () {
  const loginBody = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };
  let id = "";
  let token = "";
  beforeEach(async function () {
    const loginResponse = await LoginController.login(loginBody);
    expect(loginResponse.status).toBe(STATUS_CODES.OK);
    const responseToken = loginResponse.headers.get("authorization");
    token = responseToken!;
  });

  it("Should get all products", async function () {
    const getAllProductsResponse = await ProductsController.getAllProducts(token);
    expect(getAllProductsResponse.status).toBe(STATUS_CODES.OK);
    const body = await getAllProductsResponse.json();
    validateResponse(body, true, null);
    // console.log(body)
    validateJsonSchema(productsResponseSchema, body);
    
  });

  it("Should get all products filter by Manufactures", async function () {
    const getAllProductsResponse = await ProductsController.getAllProducts(token, {manufacturer: [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON]});
    expect(getAllProductsResponse.status).toBe(STATUS_CODES.OK);
    const body = await getAllProductsResponse.json();
    validateResponse(body, true, null);
    // console.log(body)
  });

  it("Should get all products filter by sortField & sortOrder", async function () {
    const getAllProductsResponse = await ProductsController.getAllProducts(token, {sortField: 'name', sortOrder: 'asc'});
    expect(getAllProductsResponse.status).toBe(STATUS_CODES.OK);
    const body = await getAllProductsResponse.json();
    validateResponse(body, true, null);
    // console.log(body)
  });

  it("Should get all products filter by Search Created Product Name", async function () {
    const productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);
    expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
    const bodyCreatedProduct = await createProductResponse.json();
    id = bodyCreatedProduct.Product._id;
    const createdProduct = bodyCreatedProduct.Product;

    const getAllProductsResponse = await ProductsController.getAllProducts(token,{search: createdProduct.name});
    expect(getAllProductsResponse.status).toBe(STATUS_CODES.OK);
    const body = await getAllProductsResponse.json();
    validateResponse(body, true, null);
    // console.log(body)

    const response = await ProductsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});