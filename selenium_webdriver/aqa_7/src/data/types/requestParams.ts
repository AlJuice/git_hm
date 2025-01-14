import { MANUFACTURERS } from "./product.types";
import { Direction, SortHeaders } from "./sorting.types";

export interface IProductRequestParams {
    manufacturer?: MANUFACTURERS[] | MANUFACTURERS | string, 
    search?: string, 
    sortField?: SortHeaders | string, 
    sortOrder?: Direction
}