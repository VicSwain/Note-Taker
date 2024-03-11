const express = require('express');
const path = require('path');
const api = require('./routes/index')
const PORT = process.env.PORT || 3001
const app = express();


// middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
// middleware to serve up static assets from the public folder
app.use(express.static('public'));
app.use('/api', api);

// View route is a GET route for the notes page
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);