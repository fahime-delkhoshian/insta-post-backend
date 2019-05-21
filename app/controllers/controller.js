const autoBind = require('auto-bind');
const User = require('app/models/user');
const Post = require('app/models/post');
const Comment = require('app/models/comment');
const { validationResult } = require('express-validator/check');

module.exports = class controller{

    constructor() {
        autoBind(this);
        this.model = { User, Post, Comment}
    }

    failedMessage(msg , res , statusCode = 500) {
        res.status(statusCode).json({
            message : msg,
            success : false
        })
    }

    successMesssage(msg , res) {
        res.json({
            message : msg,
            success : true
        })
    }

    showValidationError(req, res) {

        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            res.status(422).json({
                message : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg
                    }
                }),
                success : false
            });
            return true;
        }
        return false;
    }
}