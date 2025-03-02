
import Post from "../model/post.js"


//we will be importing this in routes.js
// the middleware will pass the data to this function in the req variable
export const createPost = async(req,res) => {

    //when we receive data from the front-end, we have to verify whether it is correct or not
    //That's why we have to create a file inside model folder named post.js
    try{
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json('Post saved successfully');
    }catch(error){

        return res.status(500).json(error);

    }
}


export const getAllPosts = async(req,res) => {

    let category = req.query.category;
    let post;

    try{

        if(category){
            //if we are having a category, we search using that category and return things in that category or
            post = await Post.find({categories: category})
        }
        else{
            //we run the default search and return everything
            post = await Post.find({});
        }
        //the above code will help us retrieve data from the mongodb server
        //.find() is the funtion and Post is the name of the collection

        return res.status(200).json(post);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}