const nodemailer = require('nodemailer');
const Config = require('./config');

async function sendEmail(attachmentPath) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: Config.transporter_user,
            pass: Config.transporter_pass
        }
    });

    const mailOptions = {
        from: Config.from,
        to: Config.to,
        subject: 'New Exam Results Announced!',
        text: 'Exam results are attached.',
        attachments: [
            {
                filename: 'screenshot.png', 
                path: attachmentPath 
            }
        ]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
