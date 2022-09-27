<p align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2983/2983786.png" height="80px"/>

</p>

# <p align = "center"> Sing me a Song </p>

#### <p align = "center">Unit, Integration, E2E</p>

<p align = "center">
   <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
   <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" height="30px"/>
   <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" heigth="30px"/>
   <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" heigth="30px"/>
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" heigth="30px"/>
   <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" heigth="30px"/>
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" heigth="30px"/>
   <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" heigth="30px"/>
   <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" heigth="30px"/>
</p>

### :clipboard: Description

This project was meant to be a place where users can recommend and view music recommendations. The more recommendations a song receives, the better ranked it will be, increasing its possibility of being recommended to other users.

In this way, a test system was created to ensure the functioning of the API provided, as well as the frontend application. Checking in a unitary way the services functions, all route integration and the user experience on the website running.

---

### :white_check_mark: Tests

- Creation of a new recommendation
- Upvote e downvote any recommendation
- Get the latest recommendations
- Get a recommendation
- Get a random recommendation
- Get top recommendations

---

### :world_map: Routes

```yml
POST /recommendations

    - Route to create a new song recommendation
    - The inputs 'name' and 'youtubeLink' must be filled in
    - The url must bellong to the youtube (regex pattern)

    - body:
        {
            "name": "Adele - I Drink Wine",
            "youtubeLink": "https://www.youtube.com/watch?v=LwXQ7WUh-D0"
        }
```

```yml
POST /recommendations/:id/upvote

    - Route to upvote a recommendation
    - id: Integer and is required
    - params: 2

```

```yml
POST /recommendations/:id/downvote

    - Route to downvote a recommendation
    - params: 2 (id)

```

```yml
GET /recommendations

    - Route to get the 10 more recent recommendations
    - response:
        [
            {
                "id": 1,
                "name": "Rihanna - Love On The Brain",
                "youtubeLink": "https://www.youtube.com/watch?v=QMP-o8WXSPM",
                "score": 344
            },
            {
                "id": 2,
                "name": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
                "youtubeLink": "https://www.youtube.com/watch?v=OPf0YbXqDm0",
                "score": 430
            },
            {
                "id": 3,
                "name": "Beyoncé - Pretty Hurts",
                "youtubeLink": "https://www.youtube.com/watch?v=LXXQLa-5n5w",
                "score": 740
            },
        ]
```

```yml
GET /recommendations/:id

    - Route to get a specific recommendation
    - params: 1
    - response:
            {
                "id": 1,
                "name": "Rihanna - Love On The Brain",
                "youtubeLink": "https://www.youtube.com/watch?v=QMP-o8WXSPM",
                "score": 344
            },

```

```yml
GET /recommendations

    - Route to get the 10 more recent recommendations
    - response:
        [
            {
                "id": 1,
                "name": "Rihanna - Love On The Brain",
                "youtubeLink": "https://www.youtube.com/watch?v=QMP-o8WXSPM",
                "score": 344
            },
            {
                "id": 2,
                "name": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
                "youtubeLink": "https://www.youtube.com/watch?v=OPf0YbXqDm0",
                "score": 430
            },
            {
                "id": 3,
                "name": "Beyoncé - Pretty Hurts",
                "youtubeLink": "https://www.youtube.com/watch?v=LXXQLa-5n5w",
                "score": 740
            },
        ]
```

```yml
GET /recommendations/random

    - Route to get a random recommendation
    - response:
            {
                "id": 8,
                "name": "Jovem Dionisio - ACORDA PEDRINHO",
                "youtubeLink": "https://www.youtube.com/watch?v=d-tx9D4a8dc",
                "score": 253
            }

```

