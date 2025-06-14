import { ReactNode } from "react";

export interface ITag {
    name: string;
    color: string;
    categoryId: string;
    notes: string;
    _id?: any;
    scenes?:IScene[];
    tooltip?:string;
}


  export interface ISceneOccurrence {
    sceneId: IScene; // Populated scene object
    occurrence: number;
    _id: string;
  }
export type TCreateSceneBody = {
    title?: string,
    description?: string,
    fileId: string,
    screenplay?: any,
    userId: any,
    numberOfScriptPages?: string,
    scriptDay?: string,
    notes?: string,
    pointInTime?: string
}
export type TAction = "dismiss" | "like" | "delete" | "edit" | "confirm"


export type TOption = {
    title: string;
    type: "Dialog"|"Screen";
    stateKey?:keyof IShowPopUpState,
    id:"SceneBreakdown" | "AutoScriptBreakdown" | "SceneDetails" | "Reports"|"AutoBreakdown"|"SceneSummary"
}



export interface IShowPopUpState {
    revisionColors: boolean;
    editStatus: boolean;
    automaticBreakdown: boolean,
    sceneDetails: boolean,
    createScene: boolean,
    automaticScriptBreakdown: boolean,
    mergeTags: boolean,
    createTag:boolean,
    statistics:boolean
}


export interface IScene {
    _id: string;
    userId: string;
    fileId: string;
    title: string;
    description: string;
    poster: string;
    pointInTime: string;
    notes: string;
    scriptDay: string;
    sceneNumber: string;
    summary: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }

export interface IPopoverCustom{
    onSelect?: any;
    listClassName?:string;
    buttonContainerClassName?:string;
    popoverContainerClassName?:string
  
}

export interface IDropdownRowElement extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isSelected: boolean;
    onClick?: any;
    index?: number,
    id?: string,


}



export interface ITags {
    _id: string;
    createdBy: string;
    fileId: string;
    categoryId: string;
    sceneId: string;
    byAdmin: boolean;
    name: string;
    notes: string;
    isDeleted: boolean;
    overallOccurrence: number;
    scenesOccurrence: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    scenes?:any[]
}

export interface ICategory {
    _id: string;
    createdBy: string;
    fileId: string;
    byAdmin: boolean;
    name: string;
    color: string;
    tags: ITags[];
    notes:string
}


export type ReactionType = "confirm" | "dismiss" | "like"; // Define the possible types
export interface ISceneComment {
    _id:string;
    sceneId: string;
    userId: string;
    content: string; // Comment content
    createdAt: Date;
    updatedAt?: Date; // If edited, updatedAt will be set
    isEdited: boolean;
    createdBy:{
        _id: string; // Assuming _id is stored as a string representation of ObjectId
        firstName: string;
        lastName: string;
        email: string;
        color: string; // Hexadecimal color code
        shortName: string; // Concatenated first letters of firstName and lastName
        userName:string;
    };
    reactionsGrouped:{
        type:ReactionType;
        count:number
    }[]
  }
  