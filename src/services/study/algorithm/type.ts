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
