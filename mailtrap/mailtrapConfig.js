const { MailtrapClient } = require("mailtrap");
const { CONTACT_MESSAGE_EMAIL_TEMPLATE } = require("./emailTemplates");
require("dotenv").config();

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = process.env.ENDPOINT;

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Portofolio Mail",
  };

const sendContactMessage = async (name,email,subject,message) => {
	const recipients = [{Email:"mohamedawadaliawad96@gmail.com"}];


	await client
	.send({
		from: sender,
		to: recipients,
		subject: subject,
		html: CONTACT_MESSAGE_EMAIL_TEMPLATE.replace("{senderName}", name)
		.replace("{senderEmail}", email)
		.replace("{subject}", subject)
		.replace("{message}", message),
		category: "Contact Message",
	})
	.then(console.log("Email sent successfully"), console.error);
}


module.exports = {
  sendContactMessage,
};