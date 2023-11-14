// create web server
// 1. load express
var express = require("express");
// 2. create an instance of express
var app = express();
// 3. load body-parser
var bodyParser = require("body-parser");
// 4. load mongoose
var mongoose = require("mongoose");
// 5. load the model
var Comment = require("./models/comment");
// 6. load the model
var Campground = require("./models/campground");
// 7. load the seed file
var seedDB = require("./seeds");

// 8. connect to the database
mongoose.connect("mongodb://localhost/yelp_camp_v5");
// 9. tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// 10. set the view engine
app.set("view engine", "ejs");
// 11. serve the public directory
app.use(express.static(__dirname + "/public"));
// 12. seed the database
seedDB();

// ROUTES
// 1. landing page
app.get("/", function(req, res){
    res.render("landing");
});

// 2. INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // get all campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error: " + err);
        } else {
            // render the campgrounds page
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// 3. CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var newCampground = {name: req.body.name, image: req.body.image, description: req.body.description};
    // create a new campground and save to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Error: " + err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// 4. NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// 5. SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error: " + err);
        } else {
            console.log(foundCampground);
            // render the show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
