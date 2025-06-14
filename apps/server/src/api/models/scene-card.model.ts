import mongoose, { Document, Schema } from "mongoose";

// Interface for Scene Essentials
interface ISceneEssentials {
  photo: string;
  type: string;
  location: string;
  timeOfDay: string;
  title: string;
  brief: string;
  characters: string;
  pov: string;
  timePeriod: string;
  hook: string;
  purpose: string;
  conflict: string;
  climax: string;
  characterGoal: string;
  characterDevelopment: string;
  sensoryDetail: string;
}

interface IFreeform {
  type: string;
  location: string;
  timeOfDay: string;
  title: string;
  brief: string;
}
// Interface for Proactive Scene
interface IProactiveScene {
  photo: string;
  type: string;
  location: string;
  timeOfDay: string;
  title: string;
  brief: string;
  characters: string;
  goal: string;
  timePeriod: string;
  hook: string;
}

// Interface for Reactive Scene
interface IReactiveScene {
  photo: string;
  type: string;
  location: string;
  timeOfDay: string;
  title: string;
  characters: string;
  reaction: string;
  dilemma: string;
  decision: string;
}

// Interface for Scene Cause and Effect
interface ISceneCauseAndEffect {
  proactiveScene: IProactiveScene;
  reactiveScene: IReactiveScene;
}

// SceneCard Interface
export interface ISceneCard extends Document {
  createdBy?: mongoose.Schema.Types.ObjectId;
  fileId?: mongoose.Schema.Types.ObjectId;  
  act:string;
  order:Number;
  beatName:String;
  plotThreadId?: mongoose.Schema.Types.ObjectId[];  
  type: string;
  location: string;
  timeOfDay: string;
  title: string;
  scene: string;
  themeExploration: string;
  photo: string[];
  dynamic: number;
  brief: string;
  scenePhoto?: string;
  characters: mongoose.Schema.Types.ObjectId[];  
  freeform: IFreeform;
  sceneEssentials: ISceneEssentials;
  sceneCauseandEffect: ISceneCauseAndEffect;
  template: string;
  selectedTemplate?: "sceneEssentials" | "sceneCauseandEffect" | "freeform" | "none"
  slug: string;
  writeFreely: boolean;
  emotions: {
    name: string;
    intensity: number;
  }[];
  variables?: Record<string, any>;
  status?: "draft" | "finalize";
  isDeleted?: boolean;
}

// Scene Essentials Schema
const SceneEssentialsSchema = new Schema<ISceneEssentials>({
  photo: { type: String },
  type: { type: String },
  location: { type: String },
  timeOfDay: { type: String },
  title: { type: String },
  brief: { type: String },
  characters: { type: String },
  pov: { type: String },
  timePeriod: { type: String },
  hook: { type: String },
  purpose: { type: String },
  conflict: { type: String },
  climax: { type: String },
  characterGoal: { type: String },
  characterDevelopment: { type: String },
  sensoryDetail: { type: String },
});

// Proactive Scene Schema
const ProactiveSceneSchema = new Schema<IProactiveScene>({
  photo: { type: String },
  type: { type: String },
  location: { type: String },
  timeOfDay: { type: String },
  title: { type: String },
  brief: { type: String },
  characters: { type: String },
  goal: { type: String },
  timePeriod: { type: String },
  hook: { type: String },
});

// Reactive Scene Schema
const ReactiveSceneSchema = new Schema<IReactiveScene>({
  photo: { type: String },
  type: { type: String },
  location: { type: String },
  timeOfDay: { type: String },
  title: { type: String },
  characters: { type: String },
  reaction: { type: String },
  dilemma: { type: String },
  decision: { type: String },
});

// Scene Cause and Effect Schema
const SceneCauseAndEffectSchema = new Schema<ISceneCauseAndEffect>({
  proactiveScene: { type: ProactiveSceneSchema },
  reactiveScene: { type: ReactiveSceneSchema },
});

const freeFormSchema = new Schema<IFreeform>({
  type: { type: String },
  location: { type: String },
  timeOfDay: { type: String },
  title: { type: String },
  brief: { type: String },  
});


const SceneCardSchema = new Schema<ISceneCard>(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
    plotThreadId: [{ type: mongoose.Schema.Types.ObjectId, ref: "PlotThread" }],
    act:{type:String},
    beatName:{type:String},
    order:{type:Number},
    type: { type: String },
    location: { type: String },
    timeOfDay: { type: String },
    title: { type: String },
    brief: { type: String },  
    scene : { type: String },
    dynamic: { type: Number , default: 0},
    photo: [{ type: String }],
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "CharacterProfile" }],
    themeExploration: { type: String, enum: ["Explored", "Challenged", "Stated"] },
    scenePhoto: { type: String },
    sceneEssentials: { type: SceneEssentialsSchema },
    sceneCauseandEffect: { type: SceneCauseAndEffectSchema },
    freeform: { type: freeFormSchema },
    selectedTemplate: {
      type: String,
      enum: ["sceneEssentials", "sceneCauseandEffect", "freeform", "none"],
      default: "none",
      required: true
    },
    template: { type: String },
    slug: { type: String },
    writeFreely: { type: Boolean, default: false },
    variables: { type: Schema.Types.Mixed },
    emotions: [
      {
        name: { type: String, required: true },
        intensity: { type: Number, min: 0, max: 10, required: true }
      }
    ],
    status: { type: String, enum: ["draft", "finalize"], default: "draft" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create Model
const SceneCard = mongoose.model<ISceneCard>("SceneCard", SceneCardSchema);

export default SceneCard;
