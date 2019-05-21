const jwt = require('jsonwebtoken');
const User = require('app/models/user');

module.exports = (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        return jwt.verify(token, config.privateKey, (err, decoded)=> {

            if(err) {
                return res.status(401).json({
                    success : false,
                    message : 'Failed To Authentication token'
                }); 
            }

            User.findById(decoded.user_id, (err, user) =>{
                if (err) throw err;
                if(user) {
                    user.token = token;
                    req.user = user;
                    next();
                    return;
                }

                return res.json({
                    success : false,
                    message : 'user not found'
                }); 

            })
          });
    }

    return res.status(401).json({
        success : false,
        message : 'Failed To Authentication token'
    });
}