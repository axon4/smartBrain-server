const Clarifai = require('clarifai');

const API = new Clarifai.App({apiKey: process.env.CLARIFAI_API_KEY});

const handleAPICall = (request, response) => {
	API.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.inPut)
		.then(data => response.json(data))
		.catch(() => response.status(500).json('API SERVICE CURRENTLY UNAVAILABLE'));
};

const handleImage = dataBase => (request, response) => {
	const { ID } = request.body;

	dataBase('users').where('ID', '=', ID)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => response.json(entries[0]))
		.catch(() => response.status(500).json('UNABLE TO GET ENTRIES'));
};

module.exports = { handleImage, handleAPICall };