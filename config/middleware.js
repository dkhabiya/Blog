var middleware  = {},
    post        = require("../models/post");
   
// Check if the post belong to the logged in user.
middleware.checkPostOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        post.findById(req.params.id, function(err, foundPost){
            if(err){
                req.flash("error", "Post not found");
                res.redirect("back");
           }  else {
                if(foundPost.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

// Check if a user is logged in.
middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.user = null;
        req.flash("error", "Access denied! Please Login.");
        res.redirect("/user/login");
    }
}

module.exports = middleware;