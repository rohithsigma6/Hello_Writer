import { Router } from 'express'
import { userController } from './controllers'
import authMiddleware, { adminAuth } from './middlewares/auth.middleware'
import requestLogger from '../api/middlewares/logger.middleware'
import roleSelectMiddleware from './middlewares/roleselect.middleware'
import authRoutes from './routes/auth.route'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user.route'
import profileRoutes from './routes/user-profile.route'
import FileRoutes from './routes/file.route'
import FeedbackRoutes from './routes/feedback.route'
import coWriterRoutes from './routes/co-writer.route'
import statusRoutes from './routes/status.route'
import paymentRoutes from './routes/payment.route'
import timerRoutes from './routes/timer.route'

import folderRoutes from './routes/folder.route'
import versionHistoryRoutes from './routes/version-history.route'
import awsRoutes from './routes/aws.route'
import contactRoutes from './routes/contact.route'
import categoryRoutes from './routes/category.route'
import sceneRoutes from './routes/scene-card.route'
import setRoutes from './routes/set.route'
import filmLocationRoutes from './routes/film-location.route'
import sceneCharacterRoutes from './routes/secene-character.route'
import editorContentRoutes from './routes/editor-content.route'
import sceneCommentRoutes from './routes/scene-comment.route'
import tagRoutes from './routes/tag.route'
import plotRoutes from './routes/plot.route'
import messageRoutes from './routes/message.route'
import streamRoutes from './routes/stream.route'
import featureRoutes from './routes/feature.route'
const router = Router()

router.use(requestLogger)
router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)

router.use('/contact', contactRoutes)
router.use('/payment', paymentRoutes)

router.post(
  '/send-verification-email',
  userController.sendVerificationEmailHandler
)
router.post(
  '/role-select',
  roleSelectMiddleware,
  userController.updateUserHandler
)

// router.use(authMiddleware);

router.use('/user', authMiddleware, userRoutes)
router.use('/profile', authMiddleware, profileRoutes)
router.use('/file', authMiddleware, FileRoutes)
router.use('/feedback', authMiddleware, FeedbackRoutes)
router.use('/co-writer', authMiddleware, coWriterRoutes)
router.use('/status', authMiddleware, statusRoutes)

router.use('/folder', authMiddleware, folderRoutes)
router.use('/stream', authMiddleware, streamRoutes)
router.use('/payment', authMiddleware, paymentRoutes)
router.use('/daily-goal', authMiddleware, timerRoutes)
router.use('/message', authMiddleware, messageRoutes)

router.use('/version-history', authMiddleware, versionHistoryRoutes)
router.use('/scene', authMiddleware, sceneRoutes)
router.use('/set', authMiddleware, setRoutes)
router.use('/film-location', authMiddleware, filmLocationRoutes)
router.use('/scene-character', authMiddleware, sceneCharacterRoutes)
router.use('/editor-content', authMiddleware, editorContentRoutes)
router.use('/category', authMiddleware, categoryRoutes)
router.use('/scene-comment', authMiddleware, sceneCommentRoutes)
router.use('/aws', authMiddleware, awsRoutes)
router.use('/tag', authMiddleware, tagRoutes)
router.use('/plot', authMiddleware, plotRoutes)

export default router
