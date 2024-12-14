import {IProduct, MANUFACTURERS} from '../types/products.types'
export function generateProductData(customData?: Partial<IProduct>): IProduct {
    return {
        name: 'Test Product' + Date.now(),
        manufacturer: MANUFACTURERS.APPLE,
        amount: 10,
        price: 1000,
        notes: 'Test Product Notes',
        ...customData
    } 
}