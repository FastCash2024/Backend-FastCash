import {writeNewsletter, readNewsletter, updateNewsletter, deleteNewsletter} from '../controllers/newslaterController.js';
import express from 'express';

const router = express.Router();

router.post('/', writeNewsletter);
router.get('/', readNewsletter);
router.put('/update/:id', updateNewsletter);
router.delete('/delete/:id', deleteNewsletter);
export default router;
