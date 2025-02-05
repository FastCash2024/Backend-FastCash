import {writeNewsletter, readNewsletter} from '../controllers/newslaterController.js';
import express from 'express';

const router = express.Router();

router.post('/', writeNewsletter);
router.get('/', readNewsletter);
export default router;
