//This file will store all the routes for our API, whenever we make a API call from the front end
//it will go through these routes to help upload the image.
//These contain the url path and the name of the api
//the api we are calling are all present under the controller folder

import express from "express";
import {signupUser, loginUser} from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";


import upload from "../utils/upload.js";
import { createPost, getAllPosts } from "../controller/post-controller.js";
//[IMP: we have to use a middleware because we have to convert the image from binary can
// we can store it in DB, we will be storing the files for the middleware under /server/utils folder]

import { authenticateToken } from "../controller/jwt-controller.js";

//This will allow us to to define specific routes and 
//middleware for different parts of your application, 
//such as users, products, or orders, in a more maintainable way.
const router = express.Router();

//This will help us hit the post route from the sign-up page
router.post("/signup", signupUser);
//This sign up function is the call-back function that is present in the 
//user-controller.js file and is working the same as the function(req,res)
//that we saw during the course on Udemy

//we are writing another API for the login part
router.post("/login", loginUser);
//This sign up function is the call-back function that is present in the 
//user-controller.js file and is working the same as the function(req,res)
//that we saw during the course on Udemy

router.post("/file/upload", upload.single("file"), uploadImage);
//the second parameter here is a middle ware. the .post() methods usually takes the 
//second parameter as a middleware. uploads is the name of the middleware we are importing
//.single('file') - means we are upladoing a single file
// ('file') - means we are uploading a file
// so when the route comes here, before going to the api call, 


//router.get('file/:filename' , getImage);

router.post('/create', authenticateToken ,createPost);
//This will calll the createPost method in the post-controller 
//but will have to authenticate the user before allowing him/her to post
// any blog using a middleware "authenticateToken"


router.get('/posts',authenticateToken, getAllPosts);
//getAllPost in present in post-controller.js

export default router;