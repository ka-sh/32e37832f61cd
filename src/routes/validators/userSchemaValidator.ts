import { checkSchema } from 'express-validator';

export const userSchemaValidator = checkSchema(
    {
        name: {
            in:'body',
            trim: true,
            escape: true,
            toLowerCase: true,
            notEmpty: { errorMessage: 'Name is required' },
        },

        email: {
            normalizeEmail: true,
            trim: true,
            escape: true,
            toLowerCase: true,
            notEmpty: { errorMessage: 'Email is required' },
            isEmail: { errorMessage: 'Please enter a valid email' },
        },
    },
);