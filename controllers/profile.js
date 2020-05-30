const handleProfileGet = database => (req, res) => {
    const { id } = req.params;

    database.select('*').from('users').where({ id })
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