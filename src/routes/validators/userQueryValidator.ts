import { checkSchema } from 'express-validator';

export const userQueryValidator = checkSchema({
    sortBy: {
        in: 'query',
        optional: true,
        escape: true,
        trim: true,
        isIn: {
            options: [['created']],
            errorMessage: 'Only sorting by creation date is allowed',
        },
    },
    order: {
        in: 'query',
        escape: true,
        trim: true,
        optional: true,
        isIn: {
            options: [['asc', 'desc']],
            errorMessage: 'Only asc or desc is allowed',
        },
    },
});