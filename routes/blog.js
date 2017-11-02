var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../config/middleware"),
    User        = require("../models/user"),
    Blog        = require("../models/blog");

// Show user specific blogs
router.get("/", middleware.isLoggedIn, function(req, res){
    console.log("Show user blogs");
    
    User.findById(req.user._id).populate("blogs").exec(function(err, user) {
        if (err) {
            console.log("Error in finding the user");
            req.flash("error", "User not found. Please Try Again.");
            res.redirect("/user/login");
        } else {
            res.render("blog/index", {blogs: user.blogs});
        }
    });
});

// Show all blogs
router.get("/all", function(req, res){
    console.log("Show all blogs");
    
    Blog.find({}, function(err, foundBlogs){
        if(err) {
            console.log("Error could not get blogs.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/");
        } else {
            res.render("blog/index", {blogs: foundBlogs});
        }
    });
});

// New blog form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    console.log("Show new blog form");
    res.render("blog/new");
});

// Create new blog
router.post("/", middleware.isLoggedIn, function(req, res){
    console.log("Create new blog");
    
    // Sanitizing body for js
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    User.findById(req.user._id).populate("party").exec(function(err, user) {
        if(err) {
            console.log("Error is finding party list.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/blogs");
        } else {
            
            var newBlog = {
                title: req.body.blog.title,
                image: req.body.blog.image,
                body: req.body.blog.body,
                author: {
                  id: req.user._id,
                  username: req.user.username
               }
            };
            
            Blog.create(newBlog, function(err, blogCreated){
                if(err) {
                    console.log("Error blog creation failed.");
                    req.flash("error", "Oops! Something went wrong. Please try again.");
                    res.render("blog/new");
                } else {
                    user.blogs.push(blogCreated);
                    user.save();
                    
                    req.flash("success", "Blog created.");
                    res.redirect("/blogs");
                }
            });     
        }
    });
});

// Show blog details
router.get("/:id", middleware.isLoggedIn, function(req, res) {
   console.log("Blog details");
   
   Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
      if(err) {
          console.log("Error blog could not be found");
          req.flash("error", "Oops! Something went wrong. Please try again.");
          res.redirect("/blogs");
      } else {
          res.render("blog/show", {blog: foundBlog});
      }
   });
});

// Edit blog form
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkBlogOwnership, function(req, res) {
   console.log("Edit blog");
   
   Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) {
           console.log("Error blog could not be found");
           req.flash("error", "Oops! Something went wrong. Please try again.");
           res.redirect("/blogs/"+req.params.id);
       } else {
           res.render("blog/edit", {blog: foundBlog});
       }
   }); 
});

// Update blog
router.put("/:id", middleware.isLoggedIn, middleware.checkBlogOwnership, function(req, res){
    // Sanitizing body for js
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, uBlog){
        if(err) {
            console.log("Error blog update failed.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/blogs"+req.params.id);
        } else {
            req.flash("success", "Blog updated.");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

// Delete blog
router.delete("/:id", middleware.isLoggedIn, middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log("Error could not delete blog.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/blogs"+req.params.id);
        } else {
            req.flash("success", "Blog deleted.");
            res.redirect("/blogs");
        }
    });
});

module.exports = router;