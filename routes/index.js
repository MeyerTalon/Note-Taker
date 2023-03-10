// Importing the notes router
const notesRouter = require('./notes');

const express = require('express');

const router = express();

// Activates the router
router.use(notesRouter);

module.exports = router;