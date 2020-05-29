const Clarifai = require('clarifai');

const api = new Clarifai.App({apiKey: '26a1b3ee27984ad79f0058c0462b6bb7'});

const handleAPICall = (req, res) => {
    api.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(() => res.status(503).json('API service currently unavailable'));
};

const handleImage = database => (req, res) => {
    const { id } = req.body;

    database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(() => res.status(400).json('Unable to get entries'));
};

module.exports = { handleImage, handleAPICall };