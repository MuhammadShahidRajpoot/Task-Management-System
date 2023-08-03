# Task-Management-System

This is a Task Management application built using React, Redux, Material-UI and react-dnd. The app allows users to manage tasks based on their group type. Users can log in using their email, password, and select a group type. Upon successful login, the user is directed to the main page, where they can view, add, toggle task completion, and delete tasks.

**Deployed Link:** https://task-management-system-test.netlify.app/

**Running the Application**

You can Just run the application by clicking on above deployed link and login using user credentials provided below

or

To run the Task Management app, follow these steps:

cd task-management-app

Install the dependencies using npm:

npm install

Start the development server:

npm start

The app will be running at http://localhost:3000.

**User Data and Tasks** The user data and tasks are fetched from a **mock API**, which is set up using postman mock api system. The **getUserApi** and **getTasksListAPI** functions in the api.js file fetch data from the corresponding API endpoints using Axios.

**For user data**, the API endpoint is /users, and it provides an array of user objects with properties like email, password, and grouptype.

**For Login use these users credentials** which were get by mock api;

[

{ "id": 1, "firstname": "John", "lastname": "Doe", "email": "john.doe@example.com", "password": "password1", "grouptype": "group1" },

{ "id": 2, "firstname": "Jane", "lastname": "Smith", "email": "jane.smith@example.com", "password": "password2", "grouptype": "group2" },

{ "id": 3, "firstname": "Michael", "lastname": "Johnson", "email": "michael.johnson@example.com", "password": "password3", "grouptype": "group1" },

{ "id": 4, "firstname": "Emily", "lastname": "Brown", "email": "emily.brown@example.com", "password": "password4", "grouptype": "group2" },

{ "id": 5, "firstname": "William", "lastname": "Davis", "email": "william.davis@example.com", "password": "password5", "grouptype": "group1" }

]

For task data, the API endpoint is /tasks, and it provides an array of task objects with properties like id, title, description, and completed.

These tasks are from mock api but on run time user can add tasks, change there status of complete/incomplete and can also delet tasks and can change order by drag and drop.

[

{ "id": 1, "title": "Task 1", "description": "Description for Task 1", "complete": false, "grouptype": "group1" },

{ "id": 2, "title": "Task 2", "description": "Description for Task 2", "complete": true, "grouptype": "group2" },

{ "id": 3, "title": "Task 3", "description": "Description for Task 3", "complete": false, "grouptype": "group1" },

{ "id": 4, "title": "Task 4", "description": "Description for Task 4", "complete": true, "grouptype": "group2" },

{ "id": 5, "title": "Task 5", "description": "Description for Task 5", "complete": false, "grouptype": "group1" }

]

**Libraries Used React**: A JavaScript library for building user interfaces.

**Redux**: A library for managing the state of the application.

**Material-UI**: A popular React UI framework for building responsive and modern user interfaces.

**React Router DOM**: A library for handling navigation and routing in a React application.

**react-dnd**: A library for adding drag-and-drop functionality to React components.

**react-transition-group**: A library for adding transition to react components.

**Please note that since the mock API is used, data changes are not persistent and will be reset on server restart.**
