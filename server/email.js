const nodemailer = require('nodemailer')

const sendEmail = async options => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "2dd5a849bdf561",
            pass: "b1661a3d025762"
        }
    })

    const mailoptions = {
        from: 'Kishlay Kumar',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(mailoptions)
}

module.exports = sendEmail