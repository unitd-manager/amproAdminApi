const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/Database.js");
const userMiddleware = require("../middleware/UserModel.js");
var md5 = require("md5");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
const mime = require("mime-types");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get('/getTranslationforHRTraining', (req, res, next) => {
  db.query(`SELECT t.value,t.key_text,t.arb_value FROM translation t WHERE key_text LIKE 'mdHRTraining%'`,
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

app.post("/getTrainingById", (req, res, next) => {
  db.query(
    `SELECT t.title
  ,t.training_id
  ,t.from_date
  ,t.to_date
  ,t.trainer
  ,t.description
  ,t.training_company_name
  ,t.training_company_address
  ,t.training_company_email
  ,t.training_company_phone
  ,t.creation_date
  ,t.modification_date
  ,t.created_by
  ,t.modified_by
  FROM training t
  WHERE t.training_id=${db.escape(req.body.training_id)}`,
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

app.post('/getTrainingFromLocation', (req, res, next) => {
  let siteIdCondition = '';

  // Check if site_id is an empty string and handle it as 'IS NULL' for SQL query
  if (req.body.site_id === '' || req.body.site_id === null || req.body.site_id === undefined ) {
    siteIdCondition = 'AND (t.site_id = 0 OR t.site_id IS NULL)';
  } else {
    siteIdCondition = `AND t.site_id = ${db.escape(req.body.site_id)}`;
  }

  const query = `
  SELECT t.title
  ,t.from_date
  ,t.training_id
  ,t.to_date
  ,t.trainer
  ,t.description
  ,t.training_company_name
  ,t.training_company_address
  ,t.training_company_email
  ,t.training_company_phone
  FROM training t
  WHERE t.training_id != '' ${siteIdCondition}
  ORDER BY t.training_id DESC 
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


app.get("/getTraining", (req, res, next) => {
  db.query(
    `SELECT t.title
  ,t.from_date
  ,t.training_id
  ,t.to_date
  ,t.trainer
  ,t.description
  ,t.training_company_name
  ,t.training_company_address
  ,t.training_company_email
  ,t.training_company_phone
  FROM training t
  WHERE t.training_id != ''
  ORDER BY t.training_id DESC`,
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

app.get("/getEmployeeName", (req, res, next) => {
  db.query(
    `SELECT employee_id,employee_name 
  FROM employee`,
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
app.post("/getTrainingStaffById", (req, res, next) => {
  db.query(
    `SELECT training_staff.*,employee.first_name,employee.employee_name FROM training_staff INNER JOIN employee ON
   training_staff.employee_id=employee.employee_id  WHERE training_id=${db.escape(
     req.body.training_id
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
          msg: 'Success',
        })
      }

    }
  );
});
app.post("/edit-Training", (req, res, next) => {
  db.query(
    `UPDATE training  
            SET title=${db.escape(req.body.title)}
            ,from_date=${db.escape(req.body.from_date)}
            ,to_date=${db.escape(req.body.to_date)}
            ,trainer=${db.escape(req.body.trainer)}
            ,description=${db.escape(req.body.description)}
            ,training_company_name=${db.escape(req.body.training_company_name)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,training_company_address=${db.escape(
              req.body.training_company_address
            )}
            ,training_company_email=${db.escape(
              req.body.training_company_email
            )}
            ,training_company_phone =${db.escape(
              req.body.training_company_phone
            )}
            WHERE training_id = ${db.escape(req.body.training_id)}`,
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

app.post("/insertTraining", (req, res, next) => {
  let data = {
    from_date: req.body.from_date,
    title: req.body.title,
    trainer: req.body.trainer, 
    description: req.body.description,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    flag: req.body.flag,
    to_date: req.body.to_date,
    site_id: req.body.site_id,
    training_company_name: req.body.training_company_name,
    training_company_address: req.body.training_company_address,
    training_company_email: req.body.training_company_email,
    training_company_phone: req.body.training_company_phone,
  };
  let sql = "INSERT INTO training SET ?";
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
        msg: 'Success',
      })
    }

  });
});

app.post("/deleteTraining", (req, res, next) => {
  let data = { training_id: req.body.training_id };
  let sql = "DELETE FROM training WHERE ?";
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
        msg: 'Success',
      })
    }

  });
});

app.post("/getTabEmployeeLinkedById", (req, res, next) => {
  db.query(
    `SELECT 
  ts.employee_id 
  ,ts.from_date
  ,ts.to_date
  ,CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name
  ,ji.designation
  FROM training_staff ts
  LEFT JOIN (employee e) ON (ts.staff_id = e.employee_id)
   LEFT JOIN (job_information ji) ON (e.employee_id = ji.employee_id)
   WHERE training_id = ${db.escape(req.body.training_id)}
  ORDER BY training_staff_id DESC`,
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

app.post("/getTabEmployeeLinkedById", (req, res, next) => {
  db.query(
    `SELECT 
  ts.employee_id 
  ,ts.from_date
  ,ts.to_date
  ,CONCAT_WS(' ', e.first_name, e.last_name) AS emp_name
  ,e.employee_name
  ,ji.designation
  FROM training_staff ts
  LEFT JOIN (employee e) ON (ts.staff_id = e.employee_id)
   LEFT JOIN (job_information ji) ON (e.employee_id = ji.employee_id)
   WHERE training_id =${db.escape(req.body.training_id)}
  ORDER BY training_staff_id DESC`,
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

app.get("/getTabEmployeeLinked", (req, res, next) => {
  db.query(
    `SELECT 
  ts.employee_id 
  ,ts.from_date
  ,ts.to_date
  ,CONCAT_WS(' ', e.first_name, e.last_name) AS emp_name
  ,e.employee_name
  ,ji.designation
  FROM training_staff ts
  LEFT JOIN (employee e) ON (ts.staff_id = e.employee_id)
   LEFT JOIN (job_information ji) ON (e.employee_id = ji.employee_id)
   WHERE training_id != ''
  ORDER BY training_staff_id DESC`,
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

app.post("/edit-TabEmployeeLinked", (req, res, next) => {
  db.query(
    `UPDATE training_staff ts
            SET ts.employee_id=${db.escape(req.body.employee_id)}
            ,ts.from_date=${db.escape(req.body.from_date)}
            ,ts.to_date=${db.escape(req.body.to_date)}
            WHERE training_id = ${db.escape(req.body.training_id)}`,
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

app.post("/insertTrainingStaff", (req, res, next) => {
  let data = {
    training_id: req.body.training_id,
    employee_id: req.body.employee_id,
    staff_id: req.body.staff_id,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
  };
  let sql = "INSERT INTO training_staff SET ?";
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
        msg: 'Success',
      })
    }


  });
});

app.post("/deleteTrainingStaff", (req, res, next) => {
  let data = { training_staff_id: req.body.training_staff_id };
  let sql = "DELETE FROM training_staff WHERE ?";
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
        msg: 'Success',
      })
    }

  });
});

app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;
