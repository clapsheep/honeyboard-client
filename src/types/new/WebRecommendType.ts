import { BookmarkedResponse } from '../common/type';

export interface WebRecommend {
    id: string;
    title: string;
    url: string;
    content: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}
export type WebRecommendDetailResponse = Pick<
    WebRecommend,
    'id' | 'title' | 'content' | 'createdAt' | 'url'
> &
    BookmarkedResponse;

export type WebRecommendListResponse = Pick<
    WebRecommend,
    'id' | 'title' | 'createdAt' | 'url'
>;
export type WebRecommendRequest = Pick<
    WebRecommend,
    'title' | 'content' | 'url'
>;
