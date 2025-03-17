import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import AboutImg from "../../asset/aboutpageimg.jpg";

const Banner = styled(Box)`
    background-image:url(${AboutImg}); /* Use template literals with 'url()' */
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Hi, My name is Shivam Vidya Sah</Typography>
                <Text variant="h5">I'm a Technical writer and an aspiring Software Developer. 
                Currently, I create clear and concise documentation to enhance user experiences, but my passion for coding drives me to transition into software development. I'm actively honing my skills in JavaScript, React, NodeJs and Full-Stack Development and working on projects that bridge my technical writing expertise with hands-on development. Excited for opportunities where I can combine my communication skills with software engineering to build impactful solutions.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/ShivamVidyaSah/React-Blog-Website-Techie-Tales-" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on Email 
                    {/* <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>   */}
                         
                        <Link href="mailto:sahahivam10@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;