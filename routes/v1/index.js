const { Router } = require('express');

const columnnRouter = require('./columns');
const taskRouter = require('./tasks');

const router = Router();

router.use('/column', columnnRouter);
router.use('/task', taskRouter);

module.exports = router;