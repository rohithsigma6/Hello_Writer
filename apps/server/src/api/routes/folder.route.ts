import { Router } from 'express'
import { validateFolder } from '../validation'
import folderController from '../controllers/folder.controller'

const router = Router()

router.post(
  '/create',
  validateFolder.createFolder,
  folderController.createFolder
)

router.put(
  '/:folderId',
  validateFolder.updateFolder,
  folderController.updateFolder
)

router.get('/:folderId', folderController.getFolderById)
router.post('/:folderId/collaborate', folderController.collaborateFolder)
router.post('/:folderId/duplicate', folderController.duplicateFolder)
router.put('/:folderId/rename', folderController.updateFolder)
router.post('/:folderId/add_files', folderController.addFilesToFolder)
router.post('/:folderId/remove_files', folderController.deleteFilesFromFolder)
router.get('/:folderId/collaborators', folderController.getFolderCollaborators)
router.delete(
  '/:folderId/collaborator',
  folderController.deleteFolderCollaborator
)

router.get('/', folderController.getAllFolders)
router.get('/trash/folders', folderController.getAllTrashFolders)
router.get('/archive/folders', folderController.getAllArchiveFolders)
router.post('/delete/folders', folderController.deleteFolders)

export default router
