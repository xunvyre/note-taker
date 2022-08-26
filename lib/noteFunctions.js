const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArr)
{
    const note = body;
    notesArr.push(note);
    fs.writeFileSync
    (
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );
    return note;
};

module.exports = createNewNote;
