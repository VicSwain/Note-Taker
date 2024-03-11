const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// helper function to generate unique ids
const uuid = require('../helpers/uuid');




notes.get('/', (req, res) => {
    readFromFile('./db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db.json');
        res.json('Note added successfully!');
    } else {
        res.errored('Error in adding note');
    }
});

module.exports = notes;
