const express = require("express");
const router = express.Router();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const client = mailgun.client({
	username: "jc",
	key: process.env.MAILGUN_API_KEY,
});

router.post("/form", async (req, res) => {
	console.log("route /form");
	console.log(req.body);

	//   -- Destructuration du body
	const { firstname, lastname, email, message } = req.body;

	//   -- création du message
	const messageData = {
		from: `${firstname} ${lastname} <${email}>`,
		// -- Dois être l'un des emails valider de votre sandbox
		to: "jcurbain.admin@gmail.com",
		subject: "Hello",
		text: message,
	};

	//   -- Avec la syntaxe async/await et try/catch
	try {
		const response = await client.messages.create(
			process.env.MAILGUN_DOMAIN,
			messageData
		);

		console.log(response);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
	}

	//   -- Avec la syntaxe de la doc Mailgun
	//   client.messages
	//     .create(process.env.MAILGUN_DOMAIN, messageData)
	//     .then((res) => {
	//       console.log(res);
	//     })
	//     .catch((err) => {
	//       console.error(err);
	//     });
});

module.exports = router;
