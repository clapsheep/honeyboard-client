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

export type WebRecommendListResponse = Pick<
    WebRecommend,
    'id' | 'title' | 'url' | 'createdAt'
>;

export type WebRecommendDetailResponse = Pick<
    WebRecommend,
    'id' | 'title' | 'content' | 'url' | 'createdAt'
> & {
    authorId: WebRecommend['userId'];
    authorName: string;
} & BookmarkedResponse;

export type WebRecommendRequest = Pick<
    WebRecommend,
    'title' | 'content' | 'url'
>;
