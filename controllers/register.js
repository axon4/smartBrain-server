const handleRegister = (dataBase, bCrypt) => (request, response) => {
	const { name, eMail, passWord } = request.body;

	if (!name || !eMail || !passWord) {
		return response.status(400).json('INCORRECT FORM SUBMISSION');
	};

	const hash = bCrypt.hashSync(passWord);

	dataBase.transaction(trx => {
		trx.insert({ eMail, hash })
			.into('logIn').returning('eMail')
			.then(logInEMail => {
				return trx('users').returning('*')
					.insert({
						joined: new Date(),
						name,
						eMail: logInEMail[0]
					})
					.then(user => response.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
		.catch(() => response.status(500).json('ERROR REGISTERING USER INTO DATABASE'));
};

module.exports = { handleRegister };