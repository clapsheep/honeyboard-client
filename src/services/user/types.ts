export interface bookMarkType {
    contentType: contentType;
    contentId: string;
}
export type contentType =
    | 'algo_guide'
    | 'algo_solution'
    | 'web_guide'
    | 'web_recommend';
