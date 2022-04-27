const express = require('express');

const middleware = require('../middleware/middleware.login.js');
const controller = require('../controller/controller.login.js');

const router = express.Router();

router.post('/',middleware,controller);

router.get("/",(req,res)=>{
	res.send('abc');
});

module.exports = router;