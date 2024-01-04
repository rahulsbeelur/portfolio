/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { mailOptions, transporter } from '../../config/nodemailer';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: req.body.subject,
                text: req.body.message,
                html: `<div><h1>Name - ${req.body.name}</h1></div><div><h2>Email - ${req.body.email}</h2></div> <div><p>Message - ${req.body.message}</p></div>`
            });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

export default handler;
