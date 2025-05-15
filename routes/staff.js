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

app.get('/getStaff', (req, res, next) => {
  db.query(
    `SELECT  (
    SELECT GROUP_CONCAT(stfGrp.title ORDER BY stfGrp.title SEPARATOR ', ')
    FROM staff_group stfGrp
    ,staff_group_history stfGrpHist
    WHERE stfGrpHist.staff_id = a.staff_id
    AND stfGrp.staff_group_id = stfGrpHist.staff_group_id) AS staff_group_names,
    a.staff_id,
    a.first_name
    ,a.email
    ,a.status
    ,a.pass_word
    ,a.user_group_id
    ,a.team
    ,a.staff_type
    ,a.staff_rate
    ,a.position
    ,a.published
    ,a.address_town
    ,a.address_state
    ,a.address_street
    ,a.address_country
    ,a.creation_date
    ,a.modification_date
    ,gc.name AS country_title
    ,b.title AS user_group_title
    ,CONCAT_WS(' ', a.first_name, a.last_name ) AS staff_name
    FROM staff a
    LEFT JOIN user_group b ON (a.user_group_id = b.user_group_id)
    LEFT JOIN geo_country gc ON (a.address_country = gc.country_code)
    WHERE a.staff_id != ''  AND a.status="Current"`,
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
          msg: 'Staff has been removed successfully',
        });
      }
    }
  );
});

app.get('/getStaffTypeFromValueList', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Staff Type'`,
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
})

