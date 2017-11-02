var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../config/middleware"),
    Comment     = require("../models/comment"),
    Blog        = require("../models/blog");

//Add Comment
router.post("/", middleware.isLoggedIn, function(req, res){
   console.log("Create comment");
   
   Blog.findById(req.params.id, function(err, blogFound){
       if(err){
           console.log(err);
           req.flash("error", "Blog not found.");
           res.redirect("/blogs/"+req.params.id);
       } else {
        Comment.create(req.body.comment, function(err, commentCreated){
           if(err){
               console.log(err);
               req.flash("error", "Oops! Something went wrong. Please try again.");
               res.redirect("/blogs/"+req.params.id);
           } else {
               
               commentCreated.author.id = req.user._id;
               commentCreated.author.username = req.user.username;
               commentCreated.text = req.body.comment.text;
               
               commentCreated.save();
               blogFound.comments.push(commentCreated);
               blogFound.save();
               
               res.redirect('/blogs/' + blogFound._id);
           }
        });
       }
   });
});

module.exports = router;