// const Clarifai = require('clarifai');
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();
const metaData = new grpc.Metadata();

metaData.set('authorization', `Key ${process.env.CLARIFAI_API_KEY}`);

// const API = new Clarifai.App({apiKey: process.env.API_CLARIFAI});

const handleAPICall = (request, response) => {
	// API.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.inPut)
	// 	.then(data => response.json(data))
	// 	.catch(() => response.status(500).json('API-SERVICE CURRENTLY UNAVAILABLE'));

	stub.PostModelOutputs({
			model_id: 'face-detection',
			inputs: [{
				data: {
					image: {
						url: request.body.inPut
					}
				}
			}]
	}, metaData, (error, data) => {
		if (error) response.status(500).json('API-SERVICE CURRENTLY UNAVAILABLE');
		else response.json(data);
	});
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