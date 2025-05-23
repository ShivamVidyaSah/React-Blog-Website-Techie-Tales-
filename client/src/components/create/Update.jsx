
//import express from "express";

import axios from 'axios';
import { useLocation, useNavigate , useParams } from 'react-router-dom';

import {useRef, useState, useEffect, useContext} from 'react';

//InputBase contains as few styles as possible. It aims to be a simple building block for 
// creating an input. It contains a load of style reset and some state logic.
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize} from "@mui/material";
//The Form Control component is a utility that lets you associate a form input with 
// auxiliary components, such as labels, error indicators, or helper text.

// TextAreaAutosize is a component that will provide us with a text area field, that is variable in size

import { API } from "../../services/api";

//import cors from "cors";


import {AddCircle as Add} from '@mui/icons-material';
//This is called named import, as we are assigning the import a name so that we can use it effectively

import { DataContext } from '../../context/DataProvider';

import FormData from "form-data";

import Editor from '../editor/Editor.js';

import Quill from "quill";
import "react-quill/dist/quill.core.css";

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
    height:'30vh',
    objectFit:'cover',
});

const StyledFormControl = styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
    font-size:25px;
`;
const StyledFormControl1 = styled(FormControl)`
    width:95%;
    margin:0 35px 30px 35px;
    font-size:25px;

`;

const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    width:100%;
    word-break:break-word;

`;

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
    &:focus-visible {
        outline:none;
    }
`;

const Btn = styled(Button)`
    height: 40px;
    border-radius: 10px;
`;

const Info = styled(Box)`
    width:100%;
    margin: 0 0 20px 0;
