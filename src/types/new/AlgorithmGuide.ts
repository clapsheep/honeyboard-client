import { BookmarkedResponse } from '../common/type';

export interface AlgorithmGuide {
    id: string;
    title: string;
    content: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    thumbnail: string;
}
export type AlgorithmGuideDetailResponse = Pick<
    AlgorithmGuide,
    'id' | 'title' | 'content' | 'createdAt'
> &
    BookmarkedResponse;
export type AlgorithmGuideListResponse = Pick<
    AlgorithmGuide,
    'id' | 'title' | 'createdAt' | 'thumbnail'
>;
export type AlgorithmGuideRequest = Pick<
    AlgorithmGuide,
    'title' | 'content' | 'thumbnail'
>;
