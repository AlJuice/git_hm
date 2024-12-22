export interface IRequestOptions {
    method: 'get' | 'post' | 'put' | 'delete',
    headers?: Record<string,string>,
    body?: string
}

export type SortField = 'name' | 'price' | 'manufacturer' | 'createdOn'

export type Direction = 'asc' | 'desc'
