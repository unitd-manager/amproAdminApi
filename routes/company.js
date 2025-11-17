require('dotenv').config();
const axios = require('axios'); // install if not yet: npm install axios

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
      c.*
    FROM company c`, 
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


app.post('/updateSchedule', (req, res, next) => {
  db.query(`UPDATE company
            SET sales_man=${db.escape(req.body.sales_man)}
            ,day=${db.escape(req.body.day)}
            ,action=${db.escape(req.body.action)}
            WHERE company_id=${db.escape(req.body.company_id)}`,
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
                    });
              }
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

app.post('/insertCompanyOld', (req, res, next) => {

  let data = {company_name: req.body.company_name,
  email: req.body.email, 
customer_code : req.body.customer_code,
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



app.post('/insertCompany', (req, res, next) => {
  let data = {
    company_name: req.body.company_name,
    email: req.body.email,
    customer_code: req.body.customer_code,
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
    source: req.body.source
  };

  let sql = "INSERT INTO company SET ?";
  db.query(sql, data, async (err, result) => {
    if (err) {
      console.log("❌ DB error:", err);
      return res.status(500).send({ error: err });
    } else {
      // ✅ Call n8n webhook with required fields
      try {
        await axios.post(
          process.env.N8N_ENQUIRY_WEBHOOK_URL,
          {
            email: req.body.email,
            company_name: req.body.company_name
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );
        console.log("✅ Synced to n8n webhook");
      } catch (e) {
        console.error("❌ Failed to sync to n8n webhook:", e.message);
      }

      return res.status(200).send({
        data: result,
        msg: 'New Company has been created successfully'
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