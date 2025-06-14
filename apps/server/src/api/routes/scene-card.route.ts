import { Router } from 'express';
import sceneCardController from '../controllers/scene-card.controller';
import upload from '../../lib/multer';

const router = Router();

router.post('/create-or-update', upload.any(), sceneCardController.createOrUpdateScene);
router.post('/scene', upload.any(), sceneCardController.createScene);

router.post('/sceneWithTemplate',upload.any(), sceneCardController.createSceneWithTemplet);
router.post('/update-status/:sceneId', sceneCardController.updateSceneStatus);

router.post('/plot-thread', sceneCardController.createPlotThread);
router.get('/plot-thread/fileId/:fileId', sceneCardController.getPlotThreadByFileId);
router.put('/plot-thread/:plotThreadId', sceneCardController.updatePlotThread);
router.delete('/plot-thread/:plotThreadId', sceneCardController.deletePlotThread);

router.get('/:id', sceneCardController.getSceneById);
router.get('/', sceneCardController.getAllScenes)
router.post("/getAllScenesByFileId",sceneCardController.getAllScenesByFileId )

export default router;
