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
app.get('/getSetting', (req, res, next) => {
  db.query(`Select s.key_text
  ,s.description
  ,s.value
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  Where s.setting_id !=''`,
  (err, result) => {
    if (err) {
      console.log('error: ', err);
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

app.get('/getSettingsForCompany', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text LIKE 'cp%'`,
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


app.get("/getMailId", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as email
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='registrationEmail' `,
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

app.get("/getEnquiryMailId", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as email
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='EnquiryEmail' `,
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

app.get("/getMessage", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as message
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='Registrationmessage' `,
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

app.get("/getEnquiryMailId", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as email
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='EnquiryEmail' `,
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

app.get('/getcontact', (req, res, next) => {
  db.query(`Select s.key_text
  ,s.description
  ,s.value
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  Where s.setting_id !='' AND s.group_name='contact`,
  (err, result) => {
    if (err) {
      console.log('error: ', err);
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


app.post('/getSettings', (req, res, next) => {
  db.query(`Select s.key_text
  ,s.description
  ,s.value
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  ,s.created_by
  ,s.modified_by
  From setting s
  Where s.setting_id=${db.escape(req.body.setting_id)}`,
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


app.post('/editSetting', (req, res, next) => {
  db.query(`UPDATE setting 
            SET key_text=${db.escape(req.body.key_text)}
            ,description=${db.escape(req.body.description)}
            ,value=${db.escape(req.body.value)}
            ,value_type=${db.escape(req.body.value_type)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,published=${db.escape(req.body.published)}
            WHERE setting_id = ${db.escape(req.body.setting_id)}`,
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
  
app.post('/insertSetting', (req, res, next) => {

  let data = {value	: req.body.value	
    , creation_date: new Date().toISOString()
    , modification_date: null
    , group_name: req.body.group_name
    , value_type	: req.body.value_type
    , show_to_user	: req.body.show_to_user
    , chi_value: req.body.chi_value
    , used_for_admin: req.body.used_for_admin
    , used_for_www: req.body.used_for_www
    ,key_text : req.body.key_text	
    ,published : 1
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO setting SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});

app.get('/getSettingsForGoogleMap', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text="GoogleMap Address"`,
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



app.get('/getRazorpayLiveKey', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text="razorpaylivekey"`,
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

app.get('/getRazorpayTestKey', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text="razorpaytestkey"`,
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

app.get('/getPaymentmode', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text="paymentmode"`,
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


app.post('/deleteSetting', (req, res, next) => {

  let data = {setting_id: req.body.setting_id};
  let sql = "DELETE FROM setting WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;