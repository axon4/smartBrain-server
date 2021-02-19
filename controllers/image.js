const Clarifai = require('clarifai');

const API = new Clarifai.App({apiKey: process.env.API_CLARIFAI});

const handleAPICall = (req, res) => {
	API.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(() => res.status(500).json('API SERVICE CURRENTLY UNAVAILABLE'));
};

const handleImage = dataBase => (req, res) => {
	const { ID } = req.body;

	dataBase('users').where('ID', '=', ID)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(() => res.status(500).json('UNABLE TO GET ENTRIES'));
};

module.exports = { handleImage, handleAPICall };