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
app.get('/getSection', (req, res, next) => {
  db.query(`Select s.title
  From section s
  Where s.section_id !=''`,
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
app.get("/getSupport", (req, res, next) => {
  db.query(
    `Select 
    c.title
    ,c.support_id
    ,c.description
    ,c.value
    ,c.creation_date
    ,c.modification_date 
    ,c.created_by
    ,c.modified_by
    ,c.record_type
    ,c.staff_id
    ,c.section_id
    ,s.title
    ,c.sort_order
    ,c.name
    ,CONCAT_WS(' ', a.first_name, a.last_name) AS staff_name
    ,c.date
    ,c.due_date
    FROM support c
    LEFT JOIN (staff a) ON (a.staff_id = c.staff_id)
    LEFT JOIN (section s) ON (s.section_id = c.section_id)
    WHERE c.support_id !='' ORDER BY c.sort_order ASC`,
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

app.post("/getSupportById", (req, res, next) => {
  db.query(
    `Select 
    c.title
    ,c.support_id
    ,c.description
    ,c.value
    ,c.creation_date
    ,c.modification_date 
    ,c.created_by
    ,c.modified_by
    ,c.record_type
    ,c.section_id
    ,c.name
    ,c.date
    ,c.due_date
    FROM support c
   WHERE c.support_id = ${db.escape(req.body.support_id)} `,
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
        });
      }
    });
  });
app.get("/getModuleDropdown", (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: "1", name: "DashBoard" },
      { id: "2", name: "Opportunity" },
      { id: "3", name: "Project" },
      { id: "4", name: "Client" },
      { id: "5", name: "Booking" },
      { id: "6", name: "Timesheet" },
      { id: "7", name: "Product" },
      { id: "8", name: "Supplier" },
      { id: "9", name: "Accounts" },
      { id: "10", name: "Expense Head" },
      { id: "11", name: "Sub Con" },
      { id: "12", name: "Finance" },
      { id: "13", name: "Invoice" },
      { id: "14", name: "Inventory" },
      { id: "15", name: "Purchase Order" },
      { id: "16", name: "Reports" },
      { id: "17", name: "Vehicle" },
      { id: "18", name: "Leave" },
      { id: "19", name: "Loan" },
      { id: "20", name: "Training" },
      { id: "21", name: "Employee" },
      { id: "22", name: "Job Information" },
      { id: "23", name: "Payroll Management" },
      { id: "24", name: "CPF Calculator" },
      { id: "25", name: "Staff" },
      { id: "26", name: "Content" },
      { id: "27", name: "Section" },
      { id: "28", name: "Category" },
      { id: "29", name: "Sub Category" },
      { id: "30", name: "Valuelist" },
      { id: "31", name: "Setting" },
      { id: "32", name: "User Group" },
      { id: "33", name: "Support"}
    ],
    msg: "Success",
  });
});

// app.get("/getStaffNameDropdown", (req, res, next) => {
//   db.query(`SELECT a.staff_id,
//   CONCAT_WS(' ', a.first_name, a.last_name) AS staff_name 
//   FROM staff a WHERE a.staff_id !=''
//   AND (a.published = 1);`, (err, result) => {
//     if (err) {
//       return res.status(400).send({
//         data: err,
//         msg: "failed",
//       });
//     } else {
//       return res.status(200).send({
//         data: result,
//       });
//     }
//   });
// });

app.post("/editSupport", (req, res, next) => {
  db.query(
    `UPDATE support
            SET title=${db.escape(req.body.title)}
            ,description=${db.escape(req.body.description)}
            ,value=${db.escape(req.body.value)}
            ,name=${db.escape(req.body.module_name)}
            ,staff_id=${db.escape(req.body.staff_id)}
            ,section_id=${db.escape(req.body.section_id)}
            ,record_type=${db.escape(req.body.record_type)}
            ,date=${db.escape(req.body.date)}
            ,due_date=${db.escape(req.body.due_date)}
            ,modification_date=${db.escape(
              req.body.modification_date
            )}
            ,modified_by=${db.escape(req.user)}

            WHERE support_id = ${db.escape(req.body.support_id)}`,
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

app.post("/insertSupport", (req, res, next) => {
  let data = {
    title: req.body.title,
    name: req.body.module_name,
    description: req.body.description,
    value: req.body.value,
    date: req.body.date,
    due_date: req.body.due_date,
    section_id: req.body.section_id,
     staff_id: req.body.staff_id,
    record_type: req.body.record_type,
    creation_date: req.body.creation_date,
     modification_date: req.body.modification_date,
    created_by: req.user,
    modified_by: req.body.modified_by
  };
  let sql = "INSERT INTO support SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.post("/deleteSupport", (req, res, next) => {
  let data = { support_id: req.body.support_id };
  let sql = "DELETE FROM support  WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.get("/getSupportDropdown", (req, res, next) => {
  return res.status(200).send({
    data: [
      { id: "1", value_name: "Change Request" },
      { id: "2", value_name: "Issue" },
     
    ],
    msg: "Success",
  });
});

app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;