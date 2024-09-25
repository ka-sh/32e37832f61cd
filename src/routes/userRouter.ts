import { Router } from 'express';

import { userSchemaValidator } from './validators/userSchemaValidator';
import { handleValidationErrors } from './validators/validationMiddleware';
import { UserController } from './controllers/userController';
import { userQueryValidator } from './validators/userQueryValidator';


export const createUserRouter = (userController: UserController) => {
    const userRouter = Router();

    userRouter.get('/', userQueryValidator, handleValidationErrors, userController.getUsers);

    userRouter.post('/', userSchemaValidator, handleValidationErrors, userController.createUser);
    return userRouter;
};