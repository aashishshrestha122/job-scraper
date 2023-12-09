import bcrypt from "bcrypt";
import HttpStatus from "http-status-codes";

import * as security from "../utils/security.js";
import pool from "../db.js";
import config from "../config.js";
import AuthenticationError from '../errors/authentication.js';

/**
 *
 * @param {*} user
 * @returns
 */
export const getAllJobs = async ({ page, perPage, sortBy, sortDirection, searchText }) => {
    const startIndex = (page - 1) * perPage;

    const query = `SELECT * FROM jobs ORDER BY ${sortBy} ${sortDirection} LIMIT ${perPage} OFFSET 0`;
    console.log('query', query);

    const result = await pool.query(query);
    console.log('result', result.rows);
    return result.rows;
};