```yml
GET /recommendations/top/:amount

    - Route to get a list with ranked recommendations
    - params: 3
    - response:
        [
            {
                "id": 3,
                "name": "Beyoncé - Pretty Hurts",
                "youtubeLink": "https://www.youtube.com/watch?v=LXXQLa-5n5w",
                "score": 740
            },
            {
                "id": 2,
                "name": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
                "youtubeLink": "https://www.youtube.com/watch?v=OPf0YbXqDm0",
                "score": 430
            },
            {
                "id": 1,
                "name": "Rihanna - Love On The Brain",
                "youtubeLink": "https://www.youtube.com/watch?v=QMP-o8WXSPM",
                "score": 344
            },
        ]
```

$~$

### :rocket: Runnig this Project Locally

This project was inicialized with [Create React App](<(https://github.com/facebook/create-react-app)>), so ensure you have so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download) e [npm](https://www.npmjs.com/) runnig locally. You will also need to install [postgres](https://www.postgresql.org/download/) to set the database.

First of all, clone this project

```
    https://github.com/GabrielaTiago/Sing-me-a-Song-TESTS.git
```

Then, go to the project directory

```
    cd Sing-me-a-Song---TESTS
```

$~$

#### In the backend side

Enter the BACKEND folder

```
    cd BACKEND
```

Run the following command to install the dependencies.

```
    npm install
```

Create a **.env** and a **.env.test** file in the root of the project with the following data. The prisma command will automatically generate the database.

⚠️ **<span style="color: orange">Warnnig:</span>** The 'DATABASE*URL' must contain \_your personal postegres data* to run properly.

**.env**

```
    PORT=5000
    DATABASE_URL="postgres://[YourUserName]:[YourPassword]@[YourHostname]:5432/[YourDatabaseName]";
```

**.env.test**

```
    PORT=5000
    DATABASE_URL="postgres://[YourUserName]:[YourPassword]@[YourHostname]:5432/[YourDatabaseName_test]";
```

Generates the database and generates its migrations

```
    npx prisma generate && npx prisma migrate dev
```

To start the server, run the command

```
    npm run start
```

To see all tests

```
    npm run test
```

End to end (E2E) tests

```
    npm run E2E
```

Integration tests

```
    npm run test:integration
```

Unit tests

```
    npm run test:unit
```

#### In the frontend side

Enter the FRONTEND folder

```
    cd FRONTEND
```

Run the following command to install the dependencies.

```
    npm install
```

Create a **.env** file in the root of the project with the following data.

**.env**

```
    REACT_APP_API_BASE_URL=http://localhost:5000
```

Then build the project

```
    npm run build
```

To start the server, run the command

```
    npm run start
```

Start the cypress

```
    npx cypress open
```

After opening cypress :

- Click on **E2E Testing** in cypress environment;
- Click on the option **Electron**

<p align="center">
    <img width="600" src="./FRONTEND/src/assets/cypress.gif">
</p>

:stop_sign: **<span style="color: red">Atention:</span>** For the tests with cypress E2E to work properly, you should keep the server on the [backend running](#in-the-backend-side), parallel to the [frontend](#in-the-frontend-side).

<p align="center">
    <img width="720" src="./FRONTEND/src/assets/commands.png">
</p>

$~$

---

### :books: Lessons Learned

- Use of tests frameworks : Jest and Cypress
- Unit tests
- Integration tests
- E2E tests
- Mock data
- Create scripts
- Create commands
- Markup language: Markdown
  $~$

---

### :bulb: Acknowledgements

- [Commit Patterns](https://github.com/iuricode/padroes-de-commits)
- [Badges for Github](https://github.com/alexandresanlim/Badges4-README.md-Profile#-database-)
- [README inspiration 1](https://gist.github.com/luanalessa/7f98467a5ed62d00dcbde67d4556a1e4#file-readme-md)
- [README inspiration 2](https://github.com/DarlonGomes/sing-a-song-test)

$~$

---

### 👩‍🦱 Author

- Gabriela Tiago is a fullstack web development student at Driven Education. Walking the path of knowledge in search of improving her technical skills and softskills, so she can improve the work she develops.

<br>[🔝 Back to top](#-sing-me-a-song-) <br>
