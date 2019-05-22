const express = require("express");
const router = express.Router();


//Controllers
const userController = require('app/controllers/api/v1/userController');
const postController = require('app/controllers/api/v1/postController');

//Validators
const userValidator = require('app/validators/userValidator');

//middleware
const ApiAuth = require('app/middleware/apiAuth');
const { uploadImage } = require('app/middleware/uploadMid');

router.post('/user', userValidator.signIn(), userController.insert);

router.post('/post', ApiAuth , uploadImage.single('image'),postController.insert);
router.get('/post',postController.getPosts);

module.exports = router;