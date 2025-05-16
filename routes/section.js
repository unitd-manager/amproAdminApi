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
const { isTypedArray } = require('lodash');
var app = express();
app.use(cors());

app.use(fileUpload({
    createParentPath: true
}));

app.get('/getSection', (req, res, next) => {
  db.query(`Select *
  From section
  Where section_id !='' order by sort_order ASC`,
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

app.get('/getSectionForSidemenu', (req, res, next) => {
  db.query(`Select *
  From section Where published = 1 AND  (button_position="Admin" OR button_position="Reports")
   ORDER BY sort_order ASC`,
    (err, result) => {
      if (err) {
        console.log('error: ', err)
        return res.status(400).send({
          data: err,
          msg: 'failed',
        })
      } else {
          const groupByCategory = result.reduce(function (r, a) {
        r[a.groups] = r[a.groups] || [];
        r[a.groups].push(a);
        return r;
    }, Object.create(null));

        return res.status(200).send({
          data: groupByCategory,
          msg: 'Success',

            });

        }
 
    }
  );
});

app.post('/getSectionById', (req, res, next) => {
  db.query(`Select section_id
            ,section_type
            ,section_title
            ,button_position
            ,sort_order
            ,published
            ,creation_date
            ,modification_date
            ,routes
            ,groups
            ,created_by
            ,created_by
            ,modification_date
            ,modified_by
            From section
            Where section_id = ${db.escape(req.body.section_id)}`,
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



app.post('/editSection', (req, res, next) => {
  db.query(`UPDATE section 
            SET section_title=${db.escape(req.body.section_title)}
            ,section_type=${db.escape(req.body.section_type)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,sort_order=${db.escape(req.body.sort_order)}
            ,button_position=${db.escape(req.body.button_position)}
            ,routes=${db.escape(req.body.routes)}
            ,groups=${db.escape(req.body.groups)}
            ,published=${db.escape(req.body.published)}
            WHERE section_id = ${db.escape(req.body.section_id)}`,
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


app.post('/updateSortOrder', (req, res, next) => {
  db.query(`UPDATE section 
            SET 
            sort_order=${db.escape(req.body.sort_order)}
            WHERE section_id = ${db.escape(req.body.section_id)}`,
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
  
app.post('/insertSection', (req, res, next) => {

  let data = {section_id	: req.body.section_id	
    , section_title: req.body.section_title
    , display_type: req.body.display_type
    , description	: req.body.description
    , sort_order	: req.body.sort_order
    , published: req.body.published
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , external_link : req.body.external_link		
    , chi_title	: req.body.chi_title
    , chi_description	: req.body.chi_description
    , button_position	: req.body.button_position
    , template	: req.body.template
    , section_type	: req.body.section_type
    , meta_title	: req.body.meta_title	
    , meta_keyword	: req.body.meta_keyword	
    , meta_description	: req.body.meta_description	
    , access_to	: req.body.access_to
    , top_section_id	: req.body.top_section_id
    , internal_link	: req.body.internal_link
    , seo_title	: req.body.seo_title	
    , created_by	: req.body.created_by	

    
 };
  let sql = "INSERT INTO section SET ?";
  let query = db.query(sql, data,(err, result) => {
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
  });
});

  

app.post('/deleteSection', (req, res, next) => {

  let data = {section_id: req.body.section_id};
  let sql = "DELETE FROM section WHERE ?";
  let query = db.query(sql, data,(err, result) => {
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
  });
});


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;