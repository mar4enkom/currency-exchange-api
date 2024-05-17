const nodemailer = require("nodemailer");
const {config} = require("../config");

class Mailer {
    constructor() {
        // In this version, EmailJS permits only dynamic imports,
        // so it's the single method available for importing it.
        this.SMTPClient = null;
        import('emailjs').then(({ SMTPClient }) => {
            this.SMTPClient = SMTPClient;
        }).catch(error => {
            console.error('Error importing SMTPClient:', error);
        });
    }

    async sendEmail(props) {
        const { to, subject, text } = props;

        if (!this.SMTPClient) {
            console.error('SMTPClient is not available. Make sure to wait for it to be imported.');
            return;
        }

        const client = new this.SMTPClient({
            user: process.env.MAILER_USER,
            password: process.env.MAILER_PASSWORD,
            host: process.env.MAILER_HOST,
            ssl: true,
        });

        try {
            const message = await client.sendAsync({
                from: `<${process.env.MAILER_USER}>`,
                to, subject, text
            });
            console.log('Email sent:', message);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports.mailer = new Mailer();