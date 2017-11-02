var middleware  = {},
    Blog        = require("../models/blog");
   
// Check if the blog belong to the logged in user.
middleware.checkBlogOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                req.flash("error", "Blog not found");
                res.redirect("back");
           }  else {
                if(foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
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