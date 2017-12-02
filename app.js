// Main application route handler.
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    localStratergy  = require("passport-local"),
    passportConf    = require('./config/passport'),
    flash           = require("connect-flash"),
    sanitizer       = require("express-sanitizer");
    
// Including routes
var postRoutes      = require("./routes/post"),
    commentRoutes   = require("./routes/comment"),
    userRoutes      = require("./routes/user");

// MongoDB promises
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gastronome");

app.set("view engine", "ejs");
app.set('trust proxy');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Passport config
app.use(require("express-session")({
    secret:"Idli Saambaar!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});

app.use(flash());
app.use(sanitizer());

// Use route files
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/user", userRoutes);

// Default route.
app.get("/", function(req, res) {
    res.render("default");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Gastronome Server Started.");
});