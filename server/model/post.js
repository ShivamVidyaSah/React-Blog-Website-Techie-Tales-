import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true   
    },
    minidescription:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    createdDate:{
        type: Date
    }
});

const post = mongoose.model('post',postSchema);
//mongoose.model takes two parameter 1. model name , 2.schema name

export default post;