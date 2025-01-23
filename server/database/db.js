//Making connection with MongoDB database using mongoose

import mongoose from "mongoose";



// this function will help us connect to the database using the in-built 
// function of mongoose called "mongoose.connect"
// the username & password are coming from the file where the file was saved
const Connection = async (username,password) => {

    //but directly sharing my databases username and password in the url is not a good practice at all
    //to prevent that we will use "dotenv" dependency

    const URL =`mongodb://${username}:${password}@blogapp-shard-00-00.5bqhp.mongodb.net:27017,blogapp-shard-00-01.5bqhp.mongodb.net:27017,blogapp-shard-00-02.5bqhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-bhtjoj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogApp`;
    try{
        
        // the .connect function is an async function which returns a promise.
        // thus we have to use "async and await"
        // the .connect function takes two parameter
        // 1. connection string that is the url
        // 2. "useNewUrlParser: true" which tell mongodb that your old parseUrl
        // got depricated and please use this new parser 
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting ", error);
    }
}


export default Connection;