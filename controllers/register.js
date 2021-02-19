const handleRegister = (dataBase, bCrypt) => (req, res) => {
	const { name, eMail, passWord } = req.body;

	if (!name || !eMail || !passWord) {
		return res.status(400).json('INCORRECT FORM SUBMISSION');
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
					.then(user => res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
		.catch(() => res.status(500).json('ERROR REGISTERING USER INTO DATABASE'));
};

module.exports = { handleRegister };