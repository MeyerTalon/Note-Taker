const notes = require('express').Router();
const fs = require('fs');
const util = require('util');


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
      }
    });
};

let noteIdArr = [];
fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const noteData = JSON.parse(data);
  for (let i = 0; i < noteData.length; i++) {
    noteIdArr.push(noteData[i]);
  }
});



const createId = () => {
  let noteId = Math.floor(Math.random() * 99) + 1;
  if (noteIdArr.length === 0) {
    noteIdArr.push(noteId);
  } else {
    for (let i = 0; i < noteIdArr.length; i++) {
      if (noteIdArr[i] === noteId) {
        noteId = Math.floor(Math.random() * 99) + 1;
        i = 0;
      }
    }
    noteIdArr.push(noteId);
  }
  return noteIdArr[noteIdArr.length - 1];
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

    req.body.id = createId();

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
