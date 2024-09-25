import { UserAttributes, UserCreationAttributes, UserModel } from '../database/models/UserModel';
import { Model, ModelDefined } from 'sequelize';
import { UserDto } from '../dtos/user/UserDto';
import { CreateUserRequest } from '../dtos/user/CreateUserRequest';
import { QueryUserRequest, SortKey } from '../dtos/user/QueryUserRequest';

import { logger } from '../common';

const sortKeyMap: { [key in SortKey]: string } = {
    created: 'createdAt',
};


export class UserService {
    private userModel: ModelDefined<UserAttributes, UserCreationAttributes>;

    constructor(userModel: ModelDefined<UserAttributes, UserCreationAttributes>) {
        this.userModel = userModel;
    }

    async createUser(user: CreateUserRequest): Promise<UserDto> {
        // TODO:looks like a PI and shouldn't land in the logs
        logger.info(`Creating new user: ${user}`);
        const createdUser = await this.userModel.create({
            name: user.name,
            email: user.email,
        });
        logger.info('User created', createdUser);
        return this.modelToDto(createdUser);
    }

    async getUsers(queryRequest: QueryUserRequest): Promise<UserDto[]> {
        //TODO:Refactor this away from the service and into a repository class
        logger.info('Request to query users', queryRequest);
        const users = await this.userModel.findAll({
            order: [
                [sortKeyMap[queryRequest.sortBy], queryRequest.order],
            ],
        });
        logger.info(`successfully fetched ${users.length} users`);
        return users.map(this.modelToDto);
    }

    private modelToDto(user: Model<UserAttributes, UserCreationAttributes>): UserDto {
        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email'),
            createdAt: user.getDataValue('createdAt'),
            updatedAt: user.getDataValue('updatedAt'),
        };
    }
}

