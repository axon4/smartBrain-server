const handleRegister = (database, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('INCORRECT FORM SUBMISSION');
    };

    const hash = bcrypt.hashSync(password);
    database.transaction(trx => {
        trx.insert({
            email,
            hash
        })
        .into('login').returning('email')
            .then(logInEmail => {
                return trx('users').returning('*')
                    .insert({
                            joined: new Date(),
                            name: name,
                            email: logInEmail[0]
                    })
                        .then(user => res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(() => res.status(500).json('ERROR REGISTERING USER TO DATABASE'));
};

module.exports = { handleRegister };