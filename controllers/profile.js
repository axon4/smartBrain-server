const handleProfileGet = database => (req, res) => {
    const { id } = req.params;

    database.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json('User Not Found');
            };
        })
        .catch(() => res.status(400).json('Error Getting User'));
};

module.exports = { handleProfileGet };