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
