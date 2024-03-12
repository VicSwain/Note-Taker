const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// helper function to generate unique ids
const uuid = require('../helpers/uuid');




notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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


notes.get('/api/:note_id', (req, res) => {
    const requestedNote = req.params.note_id;
    console.log(requestedNote);
    readFromFile('./db/db.json/:note_id').then((data) => res.json(JSON.parse(data)));
    
});
//note_id is what I feel should be used to pick the specific delete


module.exports = notes;
