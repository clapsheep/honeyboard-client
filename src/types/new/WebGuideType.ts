import { BookmarkedResponse } from '../common/type';

export interface WebGuide {
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
export type WebGuideDetailResponse = Pick<
    WebGuide,
    'id' | 'title' | 'content' | 'createdAt'
> &
    BookmarkedResponse;
export type WebGuideListResponse = Pick<
    WebGuide,
    'id' | 'title' | 'createdAt' | 'thumbnail'
>;

export type WebGuideRequest = Pick<WebGuide, 'title' | 'content' | 'thumbnail'>;
