import mongoose, { Document, Schema } from "mongoose";

export interface IScene extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  fileId:mongoose.Schema.Types.ObjectId;
  setId:mongoose.Schema.Types.ObjectId;
  filmLocationId: mongoose.Schema.Types.ObjectId;
  title: string;
  estimatedMin: number;
  estimatedSec: number;
  scheduleMin: number;
  scheduleSec: number;
  description: Record<string, any>;
  poster?: string;
  sceneImage?: string;
  slug?: string;
  screenplay?: Buffer;
  characters?: [mongoose.Schema.Types.ObjectId];
  templateVariables?:Record<string, any>;
  locations?: Record<string, any>;
  sceneNumber?:Record<string, any>;
  scriptDay:Record<string, any>;
  notes:Record<string, any>;
  pointInTime:Record<string, any>;
  environment : string,
  time : string,
  pages : string,
  summary:Record<string, any>;
  isDeleted:boolean
}

const sceneSchema = new Schema<IScene>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    setId: { type: Schema.Types.ObjectId, ref: "Set", required: false },
    filmLocationId: { type: Schema.Types.ObjectId, ref: "filmLocation", required: false },
    title: { type: String , default: ""},
    description: { type: String, default: "" },
    estimatedMin:{ type:Number, default:0 },
    estimatedSec:{ type:Number, default:0 },
    scheduleMin:{ type:Number, default:0 },
    scheduleSec:{ type:Number, default:0 },
    poster: { type: String , default: ""},
    screenplay: { type: Buffer },
    sceneImage: { type: String , default: ""},
    slug:{type:String},
    characters: [ { type: Schema.Types.ObjectId, ref:"SceneCharacter",required:false}],
    templateVariables:{type:Schema.Types.Mixed, default:''},
    // characters: { type: Schema.Types.Mixed },
    locations: { type: Schema.Types.Mixed, default:'' },
    pointInTime:{type: Schema.Types.Mixed, default:''},
    notes:{type: Schema.Types.Mixed, default:''},
    scriptDay:{type: Schema.Types.Mixed, default:''},
    sceneNumber:{type: Schema.Types.Mixed, default:''},
    environment: { type:String, default: "INT"},
    pages: { type:String, default: ""},
    time: { type:String, default: ""},
    summary: { type: String , default: ""},
    isDeleted: { type:Boolean , default:false}
  },
  { timestamps: true }
);

const Scene = mongoose.model<IScene>("Scene", sceneSchema);

export default Scene;