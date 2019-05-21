const Controller = require('app/controllers/controller');
const UserTransform = require('app/transforms/v1/userTransform');

module.exports = new class UserController extends Controller{


    async insert(req, res) {
        try {

            if(await this.showValidationError(req, res)) return;

            let newUser = new this.model.User({
                username : req.body.username,
                fullname : req.body.fullname,
            });

            await newUser.save((err, user) => {
                if(err) {
                    if(err.code == 11000) {
                        return this.failedMessage('username is duplicate', res, 405);
                    }
                    return this.failedMessage(err, res);
                } else{
                    return res.json({
                        data : new UserTransform().createToken(true).transform(user),
                        success : true
                    }); 
                }                
            });
        } catch(err) {
            this.failedMessage(err.message , res);
        }  
    }

}