const express = require("express"); // Import the express module to create an express application
const fs = require("fs"); // Import the fs module to handle file system operations
const path = require("path"); // Import the path module to handle and transform file paths
const { v4: uuidv4 } = require("uuid"); // Use uuidv4 to generate unique IDs

const nr = express.Router(); // Using express.Router()
const dbFilePath = path.resolve(__dirname, "../db/db.json");

// GET /api/notes - Read the db.json file and return all saved notes as JSON
nr.get("/api/notes", (req, res) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes data" });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST /api/notes - Receive a new note, add it to the db.json file, and return the new note to the client
nr.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // Generate a unique ID for the new note
  newNote.id = uuidv4();

  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes data" });
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save the new note" });
      }
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id - Delete a note by ID
nr.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes data" });
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);
    fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete the note" });
      }
      res.json({ message: "Note deleted", id: noteId });
    });
  });
});

module.exports = nr;
