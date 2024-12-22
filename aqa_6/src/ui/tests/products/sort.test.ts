import homePageService from "../../services/homePage.service";
import loginPageService from "../../services/loginPage.service";
import productsPageService from "../../services/Products/productsPage.service";

//npm run test -- --spec="./src/ui/tests/products/sort.test.ts"
// setTimeout(function() {debugger;}, 0)

describe("[UI] [AQA course] e2e test", async function () {
  beforeEach(async function () {
    await loginPageService.openSalesPortal();
    await loginPageService.loginAsAdmin();
    await homePageService.openProductsPage();
  });

  it(`Should sort by Name asc && validate table with products`, async function () {
    //   - Отсортировать таблицу по asc/desc по полю NAME
    //   - Спарсить все продукты из таблицы в массив объектов
    //   - Отсортировать спаршенный массив объектов по полю NAME
    //   - Сверить ваш отсортированный массив с тем что сейчас на фронте (спарсить и сравнить 2 массива)
    await productsPageService.checkSortingTable("Name", "asc");
  });

  it(`Should sort by Name desc && validate table with products`, async function () {
    await productsPageService.checkSortingTable("Name", "desc");
  });

  it(`Should sort by Price asc && validate table with products`, async function () {
    // - Отсортировать таблицу по asc/desc по ЧИСЛОВОМУ полю PRICE (сортировать как число, а не строка с долларом)
    // - Спарсить все продукты из таблицы в массив объектов
    // - Отсортировать спаршенный массив объектов по ЧИСЛОВОМУ полю PRICE
    // - Сверить ваш отсортированный массив с тем что сейчас на фронте (спарсить и сравнить 2 массива)
    await productsPageService.checkSortingTable("Price", "asc");
  });

  it(`Should sort by Price desc && validate table with products`, async function () {
    await productsPageService.checkSortingTable("Price", "desc");
  });

  it(`Should sort by Created On asc && validate table with products`, async function () {
    // - Отсортировать таблицу по asc/desc по полю с датой Created On
    // - Спарсить все продукты из таблицы в массив объектов
    // - Отсортировать спаршенный массив объектов по полю с датой Created On
    // - Сверить ваш отсортированный массив с тем что сейчас на фронте (спарсить и сравнить 2 массива)
    await productsPageService.checkSortingTable("CreatedOn", "asc");
  });

  it(`Should sort by Created On desc && validate table with products`, async function () {
    await productsPageService.checkSortingTable("CreatedOn", "desc");
  });

  afterEach(async () => {
    await homePageService.validateUserName();
    await loginPageService.signOut();
  });
});
