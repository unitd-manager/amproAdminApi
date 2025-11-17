const express = require('express');
const sgMail = require('@sendgrid/mail');
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
const randomstring = require('randomstring');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(fileUpload({
    createParentPath: true
}));

app.post('/login', (req, res, next) => {
  db.query(`SELECT * FROM contact WHERE email=${db.escape(req.body.email)} AND pass_word=${db.escape(req.body.password)}`,
    (err, result) => {
       
      if (result.length === 0) {
          
        return res.status(400).send({
          msg: 'No User found',
          status:'400'
        });
      } else {
          var token = jwt.sign({ id: result[0].contact_id }, 'unitdecom', {
              expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({
              data: result[0],
              msg:'Success',
              token:token
            });

        }
 
    }
  );
});


app.get('/geofence', async (req, res) => {
  try {
    db.query(
      `
      SELECT key_text, value
      FROM setting
      WHERE key_text IN ('cp.latitude', 'cp.longitude', 'cp.radius')
      `,
      (err, rows) => {
        if (err) {
          console.error("Error fetching geofence:", err);
          return res.status(500).json({ success: false, message: "Error fetching geofence" });
        }

        // Convert DB rows into key-value map
        const geofence = {};
        rows.forEach(row => {
          if (row.key_text === "cp.latitude") geofence.latitude = parseFloat(row.value);
          if (row.key_text === "cp.longitude") geofence.longitude = parseFloat(row.value);
          if (row.key_text === "cp.radius") geofence.radius = parseFloat(row.value);
        });

        // 👇 Print data in console
        console.log("Geofence Data:", geofence);

        res.json({ success: true, data: geofence });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ success: false, message: "Unexpected error fetching geofence" });
  }
});


app.get('/getSettingsForGoogleMap', (req, res, next) => {
  db.query(`SELECT * FROM setting WHERE key_text="cp.latitude"`,
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




// // Define a route for registration
// app.post('/register', (req, res,next) => {
//   const { first_name,last_name, email, password } = req.body;
// const pass_word=password

//   // Check if the email already exists in the database
//   const checkEmailQuery = 'SELECT * FROM contact WHERE email = ?';
//   db.query(checkEmailQuery, [email], (error, results) => {
//     if (error) {
      
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Insert the user into the database
//     const insertQuery = 'INSERT INTO contact (first_name,last_name, email, pass_word) VALUES (?, ?, ?)';
//     db.query(insertQuery, [first_name,last_name, email, pass_word], (err, result) => {
//       if (err) {
        
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       // Return a success message
//       return res.status(200).json({ message: 'User registered successfully' });
//     });
//   });
// });

app.get("/getContactImage", (req, res, next) => {
  db.query(
    `select c.contact_id
  ,c.name 
  ,c.company_name
  ,c.position
  ,c.email
  ,c.address2
  ,c.address_area
  ,c.address_state
  ,c.address_country_code
  ,c.address_po_code
  ,c.phone
  ,c.notes
  ,c.published
  ,c.creation_date
  ,c.modification_date
  ,c.pass_word
  ,c.subscribe
  ,c.first_name
  ,c.last_name
  ,c.mobile
  ,c.address
  ,c.flag
  ,c.random_no
  ,c.member_status
  ,c.member_type
  ,c.address1
  ,c.phone_direct
  ,c.fax
  ,c.activated
  ,c.address_city 
  ,c.department
  ,c.otp_no
  ,m.file_name
  ,m.record_id
  ,m.room_name
  FROM contact c
  INNER JOIN media m ON m.record_id=c.contact_id
  AND m.room_name="profile"
 GROUP BY c.contact_id`,
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

app.post('/backlogin', (req, res, next) => {
  // First, check if the email exists
  db.query(
    `SELECT * FROM staff WHERE email=${db.escape(req.body.email)}`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ msg: 'Database error', error: err });
      }
      if (result.length === 0) {
        // Email not registered
        return res.status(200).send({
          msg: 'No User found',
          status: '200'
        });
      } else {
        // Email exists, now check password
        if (result[0].pass_word === req.body.password) {
          var token = jwt.sign({ id: result[0].staff_id }, 'unitdecom', {
            expiresIn: 86400 // expires in 24 hours
          });
          return res.status(200).send({
            data: result[0],
            msg: 'Success',
            token: token
          });
        } else {
          // Password is wrong
          return res.status(200).send({
            msg: 'Invalid password',
            status: '200'
          });
        }
      }
    }
  );
});

app.post('/getUserById', (req, res, next) => {
  // First, check if the email exists
  db.query(
    `SELECT * FROM staff WHERE staff_id=${db.escape(req.body.id)}`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ msg: 'Database error', error: err });
      }
      if (result.length === 0) {
        // Email not registered
        return res.status(200).send({
          msg: 'No User found',
          status: '200'
        });
      } else {
        // Email exists, now check password
        if (result[0].pass_word === req.body.password) {
          var token = jwt.sign({ id: result[0].staff_id }, 'unitdecom', {
            expiresIn: 86400 // expires in 24 hours
          });
          return res.status(200).send({
            data: result[0],
            msg: 'Success',
            token: token
          });
        } else {
          // Password is wrong
          return res.status(200).send({
            msg: 'Invalid password',
            status: '200'
          });
        }
      }
    }
  );
});

