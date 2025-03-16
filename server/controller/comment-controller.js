import comment from "../model/comment.js";
import Comment from "../model/comment.js"


export const newComment = async(req,res) => {
    try{
        const comment = await new Comment(req.body);
        comment.save();

        res.status(200).json({msg:'Comment saved'});
    }catch(error){
            res.status(500).json({ error: error.message})
    }
}

export const getComments = async(req,res) => {
        try{

            const comments = await Comment.find({postId: req.params.id})
            //Comment.find({ postId: req.param.id })
            // This is a MongoDB query (assuming Comment is a Mongoose model).
            // It tries to find all comments where postId matches the given ID from the request parameters.
            // Issue: req.param.id is incorrect! req.param is deprecated and may not work as expected.


            return res.status(200).json(comments);


        }catch(error){
            res.status(500).json({error: error.message});
        }
}

export const deleteComment = async(req,res) => {
    try{

        const comment = await Comment.findById(req.params.id);

        await comment.deleteOne();

        return res.status(200).json({msg:"Comment deleted"})
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}