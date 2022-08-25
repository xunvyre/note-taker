//declare variables and dependencies
const express = require('express');
const app = express();
const { notes } = require('./db/notes');

//port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//functions to be moved later
function createNewNote(body, notesArr)
{
    const note = body;
    notesArr.push(note);
    return note;
};

app.get('/api/notes', (req, res) =>
{
    res.json(notes);
});

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