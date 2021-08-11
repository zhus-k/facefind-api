const express  = require('express');
const bcrypt  = require('bcrypt');
const cors  = require('cors');
const knex  = require('knex');

const register = require('./controllers/register.js');
const login = require('./controllers/login.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

const db = knex({
    client: 'postgres',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '28c35d22ad79481db05e7af3fce5936a',
        database : 'facerecognition'
    }
});

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());


app.post('/login', (req, res) => { login.handleLogin (req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleAPIcall(req, res) });



app.listen(process.env.PORT || 3000, () => {
    console.log(`running on ${process.env.PORT}`);
});