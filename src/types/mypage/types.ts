import {
    AlgorithmConcept,
    AlgorithmSolution,
    WebConcept,
    WebRecommend,
} from '../study';

export interface BookmarkAPIRequestType {
    id: string;
    contentType:
        | 'web_recommend'
        | 'web_concept'
        | 'algo_solution'
        | 'algo_guide';
    contentId: string;
}

export type BookmarkContentTypeMap = {
    web_recommend: WebRecommend[];
    web_concept: WebConcept[];
    algo_solution: BookmarkedAlgorithmSolution[];
    algo_guide: AlgorithmConcept[];
};
export type BookmarkedAlgorithmSolution = Pick<
    AlgorithmSolution,
    'solutionId' | 'Author' | 'runtime' | 'memory' | 'languageId'
> & {
    solutionTitle: string;
};
