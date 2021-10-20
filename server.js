const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const login = require('./controllers/login.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

require('dotenv').config();
const localDB = process.env.LOCALDB_CONN.split(',');
// console.log(localDB);

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL ?
        {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
        :
        {
            host: localDB[0],
            port: localDB[1],
            user: localDB[2],
            password: localDB[3],
            database: localDB[4]
        }
});

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => { res.send(`Online and ready to serve.`) });

app.post('/login', (req, res) => { login.handleLogin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.get('/profile/:id/history', (req, res) => { history.getHistory(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleAPIcall(req, res) });

let server = app.listen(process.env.PORT || 3000, () => {
    console.log(`running on ${server.address().port}`);
    db.select().from('users').then(foo => console.log('db connection established')).catch(err => console.log('error connecting to db...'));
});