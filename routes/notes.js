const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
// helper function to generate unique ids
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req,res) => {
    const requestedNote = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const idReturn = json.filter((note) => note.note_id === requestedNote);
      return idReturn.length > 0 ? res.json(idReturn) : res.json("No note with that id, try again.");
    })
    .catch((err) => console.error('Error in pulling note: ', err));
});

notes.delete('/:id', (req, res) => {
    const deleteRequest = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const idReturn = json.filter((note) => note.note_id !== deleteRequest);
        writeToFile('./db/db.json', idReturn)
        res.json(`Note ${note_id} has been deleted`)
    })
    .catch((err) => console.error('Error deleting note: ', err));
});



notes.post('/', (req, res) => {
    const { title, text } = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
            
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else {
        res.errored('Error in adding note');
    }
});





module.exports = notes;
