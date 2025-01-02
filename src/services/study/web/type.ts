export interface WebRecommend {
    id: string;
    title: string;
    url: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
export interface WebConcept {
    id: string;
    title: string;
    userId: string;
    thumbnail: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface WebRecommendDetail extends WebRecommend {
    content: string;
}
export interface WebConceptDetail extends WebConcept {
    content: string;
}
