import mongoose, { Schema } from "mongoose";

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

export interface ContentItem {
    type: string;
    marks?: Mark[];
    text: string;
}

export interface TaggedWord {
    text: string;
    category: string;
}
export interface ContentObject {
    type: string;
    text?: string;
    marks?: Mark[];
    attrs?: { class: string };
    content?: ContentObject[];
};
export interface ParagraphContent {
    type: "text";
    text: string;
    marks?: {
        type: "CustomTag";
        attrs: {
            class: string;
            color: string;
            _id?: string;
            notes: string;
            name: string;
            categoryId: string;
            tooltip: string;
        };
    }[];
};
export interface Paragraph {
    type: "paragraph";
    content: ParagraphContent[];
};

export interface paragraphDocument {
    type: "doc";
    content: Paragraph[];
};

export interface Document {
    type: string;
    content: ContentObject[];
};

export interface ScreenplayContent {
    type: string;
    attrs: { class: string };
    content: ContentItem[];
}

export interface DocumentData {
    type: string;
    content: ScreenplayContent[];
}

export interface Tag {
    _id?: string;
    name?: string;
    color?: string;
}
export interface WordTagResponse {
    type: "CustomTag";
    attrs: {
        class: string;
        color: string;
        categoryId: string;
        notes: string;
        tooltip: string
    };
    assignText: string
};
