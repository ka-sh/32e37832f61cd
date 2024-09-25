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


## project dependencies
