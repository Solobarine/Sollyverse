const express = require('express');
const database = require('nedb');
const app = express();
const Joi = require('joi');
const path = require('path');

console.log(database);
const db = new database('database.db');
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
    "First Name": fname,
    "Last Name": lname,
    "Email": email,
    "Password": password
  }
  console.log(traveller)
    db.insert(traveller)
}

// Check Registered User
const checkUser = (user) => {
  const email = user.email;
  const passwrd = user.password;
  db.findOne({ "Email":email }, (err, doc) => {
    console.log(doc);
    res.send(doc, email)
  })

}

// ROUTES

// Welcome page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
})

// Login
app.post('/login', (req, res) => {
  db.find({Email: req.body.Email}, (err, doc) => {
    if (req.body.Password === doc[0].Password) {
      return res.status(201).send({query: doc[0].Email});
    } else {
      return res.status(404).send({query: 'User Not found'});
    }
     })
 })

app.get('/home', (req, res) => {
  res.status(201).sendFile(path.resolve(__dirname, './public/home.html'));
})

app.get('/error', (req, res) => {
  res.sendFile(path.resolve(__dirname, './notFound.html'));
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
  console.log(error)
  if(error) {
    res.status(404).send('Invalid Input:'+ error)
  } else {
      storeUser(body.First_Name, body.Last_Name, body.Email, body.Password)
      res.send({status:'Success', user: body});
  }
})
 
// Home
app.listen(3000, () => console.log('Server on port 3000'))
