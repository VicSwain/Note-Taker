const notes = require('notes').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// helper function to generate unique ids
const uuid = require('../helpers/uuid');


module.exports = notes;
