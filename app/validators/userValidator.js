const validator = require('./validator');
const { check } = require('express-validator/check');

class userValidator extends validator {
    
    signIn() {
        return [
            this.checkUsername(),
            this.checkFullname(),
        ]
    }

    checkUsername() {
        return [
            check('username')
                .not().isEmpty()
                .withMessage('username can not be empty'),
        ]
    }

    checkFullname() {
        return [
            check('fullname')
                .not().isEmpty()
                .withMessage('fullname can not be empty'),
        ]
    }
    
}

module.exports = new userValidator();