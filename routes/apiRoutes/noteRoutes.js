const fs = require('fs');
const path = require('path');
const createNewNote = require('../../lib/noteFunctions');
const { notes } = require('../../db/notes');
const router = require('express').Router();

//GET route(s)
router.get('/notes', (req, res) =>
{
    res.json(notes);
});

//POST route(s)
router.post('/notes', (req, res) =>
{
    //use epoch ms to assign a unique id
    const d = new Date();
    let noteID = d.getTime();
    req.body.id = noteID.toString();

    //add to json file
    const note = createNewNote(req.body, notes);

    res.json(req.body);
});

//delete by id
router.delete('/notes/:id', (req, res) =>
{
    let noteID = req.params.id;
    //loop through objects and remove matching id
    for (let i = 0; i < notes.length; i++)
    {
        if(notes[i].id === noteID)
        {
            notes.splice(i, 1);
            fs.writeFileSync
            (
                path.join(__dirname, '../../db/notes.json'),
                JSON.stringify({ notes: notes }, null, 2)
            );
            //works, but returns "location undefined" bc current URL doesn't exist anymore
            location.reload();
        }
    }
});

module.exports  = router;