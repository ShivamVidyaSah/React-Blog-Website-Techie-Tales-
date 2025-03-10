// this file will contain single post

import {Box, Typography, styled} from '@mui/material';

import { addEllipsis } from '../../../utils/common-utils';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    height: 350px;
    & > p{
        padding: 0 5px 5px 5px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    word-break: break-word;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;

`;

const Image = styled('img')({
    width:'100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: 150
})

//this data is what we are sending from Posts.jsx as a prop
const Post = ({post}) => {

    //checking whether post contains any picture , if not then the card will show a default picture 
    const url = post.picture? post.picture : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

    return (
        <Container>
            <Image src={url} alt="blog"/>
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addEllipsis(post.minidescription,50)}</Details>
        </Container>
    )
}


export default Post;