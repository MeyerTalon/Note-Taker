const notes = require('express').Router();
const fs = require('fs');
const util = require('util');

let noteIndex = 0;

// Helper functions
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
        noteIndex++;
      }
    });
};

// const removeNote = (noteId, file) => {
//   fs.readFile(file, 'utf8', (error, data) => {
//     if (error) {
//       console.log(error);
//       return;
//     } else {
//       for (let i = 0; i < notesIndex)
//     }

//   });
// };

notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {

    console.log(req.body);

    req.body.id = noteIndex;

    const { title, text, id } = req.body;

    if (req.body) {
        const newNote = {
        title,
        text,
        id
        };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.errored('Error in adding note');
  }
});

module.exports = notes;
