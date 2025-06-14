// const jwt = require("jsonwebtoken");
// const config = require("../../config");
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Set from "../models/set.model"
import File from "../models/file.model"

const saveSet = asyncHandler(async (req: Request, res: Response) => {
    const { fileId, filmLocationId, name, description } = req.body
    const foundFile = await File.findOne({ _id: fileId }).lean()
    if (foundFile) {
        const data: Record<string, any> = { fileId, name };

        if (filmLocationId) data.filmLocationId = filmLocationId;
        if (description) data.description = description;

        const saved = await Set.create(data);
        res.status(200).json({ data: saved, success: true })
    } else {
        res.status(400).json({ success: false, error: "Invalid Project ID" })
    }
})

const updateSet = asyncHandler(async (req: Request, res: Response) => {
    console.log("************Update Set working Fine*************");
    const { filmLocationId, name, description } = req.body
    const { id } = req.params
    const foundSet = await Set.findOne({ _id: id, isDeleted: false }).lean()
    if (foundSet) {
        const updatedData = {
            filmLocationId: filmLocationId,
            name: name,
            description: description
        }
        console.log("Data =>", updatedData);
        const updatedRecord = await Set.findByIdAndUpdate(id, updatedData, { new: true })
        res.status(200).json({ success: true, data: updatedRecord })
    } else {
        res.status(400).json({ success: false, error: "Invalid Set ID" })
    }
})
const deleteSet = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const foundSet = await Set.findOne({ _id: id, isDeleted: false }).lean()
    if (foundSet) {
        const updatedRecord = await Set.findByIdAndUpdate(id, { isDeleted: true })
        res.status(200).json({ success: true, messaage: "Successfully Deleted" })
    } else {
        res.status(400).json({ success: false, error: "Invalid Set ID" })
    }
})
const getSet = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const foundFile = await File.findOne({ _id: id }).lean()
    if (foundFile) {
        const sets = await Set.find({ fileId: id, isDeleted: false }, { _id: 1, name: 1 }).lean()
        res.status(200).json({ success: true, data: sets })
    } else {
        res.status(400).json({ success: false, error: "Invalid project IDs" })
    }
})

export default {
    saveSet,
    updateSet,
    deleteSet,
    getSet
}