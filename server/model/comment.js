import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    postId: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})


const comment = mongoose.model('comment',commentSchema); 
// first is the name and second is with what you want to validate it


export default comment;