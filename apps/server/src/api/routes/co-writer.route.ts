import { Router } from 'express'
import { coWriterController } from '../controllers'
import { validateTag } from '../validation'
import templateRoutes from './template.route'
import locationRoutes from './location.route'
import storyWorldRoutes from './story_world.route'
import storyArcRoutes from './story-arc.route'
import characterRoutes from './character.route'
import sceneCardRoutes from './scene-card.route'
import loglineRoutes from './co-writer/logline.route'
import themeRoutes from './co-writer/theme.route'
import upload from '../../lib/multer'

const router = Router()

router.use('/template', templateRoutes)
router.use('/location', locationRoutes)
router.use('/story-world', storyWorldRoutes)
router.use('/story-arc', storyArcRoutes)
router.use('/scene-card', sceneCardRoutes)
router.use('/character', characterRoutes)
router.use('/logline', loglineRoutes)
router.use('/theme', themeRoutes)
// router.get('/get-templates-name/:id', coWriterController.getTemplates)
// router.get('/get-modules', coWriterController.getModules)
// router.get('/get-template-info', coWriterController.getTemplateInfo)
// router.get('/get-all-templates', coWriterController.getAllTemplates)
router.post('/save-scene', coWriterController.saveScene)
router.post('/update-scene', coWriterController.updateScene)
// router.delete('/:id', coWriterController.deleteTemplate)
router.post(
  '/update-scene-image',
  upload.single('file'),
  coWriterController.updateSceneImage
)

export default router
