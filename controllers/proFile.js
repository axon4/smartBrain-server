const handleProFileGet = dataBase => (request, response) => {
	const { ID } = request.params;

	dataBase.select('*').from('users').where({ ID })
		.then(user => {
			if (user.length) {
				response.json(user[0]);
			} else {
				response.status(404).json('USER NOT FOUND');
			};
		})
		.catch(() => response.status(400).json('ERROR GETTING USER'));
};

module.exports = { handleProFileGet };