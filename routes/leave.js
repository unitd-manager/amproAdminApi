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
app.get('/getTranslationforHRLeave', (req, res, next) => {
  db.query(`SELECT t.value,t.key_text,t.arb_value FROM translation t WHERE key_text LIKE 'mdHRLeave%'`,
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

 
  

app.get('/getLeave', (req, res, next) => {
    db.query(`SELECT l.status
    ,l.leave_id
    ,l.leave_type
    ,l.no_of_days
    ,l.reason
    ,l.from_date
    ,l.to_date
    ,l.no_of_days_next_month
    ,l.employee_id
    ,l.date
    ,e.employee_name
    ,j.designation
    ,e.citizen
    ,e.position
    FROM empleave l
    LEFT JOIN (employee e) ON (l.employee_id = e.employee_id)
    LEFT JOIN (job_information j) ON (j.employee_id = l.employee_id)
    WHERE l.leave_id !=''`,
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
  
  app.post('/getLeaveEmpByid', (req, res, next) => {
    db.query(`SELECT l.status
    ,l.leave_id
    ,l.leave_type
    ,l.no_of_days
    ,l.no_of_days_next_month
    ,l.reason
    ,l.from_date
    ,l.to_date
    ,l.employee_id
    ,l.date
    ,l.hours
    ,l.went_overseas
    ,CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name
    ,j.designation
    ,e.citizen
    FROM empleave l
    LEFT JOIN (employee e) ON (l.employee_id = e.employee_id)
    LEFT JOIN (job_information j) ON (j.employee_id = l.employee_id)
    WHERE l.employee_id =${db.escape(req.body.employee_id)}
    ORDER BY l.leave_id DESC`,
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

  app.get('/getEmployee', (req, res, next) => {
    db.query(`SELECT 
    e.employee_id
    ,e.employee_name
    ,e.position
     ,GROUP_CONCAT(l.from_date) AS from_date
     ,GROUP_CONCAT(l.to_date) AS to_date
    from employee e
     LEFT JOIN empleave l ON (e.employee_id = l.employee_id)
     where e.employee_id !=''
   GROUP BY e.employee_id`,
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

  app.post('/getLeaveByid', (req, res, next) => {
    db.query(`SELECT l.status
    ,l.leave_id
    ,l.leave_type
    ,l.no_of_days
    ,l.no_of_days_next_month
    ,l.reason
    ,l.from_date
    ,l.to_date
    ,l.employee_id
    ,l.date
    ,l.went_overseas
    ,e.employee_id
    ,e.employee_name
    ,j.designation
    ,e.position
    ,e.citizen
    ,l.creation_date
    ,l.modification_date
    ,l.created_by
    ,l.modified_by
    FROM empleave l
    LEFT JOIN (employee e) ON (l.employee_id = e.employee_id)
    LEFT JOIN (job_information j) ON (j.employee_id = l.employee_id)
    WHERE l.leave_id =${db.escape(req.body.leave_id)}`,
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

  app.post('/getEmployeesites', (req, res, next) => {
    db.query(`SELECT 
    e.employee_id
   ,e.first_name
   ,e.employee_name
   ,e.employee_name_arb
   ,e.nric_no
   ,e.nric_no_arb
   ,e.fin_no
   ,e.fin_no_arb
   ,(SELECT COUNT(*) FROM job_information ji WHERE ji.employee_id=e.employee_id AND ji.status='current') AS e_count
    FROM employee e
    Where site_id = ${db.escape(req.body.site_id)}`,
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
   
  app.post('/getEmployeesite', (req, res, next) => {
    let siteIdCondition = '';
  
    // Check if site_id is an empty string and handle it as 'IS NULL' for SQL query
    if (req.body.site_id === '' || req.body.site_id === null || req.body.site_id === undefined ) {
      siteIdCondition = 'AND (e.site_id = 0 OR e.site_id IS NULL)';
    } else {
      siteIdCondition = `AND e.site_id = ${db.escape(req.body.site_id)}`;
    }
  
    const query = `
    SELECT 
    e.employee_id
   ,e.first_name
   ,e.employee_name
   ,e.employee_name_arb
   ,e.nric_no
   ,e.nric_no_arb
   ,e.fin_no
   ,e.fin_no_arb
   ,(SELECT COUNT(*) FROM job_information ji WHERE ji.employee_id=e.employee_id AND ji.status='current') AS e_count
    FROM employee e
    Where employee_id != '' ${siteIdCondition}
    `;
  
    db.query(query, (err, result) => {
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
    });
  });
  
  app.post('/getLeaveFromLocation', (req, res, next) => {
    let siteIdCondition = '';
  
    // Check if site_id is an empty string and handle it as 'IS NULL' for SQL query
    if (req.body.site_id === '' || req.body.site_id === null || req.body.site_id === undefined ) {
      siteIdCondition = 'AND (l.site_id = 0 OR l.site_id IS NULL)';
    } else {
      siteIdCondition = `AND l.site_id = ${db.escape(req.body.site_id)}`;
    }
  
    const query = `
      SELECT 
        l.status,
        l.leave_id,
        l.leave_type,
        l.no_of_days,
        l.reason,
        l.from_date,
        l.to_date,
        l.no_of_days_next_month,
        l.employee_id,
        l.date,
        e.employee_name,
        j.designation,
        e.citizen,
        e.position
      FROM empleave l
      LEFT JOIN employee e ON l.employee_id = e.employee_id
      LEFT JOIN job_information j ON j.employee_id = l.employee_id
      WHERE l.leave_id != ''  ${siteIdCondition}
    `;
  
    db.query(query, (err, result) => {
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
    });
  });
  
  
     app.post('/getEmployeeEmail', (req, res, next) => {
    db.query(`SELECT 
    e.employee_id,
    e.email
    ,CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name
     ,GROUP_CONCAT(l.from_date) AS from_date
     ,GROUP_CONCAT(l.to_date) AS to_date
    from employee e
     LEFT JOIN empleave l ON (e.employee_id = l.employee_id)
     where e.email = ${db.escape(req.body.email)}
   GROUP BY e.employee_id`,
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
  

  app.post('/getLeaveFromLocations', (req, res, next) => {
    db.query(`SELECT l.status
    ,l.leave_id
    ,l.leave_type
    ,l.no_of_days
    ,l.reason
    ,l.from_date
    ,l.to_date
    ,l.no_of_days_next_month
    ,l.employee_id
    ,l.date
    ,e.employee_name
    ,j.designation
    ,e.citizen
    ,e.position
    FROM empleave l
    LEFT JOIN (employee e) ON (l.employee_id = e.employee_id)
    LEFT JOIN (job_information j) ON (j.employee_id = l.employee_id)
    WHERE l.leave_id !='' AND l.site_id = ${db.escape(req.body.site_id)}`,
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

  app.post('/editLeave', (req, res, next) => {
    db.query(`UPDATE empleave
              SET reason=${db.escape(req.body.reason)}
              ,leave_type=${db.escape(req.body.leave_type)}
              ,status=${db.escape(req.body.status)}
              ,date=${db.escape(req.body.date)}
              ,from_date=${db.escape(req.body.from_date)}
              ,to_date=${db.escape(req.body.to_date)}
              ,no_of_days=${db.escape(req.body.no_of_days)}
              ,no_of_days_next_month=${db.escape(req.body.no_of_days_next_month)}
              ,employee_id=${db.escape(req.body.employee_id)}
              ,went_overseas=${db.escape(req.body.went_overseas)}
              ,modification_date=${db.escape(req.body.modification_date)}
              ,modified_by=${db.escape(req.body.modified_by)}
              WHERE leave_id = ${db.escape(req.body.leave_id)}`,
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
                });
              });

 app.post('/insertLeave', (req, res, next) => {

 let data = {date	: new Date().toISOString()	
  , employee_id: req.body.employee_id
  , leave_type: req.body.leave_type
  , from_date: req.body.from_date
  , to_date: req.body.to_date
  , reason	: req.body.reason
  , hours	: req.body.hours
  , creation_date	: req.body.creation_date
  , modification_date: req.body.modification_date
  , created_by: req.body.created_by
  , modified_by: req.body.modified_by
  
  , no_of_days: req.body.no_of_days
  , status	: 'Applied'	
  , no_of_days_next_month	: req.body.no_of_days_next_month	
  , went_overseas:0};
                let sql = "INSERT INTO empleave SET ?";
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

     app.post('/deleteLeave', (req, res, next) => {

                let data = {leave_id: req.body.leave_id};
                let sql = "DELETE FROM empleave WHERE ?";
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

              app.post('/getPastLeaveHistoryById', (req, res, next) => {
                db.query(`SELECT l.from_date
                ,l.leave_id
                ,l.to_date
                ,l.no_of_days
                ,l.employee_id
                ,l.date
                ,l.no_of_days_next_month
                ,l.leave_type 
                FROM empleave l
                WHERE l.employee_id = ${db.escape(req.body.employee_id)}`,
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