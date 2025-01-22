export interface Tag {
    id: string;
    name: string;
}
export type TagResponse = Pick<Tag, 'id' | 'name'>;
