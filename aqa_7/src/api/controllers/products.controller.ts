import { apiConfig } from "../config/apiConfig";
import { SortField, Direction, IRequestOptions } from "../data/types/api.types";
import { IProduct, MANUFACTURERS } from "../data/types/products.types";

class ProductsController {
  async create(productData: IProduct, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product;
    const options: IRequestOptions = {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    };
    return await fetch(url, options);
  }

  async get(productId: string, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + "/";
    const options: IRequestOptions = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }

  async delete(productId: string, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + "/";
    const options: IRequestOptions = {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }

  async put(productId: string, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + "/";
    const options: IRequestOptions = {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }

  async getAllProducts(token: string, optionsQuery?: {manufacturer?: MANUFACTURERS[] | MANUFACTURERS, 
                                                      search?: string, 
                                                      sortField?: SortField, 
                                                      sortOrder?: Direction
                                                    }) {

    let url = apiConfig.baseUrl + apiConfig.endpoints.product;
    if (optionsQuery) {
      url = await this.addUrlQueryOptions(url, optionsQuery)
    }
    const options: IRequestOptions = {
    method: "get",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(url, options);
  }


  async addUrlQueryOptions(url: string, optionsQuery: {manufacturer?: MANUFACTURERS[] | MANUFACTURERS, 
                                        search?: string, 
                                        sortField?: SortField, 
                                        sortOrder?: Direction
                                      }){
    url = url.slice(0,-1) + "?";
    if (optionsQuery!.manufacturer){
      if(!Array.isArray(optionsQuery!.manufacturer)) url = `${url}manufacturer=${optionsQuery!.manufacturer}&`
      else {
        optionsQuery!.manufacturer.forEach((item) => url = `${url}manufacturer=${item}&`)
      }
    } 
    if (optionsQuery!.search) url = `${url}search=${optionsQuery!.search}&`
    if (optionsQuery!.sortField) url = `${url}sortField=${optionsQuery!.sortField}&`
    if (optionsQuery!.sortOrder) url = `${url}sortOrder=${optionsQuery!.sortOrder}&`
    return url
  }
  
}

export default new ProductsController();