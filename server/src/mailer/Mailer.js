class Mailer {
    constructor() {
        // In this version, EmailJS permits only dynamic imports,
        // so it's the single method available for importing it.
        this.client = null;
        import('emailjs').then(({ SMTPClient }) => {
            this.client = new SMTPClient({
                user: process.env.MAILER_USER,
                password: process.env.MAILER_PASSWORD,
                host: process.env.MAILER_HOST,
                ssl: true,
            });
        }).catch(error => {
            console.error('Error importing SMTPClient:', error);
        });
    }

    async sendEmail(props) {
        if (!this.client) {
            console.error('SMTPClient is not available. Make sure to wait for it to be imported.');
            return;
        }

        const { to, subject, text } = props;
        try {
            const message = await this.client.sendAsync({
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