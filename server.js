const express = require('express');
const CORS = require('cors');
const morgan = require('morgan');
const knex = require('knex');
const bCrypt = require('bcrypt-nodejs');

const logIn = require('./controllers/logIn');
const register = require('./controllers/register');
const proFile = require('./controllers/proFile');
const image = require('./controllers/image');

const server = express();

server.use(express.json());
server.use(CORS());
server.use(morgan('combined'));

const dataBase = knex({
	client: 'pg',
	// // Docker
	// connection: process.env.POSTGRES_URI
	// Heroku
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	}
});

server.get('/', (reQuest, response) => response.send('SB'));
server.post('/logIn', logIn.handleLogIn(dataBase, bCrypt));
server.post('/register', register.handleRegister(dataBase, bCrypt));
server.get('/proFile/:ID', proFile.handleProFileGet(dataBase));
server.post('/APICall', (req, res) => image.handleAPICall(req, res));
server.put('/image', image.handleImage(dataBase));

server.listen(process.env.PORT || 3001, () => {console.log(`Listening on Port: ${process.env.PORT}`)});