export interface IProduct {
    name: string,
    manufacturer: MANUFACTURERS,
    price: number,
    amount: number,
    notes?: string
}

export interface IProductTable {
    name: string,
    price: string,
    manufacturer: MANUFACTURERS,
    createdOn: string,
    actions?: string
}

export enum MANUFACTURERS {
    APPLE = "Apple",
    SAMSUNG = "Samsung",
    GOOGLE = "Google",
    MICROSOFT = "Microsoft",
    SONY = "Sony",
    XIAOMI = "Xiaomi",
    AMAZON = "Amazon",
    TESLA = "Tesla",
  }