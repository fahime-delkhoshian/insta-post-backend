const express = require("express");
const router = express.Router();


//Controllers
const userController = require('app/controllers/api/v1/userController');
const postController = require('app/controllers/api/v1/postController');
const commentController = require('app/controllers/api/v1/commentController');

//Validators
const userValidator = require('app/validators/userValidator');

//middleware
const ApiAuth = require('app/middleware/apiAuth');
const { uploadImage } = require('app/middleware/uploadMid');

router.post('/user', userValidator.signIn(), userController.insert);

router.post('/post', ApiAuth , uploadImage.single('image'),postController.insert);
router.get('/post',postController.getPosts);

router.post('/comment',commentController.insert);
router.get('/comment/:post_id',commentController.getComments);

module.exports = router;