app.post('/getUserByStaffId', (req, res, next) => {
  // First, check if the email exists
  db.query(
    `SELECT * FROM staff WHERE staff_id=${db.escape(req.body.staff_id)}`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ msg: 'Database error', error: err });
      }
      if (result.length === 0) {
        // Email not registered
        return res.status(200).send({
          msg: 'No User found',
          status: '200'
        });
      } else {
        // Email exists, now check password
        if (result[0].pass_word === req.body.password) {
          var token = jwt.sign({ id: result[0].staff_id }, 'unitdecom', {
            expiresIn: 86400 // expires in 24 hours
          });
          return res.status(200).send({
            data: result[0],
            msg: 'Success',
            token: token
          });
        } else {
          // Password is wrong
          return res.status(200).send({
            msg: 'Invalid password',
            status: '200'
          });
        }
      }
    }
  );
});

app.post('/register1', (req, res, next) => {
    
    
  
      const resetToken = randomstring.generate(10);
  let data = {
    email: req.body.email
  , pass_word: req.body.password
  , first_name	: req.body.first_name
  , last_name	: req.body.last_name
  , mobile	: req.body.mobile
  , otp_no	: req.body.otp_no
  , mail_otp_no: resetToken
  ,published: 1
  };
  let sql = "INSERT INTO contact SET ?";
    db.query(`SELECT * FROM contact WHERE email=${db.escape(req.body.email)}`,
    (err, result) => {
        
       
      if (result.length === 0) {
          
        let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log('error: ', err)
      return res.status(400).send({
        data: err,
        msg: 'failed',
      })
    } 
     else {
      console.log('error: ', err)
      return res.status(200).send({
        data: result,
        msg: 'success',
      })
    } 
  });
      
      } else {
          return res.status(401).send({
          msg: 'User is Already registered with this Email',
          status:'401'
        });

        }
    }
    
  );

})

app.post('/register', (req, res, next) => {
    
    
  
      const resetToken = randomstring.generate(10);
  let data = {
    email: req.body.email
  , pass_word: req.body.password
  , first_name	: req.body.first_name
  , last_name	: req.body.last_name
  , mobile	: req.body.mobile
  , address1: req.body.address1
  , address2: req.body.address2
  , address_city: req.body.address_city
  , address_po_code	: req.body.address_po_code
  , address_state: req.body.address_state
  , otp_no	: req.body.otp_no
  , mail_otp_no: resetToken
  ,published: 1
  };
  let sql = "INSERT INTO contact SET ?";
    db.query(`SELECT * FROM contact WHERE email=${db.escape(req.body.email)}`,
    (err, result) => {
        
       
      if (result.length === 0) {
          
        let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log('error: ', err)
      return res.status(400).send({
        data: err,
        msg: 'failed',
      })
    } 
     else {
      console.log('error: ', err)
      return res.status(200).send({
        data: result,
        msg: 'success',
      })
    } 
  });
      
      } else {
          return res.status(401).send({
          msg: 'User is Already registered with this Email',
          status:'401'
        });

        }
    }
    
  );

})

