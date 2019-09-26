# Twitter-node
A twitter clone Node application is an attempt to clone some of the functionalities of twitter.
By providing REST API endpoints in it.

The api's are written in [NodeJS](https://nodejs.org/en/).

Steps to run the api server:
> Make sure you have NodeJS version 10 or higher installed & Postgres for database.
1) Clone this repository.
2) Navigate to repository folder and execute the following command:
    `npm install`
3) Run the following command to install `knexJS` globally.:
    `npm i -g knex`
4) Create a DB in postgres/mysql/sqlite3 etc. Make note of DB name along with username, password and host. You machine should be able to connect to database using any DB client (PgAdmin, DBeaver). Also grant all privillages to it.
5) Run `npm start` in root directory of project to start the api server. This will start the server & execute knex mirations which will automatically create tables & teir relations. Server will listen on port `3000`.
7) Import the following postman collection to have a look at the api's and try them out yourself. Set the following environment variable in postman.
    `url : localhost:3000/api`
8) To run tests use the following command: `npm run test`
___

### API Endpoints (localhost:3000/api/*)

All the parameters in all the api's are required, unless state optional

Link to [Postman Collection](https://www.getpostman.com/collections/5225daeae7962035b822)