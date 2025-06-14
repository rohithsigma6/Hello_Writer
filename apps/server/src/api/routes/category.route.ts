// const router = require("express").Router();
// const { categoryController } = require("../controllers");
// const { validateTag } = require("../validation");
import { Router } from "express";
import { categoryController } from "../controllers";
import { validateTag } from "../validation";


const router = Router();

router.get("/",categoryController.getCategories)
router.post("/create",  categoryController.createCategory)
router.patch("/:categoryId" ,categoryController.updateCategory)
router.delete("/:categoryId", categoryController.deleteCategoryById)


export default router;
