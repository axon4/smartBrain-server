const handleProfileGet = dataBase => (req, res) => {
	const { ID } = req.params;

	dataBase.select('*').from('users').where({ ID })
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(404).json('USER NOT FOUND');
			};
		})
		.catch(() => res.status(400).json('ERROR GETTING USER'));
};

module.exports = { handleProfileGet };