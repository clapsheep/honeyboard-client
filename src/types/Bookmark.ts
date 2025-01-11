import { AlgorithmGuideListResponse } from './AlgorithmGuide';
import { AlgorithmSolutionListResponse } from './AlgorithmSolution';
import { WebGuideListResponse } from './WebGuide';
import { WebRecommendListResponse } from './WebRecommend';

export interface BookmarkAPIRequestType {
    id: string;
    contentType: 'web_recommend' | 'web_guide' | 'algo_solution' | 'algo_guide';
    contentId: string;
}

export type BookmarkContent = {
    web_recommend: WebRecommendListResponse[];
    web_guide: WebGuideListResponse[];
    algo_solution: AlgorithmSolutionListResponse[];
    algo_guide: AlgorithmGuideListResponse[];
};
