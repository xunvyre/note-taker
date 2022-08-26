//declare variables and dependencies
const express = require('express');
const app = express();
const { notes } = require('./db/notes');
const fs = require('fs');
const path = require('path');

//port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//functions to be moved later
function createNewNote(body, notesArr)
{
    const note = body;
    notesArr.push(note);
    fs.writeFileSync
    (
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );
    return note;
};

//api route(s)
app.get('/api/notes', (req, res) =>
{
    res.json(notes);
});

//GET routes
app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) =>
{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//send any weird request back to main notes page, NOT index.html
app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//POST route(s)
app.post('/api/notes', (req, res) =>
{
    //use epoch ms to assign a unique id
    const d = new Date();
    let noteID = d.getTime();
    req.body.id = noteID.toString();

    //add to json file
    const animal = createNewNote(req.body, notes);

    res.json(req.body);
});

//confirmation of API
app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`)
});