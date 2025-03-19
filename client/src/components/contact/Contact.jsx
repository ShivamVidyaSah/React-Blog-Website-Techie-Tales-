import { Box, styled, Typography, Link, TextField, Button } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import { useState } from 'react';
import { API } from '../../services/api';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
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


const ContactForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Btn = styled(Button)`
    text-transform:none;
    height:48px;
    background:#574964;
    color:#fff;
`;

const Contact = () => {

    //this will store the data for the mail
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        subject:"",
        message:""

    });

    // check and display the mail sent status
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value
        });
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        setStatus("Sending...");
        try{
            const response = API.sendMail(formData);
            
                setStatus("Sent");
           

        }catch(error){
            setStatus("Error sending message");
        }

    }

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography> 
                <ContactForm onSubmit={handleSubmit}>
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                    <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <TextField label="Subject" type="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                    <TextField label="Message" name="message" value={formData.message} onChange={handleChange} multiline rows={4} required />
                    <Btn type="submit" variant="contained" color="primary">
                        Send Message
                    </Btn>
                        {status && <Typography variant="body2">{status}</Typography>}
                </ContactForm>  
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.linkedin.com/in/shivam-vidya-sah-7004391b8/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:sahahivam10@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;