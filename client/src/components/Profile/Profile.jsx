import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/system";
import profilePic from "../../asset/profilepic.png"
import { useParams, useSearchParams } from "react-router-dom";
import { API } from "../../services/api.js"


//import { DataContext } from "../../context/DataProvider";


const Container = styled(Box)`
  width: 80%;
  margin: auto;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled(Box)`
  width: 100%;
  padding: 20px;
  background: #1976d2;
  margin: 20px 0 0 0;
  color: white;
  text-align: center;
  border-radius: 10px;
`;

const ContentArea = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const Sidebar = styled(Box)`
  width: 25%;
  padding: 20px;
  border-right: 2px solid #ddd;
`;

const MainContent = styled(Box)`
  width: 75%;
  padding: 20px;
`;

const InactiveButton = styled(Button)`
  background: #ccc !important;
  cursor: not-allowed;
  margin-top: 10px;
`;

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");

  const [user, setUser] = useState({ name: "", mail: "", profilePic: profilePic, blogs: [] });

  //const [searchParams] = useSearchParams();// will help us retrieve the parameters from the url

  const  username = useParams();

  //console.log(username);

  useEffect(() => {
   
    const fetchUserInfo = async () => {
      
      try {
        const response = await API.getUserInfo(username);

        const resBlog = await API.getBlogs(username);

        console.log(response);
        setUser((prevUser)=>({
          ...prevUser,
          name: response.data.username? response.data.username : "Unknown",
          mail: response.data.email?   response.data.email : "N/A",
          profilePic: response.profilePic || profilePic,
          blogs: resBlog.data? resBlog.data : [],
        }));

      
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
   
    fetchUserInfo();
  
  }, [username]);

  // Sample User Data
  // const user = {
  //   name: "",
  //   mail: "johndoe@example.com",
  //   profilePic: {profilePic}, // Change this with user image
  //   blogs: [
  //     { id: 1, title: "Understanding React State", date: "Feb 25, 2024" },
  //     { id: 2, title: "Guide to Material UI", date: "Jan 18, 2024" },
  //   ],
  // };



 //console.log(username);

  return (
    <Container>
      {/* Top Header Section */}
      <Header>
        <Avatar src={user.profilePic} sx={{ width: 80, height: 80, margin: "auto" }} />
        <Typography variant="h5" sx={{ marginTop: 1 }}>
          Welcome, {user.name}!
        </Typography>
      </Header>

      {/* Content Section */}
      <ContentArea>
        {/* Left Sidebar */}
        <Sidebar>
          <List>
            <ListItem button onClick={() => setSelectedTab("Profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setSelectedTab("My Blogs")}>
              <ListItemText primary="My Blogs" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Talk to Admin" />
              <InactiveButton variant="contained">Coming Soon</InactiveButton>
            </ListItem>
          </List>
        </Sidebar>

        {/* Right Main Content */}
        <MainContent>
          {selectedTab === "Profile" && (
            <>
              <Typography variant="h6">Profile Information</Typography>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.mail}</Typography>
              {/* <Avatar src={user.profilePic} sx={{ width: 100, height: 100, marginTop: 2 }} /> */}
            </>
          )}

          {selectedTab === "My Blogs" && (
            <>
              <Typography variant="h6">My Blogs</Typography>
              {user.blogs.length > 0 ? (
                user.blogs.map((blog) => (
                  <Box key={blog._id} sx={{ marginTop: 2, padding: 2, border: "1px solid #ddd", borderRadius: "5px" }}>
                    <Typography variant="subtitle1">{blog.title}</Typography>
                    <Typography variant="caption">{new Date(blog.createdDate).toDateString()}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>No blogs written yet.</Typography>
              )}
            </>
          )}
        </MainContent>
      </ContentArea>
    </Container>
  );
};

export default Profile;
