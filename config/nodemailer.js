import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'reachrahulsbeelur@gmail.com',
        pass: 'lcjralgyvllwsycc'
    }
});

export const mailOptions = {
    from: 'reachrahulsbeelur@gmail.com',
    to: 'srahulbeelur@gmail.com'
};
