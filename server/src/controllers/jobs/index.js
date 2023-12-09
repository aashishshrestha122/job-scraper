import HttpStatus from 'http-status-codes';

import * as jobService from '../../services/job.js';
import { verifyToken, authenticateUserToken } from '../../middleware/tokenValidator.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export async function getAllJobs(req, res, next) {
    try {
        const data = await jobService.getAllJobs(req.body);
        return res.status(HttpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
}