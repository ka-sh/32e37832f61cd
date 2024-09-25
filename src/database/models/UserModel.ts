import {
    DataTypes,
    ModelDefined,
    Optional,
    Sequelize,
} from 'sequelize';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>
export const UserModel = (sequelize: Sequelize): ModelDefined<UserAttributes, UserCreationAttributes> => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },{tableName: 'users'});
};

