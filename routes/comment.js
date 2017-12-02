// Application routes for comments.
var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../config/middleware"),
    Comment     = require("../models/comment"),
    Post        = require("../models/post");

//Add Comment
router.post("/", middleware.isLoggedIn, function(req, res){
   console.log("Create comment");
   
   Post.findById(req.params.id, function(err, postFound){
       if(err){
           console.log(err);
           req.flash("error", "Post not found.");
           res.redirect("/posts/"+req.params.id);
       } else {
        Comment.create(req.body.comment, function(err, commentCreated){
           if(err){
               console.log(err);
               req.flash("error", "Oops! Something went wrong. Please try again.");
               res.redirect("/posts/"+req.params.id);
           } else {
               
               commentCreated.author.id = req.user._id;
               commentCreated.author.username = req.user.username;
               commentCreated.text = req.body.comment.text;
               
               commentCreated.save();
               postFound.comments.push(commentCreated);
               postFound.save();
               
               res.redirect('/posts/' + postFound._id);
           }
        });
       }
   });
});

module.exports = router;