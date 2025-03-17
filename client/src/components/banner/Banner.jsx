
import { Box, Typography, styled} from '@mui/material';
import Banners from "../../asset/banner.png"

const Image = styled(Box)`
    background-image: url(${Banners}) ;
    width: 100%;
    height:20vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
     border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
`;

const Heading = styled(Typography)`
    font-size:60px;
    color: #000;
    line-height:1;
    font-family: "serif";
`;



const Banner = () => {
    return (
        <Image>
            <Heading>Techie Tales</Heading>
            {/* <Typography>BLOG</Typography> */}
        </Image>
    )
}


export default Banner;