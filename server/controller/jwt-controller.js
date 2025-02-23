import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


//this file is the middleware that will autherticate the user 
// before allowing them to post the blog
export const authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    //this authHeade contains the accessToken that it is getting from the api.js file's "authorization"  header value
    const token = authHeader && authHeader.split(' ')[1];
    //splitting and storing the actual token from the accessToken

    if(token == null){
        return res.status(401).json({msg: "Token is missing"});
    }

    //this jwt.verify(token, access secret token, call back function) whether the token is legit or not
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error,user) => {
            if(error){
                return res.status(403).json({msg:"Invalid Token"});
            }

            req.user = user;
            next();
    })
}