import { Router } from "express";
import { characterController } from "../controllers";
import upload from "../../lib/multer";

const router = Router();

router.post("/save",upload.single('photo'), characterController.saveCharacter);
router.post("/smart-type/save", characterController.saveFreeformCharacter);
router.get("/smart-type/finalize/:fileId", characterController.getAllFinalizeCharacter);

router.post("/relationship", characterController.upsertCharacterRelationship);

router.get("/allCharacterRelationship/:fileId", characterController.allCharacterRelationship);
router.get("/relationship/:fileId", characterController.getRelationshipByFileId);
router.get("/relationship/id/:relationshipId", characterController.getRelationshipByRelationshipId);

router.post("/relationship/position", characterController.addCharacterPosition);
router.post("/relationship/removeConnection", characterController.removeConnection);



router.get("/file/:fileId", characterController.getCharactersByFileId);
router.get("/ai/:type", characterController.getAITypeData);

router.get("/:id", characterController.getCharacterById);
router.put("/:id/status", characterController.updateCharacterStatus);
router.put("/:id/:selectedTemplate/template",upload.single('photo'), characterController.updateCharacterById);
router.delete("/:id", characterController.deleteCharacterById);

export default router;
