import User from "../model/user.js"
import Post from "../model/post.js";



export const getProfile = async(req,res) => {
    try{
        
        console.log(req.user.username);
        const user = await User.findOne({username: req.user.username});

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({msg: error.message})
    }
}

export const getBlog = async(req,res) => {
    try{
        
        const blog = await Post.find({username: req.user.username});
        
        return res.status(200).json(blog);
    }catch(error){
        return res.status(500).json({msg: error.message})
    }
}