`

//This initialPost obj will store all the details about the blog like
//title, description, picture, username etc
const initialPost = {
     title:'',
     description:"",
     minidescription:"",
     picture:'',
     username:'',
     categories:'',
     createdDate: new Date()
}

// const app = express();
// app.use(cors({ origin: "*", credentials: true})); 


const UpdatePost = () => {

//the above line helps us handle any cors errors

    const [post,setPost] = useState(initialPost); 
    const quillRef = useRef(null); // Ref for Editor
    const editorContainerRef = useRef(null);

    const[file,setFile] = useState(""); // This state will help us store the image

    //const [profilePic , setProfilePic] = useState("https:mages.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80")

    const { account } = useContext(DataContext);
    //we are importing the account from the data context

    // const [ searchParams] = useSearchParams();

    //The use effect takes two argument, 1. a callnack function
    //2. when to call the use effect

    // const quill = new Quill('#editor', {
    //     theme: 'snow'
    //   });
    // const[ value, setValue] = useState('');



    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


    const location = useLocation();
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        const fetchData = async() => {
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])


    useEffect(()=>{

            const getImage = async() => {
            //     first we are checking whether anyfile is there in the "file" state
            //     if yes then we will creta an object of form data and use it to append the file and it's name
            
            try{
                
                    if(file){

                        //const data1 = new File(["Hello"], "test.txt", {type:"text/plain"});
                       

                        const data = new FormData();
                        data.append("name", file.name);
                        data.append("file", file);

                        console.log("file is ",file);

                        //SINCE THE BELOW CODE IS GIVING AN ERROR, WE ARE USING THE FETCH API
                        //console.log("FormData Content:", [...data.entries()])
                        //API call, we are making this API in config.js to the uploadFile api, it will provide us with a response
                        //const response = await API.uploadFile(data); 
                        // we are passing the data here cuz we have stored the formdata in data


                        const res = await axios.post("http://localhost:4000/file/upload", data, {headers: {
                            'Content-Type': 'multipart/form-data'
                          }
                        })

                        

                        //const response = await res.json();
                        // post.picture = res.data; 

                        if (res.data && res.data.filePath) {
                            setPost(prevPost => ({
                                ...prevPost,
                                // picture: res.data,  // Update the post state with the image URL
                                picture : `http://localhost:4000${res.data.filePath}`
                            }));
                        }

                        console.log(post);
                        //console.log("username is ",account.username);
                        //This post.picture will store the url of the image that mongodb will provide 
                    }

                }catch(error){
                    console.log(error);

                    if (error.response && error.response.status === 400) {
                        alert(error.response.data.error); // Show alert for invalid file type
                    } else {
                        alert("File upload failed. Invalid file type. Please try again.");
                    }
                }
            }

            getImage();
            post.categories = location.search?.split("=")[1] || 'All';
            // post.categories= searchParams.get('category');
            // console.log(post.categories);
            //For the category what we are planning is that when someone clicks on the category and the
            //clicks on create blog it should show in the url and we should be able to fetch it from the url
            // and thus we are making a slight change in our Categories.jsx and we are ensuring that it links to
            // /create/category=${category}. This category we can fetch and store it in our database

            post.username= account.username;

    },[file])
    //Since i have passed an empty array, the useEffect will be called only once
    //And since useEffect is helping in changing this state, i can directly pass the file in
    // the array


    // Runs Only Once on Mount → The first useEffect initializes Quill once when the component mounts.
    //✅ Updates Quill When post.description Changes → The second useEffect ensures that if post.description is updated externally, it reflects in the editor.
    // ✅ Prevents Reinitialization Issues → The editor is not reset every time post.description updates, avoiding loss of data.
    useEffect(() => {
        // Initialize Quill Editor
        if (!quillRef.current && editorContainerRef.current) {
          quillRef.current = new Quill(editorContainerRef.current, {
            theme: "snow",
            placeholder: "Start writing...",
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'], // Add image button
                ],
            },
            
          });

          if(post.description){
            quillRef.current.root.innerHTML= post.description;
          }
    
          quillRef.current.on("text-change", () => {
            setPost((prevPost) => ({
              ...prevPost,
              description: quillRef.current.root.innerHTML, // Store as HTML
              //description: post.description , 
            }));
          });
        }
      }, []);   // Depend on `post.description` to load previous content

       // Update Quill content if `post.description` changes externally
      useEffect(() => {
        if (quillRef.current && post.description !== quillRef.current.root.innerHTML) {
          quillRef.current.root.innerHTML = post.description;
        }
      }, [post.description]);

    const handleChange = (e) => {
            setPost({...post,[e.target.name]: e.target.value})
    }


    // const handleContentChange = (content) => {
    //     setPost(prevPost => ({
    //         ...prevPost,
    //         description: content // Store Quill content as HTML
    //     }));
    // };

    const updateBlogPost = async() => {
        const res = await API.updatePost(post);
        if(res.isSuccess){
            navigate(`/details/${id}`);
        }
    }
    
    return(
        <Container>
            <Image src={post.picture || url} alt="banner" />

            <StyledFormControl >
            {/* In regular HTML, you use for="id" to link a label with an input field.
            In React, for is a reserved JavaScript keyword, so JSX uses htmlFor instead.
            This means the label is linked to an input field with id="fileInput". */}
                <label htmlFor="fileInput" >
                    <Add fontSize="large" color='action' />
                </label>

                 {/* This will provide us with an option to  upload files */}
                {/* by giving this input an id="fileInput" we have connected the button to 
                the file upload functionality. So whenever we click on that button a dialog box will 
                open from where we can choose our file */}

                <input type="file" id="fileInput" style={{display:'none'}}
                onChange={(e) => setFile(e.target.files[0])}/>
               
                {/* to access any any file, we have to use the target.files[0] function.
                .file() usually comes in an form of array as we can select multiple files, so we can use indexes
                to get the desired file */}
                <Info>
                    {/* we are making it a controlled compenent by passing the value={} */}
                    <InputTextField placeholder="Title" value={post.title} onChange={(e) => handleChange(e)} name="title"/> {/*this will give me a text field*/}
                    {/* <InputTextField placeholder="Description" onChange={(e) => handleChange(e)} name="minidescription"/>  */}
                </Info>
                <Btn variant="contained" onClick={() => updateBlogPost()}>Update</Btn>
            </StyledFormControl>
            <StyledFormControl1>
              <InputTextField placeholder="Description( max: 50 character )" value={post.minidescription} onChange={(e) => handleChange(e)} name="minidescription"/> 

            </StyledFormControl1>


        
            {/* The Textarea Autosize component gives you a textarea HTML element that automatically 
            adjusts its height to match the length of the content within. */}
            {/* "minRows" is a prop that determines the minimum height of the text area */}
            {/* <TextArea
                minRows={5}
                placeholder="Start writing..."
                onChange={(e) => handleChange(e)} name="description"/> */}

            {/* <Editor ref={editorRef} defaultValue={post.description} /> */}
            <Box ref={editorContainerRef}  style={{ height: "300px", marginTop: "20px", border: "1px solid #ccc" }} />

        </Container>
    )
}

export default UpdatePost;