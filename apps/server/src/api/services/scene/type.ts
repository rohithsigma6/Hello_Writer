export interface Document {
    type: string;
    content: ContentObject[];
}; 

export interface ContentObject {
    type: string;
    text?: string;
    marks?: Mark[];
    attrs?: { class: string };
    content?: ContentObject[];
};
export interface Mark {
    type: string;
    attrs?: {
        class?: string;
        color?: string;
        _id?: string;
        notes?: string;
        name?: string;
        categoryId?: string;
    };
}
export interface CharacterObject {
    name: string;
}