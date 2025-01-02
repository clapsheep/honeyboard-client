export interface Tag {
    id: string;
    name: string;
}

export interface AlgorithmConcept {
    id: string;
    title: string;
    thumbnail: string;
    userId: string;
    generationId: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
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

export interface AlgorithmConceptDetail extends AlgorithmConcept {
    content: string;
}
