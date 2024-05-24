import nodemailer from "nodemailer";


export async function sendSignUpEmail(email){
  console.log(email);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: 'mohit.mohit979@gmail.com',
        pass: 'wuhp iewj apbv nvnx'
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
 
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Varun Jatav👻" <mohit.mohit979@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Created a account ✔", // Subject line
      text: `Congratulations on creating a new account`, // plain text body
      html: `<b>Congratulations on creating a new account</b>`, // html body
    });
}

export async function sendPasswordResetMail({email,oldpassword, newpassword , cnewpass}) {
    
    console.log(email, newpassword );
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: 'mohit.mohit979@gmail.com',
        pass: 'wuhp iewj apbv nvnx'
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
 
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Varun Jatav👻" <mohit.mohit979@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Created a new password ✔", // Subject line
      text: `Your new password is ${newpassword}`, // plain text body
      html: `<b>Your new password is ${newpassword}</b>`, // html body
    });
  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
//   main().catch(console.error);