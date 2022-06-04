const express = require('express');
const NotesModel = require('../Models/NotesModel')
const { body, validationResult } = require('express-validator')

const getAllNotes = async (req, res) => {
    try {
        const notes = await NotesModel.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");
    }
}


const addNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //if there are errors, return bad request and the erros
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new NotesModel({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");

    }

}

const updateNote = async (req, res) => {
    const { title, description, tag } = req.body
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it.
    let note = await NotesModel.findById(req.params.id)
    if (!note) {
        return res.status(404).send('Not found :(')
    }
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("not allowed")
    }

    note = await NotesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })

}

const deleteNote = async (req, res) => {
    // const { title, description, tag } = req.body
    try {
        //Find the note to be deleted and delete it.
        let note = await NotesModel.findById(req.params.id)
        if (!note) {
            return res.status(404).send('Not found :(')
        }
        //Allow deletion ONLY if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed")
        }

        note = await NotesModel.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured");
    }



}

module.exports = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote
}