const nodemailer = require('nodemailer')

// @desc sends a verification email
// @access Public
const mailHelper = async(details) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });

      const message = {
        from: 'parikhdev6@gmail.com', // sender address
        to: details.email, // list of receivers
        subject: details.subject, // Subject line
        text: details.message, // plain text body
      }
    
      // send mail with defined transport object
      await transporter.sendMail(message);
}

module.exports = mailHelper