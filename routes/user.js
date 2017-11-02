var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../config/middleware"),
    passport    = require("passport");
    
var User = require("../models/user");


// Show SignUp form
router.get("/signUp", function(req, res) {
    console.log("Show User Sign Up form.");
    res.render("user/signUp");
});

// Do SignUp
router.post('/signUp', function(req, res) {
    console.log("Do Sign Up.");
    
    var user = new User();
    user.firstName  = req.body.user.firstName;
    user.lastName   = req.body.user.lastName;
    user.email      = req.body.user.email;
    user.username   = req.body.user.username;
    user.password   = req.body.user.password;

    user.save(function(err, user) {
        if (err) {
            console.log("SignUp Failed.");
            req.flash("error", "Oops! Something went wrong. Please try again.");
            res.redirect("/login");
        }
        
        req.logIn(user, function(err) {
            if (err) {
                console.log("Error login post sign up failed.");
                req.flash("error", "Oops! Something went wrong. Please try again.");
                res.redirect("/login");
            } else {
                req.flash("info", "Welcome "+user.firstName+"!");
                res.redirect("/blogs");
            }
        });
    });
});

// Show Login form
router.get("/login", function(req, res) {
    console.log("Login Form.");
    res.render("user/login");
});

// Do login
router.post("/login", passport.authenticate("local-login", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res) {
    console.log("Login success.");
    req.flash("info", "Welcome "+req.user.firstName+"!");
    res.redirect("/blogs");
});

// Logout
router.get("/logout", function(req, res) {
    console.log("Logout.");
    req.logout();
    req.flash("success", "Until next time... Feed your soul!");
    req.user = null;
    res.redirect("/user/login");
});

// Show User Details
router.get("/:id/show", function(req, res) {
    console.log("User details.");
    res.render("user/show");
});

module.exports = router;