const notesRouter = require('./notes');

const router = require('express').Router();

router.use(notesRouter);

module.exports = router;