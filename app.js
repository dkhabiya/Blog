var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override");
    
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/BlogDB", {useMongoClient:true});

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now()}
   
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Welcome!",
//     image: "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=13d43906e3e3a60c9c7099f4e30b8d09",
//     body: "Welcome to my blog!"
// });

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

// INDEX Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// New
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// Create
app.post("/blogs", function(req, res){
    // create
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newB){
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// Show
app.get("/blogs/:id", function(req, res) {
   
   Blog.find({_id: req.params.id}, function(err, blog){
      if(err) {
          console.log("Error");
          res.redirect("/blogs");
      } else {
          res.render("show", {b: blog[0]});
      }
   });
});

// Edit
app.get("/blogs/:id/edit", function(req, res) {
   
   Blog.find({_id: req.params.id}, function(err, blog) {
       if(err) {
           res.redirect("/blogs");
       } else {
           res.render("edit", {b: blog[0]});
       }
   }); 
});

// Update
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params._id, req.body.blog, function(err, uBlog){
        if(err) {
            console.log("Error");
        } else {
            
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started.");
});