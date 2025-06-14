import { Router } from 'express'
import { FileController } from '../controllers'
import { validateFile } from '../validation'
import multer from 'multer'
const storage = multer.memoryStorage() // Store file in memory
const upload = multer({ storage }) // Use memory storage
const router = Router()

router.get('/', FileController.getAllFiles)
router.get('/archive/files', FileController.getAllArchiveFiles)
router.get('/trash/files', FileController.getAllTrashFiles)

router.get('/:fileId', FileController.getSingleFile)
router.post('/:fileId/screenplay', FileController.getScreenplayJson)
router.post(
  '/create',
  upload.single('file'),
  validateFile.createFile,
  FileController.createFile
)
router.post(
  '/upload/importFile',
  upload.single('file'),
  FileController.importFile
)

router.post('/:fileId/collaborate', FileController.collaborateFile)
router.post('/:fileId/duplicate', FileController.duplicateFile)
router.put('/:fileId/rename', FileController.updateFile)
router.put('/:fileId/createnewversion', FileController.createNewVersion)

router.delete('/:fileId/collaborator', FileController.deleteFileCollaborator)
router.get('/:fileId/collaborators', FileController.getFileCollaborators)

// router.delete('/:fileId', FileController.deleteFile)
router.post('/delete/files', FileController.deleteFiles)
router.post('/:fileId', FileController.updateFile)
router.post('/:fileId/revision', FileController.addFileRevision)
router.get('/:fileId/revision', FileController.getFileRevision)

export default router
