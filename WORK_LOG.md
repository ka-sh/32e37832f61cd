# Work Log
This is just to document my thinking process while working on the requested task.

## Preface
After reading the work sample I could see two ways to execute this task as well as few things that I would like to get them out of the way.

### Architecture
Even though the task is simple I had to entertain the thought of going the Hexagonal architecture route. However,I decided against that for the following reasons:
1. Time constraints. I would rather to invest limited time on this task and have the hexagonal architecture discussion in an interview rather than spending significant amount of time implementing a hexagonal architecture first.
2. In a real project I wouldn't go the Hexagonal architecture route unless I get the "Buy In" from the team first. like everything it has pros and cons and if there is no consensus on how to be implemented we might end up with a Frankenstein monster on our hand that is half layered architecture half Hexagonal (presenting i\1tself only in project structure without following proper separation) 


I decided to go with the old but Gold layered architecture. Simple, and for this task will do the job

### Testing
I was expecting that I am going in guns blazing unit testing and mocking dependencies. However, after reading the task requirements I know this is a component test through and through.

Why??
1. No business logic or rules, it is a simple CRUD.
2. If we go with mocking we wil be basically creating busy work given that service layer depends on Repository so pretty much we are not testing anything .

The only thing that will provide assurance that our code is delivering the business value it was meant for is testing our service as a black box. So component Test/ End-to-end test is what I will go with.



### Additional dependencies

- express-validator: For payload validation and sanitization
- superTest: For api component tests
- sequelize and sequelize-client for everything DB

## Running the project
1. `docker-compose up` This starts the db
2. `npm run start` Good old start script


### Final notes or things to be desired
- Obviously API documentation generation via swagger would be an essential step in production API, I ignored it and it came to bite me.
- Custom Error handlers to help the users understand why their api is failing. For example sequalize related errors like unique constraint violation when there is duplicate emails.
- Additional test cases. I am still conflicted on the unit tests. Going with Component test wasn't the right call, the development (red, green,refactor) was way too long and I should have focused shortening it
- Only when I started to hit the point where I wanted to organise my dependencies and initialize them properly I started to see the point of nest. The current code is very error prone and hard to manage once it grows, a framework would be nice to have to improve developer experience
- I dont like that I didn't spend more time thinking about deployment or how this service will be deployed in a real production environment.
- I left couple of TODOs to reference future improvements. For now the time I can invest on this task is up and I need to finish...Sinora :)



