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
app.get('/getEnquiry', (req, res, next) => {
    db.query(`SELECT e.first_name,
    e.last_name,
    e.email,
    e.phone,
    e.comments,
    e.product,
    e.service,
    e.status,
    e.enquiry_id,
    e.published
    FROM enquiry e
    where e.enquiry_id !='';`,
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
    db.query(`SELECT e.first_name,
    e.last_name,
    e.email,
    e.phone,
    e.comments,
    e.product,
    e.service,
    e.status,
     e.enquiry_id,
     e.published
     ,e.created_by
     ,e.modified_by
     ,e.creation_date
     ,e.modification_date
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

  app.post('/editEnquiry', (req, res, next) => {
    db.query(`UPDATE enquiry 
              SET email=${db.escape(req.body.email)}
              ,first_name=${db.escape(req.body.first_name)}
              ,last_name=${db.escape(req.body.last_name)}
              ,status=${db.escape(req.body.status)}
              ,comments=${db.escape(req.body.comments)}
              ,product=${db.escape(req.body.product)}
              ,service=${db.escape(req.body.service)}
              ,phone=${db.escape(req.body.phone)}
              ,creation_date=${db.escape(req.body.creation_date)}
              ,modification_date=${db.escape(req.body.modification_date)}
              ,published=${db.escape(req.body.published)}
              ,created_by=${db.escape(req.body.created_by)}
              ,modified_by=${db.escape(req.body.modified_by)}
              WHERE enquiry_id = ${db.escape(req.body.enquiry_id)}`,
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

          app.post('/insertEnquiry', (req, res, next) => {

            let data = {email	: req.body.email	
              , creation_date: req.body.creation_date
              , modification_date: req.body.modification_date
              , company: req.body.company
              , comments	: req.body.comments
              , country	: req.body.country
              , enquiry_type: req.body.enquiry_type
              , subject: req.body.subject
              , first_name: req.body.first_name
              ,last_name : req.body.last_name	
              , address_country	: req.body.address_country
              , fax: req.body.fax
              , notes: req.body.notes
              , status: req.body.status
              ,follow_up_date : req.body.follow_up_date	
              , flag	: req.body.flag
              , phone: req.body.phone
              , preferred_contact: req.body.preferred_contact
              , preferred_time: req.body.preferred_time
              ,phone_area_code : req.body.phone_area_code	
              , staff_id	: req.body.staff_id
              , client_type: req.body.client_type
              , product: req.body.product
              , service: req.body.service
              , published: 1
              ,created_by: req.body.created_by
           };
            let sql = "INSERT INTO enquiry SET ?";
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
            }
          );
          });
          
          
          app.post('/deleteEnquiry', (req, res, next) => {
  let data = { enquiry_id: req.body.enquiry_id }
  let sql = 'DELETE FROM enquiry WHERE ?'
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

module.exports = app