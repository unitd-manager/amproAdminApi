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

// ✅ Get all Member Types
app.get('/getAll', (req, res) => {
  db.query(`SELECT * FROM member_type WHERE member_type_id!= '' `, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'Failed', data: err });
    }
    return res.status(200).send({ msg: 'Success', data: result });
  });
});

// ✅ Get Member Type by ID
app.post('/getMemberTypeById', (req, res) => {
  db.query(`SELECT member_type_name , is_active , type FROM member_type WHERE member_type_id = ${db.escape(req.body.member_type_id)}`, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'Failed', data: err });
    }
    return res.status(200).send({ msg: 'Success', data: result });
  });
});

// ✅ Insert Member Type
app.post('/insertMemberType', (req, res) => {
  const data = {
    member_type_name: req.body.member_type_name,
    type: req.body.type,
    is_active: req.body.is_active || 1,
    creation_date: new Date(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    modification_date: new Date()
  };

  db.query(`INSERT INTO member_type SET ?`, data, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'Failed', data: err });
    }
    return res.status(200).send({ msg: 'Success', data: result });
  });
});

// ✅ Edit Member Type
app.post('/editMemberType', (req, res) => {
  db.query(
    `UPDATE member_type SET 
      member_type_name = ${db.escape(req.body.member_type_name)},
      type = ${db.escape(req.body.type)},
      is_active = ${db.escape(req.body.is_active)},
      modification_date = ${db.escape(req.body.modification_date)},
      modified_by = ${db.escape(req.body.modified_by)}
    WHERE member_type_id = ${db.escape(req.body.member_type_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: 'Failed', data: err });
      }
      return res.status(200).send({ msg: 'Success', data: result });
    }
  );
});

// ✅ Delete Member Type
app.post('/deleteMemberType', (req, res) => {
  db.query(
    `DELETE FROM member_type WHERE member_type_id = ${db.escape(req.body.member_type_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: 'Failed', data: err });
      }
      return res.status(200).send({ msg: 'Success', data: result });
    }
  );
});

module.exports = app;
