//This file is for the home page

import {Grid} from '@mui/material';

import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";


const Home = () => {
    return (
        // In JSX, we use <>...</> (fragments) to group multiple 
        // elements without adding an extra wrapper element like <div>
        <>
            <Banner />
            <Grid container>
            {/* lg={2} sm={2} xs={12} corresponds to large screen, 
            small screen and extra small screen */}
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories/>
                </Grid>
                <Grid container item lg={10} sm={10} xs={12}>
                    Post
                </Grid>
                
            </Grid>    
        </>
    )
}

export default Home;