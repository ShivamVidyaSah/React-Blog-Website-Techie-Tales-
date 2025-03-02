//THis file is post component
import {useEffect, useState} from "react";

import {Box} from "@mui/material";

import { useSearchParams } from "react-router-dom";

import Grid from '@mui/material/Grid2';

import {API} from "../../../services/api.js"


//component
import Post from "./Post.jsx";

//We have to call an api and retrive all the post from the datebase and
//store it in the state
const Posts = () => {

    const [post, setPost] = useState([]);


    const [searchParams] = useSearchParams();// will help us retrieve the parameters from the url

    const category = searchParams.get('category');

    // we have to display the post as soon as it navigates to the home page
    //for that we have to use useEffect
    useEffect(()=>{
        //In this function we will help in calling the api and fetching the date 
        //from the database
        try
       { const fetchData = async() => {
            // i am calling the API to give me all the existing post
            const response = await API.getAllPosts({category:category||''});
            //here we are passing the catgory as a params because we want to search and display the 
            // posts via category. and we are going to handle the params in api.js
            // under axiosInstance.interceptors.request.use after getting checked in config.js

            //if success then store the response data(all post) in the state
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    }catch(error){
        console.log(error);
        }
    },[category])
    //since we are passing the category as the dependency array, the useEffect
    //re-run whenever we change the category


    return (
        <>
            {
                post && post.length>0 ? post.map(post => (
                    
                        <Grid size={{lg:3, sm:3, xs:12}}>
                            <Post post={post} />
                            {/* //Passing the whole of post data as prop */}
                        </Grid>  
                   
                )) : <Box style={{color:'#878787', margin:'30px 80px'}}>
                    No data available to display
                    </Box>
            }
        </>
    )
}


export default Posts;