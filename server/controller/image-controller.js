//this file contains the api for the image upload of the blog

import grid from "gridfs-stream";

const url = ''

export const uploadImage = (req,res) => {

    //we are checking whether the api call has the file or not, if not then we return the status
    //code 404 and a message
    //console.log("i am here");
    if(!req.file){
        return res.status(404).json({msg:" File not found1 "});
    }

    //If the file is present, then the middleware should have already uploaded it to the Database
    //so now we have to return the ur
    //const imageUrl = `${url}/uploads/${req.file.filename}`;
    const imageUrl = {filePath: `/uploads/${req.file.filename}`};

    return res.status(200).json(imageUrl);
}

//now when we try to fetch the data, it is present in chunks and we cannot do anything with chunks
// that why we need to install npm gridfs-stream to easily stream files to and from MongoDB GridFs
export const getImage = (req,res) => {

}
