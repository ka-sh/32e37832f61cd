import express, { Express } from 'express';
import cors from 'cors';
import { createUserRouter } from './routes/userRouter';
import { SequelizeConnectionFactory } from './database/SequelizeConnectionFactory';
import { UserModel } from './database/models/UserModel';
import { UserService } from './services/userService';
import { UserController } from './routes/controllers/userController';

const app: Express = express();

// Middleware setup
app.use(cors())
    .use(express.json())
    .options('*', cors());

/**
 * Initialization & Dependency Injection
 */
async function runMigrations() {
    const sequelize = SequelizeConnectionFactory.getConnection();

// Synchronize database if in test environment
    if (process.env.NODE_ENV === 'test') {
        try {
            await sequelize.sync({ force: true });
            console.log('Database synchronized (test environment)');
        } catch (err) {
            console.error('Failed to synchronize database:', err);
        }
    }
}

async function initializeDependencies(app: Express): Promise<Express> {
    const sequelize = SequelizeConnectionFactory.getConnection();
// Initialize models and services
    const userModel = UserModel(sequelize);
    const userService = new UserService(userModel);
    const userController = new UserController(userService);
    // Setup routes
    const userRouter = createUserRouter(userController);
    app.use('/users', userRouter);
    return app;
}


export { app, initializeDependencies, runMigrations };