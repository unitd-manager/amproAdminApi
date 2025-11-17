const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/Database.js')
const userMiddleware = require('../middleware/UserModel.js')
var md5 = require('md5')
const fileUpload = require('express-fileupload')
const _ = require('lodash')
const mime = require('mime-types')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(cors())

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.get('/getTrack', (req, res, next) => {
    db.query(`SELECT e.*
        ,en.first_name AS shipment
    FROM customer_address e
    left join contact en on en.contact_id=e.contact_id
    where e.customer_address_id !='';`,
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
    }
  );
  });
  app.post('/getEnquiryById', (req, res, next) => {
    db.query(`SELECT e.*
    FROM enquiry e
    where e.enquiry_id=${db.escape(req.body.enquiry_id)};`,
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
    }
  );
  });
  
  app.post('/getQuoteTrackItemsById', (req, res, next) => {
    db.query(`SELECT
              qt.* 
            
              FROM customer_address qt 
              WHERE qt.contact_id =  ${db.escape(req.body.contact_id)}`,
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
  
  
    app.post('/deleteTrackEditItem', (req, res, next) => {
  let data = { customer_address_id: req.body.customer_address_id }
  let sql = 'DELETE FROM customer_address WHERE ?'
  let query = db.query(sql, data, (err, result) => {
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
  })
})


app.post('/insertQuoteItems', (req, res, next) => {

  let data = {
    contact_id:req.body.contact_id
    , address_type: req.body.address_type
    , address_flat: req.body.address_flat
    , shipper_name: req.body.shipper_name
    , address_street: req.body.address_street
    , address_town: req.body.address_town
    , address_state: req.body.address_state
    , address_country: req.body.address_country
    , address_po_code: req.body.address_po_code
   
 };
  let sql = "INSERT INTO customer_address SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
     return res.status(400).send({
            data: err,
            msg:'Failed'
          });
    } else {
          return res.status(200).send({
            data: result,
            msg:'New quote item has been created successfully'
          });
    }
  });
});

  
          
          app.post('/editEquipmentRequestItem', (req, res) => {
            const {
              customer_address_id,
             address_type,
             address_flat,
              shipper_name,
              address_street,
              address_town,
              address_state,
              address_country,
              address_po_code
            } = req.body;
          
            if (!customer_address_id) {
              return res.status(400).json({ msg: "customer_address_id is required" });
            }
          
            const query = `
              UPDATE customer_address 
              SET address_flat = ?, 
              shipper_name = ?,
              address_street = ?,
              address_town = ?,
              address_state = ?,
              address_country = ?,
              address_po_code = ?
                 
              WHERE customer_address_id = ?`;
          
            db.query(
              query,
              [
                address_flat,
                shipper_name,
                address_street,
                address_town,
                address_state,
                address_country,
                address_po_code,

                customer_address_id
              ],
              (err, result) => {
                if (err) {
                  console.error('SQL Error:', err);
                  return res.status(500).json({ msg: 'Update failed', error: err });
                }
                res.status(200).json({ msg: 'Success', data: result });
              }
            );
          });
          
          
 
app.post('/getQuoteById', (req, res, next) => {
  db.query(`SELECT
            q.* 
            FROM customer_address q 
            WHERE q.contact_id = ${db.escape(req.body.contact_id)}
            ORDER BY customer_address_id DESC`,
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



module.exports = app