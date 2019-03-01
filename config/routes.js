const axios = require('axios');
const db = require('../database/dbConfig.js');
const { authenticate } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = process.env.JWT_SECRET || 'idk lol';

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        password: user.password
    };

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  let {username, password} = req.body;
  
  db.getBy({username})
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({
                  message: `Welcome ${user.username}!`,
                  token,
                  secret
              });
          }
          else {
              res.status(401).json({message: 'You shall not pass!'});
          }
      })
      .catch(error => {
          res.status(500).json(error);
      });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
