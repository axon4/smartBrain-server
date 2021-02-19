const handleLogIn = (dataBase, bCrypt) => (request, response) => {
	const { eMail, passWord } = request.body;
	
	if (!eMail || !passWord) {
		return response.status(400).json('INCORRECT FORM SUBMISSION');
	};

	dataBase.select('eMail', 'hash').from('logIn').where('eMail', '=', eMail)
		.then(data => {
			const isValid = bCrypt.compareSync(passWord, data[0].hash);

			if (isValid) {
				return dataBase.select('*').from('users').where('eMail', '=', eMail)
					.then(user => response.json(user[0]))
					.catch(() => response.status(500).json('UNABLE TO VALIDATE USER'));
			} else {
				response.status(401).json('INCORRECT LOGIN DETAILS'); // bug: does not get sent if eMail inValid
			};
		})
		.catch(() => response.status(500).json('UNABLE TO GET USER'));
};

module.exports = { handleLogIn };