//helper is same as utlils folder and here we will write functionality of mail

import nodemailer from 'nodemailer'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        //TODO: configure mail for usage
        //using nodemailer service and making method by using documentation
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'sahil@dev.com', // sender address -- not the real one
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", 
            html: "<b>Hello world?</b>", // html body
          }

          //sending email
         const mailResponse = await transporter.sendMail(mailOptions);

         return mailResponse;

    } catch (error:any) {
        throw Error(error.message)
    }
}