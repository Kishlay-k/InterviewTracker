const nodemailer = require('nodemailer');

const sendEmail = async (options) =>{

    let transport = await nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2d420df86737ae",
          pass: "6e1945e3127948"
        }
    });

    await transport.sendMail({
        from: 'put@it.in',
        to: options.email,
        subject: options.subject,
        html: options.message,
    });
}

module.exports = sendEmail;