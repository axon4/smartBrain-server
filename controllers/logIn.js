const handleLogIn = (database, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('INCORRECT FORM SUBMISSION');
    };

    database.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return database.select('*').from('users').where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(() => res.status(500).json('UNABLE TO VALIDATE USER'));
            } else {
                res.status(401).json('INCORRECT LOGIN DETAILS'); // Bug: Doesn't get sent if email is invalid
            };
        })
        .catch(() => res.status(500).json('UNABLE TO GET USER'));
};

module.exports = { handleLogIn };