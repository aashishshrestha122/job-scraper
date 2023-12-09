import { Router } from 'express';

import * as jobController from '../controllers/jobs/index.js';

import { verifyRefreshToken, verifyToken } from '../middleware/tokenValidator.js';

const router = Router();

/**
 * POST /auth/create-user
 */
router.post('/get-all-jobs', jobController.getAllJobs);


export default router;