const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const login = require('./controllers/logIn');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const server = express();
server.use(express.json());
server.use(cors());

const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

server.get('/', (req, res) => res.send('Sb'));
server.post('/login', login.handleLogIn(database, bcrypt));
server.post('/register', register.handleRegister(database, bcrypt));
server.get('/profile/:id', profile.handleProfileGet(database));
server.put('/image', image.handleImage(database));
server.post('/imageurl', (req, res) => image.handleAPICall(req, res));

server.listen(process.env.PORT || 3001, () => console.log(`Listening to port ${process.env.PORT}`));