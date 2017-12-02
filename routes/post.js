var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../config/middleware"),
    User        = require("../models/user"),
    Post        = require("../models/post");

// Show user specific posts
router.get("/", middleware.isLoggedIn, function(req, res){
    console.log("Show user posts");
    
    User.findById(req.user._id).populate("posts").exec(function(err, user) {
        if (err) {
            console.log("Error in finding the user");
            req.flash("error", "User not found. Please Try Again.");
            res.redirect("/user/login");
        } else {
            res.render("post/index", {posts: user.posts});
        }
    });
});

// Show all posts
router.get("/all", function(req, res){
    console.log("Show all posts");
    
    Post.find({}, function(err, foundPosts){
        if(err) {
            console.log("Error could not get posts.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/");
        } else {
            res.render("post/index", {posts: foundPosts});
        }
    });
});

// New post form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    console.log("Show new post form");
    res.render("post/new");
});

// Create new post
router.post("/", middleware.isLoggedIn, function(req, res){
    console.log("Create new post");
    
    // Sanitizing body for js
    req.body.post.body = req.sanitize(req.body.post.body);
    
    User.findById(req.user._id).populate("party").exec(function(err, user) {
        if(err) {
            console.log("Error is finding party list.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/posts");
        } else {
            
            var newPost = {
                title: req.body.post.title,
                image: req.body.post.image,
                body: req.body.post.body,
                author: {
                  id: req.user._id,
                  username: req.user.username
               }
            };
            
            Post.create(newPost, function(err, postCreated){
                if(err) {
                    console.log("Error post creation failed.");
                    req.flash("error", "Oops! Something went wrong. Please try again.");
                    res.render("post/new");
                } else {
                    user.posts.push(postCreated);
                    user.save();
                    
                    req.flash("success", "Post created.");
                    res.redirect("/posts");
                }
            });     
        }
    });
});

// Show post details
router.get("/:id", function(req, res) {
   console.log("Post details");
   
   Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
      if(err) {
          console.log("Error post could not be found");
          req.flash("error", "Oops! Something went wrong. Please try again.");
          res.redirect("/posts");
      } else {
          res.render("post/show", {post: foundPost});
      }
   });
});

// Edit post form
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res) {
   console.log("Edit post");
   
   Post.findById(req.params.id, function(err, foundPost) {
       if(err) {
           console.log("Error post could not be found");
           req.flash("error", "Oops! Something went wrong. Please try again.");
           res.redirect("/posts/"+req.params.id);
       } else {
           res.render("post/edit", {post: foundPost});
       }
   }); 
});

// Update post
router.put("/:id", middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res){
    // Sanitizing body for js
    req.body.post.body = req.sanitize(req.body.post.body);
    
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, uPost){
        if(err) {
            console.log("Error post update failed.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/posts"+req.params.id);
        } else {
            req.flash("success", "Post updated.");
            res.redirect("/posts/"+req.params.id);
        }
    });
});

// Delete post
router.delete("/:id", middleware.isLoggedIn, middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log("Error could not delete post.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/posts"+req.params.id);
        } else {
            req.flash("success", "Post deleted.");
            res.redirect("/posts");
        }
    });
});

module.exports = router;