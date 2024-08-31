const express = require('express');
const router = express.Router();
const testcontrollers = require("../controller/test");
router.post('/post', testcontrollers.postTest);
router.get('/get',testcontrollers.getTest);
router.get('/getTest/:id',testcontrollers.getTestByid);
module.exports = router;