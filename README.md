# Blog
A simple blog created using Node.js, Express.js and MongoDB with Semantic UI.
This blog uses all 7 routes of the RESTful API architecture. 
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data. 

## It has the following routes
| Name      |  Path             | Description                                   |
|----------:|:-----------------:|----------------------------------------------:|
| INDEX     | /blogs            | Show all blogs                                |
| NEW       | /blogs/new        | Show form to create a new blog entry          |
| CREATE    | /blogs            | Create a new blog entry                       |
| SHOW      | /blogs/:id        | Show details of a particular blog entry       |
| EDIT      | /blogs/:id/edit   | Get the edit form for a particular blog entry |
| UPDATE    | /blogs/:id        | Update a particular blog entry                |
| DESTROY   | /blogs/:id        | Delete a particular blog entry                |
