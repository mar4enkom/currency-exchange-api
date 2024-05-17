const nodemailer = require("nodemailer");

class Mailer {
    #mailer = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.PORT,
        service: 'exim',
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    createEmail({recipientEmail, subject, html}) {
        return {
            from: `Kintayo <${process.env.MAILER_USER}>`,
            to: recipientEmail,
            subject,
            html,
        }
    }

    async sendEmail(...args) {
        return await this.#mailer.sendMail(...args);
    }
}

const mailer = new Mailer();
module.exports = mailer;