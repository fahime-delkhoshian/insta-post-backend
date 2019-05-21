const express = require("express");
const router = express.Router();


//Controllers
const userController = require('app/controllers/api/v1/userController');

//Validators
const userValidator = require('app/validators/userValidator');

//middleware

router.post('/user', userValidator.signIn(), userController.insert);

module.exports = router;