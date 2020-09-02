const Clarifai = require('clarifai');

const api = new Clarifai.App({apiKey: process.env.API_CLARIFAI});

const handleAPICall = (req, res) => {
    api.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(() => res.status(500).json('API SERVICE CURRENTLY UNAVAILABLE'));
};

const handleImage = database => (req, res) => {
    const { id } = req.body;

    database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(() => res.status(500).json('UNABLE TO GET ENTRIES'));
};

module.exports = { handleImage, handleAPICall };