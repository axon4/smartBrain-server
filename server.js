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
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smartbrain'
    }
});

server.get('/', (req, res) => res.send(database.users));
server.post('/login', login.handleLogIn(database, bcrypt));
server.post('/register', register.handleRegister(database, bcrypt));
server.get('/profile/:id', profile.handleProfileGet(database));
server.put('/image', image.handleImage(database));
server.post('/imageurl', (req, res) => image.handleAPICall(req, res));

server.listen(process.env.PORT || 3001, () => console.log(`Listening to port ${process.env.PORT}`));