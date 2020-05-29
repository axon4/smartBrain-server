const handleLogIn = (database, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect Form Submission');
    };

    database.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return database.select('*').from('users').where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(() => res.status(503).json('Unable to Validate User'));
            } else {
                res.status(401).json('Incorrect Login Details'); // Bug: Doesn't get sent if email is invalid
            };
        })
        .catch(() => res.status(400).json('Unable to Get User'));
};

module.exports = { handleLogIn };