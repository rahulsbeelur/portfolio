import nodemailer from 'nodemailer';

const gmailId = process.env.GMAIL_ID;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailId,
        pass: gmailAppPassword
    }
});

export const mailOptions = {
    from: 'reachrahulsbeelur@gmail.com',
    to: 'srahulbeelur@gmail.com'
};
