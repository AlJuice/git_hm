import {IProduct, MANUFACTURERS} from '../types/products.types'
export function generateProductData(customData?: Partial<IProduct>): IProduct {
    return {
        Name: 'Test Product' + Date.now(),
        Manufacturer: MANUFACTURERS.APPLE,
        Amount: 10,
        Price: 1000,
        Notes: 'Test Product Notes',
        ...customData
    } 
}