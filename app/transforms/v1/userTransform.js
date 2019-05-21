const Transform = require('../tranform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform{

    transform(item) {
        return {
            fullname : item.fullname,
            username : item.username,
            ...this.withToken(item),
        }

    }

    withToken(item) {

        if(item.token) {
            return {
                token : item.token
            }
        }
        if(this.createToken == true) {
            let token = jwt.sign({user_id : item._id}, config.privateKey, {
                expiresIn: '30 days' // 60*60*24*30
            })
            return {
                token : token
            }
        }
        return {};
    }

    createToken(status = false) {
        this.createToken = status;
        return this;
    }
}