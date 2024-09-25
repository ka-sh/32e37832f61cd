import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { CreateUserRequest } from '../../dtos/user/CreateUserRequest';

import { OrderKey, QueryUserRequest, SortKey } from '../../dtos/user/QueryUserRequest';
import { logger } from '../../common';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const createUserRequest: CreateUserRequest = req.body;
        try {
            const createdUser = await this.userService.createUser(createUserRequest);
            res.status(201).json(createdUser);
        } catch (ex) {
            logger.error(`Failed to create new user with payload ${createUserRequest} with error ${ex}`);
            next(ex);
        }
    };

    //TODO: Add pagination
    getUsers = async (req: Request, res: Response): Promise<void> => {
        const sortBy = (req.query.sortBy as string) ?? 'created';
        const order = (req.query.order as string) ?? 'desc';

        const queryRequest: QueryUserRequest = {
            sortBy: sortBy as SortKey,
            order: order as OrderKey,
        };
        const users = await this.userService.getUsers(queryRequest);
        res.status(200).json(users);
    };
}