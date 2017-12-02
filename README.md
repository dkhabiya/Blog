# Gastronome

Food! Who doesn’t love food? I love food! Love the idea of sharing my experiences with food using literature. 
Gastronome is a food post that documents the fact that food is for the soul. This application will allow users to post about food. 
A post that will chronicle authentic recipes, or experiential food or just about anything that one is cooking or enjoying. 
With a story and images accompanying the post post, this application will celebrate the awesomeness of food.

A user must be logged into create/edit/delete a post and to add comments to other posts. 
This post uses all 7 routes of the RESTful API architecture. 
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data. 

## Instructions on how to run the application
* Download the repository.
* Prerequisites:
    The following should be installed on the machine.
    * Node.js [https://nodejs.org/en/download/]
    * MongoDB [https://docs.mongodb.com/manual/installation/]
* Open a terminal window and go the project folder.
* Run npm install.
* Start up the server.
* Enjoy!

## Application Routes
The application has three main entities - User, Posts and Comments. The follwoing are the routes that assist in performing CRUD operations on these entities. 

### User Routes

| Name      |  Path             | HTTP Method   | Description                           |
|:----------|:------------------|:--------------|:--------------------------------------|
| SINGUP    | /user/signUp      | GET           | Show form to create user account      |
| SINGUP    | /user/signUp      | POST          | Create user account                   |
| LOGIN     | /user/login       | GET           | Show form to login                    |
| LOGIN     | /user/login       | POST          | Do login                              |
| SHOW      | /user/:id         | GET           | View a user details                   |

### Post Routes

| Name      |  Path                     | HTTP Method   | Description                           |
|:----------|:--------------------------|:--------------|:--------------------------------------|
| INDEX     | /postAll                  | GET           | Show all posts                        |
| INDEX     | /user/:id/post            | GET           | Show user specific posts              |
| NEW       | /user/:id/post/new        | GET           | Show form to create a new post entry  |
| CREATE    | /user/:id/post            | POST          | Create a new post entry               |
| SHOW      | /user/:id/post/:id        | GET           | Show details of a post entry          |
| EDIT      | /user/:id/post/:id/edit   | GET           | Get the edit form for a post entry    |
| UPDATE    | /user/:id/post/:id        | PUT           | Update a post entry                   |
| DESTROY   | /user/:id/post/:id        | DELETE        | Delete a post entry                   |

### Comment Routes

| Name      |  Path                     | HTTP Method   | Description       |
|:----------|:--------------------------|:--------------|:------------------|
| CREATE    | /user/:id/post.:id        | POST          | Create comment    |