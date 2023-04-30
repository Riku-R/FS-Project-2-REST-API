const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const Movie = require("./modules/model");
const client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Get all the movies
app.get("/api/getall", async function (req, res) {

        try {
            const movies = await Movie.find().limit(5);
            console.log("Movies found!");
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json("Connection error!")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Showing the first 5 movies in the database!");
        }
});


// Get movies by ID
app.get("/api/:id", async function (req, res) {

    try {
    const _id = req.params.id;
    const movies = await Movie.findById(_id);
    res.status(200).json(movies);
    } catch (error) {
      res.status(500).json("Connection error!")
      console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
    } finally {
      console.log("Searching for a movie by ID: " + req.params.id);
    }
});


// Get movies by title
app.get("/api/title/:text", async function (req, res) {

  try{
  const searchString = req.params.text;
  const movies = await Movie.find({title: {$regex: searchString, $options: "i"}}).limit(5);
  res.status(200).json(movies);
  } catch (error) {
    res.status(500).json("Connection error!")
    console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
  } finally {
    console.log("Searching for a movie by " + req.params.text + " text in the title and limiting it to the first 5 movies in the database!");
  }
});


// Adding a movie to the database
app.post("/api/add", async function (req, res) {
    
  const post = new Movie ({
      title: req.body.title,
      year: req.body.year,
      poster: req.body.poster
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json("Connection error!")
      console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
    } finally {
    console.log("Movie added to the database!");
    }
  });


// Updating a movie by ID
app.put("/api/update/:id", async function (req, res) {
  
  try {
    const movie = await Movie.findByIdAndUpdate({_id: req.params.id}, {title: req.body.title, year: req.body.year, poster: req.body.poster});
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json("Connection error!")
    console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
  } finally {
    console.log("Movie updated!");
  }
});


// Deleting a movie by ID
app.delete("/api/delete/:id", async function (req, res) {

    try {
    const removedMovie = await Movie.deleteOne({_id: req.params.id});
    res.json(removedMovie);
    } catch (error) {
      res.status(500).json("Connection error!")
      console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
    } finally {
      console.log("Movie deleted!");
    }
});


app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
});