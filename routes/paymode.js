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

// GET /paymode/list
app.get('/list', (req, res) => {
  const query = `SELECT * FROM paymode ORDER BY sort_order ASC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching paymodes:', err);
      res.status(500).json({ error: 'Error fetching paymodes' });
    } else {
      res.json(results);
    }
  });
});

app.post('/insertPaymode', (req, res, next) => {
    const {
        paymode_name,
        sort_order,
        remarks,
        payment_type,
        public_key,
        private_key,
        paypal_email,
        merchant_id,
        show_on_back_office,
        show_on_pos,
        show_on_ecommerce,
        open_cash_drawer_on_pos,
        need_reference_no,
        is_active,
        need_reference_image,
        payment_reference_no,
        location,
        created_by // This will be an array of IDs from the frontend
    } = req.body;

    // Prepare the data object for insertion, converting booleans and location array
    const data = {
        paymode_name: paymode_name,
        created_by: created_by,
        sort_order: sort_order || null, // Use null if not provided
        remarks: remarks || null,
        payment_type: payment_type || null,
        public_key: public_key || null,
        private_key: private_key || null,
        paypal_email: paypal_email || null,
        merchant_id: merchant_id || null,
        // Convert boolean values to 0 or 1 for MySQL TINYINT(1)
        show_on_back_office: show_on_back_office ? 1 : 0,
        show_on_pos: show_on_pos ? 1 : 0,
        show_on_ecommerce: show_on_ecommerce ? 1 : 0,
        open_cash_drawer_on_pos: open_cash_drawer_on_pos ? 1 : 0,
        need_reference_no: need_reference_no ? 1 : 0,
        is_active: is_active ? 1 : 0,
         need_reference_image: need_reference_image ? 1 : 0,
payment_reference_no: payment_reference_no || null,
        // Convert location array to comma-separated string for simplicity
        location: location || null
        // Assuming created_by/creation_date are handled by the database or frontend
        // For this example, I'm omitting them as they weren't in your frontend's state.
        // If you need them, you'd add them to the `data` object like in your catalogue example.
        // created_by: req.body.created_by || null,
        // creation_date: req.body.creation_date || null,
    };

    const sql = 'INSERT INTO paymode SET ?'; // Using SET ? allows inserting an object directly

    db.query(sql, data, (err, result) => {
        if (err) {
            console.error('Insert paymode error:', err); // More specific error message
            return res.status(400).send({
                data: err,
                msg: 'Failed to insert paymode', // More specific message
            });
        } else {
            return res.status(200).send({
                data: result,
                msg: 'Paymode inserted successfully', // More specific message
            });
        }
    });
});

app.get('/getPaymentTypeFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Payment Type'`,
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
});

app.get('/getLocationFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Location'`,
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
});

app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM paymode WHERE paymode_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error fetching paymode by ID:', err);
      return res.status(500).json({ error: 'Failed to fetch paymode by ID' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/update', (req, res) => {
  const {
    paymode_id,
    paymode_name,
    sort_order,
    remarks,
    payment_type,
    public_key,
    private_key,
    paypal_email,
    merchant_id,
    show_on_back_office,
    show_on_pos,
    show_on_ecommerce,
    open_cash_drawer_on_pos,
    need_reference_no,
    is_active,
    need_reference_image,
    payment_reference_no,
    location
  } = req.body;

  if (!paymode_id) {
    return res.status(400).send({ msg: 'paymode_id is required' });
  }

  const data = {
    paymode_name: paymode_name || null,
    sort_order: sort_order || null,
    remarks: remarks || null,
    payment_type: payment_type || null,
    public_key: public_key || null,
    private_key: private_key || null,
    paypal_email: paypal_email || null,
    merchant_id: merchant_id || null,
    show_on_back_office: show_on_back_office ? 1 : 0,
    show_on_pos: show_on_pos ? 1 : 0,
    show_on_ecommerce: show_on_ecommerce ? 1 : 0,
    open_cash_drawer_on_pos: open_cash_drawer_on_pos ? 1 : 0,
    need_reference_no: need_reference_no ? 1 : 0,
    is_active: is_active ? 1 : 0,
    need_reference_image: need_reference_image ? 1 : 0,
    payment_reference_no: payment_reference_no || null,
    location: Array.isArray(location) ? location.join(',') : location || null
  };

  const query = 'UPDATE paymode SET ? WHERE paymode_id = ?';
  db.query(query, [data, paymode_id], (err, result) => {
    if (err) {
      console.error('Update paymode error:', err);
      return res.status(500).send({
        msg: 'Failed to update paymode',
        error: err
      });
    } else {
      return res.status(200).send({
        msg: 'Paymode updated successfully',
        data: result
      });
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const paymodeId = req.params.id;

  db.query('DELETE FROM paymode WHERE paymode_id = ?', [paymodeId], (err, result) => {
    if (err) {
      console.error('Error deleting paymode:', err);
      return res.status(500).json({ error: 'Failed to delete paymode' });
    }
    res.status(200).json({ message: 'Paymode deleted successfully' });
  });
});




app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });
  
  module.exports = app;