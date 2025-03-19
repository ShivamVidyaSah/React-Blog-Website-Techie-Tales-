import { Box, Typography, styled } from "@mui/material";
import {Delete} from "@mui/icons-material" 
import { useContext } from "react";

import { DataContext } from "../../../context/DataProvider";

import { API } from "../../../services/api"; 

const Component = styled(Box)`
    width: 85%;
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 30px;
    background: #f5f5f5;
    padding: 10px 10px 10px 10px;
    border-radius: 20px;
`

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`

const Container = styled(Box)`
    display: flex;
    margin-botton:15px;
`

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
`
const DeleteiconBox = styled(Box)`
   margin-left: auto;
    background: #FAA0A0;
    width: 40px;
    height: 40px;
    border-radius: 50%; /* Ensures it's a perfect circle */
    display: flex; /* Enables flexbox for centering */
    align-items: center; /* Centers content vertically */
    justify-content: center; /* Centers content horizontally */
`

// const Deleteicon = styled(Delete)`

   
// `




const Comment = ({comment, setToggle}) => {

    const { account } = useContext(DataContext);


    const removeComment = async() => {
            try{
                const response = await API.deleteComment(comment._id);
                if(response.isSuccess){
                    //we will fetch the remaining comments by chaging the setToggle state
                    setToggle(prev => !prev);
                    //this will also trigger the useEffect in Comments.jsx as the useEffect is 
                //dependent on toggle state, any change to toggle will trigger the useEffect


                }
            }catch(error){
                console.log(error);
            }
    }

    return (
       <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>

                { comment.name === account.username  && <DeleteiconBox>
                    <Delete onClick={()=> removeComment()}/>
                </DeleteiconBox>
                }
            </Container>
            <Box>
            <Typography>{comment.comment}</Typography>
            </Box>
       </Component>
      
    )
}


export default Comment;