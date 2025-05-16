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

app.get('/getusergroup', (req, res, next) => {
  db.query(`SELECT ug.title
  ,ug.user_group_type
  ,ug.user_group_id
  FROM user_group ug
  WHERE ug.user_group_id != ''`,
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

app.post('/getusergroupById', (req, res, next) => {
  db.query(`SELECT ug.title
  ,ug.user_group_type
  ,ug.user_group_id
  ,ug.creation_date
  ,ug.modification_date
  ,ug.created_by
  ,ug.modified_by
  FROM user_group ug
  WHERE ug.user_group_id = ${db.escape(req.body.user_group_id)}`,
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


app.post('/edit-usergroup', (req, res, next) => {
  db.query(`UPDATE user_group  
            SET title=${db.escape(req.body.title)}
            ,user_group_type=${db.escape(req.body.user_group_type)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE user_group_id = ${db.escape(req.body.user_group_id)}`,
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

app.post('/insertUserGroup', (req, res, next) => {

  let data = {title: req.body.title
    , user_group_type: req.body.user_group_type
    , creation_date: req.body.creation_date
    , created_by: req.body.created_by
    , modification_date: req.body.modification_date};
  let sql = "INSERT INTO user_group SET ?";
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
})
}
  });
});


app.post('/getroomusergroupById', (req, res, next) => {
  db.query(`SELECT rug.room_user_group_id
    ,rug.list
    ,rug.delete
    ,rug.new
    ,rug.detail
    ,rug.edit
    ,rug.print
    ,rug.import
    ,rug.export
    ,rug.publish
    ,rug.unpublish
    ,rug.section_id
    ,rug.section_title
    , rug.user_group_id
    , rug.creation_date
    , rug.modification_date
     FROM mod_acc_room_user_group rug
  WHERE rug.user_group_id = ${db.escape(req.body.user_group_id)}`,
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

app.post("/getusergroupForLoginUser", (req, res, next) => {
  db.query(
    `SELECT *
  FROM mod_acc_room_user_group ug
  WHERE ug.user_group_id = ${db.escape(req.body.user_group_id)}`,
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

app.post('/insertRoomUserGroup', (req, res, next) => {

  let data = {
    list:req.body.list
    ,new:req.body.new
    ,remove:req.body.remove
    ,detail:req.body.detail
    ,edit:req.body.edit
    ,print:req.body.print
    ,import:req.body.import
    ,export:req.body.export
    ,publish:req.body.publish
    ,unpublish:req.body.unpublish
    ,section_id:req.body.section_id
    ,section_title:req.body.section_title
    , user_group_id: req.body.user_group_id
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date};
  let sql = "INSERT INTO mod_acc_room_user_group SET ?";
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
})
}
  });
});


app.post('/edit-roomusergroup', (req, res, next) => {
  db.query(`UPDATE mod_acc_room_user_group  
            SET list=${db.escape(req.body.list)}
    ,new=${db.escape(req.body.new)}
    ,remove=${db.escape(req.body.remove)}
    ,detail=${db.escape(req.body.detail)}
    ,edit=${db.escape(req.body.edit)}
    ,print=${db.escape(req.body.print)}
    ,import=${db.escape(req.body.import)}
    ,export=${db.escape(req.body.export)}
    ,publish=${db.escape(req.body.publish)}
    ,unpublish=${db.escape(req.body.unpublish)}
    ,section_id=${db.escape(req.body.section_id)}
    ,section_title=${db.escape(req.body.section_title)}
    , user_group_id= ${db.escape(req.body.user_group_id)}
    WHERE user_group_id = ${db.escape(req.body.user_group_id)} AND section_title=${db.escape(req.body.section_title)}`,
    (err, result) => {
     
      if (err) {
        console.log('error: ', err);
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
     }
  );
});

app.post('/deleteUserGroup', (req, res, next) => {

  let data = {user_group_id:req.body.user_group_id };
  let sql = "DELETE FROM user_group WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({
        data: err,
        msg: 'failed',
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'Success',
})
}
  });
});

app.get('/getSectionsforusergroup', (req, res, next) => {
  db.query(`Select section_id,
  section_title
  From section
  Where section_id !=''`,
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


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;