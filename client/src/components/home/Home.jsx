//This file is for the home page

import {Grid2} from '@mui/material';

import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";
import Post from './post/Posts.jsx';


const Home = () => {
    return (
        // In JSX, we use <>...</> (fragments) to group multiple 
        // elements without adding an extra wrapper element like <div>
        <>
            <Banner />
            <Grid2 container spacing={2} >
            {/* lg={2} sm={2} xs={12} corresponds to large screen, 
            small screen and extra small screen */}
                <Grid2 size={{ lg:2, sm:2, xs:12}}>
                    <Categories/>
                </Grid2>
                <Grid2 container size={{ lg:10, sm:10, xs:12}}>
                    <Post />
                </Grid2>
                
            </Grid2>    
        </>
    )
}

export default Home;