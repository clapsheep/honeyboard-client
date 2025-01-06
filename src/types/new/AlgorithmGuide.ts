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

export type AlgorithmGuideListResponse = Pick<
    AlgorithmGuide,
    'id' | 'title' | 'thumbnail' | 'createdAt'
>;

export type AlgorithmGuideDetailResponse = Pick<
    AlgorithmGuide,
    'id' | 'title' | 'content' | 'createdAt'
> & {
    authorId: AlgorithmGuide['userId'];
    authorName: string;
} & BookmarkedResponse;

export type AlgorithmGuideRequest = Pick<
    AlgorithmGuide,
    'title' | 'content' | 'thumbnail'
>;
