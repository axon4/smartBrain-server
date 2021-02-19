const handleLogIn = (dataBase, bCrypt) => (req, res) => {
	const { eMail, passWord } = req.body;
	
	if (!eMail || !passWord) {
		return res.status(400).json('INCORRECT FORM SUBMISSION');
	};

	dataBase.select('eMail', 'hash').from('logIn').where('eMail', '=', eMail)
		.then(data => {
			const isValid = bCrypt.compareSync(passWord, data[0].hash);

			if (isValid) {
				return dataBase.select('*').from('users').where('eMail', '=', eMail)
					.then(user => res.json(user[0]))
					.catch(() => res.status(500).json('UNABLE TO VALIDATE USER'));
			} else {
				res.status(401).json('INCORRECT LOGIN DETAILS'); // bug: does not get sent if eMail is inValid
			};
		})
		.catch(() => res.status(500).json('UNABLE TO GET USER'));
};

module.exports = { handleLogIn };