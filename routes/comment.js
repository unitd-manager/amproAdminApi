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



app.post('/getcommentsByProductId', (req, res, next) => {
  db.query(`select c.comment_id 
  ,c.comments
  ,c.comment_date
  ,c.notes
  ,c.subject
  ,c.room_name
  ,c.record_type
  ,c.contact_id
  ,c.record_id
  ,c.creation_date
  ,c.modification_date
  ,c.published
  ,c.content_id
  ,c.staff_id
  ,c.name
  ,c.parent_id
  ,c.rating
  ,ct.first_name
   from comment c
   inner JOIN contact ct ON ct.contact_id=c.contact_id
  inner JOIN product p ON p.product_id=c.record_id
 WHERE p.product_id= ${db.escape(req.body.record_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
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




app.post('/getcommentsByBlogId', (req, res, next) => {
  db.query(`select c.comment_id 
  ,c.comments
  ,c.comment_date
  ,c.notes
  ,c.subject
  ,c.room_name
  ,c.record_type
  ,c.contact_id
  ,c.record_id
  ,c.creation_date
  ,c.modification_date
  ,c.published
  ,c.content_id
  ,c.staff_id
  ,c.name
  ,c.parent_id
  ,ct.first_name
   from comment c
   inner JOIN contact ct ON ct.contact_id=c.contact_id
  inner JOIN blog b ON b.blog_id = c.record_id
 WHERE b.blog_id= ${db.escape(req.body.blog_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
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

app.post("/editComment", (req, res, next) => {
  db.query(
    `UPDATE comment 
            SET comments=${db.escape(req.body.comments)}
            ,notes=${db.escape(req.body.notes)}
            ,subject=${db.escape(req.body.subject)}
            ,room_name=${db.escape(req.body.room_name)}
           ,record_type=${db.escape(req.body.record_type)}
            ,contact_id=${db.escape(req.body.contact_id)}
            ,record_id=${db.escape(req.body.record_id)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,published=${db.escape(req.body.published)}
           ,content_id=${db.escape(req.body.content_id)}
            ,staff_id=${db.escape(req.body.staff_id)}
            ,name=${db.escape(req.body.name)}
            ,parent_id=${db.escape(req.body.parent_id)}
            WHERE comment_id =  ${db.escape(req.body.comment_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});


app.post('/insertComment', (req, res, next) => {
  let data = {
    comment_id: req.body.comment_id
    , comments: req.body.comments
    , notes: req.body.notes
    , subject: req.body.subject
    , room_name: req.body.room_name
    , record_type: req.body.record_type
    , contact_id: req.body.contact_id
    , record_id: req.body.record_id
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , published: req.body.published
    , content_id: req.body.content_id
    , staff_id: req.body.staff_id
    , name: req.body.name
    , parent_id: req.body.parent_id
    ,rating:req.body.rating
    };
  let sql = "INSERT INTO comment SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result,
           msg:'Success'
         });

   }
  });
});

app.delete('/deleteComment', (req, res, next) => {

  let data = {comment_id: req.body.comment_id};
  let sql = "DELETE FROM comment WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result[0],
           msg:'Success'
         });

   }
  });
});


app.post('/insertBranch', (req, res, next) => {
  let data = {
    title: req.body.title
    , currency: req.body.currency
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
 };
  let sql = "INSERT INTO branch SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result[0],
           msg:'Success'
         });

   }
  });
});

app.delete('/deleteBranch', (req, res, next) => {

  let data = {title: req.body.title};
  let sql = "DELETE FROM branch WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result[0],
           msg:'Success'
         });

   }
  });
});

app.post('/insertCompanyAddress', (req, res, next) => {

  let data = {
    address_street: req.body.address_street
    , address_town: req.body.address_town
    , address_state: req.body.address_state
    , address_country: req.body.address_country
    , address_po_code: req.body.address_po_code
    , phone: req.body.phone
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , address_flat: req.body.address_flat
    , company_id: req.body.company_id
 };
  let sql = "INSERT INTO company_address SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result[0],
           msg:'Success'
         });

   }
  });
}); 

app.delete('/deleteCompanyAddress', (req, res, next) => {

  let data = {company_id: req.body.company_id};
  let sql = "DELETE FROM company_address WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result[0],
           msg:'Success'
         });

   }
  });
});



app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;