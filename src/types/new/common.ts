export interface PageRequest {
    currentPage?: number;
    pageSize?: number;
}
export interface SearchRequest<T> {
    searchType?: T;
    keyword?: string;
}
