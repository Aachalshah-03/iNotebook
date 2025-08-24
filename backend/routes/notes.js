const express = require("express");
const fetchuser = require("../middleware/fetchuser"); //checks the JWT token and adds the user’s ID into req.user. This ensures only logged-in users can access routes.
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator'); //importing functions from express-validator to validate user input

// Route 1: Get all the notes for a logged-in user using GET: /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {         //fetchuser makes sure the user is logged in.                  
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new note using POST: /api/notes/addnote
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 6 characters").isLength({min: 6,})
  ], async (req, res) => {

    try{
            const {title, description, tag} = req.body;

        //if any error the response will be sent as Bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save()
            res.json(savednote);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
   }
);


// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try{
        const { title, description, tag } = req.body;

        // Create an object newNote with the new data. If user sends only title, only that is updated.
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Try to find the note by its ID. If it doesn’t exist, return 404. OR find the note to be updated and update it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Check if the logged-in user owns the note and if yes allow updation. If not, return error.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //(Finds a document by its ID, Updates it with the provided data, optionally returns the new version of the document)
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note: updatedNote });
    } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
    }
});



// ROUTE 4: Deleting an existing Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try{
        // Try to find the note by its ID. If it doesn’t exist, return 404. OR find the note to be deleted and delete it
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Check if the logged-in user owns the note and if yes allow deletion. If not, return error.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //(Finds a document by its ID)
        const updatedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been successfullt deleted.", note: note});
    } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
