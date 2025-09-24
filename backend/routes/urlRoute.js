import express from 'express';
import { handleCreateUrl, handleRedirect, handleGetAllUrl, handleDeleteUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/getUrl', handleCreateUrl);
router.get('/getAllUrl', handleGetAllUrl);
router.delete('/delete/:shortId', handleDeleteUrl);
router.get('/:shortId', handleRedirect);

export default router;