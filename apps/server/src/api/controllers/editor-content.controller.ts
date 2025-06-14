// const jwt = require("jsonwebtoken");
// const config = require("../../config");
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Scene from "../models/scene.model"
import EditorContent from "../models/editor-content.model"

const updateContent = asyncHandler(async(req:Request,res:Response)=>{
    // const userId = req.user?._id
    const {content,fileId,sceneId,userId} = req.body
    const foundScene = await Scene.findOne({_id:sceneId , fileId:fileId , isDeleted:false})
    if(foundScene){
        const foundEditorContent = await EditorContent.findOne({sceneId:sceneId , isDeleted:false}).lean()
        if(foundEditorContent){
            const updatedData = await EditorContent.findByIdAndUpdate(foundEditorContent._id,{content:content},{new:true})
            res.status(200).json({success:true,data:updatedData})
        }else{
            res.status(400).json({success:false,error:"Content is not Present"})
        }
    }else{
        res.status(400).json({success:false,error:"Invalid Scene or fileId Id"})
    }
})

const getContent = asyncHandler(async(req:Request,res:Response)=>{
    const {fileId,sceneId} = req.params
    const data = await EditorContent.findOne({sceneId:sceneId , fileId:fileId , isDeleted:false})
    res.status(200).json({success:true,data:data})
})
const deleteContent = asyncHandler(async (req:Request , res:Response)=>{
    const {sceneId} = req.params
    const foundEditorContent = await EditorContent.findOne({sceneId:sceneId , isDeleted:false}).lean()
    if(foundEditorContent){
        const updatedData = await EditorContent.findByIdAndUpdate(foundEditorContent._id,{content:{}},{new:true})
        res.status(200).json({success:true,message:"Deleted Successfully"})
    }else{
        res.status(400).json({success:false,error:"Content is not Present"})
    }
})


export default {
    updateContent,
    getContent,
    deleteContent
}