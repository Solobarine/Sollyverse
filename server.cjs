const express = require('express');
const database = require('nedb');
const app = express();
const Joi = require('joi');
const path = require('path');
const fs = require('fs');

const likes = new database('likes.db');
const db = new database('database.db');
likes.loadDatabase();
db.loadDatabase();

app.use(express.static('./public'))
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// -------------- FILE SYSTEM ---------------//
const storeUser = (fname, lname, email, password) => {
  const traveller = {
    "First_Name": fname,
    "Last_Name": lname,
    "Email": email,
    "Password": password
  }
    db.insert(traveller)
}

// ROUTES

// Welcome page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
})

// Login
let data = [];
app.post('/login', (req, res) => {
  console.log(req.body);
  db.findOne({Email: req.body.Email, Password: req.body.Password}, (err, doc) => {
    console.log(doc);
    if (doc === null) {
      return res.status(404).send({query: 'User Not Found'});
    } else {
      fs.writeFile('./user.txt', '{"First_Name": "' + doc.First_Name + '", "Last_Name": "' + doc.Last_Name + '"}', (err) => {
        if (err) return console.log(err);
      })
      return res.status(201).send({query: doc.First_Name});
    }
  })
})

// ----------- User Home Page
app.get('/home', (req, res) => {
  res.status(201).sendFile(path.resolve(__dirname, './public/home.html'))
});

// ------------ Error Page
app.get('/error', (req, res) => {
  res.sendFile(path.resolve(__dirname, './notFound.html'));
})

// ------ Home User Data
app.get('/single', (req, res) => {
  res.sendFile(path.resolve(__dirname, './user.txt'));
})

// Create User
app.post('/register', (req, res) => {
  const schema = Joi.object({
   "First_Name": Joi.string().min(3).required(),
   "Last_Name": Joi.string().min(3).required(),
   "Email": Joi.string().email().required(),
   "Password": Joi.string().min(6).required()
  })
  const { error } = schema.validate({"First_Name": req.body.First_Name, "Last_Name": req.body.Last_Name, "Email": req.body.Email, "Password": req.body.Password});
  const body = req.body;
  if(error) {
    res.status(404).send('Invalid Input:'+ error)
  } else {
      storeUser(body.First_Name, body.Last_Name, body.Email, body.Password)
      res.send({status:'Success', user: body});
  }
})
// Destination data
app.get('/places', (req, res) => {
  fs.readFile('./destinations.json', (err, data) => {
    if (err) {
      throw err
    }
    res.status(201).send(data)
  })
})
// Destinations Page
app.get('/destinations', (req, res) => {
  res.status(201).sendFile(path.resolve(__dirname, './public/home/destinations.html'))
})

// Get Single Likes
app.get('/getLikes/:id', (req, res) => {
  const like = "item" + req.params.id;
  console.log(like)
  likes.find({ "Like": like}, (err, doc) => {
    res.status(201).send({"status": doc.length})
  })
})

// Post Likes
app.post('/destinations/like', (req, res) => {
  const request = req.body
  console.log(request)
  likes.insert(request)
  res.status(201).send({ "status": req.body })
})
app.listen(3000, () => console.log('Server on port 3000'))
