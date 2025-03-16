
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile Icon
import logo from '../../asset/logo.png'
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider.jsx";
import { useState, useContext } from "react";



const Component = styled(AppBar)`
  background: #fff;
  color: #000;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: space-between; /* Ensures spacing */
  align-items: center;
  padding: 0 20px; /* Adds some padding */
`;

// Styling for Logo
const Logo = styled("img")({
  height: 50, // Adjust as needed
});

// Styling for Navigation Links
const NavLinks = styled(Box)`
  display: flex;
  justify-content: center;
  flex-grow: 1; /* Helps center the links */
  
  & a {
    padding: 20px;
    text-decoration: none;
    color: black; /* Ensures text is visible */
    font-weight: 500;
  }
`;

// Profile Icon Container
const ProfileIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header = () => {

    const navigate = useNavigate();

    // const toProfile = () => {
    //         navigate('/profile');
    // }

  const { account } = useContext(DataContext);

 

  return (
    <Component>
      <Container>
        {/* Left Section: Logo */}
        <Box>
          <Link to="/">
            <Logo src={logo} alt="Logo" /> 
          </Link>
        </Box>

        {/* Center Section: Navigation Links */}
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Logout</Link>
        </NavLinks>

        {/* Right Section: Profile Icon */}
        <ProfileIcon>
            <Link to={`/profile/${sessionStorage.getItem('userName')}`}>
             <AccountCircleIcon fontSize="large" style={{ color: "black" }} />
            </Link>
        </ProfileIcon>
      </Container>
    </Component>
  );
};

export default Header;
