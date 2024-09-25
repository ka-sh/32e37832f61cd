import request, { Response } from 'supertest';

import { app, runMigrations, initializeDependencies } from '../src/app';
import { describe, test, beforeAll, expect, beforeEach } from '@jest/globals';
import { CreateUserRequest } from '../src/dtos/user/CreateUserRequest';

interface User {
    id: string,
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ValidationErrorResponse {
    errors: string[];
}

const executeSuccessfulCreateUserRequest = async (payload: CreateUserRequest): Promise<Response> => {
    return await request(app).post('/users')
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
};

describe('/users', function() {
    beforeAll(async function() {
        await initializeDependencies(app);
    });
    beforeEach(async () => {
        /**
         * Reset sqlite before each test to work with clean DB
         */
        await runMigrations();
    });
    test('should successfully create a user if payload is valid', async function() {
        const user = {
            name: 'John',
            email: 'john@gmail.com',
        };
        const response = await request(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/);
        const createdUser: User = response.body;

        expect(createdUser.name).toBe(user.name.toLowerCase());
        expect(createdUser.email).toBe(user.email.toLowerCase());
        expect(createdUser.createdAt).not.toBeNull();
        expect(createdUser.updatedAt).not.toBeNull();
        expect(createdUser.id).not.toBeNull();

    }, 10000);

    test('should fails to create a user if payload is in-valid', async function() {
        const user = {
            name: ' ',
            email: 'johngmail.com',
        };
        const response = await request(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);


        const validationErrors: ValidationErrorResponse = response.body;
        expect(validationErrors.errors).not.toBeUndefined();
        expect(validationErrors.errors.length).toBe(2);
        expect(validationErrors.errors[0]).toBe('Name is required');
        expect(validationErrors.errors[1]).toBe('Please enter a valid email');

    }, 10000);

    test('should fetch all existing users sorted in ASC order by their creation date', async function() {

        /**
         * Given multiple users exist in the DB
         */
        const userRequests: CreateUserRequest[] = [
            {
                name: 'John',
                email: 'john@gmail.com',
            },
            {
                name: 'James',
                email: 'James@gmail.com',
            },
            {
                name: 'Jack',
                email: 'jack@gmail.com',
            },
        ];

        for (const request of userRequests) {
            await executeSuccessfulCreateUserRequest(request);
        }
        /**
         * When the user fetches all users and request to sort them in ASC order
         */


        const response = await request(app)
            .get('/users')
            .query({ sortBy: 'created', order: 'asc' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        /**
         * Then we received list of sorted users by their creation data
         */
        expect(response.body).not.toBeUndefined();

        const actualUsers: User[] = response.body;
        expect(actualUsers.length).toBe(3);

        //Assert the list is sorted in ASC order
        const sortedInAscOrder = actualUsers
            .map(user => ({ ...user }))
            .sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            );
        expect(actualUsers).toEqual(sortedInAscOrder);
    }, 100000);

});
