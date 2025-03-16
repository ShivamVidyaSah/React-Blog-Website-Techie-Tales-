import User from "../model/user.js"



export const getProfile = async(req,res) => {
    try{
        
        const user = await User.findOne(req.body.username);

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({msg: error.message})
    }
}