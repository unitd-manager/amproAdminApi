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

app.post('/getImageByProductId', (req, res, next) => {
  db.query(`SELECT m.file_name
  ,m.actual_file_name
  ,p.product_id
  ,p.title
  FROM media m
   LEFT JOIN product p ON (p.sub_category_id = m.sub_category_id)
   where p.product_id= ${db.escape(req.body.product_id)}`,
  (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (result.length === 0) {
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

app.post('/editAttachmentFileName', (req, res, next) => {
  db.query(`UPDATE media 
            SET file_name=${db.escape(+req.body.media_id+"_"+req.body.actual_file_name)}
            WHERE media_id =  ${db.escape(req.body.media_id)}`,
    (err, result) => {
     
      if (result.length === 0) {
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


app.post('/attachFile', (req, res, next) => {

  let data = {creation_date: req.body.creation_date
    , media_type: req.body.media_type
    , actual_file_name: req.body.actual_file_name
    , display_title: req.body.display_title
    , file_name: req.body.file_name
    , content_type: req.body.content_type
    , media_size: req.body.media_size
    , room_name: req.body.room_name
    , record_type: req.body.record_type
    , alt_tag_data: req.body.alt_tag_data
    , external_link: req.body.external_link
    , caption: req.body.caption
    , uploaded: req.body.uploaded
    , record_id: req.body.record_id
    , modification_date: req.body.modification_date
    , description: req.body.description
  };
  let sql = "INSERT INTO media SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
          return res.status(200).send({
            data: result,
            msg:'File attachment completed successfully'
          });
    }
  });
});


app.post('/getAttachmentByRecordId', (req, res, next) => {
  db.query(`SELECT * FROM media m WHERE m.record_id = ${db.escape(req.body.record_id)} 
  AND m.room_name = ${db.escape(req.body.room_name)}`,
  (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (result.length === 0) {
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