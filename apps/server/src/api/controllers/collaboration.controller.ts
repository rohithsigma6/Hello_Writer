import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createCollaborationService,
} from "../services/collaboration/collaboration.service";
import { getAllFileService } from "../services/file/file.service";

const createCollaboration = asyncHandler(async (req: Request, res: Response) => {
  const { resourceId, collaborators, resourceType } = req.body;
  const collaboration = await createCollaborationService({
    resourceId,
    collaborators,
    resourceType
  });
  res.status(200).json({ collaboration });
});

const removeCollaborator = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { Files } = await getAllFileService({ userId });
  res.status(200).json({ Files });
});

export default {
  createCollaboration,
  removeCollaborator,
};