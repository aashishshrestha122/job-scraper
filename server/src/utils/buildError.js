import HttpStatus from 'http-status-codes';

import TokenError from '../errors/token.js';
import AuthenticationError from '../errors/authentication.js';

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
    // Custom errors
    if (err.isCustom) {
        // TODO: Handle different instances of error

        if (err instanceof TokenError || err instanceof AuthenticationError) {
            return {
                code: HttpStatus.UNAUTHORIZED,
                message:
                    err.message || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
            };
        }

        // if (err instanceof ForbiddenError) {
        //   return {
        //     code: HttpStatus.FORBIDDEN,
        //     message: err.message || HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
        //   };
        // }

        // if (err instanceof ValidationError) {
        //   return {
        //     code: HttpStatus.BAD_REQUEST,
        //     message:
        //       err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        //   };
        // }

        // if (err instanceof ServiceUnavailableError) {
        //   return {
        //     code: HttpStatus.SERVICE_UNAVAILABLE,
        //     message:
        //       err.message ||
        //       HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE),
        //   };
        // }

        // if (err instanceof NotFoundError) {
        //   return {
        //     code: HttpStatus.NOT_FOUND,
        //     message: err.message || HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        //   };
        // }

        // if (err instanceof CustomError) {
        //   return {
        //     code: err.code || HttpStatus.BAD_REQUEST,
        //     message:
        //       err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        //     details: err.details,
        //   };
        // }

        return {
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
                err.message ||
                HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        };
    }

    // Return INTERNAL_SERVER_ERROR for all other cases
    return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
}

export default buildError;