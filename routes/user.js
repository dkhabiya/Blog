var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport");
    
var User = require("../models/user");

// ============== AUTH ROUTES ==============  

// GET : Show SignUp form
router.get("/signUp", function(req, res) {
    console.log("Show User Sign Up form.");
    res.render("user/signUp");
});

// POST : Do SignUp
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
            res.redirect("/login");
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log("Error login post sign up failed.")
                res.redirect("/login");
            } else {
                // res.redirect("/user/" + user._id);
                res.redirect("/blogs");
            }
        });
    });
});

// GET : Show Login form
router.get("/login", function(req, res) {
    console.log("Login Form.");
    res.render("user/login");
});

// POST : Do login
router.post("/login", passport.authenticate("local-login", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res) {
    console.log("Login success.");
    req.flash("success", "Welcome "+req.user.firstName+"!");
    res.redirect("/blogs");
});

// GET : Logout
router.get("/logout", function(req, res) {
    console.log("Logout.");
    req.logout();
    // req.flash("success", "Party On!");
    req.user = null;
    res.redirect("/user/login");
});

// GET : Show User Details Form
router.get("/:id/edit", function(req, res) {
    console.log("Login Form.");
    res.render("user/edit");
});

// POST : Update user details
router.post("/login", passport.authenticate("local-login", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res) {
    console.log("Login success.");
    req.flash("success", "Welcome "+req.user.firstName+"!");
    res.redirect("/blogs");
});

module.exports = router;