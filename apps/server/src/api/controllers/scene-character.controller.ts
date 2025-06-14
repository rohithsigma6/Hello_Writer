// const jwt = require("jsonwebtoken");
// const config = require("../../config");
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import File from "../models/file.model"
import Tag, { ITag } from "../models/tag.model";

import Category from "../models/category.model";
import mongoose from "../../config/mongoose";

const createCharacterElement = asyncHandler(async (req: Request, res: Response) => {
    const { fileId, name, userId } = req.body
    const { type } = req.params

    const characterObj = await Category.findOne({ name: type, isDeleted: false, byAdmin: true }, { _id: 1 }).lean()
    console.log("CharacterObj =>", characterObj);
    if (characterObj) {
        var data = {
            createdBy: userId,
            fileId: fileId,
            name: name,
            categoryId: characterObj?._id
        }
        const savedTag = await Tag.create(data)
        // console.log("Saved =>" , savedTag._id);
        res.ok(data)
    } else {
        res.status(400).json({ success: false, error: "Character category is missings" })
    }
    
})

const getCharacterAndExtras = asyncHandler(async (req: Request, res: Response) => {
    const { id, name } = req.params
    if (!["Characters", "Extras"].includes(name)) {
        res.status(400).json({ success: false, message: "Send either Characters or Extras" })
    }
    const foundFile = await File.findOne({ _id: id }).lean()

    if (foundFile) {
        const characterObj = await Category.findOne({ name, isDeleted: false, byAdmin: true, fileId:foundFile._id }, { _id: 1, name }).lean()
        const data = await Tag.find({ 
            fileId: new mongoose.Types.ObjectId(foundFile._id as string), 
            categoryId: new mongoose.Types.ObjectId(characterObj?._id as string), 
            isDeleted: false 
        }).lean()
        res.status(200).json({ success: true, data: data, characterObj })
    } else {
        res.status(400).json({ success: false, error: "Invalid project IDs" })
    }
})

export default {
    createCharacterElement,
    getCharacterAndExtras,

}