
import { AppBar, Toolbar, Typography, styled } from "@mui/material";

import {Link} from 'react-router-dom';
// we are doing this because we want our navbar links to be routable. We will have to replace the 
//"Typography" with "Link" for this to work

const Component = styled(AppBar)`
    background:#fff;
    color: #000;
`;



// with this & p >, we are actually handling the typography which by default
// give a p tag
//When we change this to Link, link by default returns an "a" tag, so we have to replace "p" with "a"
const Container = styled(Toolbar)`
    justify-content: center;
    & a {
        padding: 20px;
        text-decoration:none;
    }

`;

const Header = () => {

    return(
        <Component>
            <Container>
                {/* Along with the link, we also have to mention to="", 
                meaning where we want to route it or else it will break */}
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Logout</Link>
            </Container>
        </Component>
    )
}


export default Header;