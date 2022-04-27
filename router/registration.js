const express = require('express');

const middleware = require('../middleware/middleware.registration.js');
const controller = require('../controller/controller.registration.js');

const router = express.Router();

router.post('/',middleware,controller);

module.exports = router;