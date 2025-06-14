import mongoose, { Document, Schema } from "mongoose";

export interface ISceneCharacter extends Document {
  fileId:mongoose.Schema.Types.ObjectId;
  name: string;
  isDeleted:boolean;

}

const sceneCharacterSchema = new Schema<ISceneCharacter>(
  {
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    name:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const SceneCharacter = mongoose.model<ISceneCharacter>("SceneCharacter", sceneCharacterSchema);

export default SceneCharacter;