app.get('/getStaffTeamFromValueList', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Staff Team'`,
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

app.post('/getStaffById', (req, res, next) => {
  db.query(
    `SELECT  (
    SELECT GROUP_CONCAT(stfGrp.title ORDER BY stfGrp.title SEPARATOR ', ')
    FROM staff_group stfGrp
    ,staff_group_history stfGrpHist
    WHERE stfGrpHist.staff_id = a.staff_id
    AND stfGrp.staff_group_id = stfGrpHist.staff_group_id) AS staff_group_names
     ,a.staff_id
       ,a.pass_word
       ,a.first_name
       ,a.email
       ,a.status
       ,a.user_group_id
       ,a.team
       ,a.staff_type
       ,a.staff_rate
       ,a.position
       ,a.published
       ,a.address_town
       ,a.address_state
       ,a.address_street
       ,a.address_country
       ,a.creation_date
       ,a.modification_date
       ,a.published
       ,gc.name AS country_title
       ,b.title AS user_group_title
       ,CONCAT_WS(' ', a.first_name, a.last_name ) AS staff_name
       FROM staff a
       LEFT JOIN user_group b ON (a.user_group_id = b.user_group_id)
       LEFT JOIN geo_country gc ON (a.address_country = gc.country_code)
       WHERE a.staff_id = ${db.escape(req.body.staff_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
          msg: 'Failed',
        });
      } else {
        return res.status(200).send({
          data: result[0],
          msg: 'Success',
        });
      }
    }
  );
});

app.get('/getUserGroup', (req, res, next) => {
  db.query(
    `SELECT user_group_id
  ,title 
  FROM user_group
  WHERE user_group_id != ''`,
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
          msg: 'User group has been get successfully',
        });
      }
    }
  );
});

app.post('/editStaff', (req, res, next) => {
  db.query(
    `UPDATE staff
  SET first_name=${db.escape(req.body.first_name)}
  ,email=${db.escape(req.body.email)}
  ,status=${db.escape(req.body.status)}
  ,pass_word=${db.escape(req.body.pass_word)}
  ,user_group_id=${db.escape(req.body.user_group_id)}
  ,team=${db.escape(req.body.team)}
  ,staff_type=${db.escape(req.body.staff_type)}
  ,staff_rate=${db.escape(req.body.staff_rate)}
  ,position=${db.escape(req.body.position)}
  ,published=${db.escape(req.body.published)}
  ,address_street=${db.escape(req.body.address_street)}
  ,address_country=${db.escape(req.body.address_country)}
  ,address_town=${db.escape(req.body.address_town)}
  ,address_state=${db.escape(req.body.address_state)}
  ,creation_date=${db.escape(req.body.creation_date)}
  ,modification_date=${db.escape(
   req.body.modification_date
  )}
  WHERE staff_id = ${db.escape(req.body.staff_id)}`,
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

app.post('/editUserGroup', (req, res, next) => {
  db.query(
    `UPDATE user_group
  title=${db.escape(req.body.user_group_title)}
  WHERE user_group_id = ${db.escape(req.body.user_group_id)}`,
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
          msg: 'Tender has been removed successfully',
        });
      }
    }
  );
});

app.post('/insertUserGroup', (req, res, next) => {
  let data = {
    title: req.body.user_group_title,
  }
  let sql = 'INSERT INTO user_group SET ?'
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
        msg: 'New User Group has been created successfully',
      })
    }
  })
})

app.post('/insertStaff', (req, res, next) => {
  let data = {
    staff_rate: req.body.staff_rate,
    user_group_id: '1',
    first_name: req.body.first_name,
    creation_date: req.body.creation_date,
    status: 'Current',
    created_by: req.body.created_by,
  }
  let sql = 'INSERT INTO staff SET ?'
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
        msg: 'New Tender has been created successfully',
      })
    }
  })
})

app.post('/deleteStaff', (req, res, next) => {
  let data = { staff_id: req.body.staff_id }
  let sql = 'DELETE FROM staff WHERE ?'
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
        msg: 'Tender has been removed successfully',
      })
    }
  })
})

app.get('/getStaffGrp', (req, res, next) => {
  db.query(
    `SELECT s.staff_group_id
,s.title
,s.creation_date
,s.modification_date
,s.sort_order FROM staff_group s
WHERE s.staff_group_id!='';`,
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
})

app.post('/editStaffGrp', (req, res, next) => {
  db.query(
    `UPDATE staff_group
   SET title=${db.escape(req.body.title)}
   ,creation_date=${db.escape(req.body.creation_date)}
   ,modification_date=${db.escape(req.body.modification_date)}
   ,sort_order=${db.escape(req.body.sort_order)}
   ,published=${db.escape(req.body.published)}
    WHERE staff_group_id = ${db.escape(req.body.staff_group_id)}`,
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
          msg: 'Tender has been removed successfully',
        })
      }
    },
  )
})

app.post('/insertStaffGroup', (req, res, next) => {
  let data = {
    title: req.body.title,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    sort_order: req.body.sort_order,
  }
  let sql = 'INSERT INTO staff_group SET ?'
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
        msg: 'New Tender has been created successfully',
      })
    }
  })
})

app.delete('/deleteStaffGroup', (req, res, next) => {
  let data = { sort_order: req.body.sort_order }
  let sql = 'DELETE FROM staff_group WHERE ?'
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
        msg: 'Tender has been removed successfully',
      })
    }
  })
})

app.get('/getStaffGrpHist', (req, res, next) => {
  db.query(
    `SELECT 
                s.staff_id
                ,s.staff_group_id
                ,s.creation_date
                ,s.modification_date FROM staff_group_history s
                WHERE s.staff_group_history_id!='';`,
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
})
app.get('/getCountry', (req, res, next) => {
  db.query(`SELECT * from geo_country`, (err, result) => {
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
app.post('/editStaffGrpHist', (req, res, next) => {
  db.query(
    `UPDATE staff_group_history
                          SET staff_id=${db.escape(req.body.staff_id)}
                          ,staff_group_id=${db.escape(req.body.staff_group_id)}
                          ,creation_date=${db.escape(req.body.creation_date)}
                          ,modification_date=${db.escape(
                            req.body.modification_date,
                          )}
                           WHERE staff_group_history_id = ${db.escape(
                             req.body.staff_group_id,
                           )}`,
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
          msg: 'Tender has been removed successfully',
        })
      }
    },
  )
})

app.post('/insertStaffGroupHist', (req, res, next) => {
  let data = {
    staff_id: req.body.staff_id,
    staff_group_id: req.body.staff_group_id,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
  }
  let sql = 'INSERT INTO staff_group_history SET ?'
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
        msg: 'New Tender has been created successfully',
      })
    }
  })
})

app.delete('/deleteStaffGroupHist', (req, res, next) => {
  let data = { staff_id: req.body.staff_id }
  let sql = 'DELETE FROM staff_group_history WHERE ?'
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
        msg: 'Tender has been removed successfully',
      })
    }
  })
})

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData)
  res.send('This is the secret content. Only logged in users can see that!')
})

module.exports = app
