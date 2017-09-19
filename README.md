# Blog
A simple blog created using Node.js, Express.js and MongoDB with Semantic UI.
This blog uses all 7 routes of the RESTful API architecture. 
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data. 

###It has the following routes
1. INDEX        /blogs              Show all blogs
    ![Alt text](demo/allBlogs.jpg)
2. NEW          /blogs/new          Show form to create a new blog entry
    ![Alt text](demo/newBlogs.jpg)
3. CREATE       /blogs              Create a new blog entry
4. SHOW         /blogs/:id          Show details of a particular blog entry
    ![Alt text](demo/showBlog.jpg)
5. EDIT         /blogs/:id/edit     Get the edit form for a particular blog entry
    ![Alt text](demo/editBlog.jpg)
6. UPDATE       /blogs/:id          Update a particular blog entry
7. DESTROY      /blogs/:id          Delete a particular blog entry