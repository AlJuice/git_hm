export interface IProduct {
    Name: string,
    Manufacturer: MANUFACTURERS,
    Price: number,
    Amount: number,
    Notes?: string
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