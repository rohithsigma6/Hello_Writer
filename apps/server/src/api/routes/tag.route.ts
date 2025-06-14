// const router = require("express").Router();
// const { tagController } = require("../controllers");
// const { validateTag } = require("../validation");
import { Router } from "express";
import { tagController } from "../controllers";
import { validateTag } from "../validation";


const router = Router();

router.get("/",tagController.getTags)
// router.post("/create", validateTag.createTag , tagController.createTag)
router.post("/create", tagController.createTag)
router.post("/groupDelete", tagController.groupDeleteTag)
router.patch("/:tagId" ,tagController.updateTag)
router.delete("/:tagId", tagController.deleteTag)
router.post("/merge", tagController.mergeTags)
router.get(`/get-by-id/:tagId`, tagController.getById)
router.post("/auto" ,tagController.autoTagging)
router.post("/auto-tag-script", tagController.autoScriptTagging)

export default router;
