import { Box, TextareaAutosize, Typography, Button, styled } from "@mui/material"
import { useState, useContext, useEffect } from "react";

import { DataContext } from "../../../context/DataProvider";

import {API} from "../../../services/api.js"

import Comment from "../comments/Comment.jsx"



const Container = styled(Box)`
    width:100%;
    margin-top:50px;
    display : flex;
`;

const Image = styled('img')({
    width:50,
    height:50,
    borderRadius:'50%',
    flex: 1
});

const StyledArea = styled(TextareaAutosize)`
    height:100px;
    width:100%;
    margin:0 20px;
`;

// const StyledArea = styled(Box)(({theme})=>({
//     height:100,
//     width:'85%',
//     margin:'0 20',
//     // We are adding breakpoints to make sure the responsiveness works 
//     // 'md' means 'medium screen'
//     [theme.breakpoints.down('md')] : {
//        height:70,
//        width:'50%'
//     }
// }))

const initialValues = {
    name:'',
    postId:'',
    comment:'',
    date: new Date()
}




export const Comments = ({post}) => {

    const [ comment, setComment] = useState(initialValues);

    const [comments, setComments] = useState([]);

    //this will make sure that everytime we add a comment, the component re-render 
    // to display the comment

    const [ toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    const url = 'https://static.thenounproject.com/png/12017-200.png';


    useEffect(()=> {
        const getData = async() => {
            const response = await API.getAllComments(post._id);
            if(response.isSuccess){
                setComments(response.data);
            }
        }
        getData();
    },[post._id, toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comment: e.target.value
        })
    }

    const addComment = async(e) => {

        try{
            const response = await API.newComment(comment);
            if(response.isSuccess){
                setComment(initialValues);
            }
            setToggle(prev => !prev);
            //whenever we add a comment, we are changing the state to help us show the comment
            // we are also making the useEffect dependent on toggle so that it runs everytime there is a new comment
        }catch(error){
            console.log("Comment not added");
        }
}

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp"/>
                <StyledArea
                    minRows={5}
                    placeholder="Your thoughts?..."
                    value={comment.comment}
                    onChange={(e)=> handleChange(e)}
                />
                <Button  variant="contained" color="primary" size="medium"
                style={{height: 40}}  onClick={(e)=>addComment(e)}>Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}/>
                       // This line conditionally renders comments by first checking if comments exists 
                       // and has a length greater than zero. If both conditions are met, it maps through the comments
                       //  array and renders a <Comment> component for each item, passing the comment data as a prop
                       // This approach helps prevent runtime errors by ensuring that comments is defined before attempting
                       //  to iterate over it. The map function then creates a new <Comment> component for each comment in the 
                       // array, dynamically rendering them in the UI. If comments is null, undefined, or an empty array, 
                       // nothing will be rendered, keeping the UI clean and efficient.
                    ))
                }
            </Box>
          
        </Box>
    )
}