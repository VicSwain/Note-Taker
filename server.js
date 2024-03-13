const express = require('express');
const path = require('path');
const api = require('./routes/index.js')
const PORT = process.env.PORT || 3001
const app = express();
const { clog } = require('./middleware/clog.js')


// middleware for parsing JSON and urlencoded data
app.use(express.json());
// middleware used to accept form data
app.use(express.urlencoded({ extended : true }));
app.use('/api', api);
// middleware to serve up static assets from the public folder
app.use(express.static('public'));


// GET route for notes page 
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;