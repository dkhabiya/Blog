# Gastronome

    Food! Who doesn’t love food? I love food! Love the idea of sharing my experiences with food using literature. 
Gastronome is a food blog that documents the fact that food is for the soul. This application will allow users to blog about food. 
A blog that will chronicle authentic recipes, or experiential food or just about anything that one is cooking or enjoying. 
With a story and images accompanying the blog post, this application will celebrate the awesomeness of food.

    A user must be logged into create/edit/delete a blog and to add comments to other blogs. 
This blog uses all 7 routes of the RESTful API architecture. 
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data. 

##Instructions on how to run the application
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
    The application has three main entities - User, Blogs and Comments. The follwoing are the routes that assist in 
performing CRUD operations on these entities. 

### User Routes

| Name      |  Path             | HTTP Method   | Description                           |
|:----------|:------------------|:--------------|:--------------------------------------|
| SINGUP    | /user/signUp      | GET           | Show form to create user account      |
| SINGUP    | /user/signUp      | POST          | Create user account                   |
| LOGIN     | /user/login       | GET           | Show form to login                    |
| LOGIN     | /user/login       | POST          | Do login                              |
| SHOW      | /user/:id         | PUT           | View a user details                 |

### Blog Routes

| Name      |  Path                     | HTTP Method   | Description                           |
|:----------|:--------------------------|:--------------|:--------------------------------------|
| INDEX     | /blogAll                  | GET           | Show all blogs                        |
| INDEX     | /user/:id/blog            | GET           | Show user specific blogs              |
| NEW       | /user/:id/blog/new        | GET           | Show form to create a new blog entry  |
| CREATE    | /user/:id/blog            | POST          | Create a new blog entry               |
| SHOW      | /user/:id/blog/:id        | GET           | Show details of a blog entry          |
| EDIT      | /user/:id/blog/:id/edit   | GET           | Get the edit form for a blog entry    |
| UPDATE    | /user/:id/blog/:id        | PUT           | Update a blog entry                   |
| DESTROY   | /user/:id/blog/:id        | DELETE        | Delete a blog entry                   |

### Comment Routes

| Name      |  Path                     | HTTP Method   | Description       |
|:----------|:--------------------------|:--------------|:------------------|
| CREATE    | /user/:id/blog.:id        | POST          | Create comment    |