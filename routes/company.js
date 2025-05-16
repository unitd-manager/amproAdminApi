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

app.get('/getCompany', (req, res) => {
  db.query(
    `SELECT 
      c.*, 
      co.first_name AS contact_person 
    FROM company c
    LEFT JOIN contact co ON co.company_id = c.company_id`, 
    (err, results) => {
      if (err) {
        console.error("Error: ", err);
        return res.status(500).send({ msg: 'Database query error', error: err });
      }
      if (!results.length) {
        return res.status(404).send({ msg: 'No companies found' });
      }
      return res.status(200).send({ data: results, msg: 'Success' });
    }
  );
});


app.get('/getContact', (req, res, next) => {
  db.query(`SELECT contact_id, first_name FROM contact`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

        }
 
    }
  );
});

app.post('/insertCompany', (req, res, next) => {

  let data = {company_name: req.body.company_name,
  email: req.body.email, 
  address_street: req.body.address_street, 
  address_town: req.body.address_town, 
  address_state: req.body.address_state,
    address_country: req.body.address_country,
     address_flat: req.body.address_flat,
    address_po_code: req.body.address_po_code,
    phone: req.body.phone,
    fax: req.body.fax, 
    website: req.body.website,
    supplier_type: req.body.supplier_type, 
    industry: req.body.industry, 
    company_size: req.body.company_size,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    created_by: req.body.created_by,
    creation_date: req.body.creation_date,
    source: req.body.source};
  let sql = "INSERT INTO company SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
          return res.status(200).send({
            data: result,
            msg:'New Company has been created successfully'
          });
    }
  });
});
app.post('/getContactByCompanyId', (req, res, next) => {
  db.query(`SELECT * FROM contact WHERE company_id =${db.escape(req.body.company_id)}`,
    (err, result) => {
     
      if (err) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;