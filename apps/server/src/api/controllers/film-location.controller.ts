// const jwt = require("jsonwebtoken");
// const config = require("../../config");
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import FilmLocation ,{IFilmLocation} from "../models/film-location.model"
import File ,{IFile} from "../models/file.model"

const saveFilmLocation = asyncHandler(async(req:Request , res:Response)=>{
    const {fileId,street,name,postalcode,note,cityStateProv,country} = req.body
    const foundFile = await File.findOne({_id:fileId}).lean()
    if(foundFile){
        const data= {
            fileId,
            street:street,
            name:name,
            postalCode:postalcode,
            cityAndState:cityStateProv,
            country:country,
            note:note
        }
        const saved = await FilmLocation.create(data)
        res.status(200).json({data:saved,success:true})
    }else{
        res.status(400).json({success:false,error:"Invalid File ID"})
    }
})

// const updateSet = asyncHandler(async(req:Request, res:Response)=>{
//     console.log("************Update Set working Fine*************");
//     const {filmLocationId,name,description} = req.body
//     const {id} = req.params
//     const foundSet = await Set.findOne({_id:id,isDeleted:false}).lean()
//     if(foundSet){
//         const updatedData = {
//             filmLocationId:filmLocationId  ,
//             name:name ,
//             description:description
//         }
//         console.log("Data =>" , updatedData);
//         const updatedRecord = await Set.findByIdAndUpdate(id,updatedData, {new:true})
//         res.status(200).json({success:true,data:updatedRecord})
//     }else{
//         res.status(400).json({success:false,error:"Invalid Set ID"})
//     }
// })
// const deleteSet= asyncHandler(async(req:Request,res:Response)=>{
//     const {id} = req.params
//     const foundSet = await Set.findOne({_id:id,isDeleted:false}).lean()
//     if(foundSet){
//         const updatedRecord = await Set.findByIdAndUpdate(id,{isDeleted:true})
//         res.status(200).json({success:true,messaage:"Successfully Deleted"})
//     }else{
//         res.status(400).json({success:false,error:"Invalid Set ID"})
//     }
// })
const getFilmLocation = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params
    const foundFile = await File.findOne({_id:id}).lean()
    console.log("fileId Found =>" , foundFile);
    console.log("ID =>" , id);
    if(foundFile){
        const filmLocation = await FilmLocation.find({fileId:id,isDeleted:false},{_id:1,name:1}).lean()
        res.status(200).json({success:true,data:filmLocation})   
    }else{
        res.status(400).json({success:false,error:"Invalid fileId IDs"})   
    }
})

export default {
    saveFilmLocation,
    // updateSet,
    // deleteSet,
    getFilmLocation
}