// Import the Router function from the express module to create a new router instance
const pr = require("express").Router();

// Import the path module to handle and transform file paths
const path = require("path");

// Define a route for the root path ('/') that sends the 'index.html' file as a response
pr.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Define a route for the '/notes' path that sends the 'notes.html' file as a response
pr.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Export the router instance so it can be used in other parts of the application
module.exports = pr;
