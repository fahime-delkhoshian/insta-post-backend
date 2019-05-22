const Controller = require('app/controllers/controller');

module.exports = new class PostController extends Controller{

     /**
     * 
     * url: api/v1/post
     * method : POST
     * params : [content, image]
     */
    async insert(req, res) {
        try {

            if(!req.file) {
                return this.failedMessage('File format can not be uploaded' , res, 405);
            }

            let path = req.file.path.replace(/\\/g , '/');
            let newPost = new this.model.Post({
                user : req.user._id,
                content : req.body.content,
                image : path
            });

            await newPost.save((err, post) => {
                if(err) {
                    return this.failedMessage(err, res);
                } else{
                    return res.json({
                        data : {
                            id : post._id,
                            content : post.content,
                            image_path : config.url + post.image
                        },
                        success : true
                    }); 
                }                
            });
        
        } catch(err) {
            this.failedMessage(err.message , res);
        }  
    }

     /**
     * 
     * url: api/v1/post
     * method : GET
     * params : []
     */
    async getPosts(req, res) {
        try {
            const posts =await this.model.Post.find({}).populate('user');
            return res.json({
                data : posts.map(post =>{
                    return {
                        post_id : post._id,
                        content : post.content,
                        image_path : config.url + post.image,
                        sender_name : post.user.fullname,
                        comment_number : post.commentsNumber
                    }
                }),
                success : true
            });

        } catch (err) {
            this.failedMessage(err.message , res);
        }
    }

}