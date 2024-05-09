//helper is same as utlils folder and here we will write functionality of mail

import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'



export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
       
      //we will generate the hashed token by bcrypt
      //hasing on the basis of userId 
       const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            //if emailType is verify then we will find the user and save the verify token in database
            await User.findByIdAndUpdate(userId, {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000, //expires in 1 hour fromm the date which is saved.
            });
        } else if(emailType === "RESET"){
            //if we want to reset the password then we will do the same task but for forgotPassword Token
            await User.findByIdAndUpdate(userId, {
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000, //expires in 1 hour fromm the date which is saved.
            });
        }


        //using nodemailer service and making method by using documentation
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
          }
        });

        const verifyMailBody = `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">Here</a> to
                              ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
                              or copy and paste the link below in your browser .
                              <br> ${process.env.DOMAIN}/verify-email?token=${hashedToken}
                              </p>` ;// we are genrating link and custom html for our mail.;
        const resetMailBody = `<p>Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">Here</a> to
                              ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
                              or copy and paste the link below in your browser .
                              <br> ${process.env.DOMAIN}/reset-password?token=${hashedToken}
                              </p>`;

          const mailOptions = {
            from: 'sahil@dev.com', // sender address -- not the real one
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
            html: emailType === "VERIFY" ? verifyMailBody : resetMailBody,// we are genrating link and custom html for our mail.
          }

          //sending email
         const mailResponse = await transporter.sendMail(mailOptions);

         return mailResponse;

    } catch (error:any) {
        throw Error(error.message)
    }
}