const handleRegister = (database, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('Incorrect Form Submission');
    };

    const hash = bcrypt.hashSync(password);

    database.transaction(trx => {
        debugger;
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login').returning('email')
                .then(logInEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            joined: new Date(),
                            name: name,
                            email: logInEmail[0]
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                        .catch(error => console.log(error));
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
            .catch(() => res.status(400).json('Unable to Register'));
};

module.exports = { handleRegister };