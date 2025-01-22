import { BookmarkedResponse } from './common';

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

export type WebGuideListResponse = Pick<
    WebGuide,
    'id' | 'title' | 'thumbnail' | 'createdAt'
>;

export type WebGuideDetailResponse = Pick<
    WebGuide,
    'id' | 'title' | 'content' | 'createdAt'
> & { authorId: WebGuide['userId']; authorName: string } & BookmarkedResponse;

export type WebGuideRequest = Pick<WebGuide, 'title' | 'content' | 'thumbnail'>;
