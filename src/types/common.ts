export interface PageResponse<T> {
    content: T[];
    pageInfo: PageInfo;
}
interface PageInfo {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}
export interface GenerationType {
    id: number;
    name?: string;
    active: boolean;
}
export interface PageRequest {
    currentPage?: number;
    pageSize?: number;
}
export interface SearchRequest<T> {
    searchType?: T;
    keyword?: string;
}

export interface SelectOptionType {
    value: string | number;
    label: string;
}
export interface CreateResponse {
    id: string;
}
export interface BookmarkedResponse {
    bookmarked: boolean;
}
