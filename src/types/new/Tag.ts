export interface Tag {
    id: string;
    name: string;
}
export type TagResponse = Pick<Tag, 'id' | 'name'>;
export type TagRequest = Pick<Tag, 'name'>;
