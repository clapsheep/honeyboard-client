export interface Tag {
    id: string;
    name: string;
}

export interface AlgorithmProblem {
    id: string;
    title: string;
    url: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    tags: Tag[];
}

export interface AlgorithmConcept {
    id: string;
    title: string;
    userId: string;
    generationId: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface AlgorithmConceptDetail extends AlgorithmConcept {
    content: string;
}
