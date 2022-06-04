const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const notesController = require('../controllers/notescontroller')


//----------------------ROUTE 1 ------------------------------// 
//Get all notes using: GET "api/notes/getallnotes". Login required
router.get('/getallnotes', fetchuser, notesController.getAllNotes)


//----------------------ROUTE 2 ------------------------------// 
//Add a new note using: POST "api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], notesController.addNote )

//----------------------ROUTE 3 ------------------------------// 
//Update an existing note using: PUT "api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser,
    // [
    //     body('title', 'Enter a valid title').isLength({ min: 3 }),
    //     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    // ], 
    notesController.updateNote)

//----------------------ROUTE 4 ------------------------------// 
//Update an existing note using: DELETE "api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, notesController.deleteNote)


module.exports = router;