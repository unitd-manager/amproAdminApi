const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/Database.js');
const userMiddleware = require('../middleware/UserModel.js');
var md5 = require('md5');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const mime = require('mime-types');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get('/getValueList', (req, res, next) => {
  db.query(
    `Select v.key_text
  ,v.valuelist_id
  ,v.value
  ,v.sort_order
  ,v.code
  ,v.creation_date
  ,v.modification_date
  ,v.published
  From valuelist v 
  WHERE v.valuelist_id !=''
  ORDER BY v.sort_order ASC`,
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
  )
})


app.post('/getValueListByKeyText', (req, res, next) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).send({
      msg: 'value is required',
    });
  }

  const sql = `
    SELECT v.key_text,
           v.valuelist_id,
           v.value,
           v.sort_order,
           v.code,
           v.creation_date,
           v.modification_date,
           v.published
    FROM valuelist v
    WHERE v.value = ?
    ORDER BY v.sort_order ASC
  `;

  db.query(sql, [value], (err, result) => {
    if (err) {
      console.log('error:', err);
      return res.status(400).send({
        data: err,
        msg: 'failed',
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'Success',
      });
    }
  });
});


app.get('/getValueListDropdown', (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: '1', name: 'Bank' },
      { id: '2', name: 'Client Type' },
      { id: '3', name: 'Company Category' },
      { id: '4', name: 'Company Group Name' },
      { id: '5', name: 'Company Industry' },
      { id: '6', name: 'Company Name' },
      { id: '7', name: 'Company Size' },
      { id: '8', name: 'Company Source' },
      { id: '9', name: 'Company Status' },
      { id: '10', name: 'Contact Title' },
      { id: '11', name: 'Credit Insurance' },
      { id: '12', name: 'Currency' },
      { id: '13', name: 'Delivery Terms' },
      { id: '14', name: 'Employee Category' },
      { id: '15', name: 'Employee Status' },
      { id: '16', name: 'Employee Work Type' },
      { id: '17', name: 'Ideas By When' },
      { id: '18', name: 'Ideas Status' },
      { id: '19', name: 'Invoice Currency' },
      { id: '20', name: 'Invoice Notes' },
      { id: '21', name: 'Invoice Status' },
      { id: '22', name: 'Invoice Terms' },
      { id: '23', name: 'Invoice Type' },
      { id: '24', name: 'Invoice Types' },
      { id: '25', name: 'Lead Industry' },
      { id: '26', name: 'Lead Reference' },
      { id: '27', name: 'Nationality' },
      { id: '28', name: 'Opportunity Chance' },
      { id: '29', name: 'Opportunity Source Channel' },
      { id: '30', name: 'Opportunity Status' },
      { id: '31', name: 'Payment Quote Type' },
      { id: '32', name: 'Payment Terms' },
      { id: '33', name: 'Payment Type' },
      { id: '34', name: 'Percent Completed' },
      { id: '35', name: 'Position Type' },
      { id: '36', name: 'Preferred Currency' },
      { id: '37', name: 'Project Category' },
      { id: '38', name: 'Project Designation' },
      { id: '39', name: 'Project Difficulty' },
      { id: '40', name: 'Project Status' },
      { id: '41', name: 'Qualification' },
      { id: '42', name: 'Quote Category Name' },
      { id: '43', name: 'Quote Category Type' },
      { id: '44', name: 'Quote Column' },
      { id: '45', name: 'Quote Currency' },
      { id: '46', name: 'Quote Item Type' },
      { id: '47', name: 'Quote Signatory' },
      { id: '48', name: 'Quote Status' },
      { id: '49', name: 'Quote Type' },
      { id: '50', name: 'Service Type' },
      { id: '51', name: 'Services' },
      { id: '52', name: 'Shipment Type' },
      { id: '53', name: 'Singapore Holidays' },
      { id: '54', name: 'Staff Status' },
      { id: '55', name: 'Staff Team' },
      { id: '56', name: 'Staff Type' },
      { id: '57', name: 'Task Category' },
      { id: '58', name: 'Task History Priority' },
      { id: '59', name: 'Task Status' },
      { id: '60', name: 'Timesheet Type' },
      { id: '61', name: 'Type of Leave' },
      { id: '62', name: 'Category Type'},
      { id: '63', name: 'Content Type'},
      { id: '64', name: 'Section Type'},
      { id: '65', name: 'Sub Category Type'},
      { id: '66', name: 'Product Color'},
      { id: '67', name: 'Product Size'},
       { id: '68', name: 'UoM'},
          { id: '69', name: 'Tax Type'}
    ],
    msg: 'Success',
  })
})

app.post('/getValueListById', (req, res, next) => {
  db.query(
    `Select v.key_text
  ,v.valuelist_id
  ,v.value
  ,v.sort_order
  ,v.code
  ,v.creation_date
  ,v.modification_date
  ,v.published
  ,v.created_by
  ,v.modified_by
  From valuelist v 
  Where v.valuelist_id  = ${db.escape(req.body.valuelist_id)}`,
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


app.post('/editValueList', (req, res, next) => {
  db.query(`UPDATE valuelist 
            SET key_text=${db.escape(req.body.key_text)}
            ,value=${db.escape(req.body.value)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,code=${db.escape(req.body.code)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,published=${db.escape(req.body.published)}
            WHERE valuelist_id = ${db.escape(req.body.valuelist_id)}`,
    (err, result) => {
     
      if (err) {
        console.log("error: ", err);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});


app.post('/updateSortOrder', (req, res, next) => {
  db.query(
    `UPDATE valuelist 
            SET 
            sort_order=${db.escape(req.body.sort_order)}
            WHERE valuelist_id= ${db.escape(req.body.valuelist_id)}`,
    (err, result) => {
      if (err) {
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

app.post('/insertValueList', (req, res, next) => {
  let data = {
    valuelist_id: req.body.valuelist_id,
    key_text: req.body.key_text,
    value: req.body.value,
    chi_value: req.body.chi_value,
    creation_date: req.body.creation_date,    
    created_by: req.body.created_by,
    modification_date: req.body.modification_date,
    sort_order: req.body.sort_order,
    flag: req.body.flag,
    code: req.body.code,
    published: 1,
  }
  let sql = 'INSERT INTO valuelist SET ?'
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

app.post('/deleteValueList', (req, res, next) => {
  let data = { valuelist_id: req.body.valuelist_id }
  let sql = 'DELETE FROM valuelist WHERE ?'
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
