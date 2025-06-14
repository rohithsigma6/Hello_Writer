import { Router } from 'express';
import { getIndividualMessages, getGroupMessages, getChatHistory } from '../controllers/message.controller';

const router = Router();

router.get('/getIndividual-message/:roomId/:senderId/:receiverId', getIndividualMessages);
router.get('/getGroup-message/:roomId', getGroupMessages);
router.get('/getChat-history/:roomId', getChatHistory);

export default router;
