import { AlgorithmGuideListResponse } from './AlgorithmGuide';
import { AlgorithmSolutionListResponse } from './AlgorithmSolution';
import { WebGuideListResponse } from './WebGuide';
import { WebRecommendListResponse } from './WebRecommend';

export interface BookmarkAPIRequestType {
    contentType: ContentType;
    contentId: string;
}
export type ContentType =
    | 'ALGO_GUIDE'
    | 'ALGO_SOLUTION'
    | 'WEB_GUIDE'
    | 'WEB_RECOMMEND';
export type BookmarkedResponse = {
    bookmarked: boolean;
};
export type BookmarkContent = {
    WEB_RECOMMEND: WebRecommendListResponse[];
    WEB_GUIDE: WebGuideListResponse[];
    ALGO_SOLUTION: AlgorithmSolutionListResponse[];
    ALGO_GUIDE: AlgorithmGuideListResponse[];
};
