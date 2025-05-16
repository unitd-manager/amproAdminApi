const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/Database.js');
const userMiddleware = require('../middleware/UserModel.js');
var md5 = require('md5');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const mime = require('mime-types')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(fileUpload({
    createParentPath: true
}));

app.get('/getjobinformationforList', (req, res, next) => {
  db.query(`SELECT
   g.name 
   FROM geo_country g;`,
    (err, result) => {
       
      if (err) {
          console.log("error: ", err);
          return;
        } else {
            return res.status(200).send({
              data: result,
              msg:'geocountry has been removed successfully'
            });
      }
 
    }
  );
});

app.get('/getCountry', (req, res, next) => {
    db.query(
      `SELECT * from geo_country`,
      (err, result) => {
        if (err) {
          console.log('error: ', err)
          return res.status(400).send({
            data: err,
            msg: 'failed',
          })
        } else {
          return res.status(200).send({
            data: result,
            msg: 'Success',
          })
       }
  },
)
  })

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });
  
  module.exports = app;