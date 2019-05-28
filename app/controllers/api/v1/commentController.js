const Controller = require('app/controllers/controller');

module.exports = new class CommentController extends Controller{

     /**
     * 
     * url: api/v1/comment
     * method : POST
     * params : [post_id, content]
     */
    async insert(req, res) {
        try {

            let newComment = new this.model.Comment({
                post : req.body.post_id,
                content : req.body.content,
                user : req.user._id,
            });
            const post =await this.model.Post.findById(req.body.post_id);

            await newComment.save((err, comment) => {
                if(err) {
                    return this.failedMessage(err, res);
                } else{
                    post.commentsNumber = post.commentsNumber + 1;
                    post.save();
                    return res.json({
                        message : 'comment was successfully registered',
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
     * url: api/v1/comment/:post_id
     * method : GET
     * params : []
     */
    async getComments(req, res) {
        try {
            const comments =await this.model.Comment.find({post : req.params.post_id}).populate('user');
            return res.json({
                data : comments.map(comment =>{
                    return {
                        id : comment._id,
                        content : comment.content,
                        username : comment.user.fullname
                    }
                }),
                success : true
            });

        } catch (err) {
            this.failedMessage(err.message , res);
        }
    }

}