app.post("/editProfile", (req, res, next) => {
  db.query(
    `UPDATE media
    SET
    file_name = ${db.escape(req.body.files[0].name)},
    actual_file_name = ${db.escape(req.body.files[0].name)},
    alt_tag_data = ${db.escape(req.body.alt_tag_data)},
    room_name = ${db.escape(req.body.room_name)},
    description = ${db.escape(req.body.description)}
    WHERE record_id = ${db.escape(req.body.record_id)} AND room_name = 'profile'`,
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

app.post("/editProfiles", (req, res, next) => {
  if (!req.body.files || req.body.files.length === 0) {
    return res.status(400).send({
      data: null,
      msg: "No files provided",
    });
  }

  db.query(
    `UPDATE media
    SET
    file_name = ${db.escape(req.body.files[0].name)},
    actual_file_name = ${db.escape(req.body.files[0].name)},
    alt_tag_data = ${db.escape(req.body.alt_tag_data)},
    room_name = ${db.escape(req.body.room_name)},
    description = ${db.escape(req.body.description)}
    WHERE record_id = ${db.escape(req.body.record_id)} AND room_name = 'profile'`,
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

app.post('/getContactsById', (req, res, next) => {
    const mobNo = req.body.mobNo;
  db.query(`select contact_id
  ,name 
  ,company_name
  ,position
  ,email
  ,address2
  ,address_area
  ,address_state
  ,address_country_code
  ,address_po_code
  ,phone
  ,notes
  ,published
  ,creation_date
  ,modification_date
  ,pass_word
  ,subscribe
  ,first_name
  ,last_name
  ,mobile
  ,address
  ,flag
  ,random_no
  ,member_status
  ,member_type
  ,address1
  ,phone_direct
  ,fax
  ,activated
  ,address_city 
  ,department
  ,otp_no
  from contact
  where mobile = ${db.escape(mobNo)}`,
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

app.post('/resendOTP', (req, res) => {
  const { mobNo, newOTP } = req.body;
  const query = `UPDATE contact SET otp_no = '${newOTP}' WHERE mobile ='${mobNo}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('OTP is not update:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'OTP is  updated' });
    }
  });
});



app.post('/changeResendOTP', (req, res) => {
  const { mobNo, newOTP } = req.body;
  const query = `UPDATE contact SET otp_no = '${newOTP}' WHERE mobile ='${mobNo}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('OTP is not updated:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'OTP is updated' });
    }
  });
});

app.post('/changeNumber', (req, res) => {
  const { mobNo, mobile } = req.body;

  // Update the user's mobile number with the new mobile number
  const query = `UPDATE contact SET mobile ='${mobile}' WHERE mobile = '${mobNo}' `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Mobile no is not update:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Mobile No is  updated' });
    }
  });
});
// Forgot password API
app.post('/forgot', (req, res) => {
  const { email } = req.body;

  // Generate a random password reset token
  const resetToken = randomstring.generate(10);

  // Store the reset token in the database
  const query = `UPDATE contact SET random_no ='${resetToken}' WHERE email = '${email}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error updating reset token:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Send the reset token to the user via email, or any other desired method
      // Here, we are simply sending the reset token in the API response
    //   const content ='<p>Hii, Please <a href="http://unitdecom.unitdtechnologies.com/reset-password?token='+randomstring+'">Click here! </a> to reset the password';
//}
     sgMail.setApiKey("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")
 
  let data = {
  to: email,
  from: 'notification@unitdtechnologies.com',
  subject: 'Forgot Password',
    text: '<p>Hii, Please <a href="https://unitdecom.unitdtechnologies.com/reset-password?token='+resetToken+'">Click here! </a> to reset the password </p>'
    
};
 sgMail
  .sendMultiple(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
      return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
     res.json({ resetToken });
    }
  });
});

// Reset password API
app.post('/reset', (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Update the user's password with the new password
  const query = `UPDATE contact SET pass_word = '${newPassword}', random_no = NULL WHERE random_no ='${resetToken}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Password reset successfully' });
    }
  });
});

app.post('/resendOTP', (req, res) => {
  const { mobNo, newOTP } = req.body;
  const query = `UPDATE contact SET otp_no = '${newOTP}' WHERE mobile ='${mobNo}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('OTP is not update:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'OTP is  updated' });
    }
  });
});

app.post('/editOTP', (req, res) => {
  const { otpNo } = req.body;
  const query = `UPDATE contact
    SET mobile_verification = 1
      WHERE otp_no = ${db.escape(otpNo)}`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error updating mobile_verification:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else if (results.affectedRows === 0) {
      res.status(400).json({ error: 'Invalid OTP or Mobile Number' });
    } else {
      res.json({ message: 'Mobile verification updated successfully' });
    }
  });
});

app.post("/editOTPs", (req, res, next) => {
  db.query(
      
    `UPDATE contact
    SET mobile_verification = CASE WHEN otp_no = ${db.escape(req.body.otp_no)} THEN 1 ELSE 0 END
      WHERE mobile=${db.escape(req.body.mobile)}`,
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



app.post("/checkOTP", (req, res) => {
  const userEnteredOTP = req.body.otp_no;
  db.query(
    `SELECT * FROM contact WHERE otp_no = ${db.escape(userEnteredOTP)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "Failed to verify OTP.",
        });
      } else {
        if (result.length === 0) {
          // No matching OTP found
          return res.status(400).send({
            data: null,
            msg: "Invalid OTP. Please try again.",
          });
        } else {
          // Matching OTP found
          return res.status(200).send({
            data: result,
            msg: "OTP verification successful.",
          });
        }
      }
    }
  );
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;