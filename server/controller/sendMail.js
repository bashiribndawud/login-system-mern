import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import mailGen from "mailgen";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// mailgen configuration
let mailGenerator = new mailGen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req, res) => {
    const {username, userEmail, text, subject} = req.body;

    try {
         let email = {
           body: {
             name: username,
             intro:
               text ||
               "Welcome to Mailgen! We're very excited to have you on board.",
             outro:
               "Need help, or have questions? Just reply to this email, we'd love to help.",
           },
         };

         let emailBody = mailGenerator.generate(email);
         
         transporter
           .sendMail({
             from: process.env.EMAIL,
             to: userEmail,
             subject: subject || "Signup successful",
             text: text,
             html: emailBody,
           })
           .then(() => {
             return res
               .status(200)
               .json({ msg: "You should recieve an email from us !!" });
           })
           .catch((error) => {
             return res.status(500).json({ error });
           });
        
    } catch (error) {
        return res.status(500).json({error})
    }
    
}




