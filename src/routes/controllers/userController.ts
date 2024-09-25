import { Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { CreateUserRequest } from '../../dtos/user/CreateUserRequest';

import { OrderKey, QueryUserRequest, SortKey } from '../../dtos/user/QueryUserRequest';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        const createUserRequest: CreateUserRequest = req.body;
        const createdUser = await this.userService.createUser(createUserRequest);
        res.status(201).json(createdUser);
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