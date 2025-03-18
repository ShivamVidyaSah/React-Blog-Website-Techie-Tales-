import dotenv from "dotenv";
import nodemailer from "nodemailer";


dotenv.config();

export const sendMail = async(req,res) => {

    //deconstructing the req body into 
    const { name, email, subject, message } = req.body;

    try{
        //create a transporter
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email app password
            }
        });

        //email option
        let mailOptions = {
            from:email,
            to:process.env.EMAIL_USER,// Admin email
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({msg:"Message sent successfully"});

    }catch(error){
        res.status(500).json({error:error.message});
    }
}