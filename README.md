<p align="center"><img src="https://images.emojiterra.com/twitter/v14.0/128px/1f399.png" height="80px" alt="microphone emoji"/></p>

# <p align = "center"> Sing me a Song</p>

### <p align = "center">Unit, Integration, E2E</p>

<p align = "center">
   <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px" alt="TypeScript"/>
   <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" height="30px" alt="Cypress"/>
   <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px" alt="Jest"/>
   <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" height="30px" alt="Express"/>
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="30px" alt="Node"/>
   <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="30px" alt="React"/>
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px" alt="Prisma"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="docker" height="30px">
    <img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="docker-compose" alt="docker-compose" height="30px" />
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="swagger" height="30px">
   <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="30px" alt="ESLint"/>
   <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" height="30px" alt="Prettier"/>
</p>

## :clipboard: Description

This project was meant to be a place where users can recommend and view music recommendations. The more recommendations a song receives, the better ranked it will be, increasing its possibility of being recommended to other users.

In this way, a test system was created to ensure the functioning of the API provided, as well as the frontend application. Checking in a unitary way the services functions, all route integration and the user experience on the website running.

## :white_check_mark: Tests

-   Creation of a new recommendation
-   Upvote e downvote any recommendation
-   Get the latest recommendations
-   Get a recommendation
-   Get a random recommendation
-   Get top recommendations
-   Delete a recommendation with score less than -5

## :books: API Documentation

The API documentation, implemented with **Swagger**, can be accessed at the route [**/documentation**](http://localhost:4000/documentation)

![routes](assets/routes.png)

## :rocket: Running this Project

First of all, clone this project and access the folder

```bash
    git clone https://github.com/GabrielaTiago/Sing-me-a-Song-TESTS.git
    cd Sing-me-a-Song-TESTS
```

:warning: There are two ways to run this project:

-   **Locally**: you need to have [Node.js](https://nodejs.org/en/download), [npm](https://www.npmjs.com/) and [Postgres](https://www.postgresql.org/download/) installed on your machine.

-   **With Docker**: you need to have [Docker](https://docs.docker.com/get-docker) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine. With this option, you don't need to install these dependencies on your machine, since the project will run in containers.

### :gear: Environment Variables

The project uses the following environment variables:

#### Backend

-   `PORT`: Port where the server will run
-   `POSTGRES_USER`: Postgres username
-   `POSTGRES_PASSWORD`: Postgres user password
-   `DATABASE_URL`: Postgres database connection string

Copy the following content to create the **.env** and the **.env.test** files in the root of the backend project

```bash
    cd BACKEND
    cp .env.example .env
    cp .env.example .env.test
    cd ..
```

Then, replace the values in the files with your own configuration.

```env
    # .env
    PORT=4000
    POSTGRES_USER=[YourUserName]
    POSTGRES_PASSWORD=[YourPassword]
    DATABASE_URL="postgres://[YourUserName]:[YourPassword]@localhost:5432/singmeasong";
```

```env
    # .env.test
    PORT=4000
    POSTGRES_USER=[YourUserName]
    POSTGRES_PASSWORD=[YourPassword]
    DATABASE_URL="postgres://[YourUserName]:[YourPassword]@localhost:5432/singmeasong-test";
```

#### Frontend

-   `REACT_APP_BASE_URL`: Base URL for the frontend
-   `REACT_APP_API_BASE_URL`: Base URL for the API

Copy the following content to create the **.env** file in the root of the frontend project

```bash
    cd FRONTEND
    cp .env.example .env
    cd ..
```

### :whale: Running Tests with Docker

Make sure you have Docker and Docker Compose installed on your machine.

You must update the `DATABASE_URL` in the `.env.test` located in the BACKEND folder.

```env
    DATABASE_URL=postgres://[YourUserName]:[YourPassword]@sing-me-a-song-db-test:5432/singmeasong-test
```

Then, run the following command in the root of the project:

```bash
    npm run test:e2e
```

This command will build the Docker images and start the containers for the backend, frontend, and database. The backend will be available at `http://localhost:4000` and the frontend at `http://localhost:3000`.

To run the cypress tests, open a new terminal and run the following command:

```bash
   cd FRONTEND && npx cypress open
```

Then, follow the steps in the [Running the cypress tests](#test_tube-running-the-cypress-tests) section.

To run the backend unit and integration tests, open a new terminal and run the following command:

```bash
   cd BACKEND
```

```bash
    npm run docker:test
```

To stop and remove the containers, run the following command in the root of the project:

```bash
    npm run docker:down
```

### :computer: Running Tests Locally

Enter the BACKEND folder

```bash
    cd BACKEND
```

Run the following command to install the dependencies.

```bash
    npm install
```

Generate the database with the following command

```bash
    npm run db
```

Then build the project

```bash
    npm run build
```

To start the server, run the command

```bash
    npm run start
```

To run the backend unit and integration tests, run the command

```bash
    npm run test
```

To run unit tests only, run the command

```bash
    npm run test:unit
```

To run integration tests only, run the command

```bash
    npm run test:integration
```

Now, open a new terminal and enter the FRONTEND folder

```bash
    cd FRONTEND
```

Run the following command to install the dependencies.

```bash
    npm install
```

Then build the project

```bash
    npm run build
```

To start the server, run the command

```bash
    npm run start
```

Start the cypress

```bash
    npx cypress open
```

Then, follow the steps in the [Running the cypress tests](#test_tube-running-the-cypress-tests) section.

### :test_tube: Running the cypress tests

After opening cypress:

-   Click on **E2E Testing** in cypress environment;
-   Click on the option **Electron**

<p align="center">
    <img width="600" src="./FRONTEND/src/assets/cypress.gif" alt="cypress gif">
</p>

:stop_sign: **<span style="color: red">Attention:</span>** For the tests with cypress E2E to work properly, you should keep the server on the backend and frontend running.

<p align="center">
    <img width="720" src="./FRONTEND/src/assets/commands.png" alt="commands screenshot">
</p>

## :bulb: Acknowledgements

-   [Commit Patterns](https://github.com/iuricode/padroes-de-commits)
-   [Badges for Github](https://github.com/alexandresanlim/Badges4-README.md-Profile#-database-)
-   [README inspiration 1](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md)
-   [README inspiration 2](https://github.com/DarlonGomes/sing-a-song-test)

## 👩🏽‍💻 Author

Gabriela Tiago de Araújo

-   email: <gabrielatiagodearaujo@outlook.com>
-   linkedin: <https://www.linkedin.com/in/gabrielatiago/>
-   portfolio: <https://gabrielatiago.vercel.app>

<br>[🔝 Back to top](#-sing-me-a-song) <br>
