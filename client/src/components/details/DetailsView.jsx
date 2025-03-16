import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams,Link, Navigate, useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import {DataContext} from "../../context/DataProvider.jsx"
import { Comments } from "./comments/Comments.jsx";


// here we are trying to make this responsive and to make this repsonsive
// we have to do it like this
const Container = styled(Box)(({theme})=>({
    margin:'50px 100px',
    // We are adding breakpoints to make sure the responsiveness works 
    // 'md' means 'medium screen'
    [theme.breakpoints.down('md')] : {
        margin: 15
    }
}))

const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});

const Heading = styled(Typography)`
    font-size:38px;
    font-weight: 600;
    text-align: center;
    margin: 55px 0 10px 0;
    word-break: break-word;
`;

const Edit = styled(EditIcon)`
    margin:5px;
    padding:5px;
    border: 1px solid #878787;
    border-radius:10px;
`;

const Delete = styled(DeleteIcon)`
    margin:5px;
    padding:5px;
    border: 1px solid #878787;
    border-radius:10px;
`;

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex
`;

const Description = styled(Typography)`
    float: left;
    word-break: break-word;
`;


const DetailView = () => {

    const  [ post,setPost ] = useState({});//We are setting the default to an empty object
    // as will be receiving a single post data at a time

    //destructing useParams to get the id
    const { id } = useParams();

    const {account} = useContext(DataContext);

    const navigate = useNavigate();

    const url = post.picture? post.picture: 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(()=>{
        const fetchData = async() => {
            //we are passing id as an query to the API
          try{ 
            const response =  await API.getPostById(id);
            if(response.isSuccess)
                {
                setPost(response.data);
                }
            
           }catch(error){
                console.log(error);
           }
        }
        fetchData();
    },[])


    const deleteBlog = async() => {
        try{
            let response = await API.deletePost(post._id);
            if(response.isSuccess){
                navigate('/');
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Container>
            <Image src={url} alt="blog"/>
                
             {/* we plan on showing the icons only the author is visiting or else we keep them hidden    */}
            <Box style={{float:'right'}}>
                {
                    account.username === post.username &&
                    <>
                         <Link to={`/update/${post._id}`}><Edit color="primary" /></Link>
                         <Delete onClick={()=> deleteBlog()} color="error"/>
                    </>
                }               
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Typography>By: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            {/* <Description>{post.description}</Description> */}
            <Description component="div">
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
            </Description>

             <Comments post={post}/> {/*passing a prop to Comments.jsx file */}

        </Container>
    )
}


export default DetailView;