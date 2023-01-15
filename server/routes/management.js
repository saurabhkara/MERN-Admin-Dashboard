import express from 'express';
const router = express.Router();
import { getAdmins, getUserPerformance} from '../controller/management.js';

router.get('/admins', getAdmins);
router.get('/performance/:id', getUserPerformance)

export default router;