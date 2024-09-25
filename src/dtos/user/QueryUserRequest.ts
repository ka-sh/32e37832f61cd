export type SortKey = 'created'
export type OrderKey = 'desc' | 'asc'

export interface QueryUserRequest {
    sortBy: SortKey,
    order: OrderKey
}