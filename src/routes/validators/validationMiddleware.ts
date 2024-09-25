import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError, Result } from 'express-validator';

export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
    const validationErrors: Result<ValidationError> = validationResult(request);
    if (!validationErrors.isEmpty()) {
        //TODO:Do we need to extract validation errors one by one ?? maybe so that we wouldn't expose that we are using express-validator library
        const errors = validationErrors.array().map((error: ValidationError) => (
            error.msg
        ));
        return response.status(400).json({ errors });
    }
    next();
};