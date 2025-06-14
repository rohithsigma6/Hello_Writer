import mongoose, { Document, Schema } from "mongoose";
export interface ICharacterRelationship extends Document {
  fileId: mongoose.Schema.Types.ObjectId;
  characterId: mongoose.Schema.Types.ObjectId;
  connections: { id: mongoose.Schema.Types.ObjectId; relationship: string }[];
  position: { x: number; y: number };
}

const characterRelationshipSchema = new Schema<ICharacterRelationship>(
  {
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    characterId: { type: Schema.Types.ObjectId, ref: "CharacterProfile", required: true },
    connections: [
      {
        id: { type: Schema.Types.ObjectId, ref: "CharacterProfile", required: true },
        relationship: { type: String, required: true },
      },
    ],
    position: {
      x: { type: Number },
      y: { type: Number },
    },
  },
  { timestamps: true }
);

const CharacterRelationship = mongoose.model<ICharacterRelationship>(
  "CharacterRelationship",
  characterRelationshipSchema
);

export default CharacterRelationship;
