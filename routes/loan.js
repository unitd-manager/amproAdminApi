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

app.use(fileUpload({
    createParentPath: true
}));

app.get("/getLoanOld", (req, res, next) => {
  db.query(
    `SELECT l.employee_id
  ,l.loan_id
  ,l.status
  ,l.amount
  ,l.type
  ,l.month_amount
  ,l.loan_closing_date
  ,l.notes
  ,l.loan_start_date
  ,l.date
  ,e.employee_name
  FROM loan l
  LEFT JOIN (employee e) ON (e.employee_id = l.employee_id)
  WHERE l.loan_id !=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});
app.get('/getTranslationforHRLoan', (req, res, next) => {
  db.query(`SELECT t.value,t.key_text,t.arb_value FROM translation t WHERE key_text LIKE 'mdHRLoan%'`,
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

app.post('/getLoanFromLocation', (req, res, next) => {
  let siteIdCondition = '';

  // Check if site_id is an empty string and handle it as 'IS NULL' for SQL query
  if (req.body.site_id === '' || req.body.site_id === null || req.body.site_id === undefined ) {
    siteIdCondition = 'AND (l.site_id = 0 OR l.site_id IS NULL)';
  } else {
    siteIdCondition = `AND l.site_id = ${db.escape(req.body.site_id)}`;
  }

  const query = `
  SELECT l.employee_id
  ,l.loan_id
  ,l.status
  ,l.amount
  ,l.type
  ,l.month_amount
  ,l.loan_closing_date
  ,l.notes
  ,l.loan_start_date
  ,l.date
  ,e.employee_name
  ,(SELECT SUM(loan_repayment_amount_per_month) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS total_repaid_amount
  ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
  FROM loan l
  LEFT JOIN (employee e) ON (e.employee_id = l.employee_id)
  WHERE l.loan_id !='' ${siteIdCondition}
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


app.get("/getLoan", (req, res, next) => {
  db.query(
    `SELECT l.employee_id
  ,l.loan_id
  ,l.status
  ,l.amount
  ,l.type
  ,l.month_amount
  ,l.loan_closing_date
  ,l.notes
  ,l.loan_start_date
  ,l.date
  ,e.employee_name
  ,(SELECT SUM(loan_repayment_amount_per_month) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS total_repaid_amount
  ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
  FROM loan l
  LEFT JOIN (employee e) ON (e.employee_id = l.employee_id)
  WHERE l.loan_id !=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});
app.post("/getLoanById", (req, res, next) => {
  db.query(
    `SELECT l.loan_id,l.employee_id
  ,l.status
  ,l.amount
  ,l.type
  ,l.month_amount
  ,l.loan_closing_date
  ,l.notes
  ,l.loan_start_date
  ,l.date
  ,l.creation_date
  ,l.modification_date
  ,l.created_by
  ,l.modified_by
  ,e.employee_name
  ,sum(loan_repayment_amount_per_month) AS total_repaid_amount
  ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
  FROM loan l
  LEFT JOIN (employee e) ON (e.employee_id = l.employee_id)
  LEFT JOIN (loan_repayment_history lrh) ON (l.loan_id=lrh.loan_id)
    WHERE l.loan_id =${db.escape(req.body.loan_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get("/TabEmployee", (req, res, next) => {
  db.query(
    `SELECT employee_name,employee_id FROM employee `,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/editLoanCalulation", (req, res, next) => {
  db.query(
    `UPDATE loan_repayment_history
              SET 
              loan_repayment_amount_per_month=${db.escape(req.body.loan_repayment_amount_per_month)}
              
              WHERE payroll_management_id = ${db.escape(req.body.payroll_management_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});

app.post("/edit-Loan", (req, res, next) => {
  db.query(
    `UPDATE loan
            SET amount=${db.escape(req.body.amount)}
            ,month_amount=${db.escape(req.body.month_amount)}
            ,status=${db.escape(req.body.status)}
            ,notes=${db.escape(req.body.notes)}
            ,date=${db.escape(req.body.date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,type=${db.escape(req.body.type)}
            ,employee_id=${db.escape(req.body.employee_id)}
            WHERE loan_id = ${db.escape(req.body.loan_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});

app.post("/getcurrentLoanById", (req, res, next) => {
  db.query(
    `SELECT l.date
    ,l.type
    ,l.status
    ,l.amount
    ,l.loan_id
    ,l.employee_id
    ,l.loan_closing_date
    ,l.loan_start_date
    ,l.month_amount
    ,lr.loan_repayment_history_id
    ,lr.employee_id
    ,l.notes
    ,lr.payroll_management_id
    ,lr.loan_repayment_amount_per_month
    ,lr.remarks
    ,(SELECT SUM(loan_repayment_amount_per_month) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS total_repaid_amount
    ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
    ,l.amount 
    FROM loan l
    LEFT JOIN (loan_repayment_history lr)  ON (l.loan_id=lr.loan_id)
    WHERE l.employee_id =${db.escape(req.body.employee_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
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

app.post("/editLoan", (req, res, next) => {
  db.query(
    `UPDATE loan
            SET 
            amount=${db.escape(req.body.amount)}
            ,loan_id=${db.escape(req.body.loan_id)}
            
            WHERE employee_id = ${db.escape(req.body.employee_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});

app.post("/editTabLoan", (req, res, next) => {
  db.query(
    `UPDATE loan
              SET amount=${db.escape(req.body.amount)}
              ,month_amount=${db.escape(req.body.month_amount)}
              ,notes=${db.escape(req.body.notes)}
              ,date=${db.escape(req.body.date)}
              ,type=${db.escape(req.body.type)}
              WHERE loan_id = ${db.escape(req.body.loan_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});

app.post("/insertLoan", (req, res, next) => {
  let data = {
    date: req.body.date,
    amount: req.body.amount,
    employee_id: req.body.employee_id,
    status: "Applied",
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    site_id: req.body.site_id,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    month_amount: req.body.month_amount,

  };
  let sql = "INSERT INTO loan SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "New Loan has been created successfully",
      });
    }
  });
});

app.post("/deleteLoan", (req, res, next) => {
  let data = { loan_id: req.body.loan_id };
  let sql = "DELETE FROM loan WHERE ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Loan has been removed successfully",
      });
    }
  });
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
app.post("/getTotalAmount", (req, res, next) => {
  db.query(
         `SELECT SUM(loan_repayment_amount_per_month) AS total_repaid_amount
            FROM loan_repayment_history
            WHERE loan_id = ${db.escape(req.body.loan_id)}`,
            (err, result) => {
              if (err) {
                console.log("error: ", err);
                return;
              } else {
                return res.status(200).send({
                  data: result,
                  msg: "Success",
                });
              }
            }
          );
        });

app.get("/Tab-PaymentHistory", (req, res, next) => {
  db.query(
    `SELECT lrh.loan_repayment_history_id
    ,DATE_FORMAT(lrh.generated_date, '%d-%m-%Y') AS payment_date
    ,CONCAT_WS('/', pm.payroll_month, pm.payroll_year) AS payroll_month_year
    ,lrh.loan_repayment_amount_per_month
    ,lrh.remarks
FROM loan_repayment_history lrh
LEFT JOIN loan l ON (lrh.loan_id = l.loan_id)
LEFT JOIN payroll_management pm ON (lrh.payroll_management_id = pm.payroll_management_id)
WHERE lrh.loan_id != ''
ORDER BY lrh.generated_date DESC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get("/TabPaymentHistory", (req, res, next) => {
  db.query(
    `SELECT lrh.loan_repayment_history_id
  ,DATE_FORMAT(lrh.generated_date, '%d-%m-%Y') AS payment_date
  ,CONCAT_WS('/', pm.payroll_month, pm.payroll_year) AS payroll_month_year
  ,lrh.loan_repayment_amount_per_month
  ,lrh.remarks
  ,l.loan_id
  FROM loan_repayment_history lrh
LEFT JOIN loan l ON (lrh.loan_id = l.loan_id)
LEFT JOIN payroll_management pm ON (lrh.payroll_management_id = pm.payroll_management_id)
WHERE lrh.loan_id != ''
ORDER BY lrh.generated_date DESC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/TabPaymentHistoryById", (req, res, next) => {
  db.query(
    `SELECT lrh.loan_repayment_history_id
  ,DATE_FORMAT(lrh.generated_date, '%d-%m-%Y') AS payment_date
  ,CONCAT_WS('/', pm.payroll_month, pm.payroll_year) AS payroll_month_year
  ,lrh.loan_repayment_amount_per_month
  ,lrh.remarks
  ,l.loan_id
  FROM loan_repayment_history lrh
  LEFT JOIN loan l ON (lrh.loan_id = l.loan_id)
  LEFT JOIN payroll_management pm ON (lrh.payroll_management_id = pm.payroll_management_id)
  WHERE lrh.loan_id = ${db.escape(req.body.loan_id)}
`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/insertLoanRepaymenthistory", (req, res, next) => {
  let data = {
    generated_date: req.body.generated_date,
    loan_repayment_amount_per_month: req.body.loan_repayment_amount_per_month,
    employee_id: req.body.employee_id,
    loan_repayment_history_id: req.body.loan_repayment_history_id,
    payroll_management_id: req.body.payroll_management_id,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    remarks: req.body.remarks,
    loan_id: req.body.loan_id
  };
  let sql = "INSERT INTO loan_repayment_history SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
      return res.status(200).send({
        data: result,
        msg: "New Loan has been created successfully",
      });
    }
  });
});

app.get("/Tab-PreviousEarlierLoan", (req, res, next) => {
  db.query(
    `SELECT l.date
    ,l.amount
    ,l.status
    ,l.employee_id
    ,l.due_date
    ,l.loan_closing_date
    ,l.loan_start_date
    ,l.month_amount
    ,l.amount FROM loan l
        WHERE l.employee_id != ''
        AND date < l.date;`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get("/TabPreviousEarlierLoan", (req, res, next) => {
  db.query(
    `SELECT l.date
    ,l.amount
    ,l.loan_id
    ,l.employee_id
    ,l.loan_closing_date
    ,l.loan_start_date
    ,l.month_amount
    ,l.amount 
    FROM loan l
           
      WHERE employee_id =""   
      AND loan_id != ""`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/TabPreviousEarlierLoanById", (req, res, next) => {
  db.query(
    `SELECT l.date
    ,l.type
    ,l.status
    ,l.amount
    ,l.loan_id
    ,l.employee_id
    ,l.loan_closing_date
    ,l.loan_start_date
    ,l.month_amount
    ,l.amount 
    FROM loan l
    WHERE employee_id =${db.escape(req.body.employee_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
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
app.post("/editLoanStartDate", (req, res, next) => {
  db.query(
    `UPDATE loan SET
          loan_start_date=${db.escape(
            new Date().toISOString().slice(0, 19).replace("T", " ")
          )}
    WHERE loan_id = ${db.escape(req.body.loan_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "date has been removed successfully",
        });
      }
    }
  );
});
app.post("/editLoanClosingDate", (req, res, next) => {
  db.query(
    `UPDATE loan SET
          loan_closing_date=${db.escape(
            new Date().toISOString().slice(0, 19).replace("T", " ")
          )}
    WHERE loan_id = ${db.escape(req.body.loan_id)} `,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});


app.post("/editLoanClosedDate", (req, res, next) => {
  db.query(
    `UPDATE loan SET
          status='Closed'
    WHERE loan_id = ${db.escape(req.body.loan_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});
app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;
