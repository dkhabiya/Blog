var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../config/middleware"),
    Comment     = require("../models/comment"),
    Blog        = require("../models/blog");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log("New comment");
    
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            console.log("Blog Found : "+blog);
            res.render("comment/new", {blog: blog});
        }
    })
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   console.log("Create comment");
   
   Blog.findById(req.params.id, function(err, blogFound){
       if(err){
           console.log(err);
           res.redirect("/blogs/"+req.params.id);
       } else {
        Comment.create(req.body.comment, function(err, commentCreated){
           if(err){
               console.log(err);
           } else {
               
               console.log(req.user);
               
               commentCreated.author.id = req.user._id;
               commentCreated.author.username = req.user.username;
               commentCreated.text = req.body.comment.text;
               
               commentCreated.save();
               blogFound.comments.push(commentCreated);
               blogFound.save();
               
               console.log(blogFound);
               res.redirect('/blogs/' + blogFound._id);
           }
        });
       }
   });
});

module.exports = router;