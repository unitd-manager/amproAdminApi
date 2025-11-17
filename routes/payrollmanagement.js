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

app.get('/getpayrollmanagementMain', (req, res, next) => {
  db.query(`SELECT pm.payroll_month
            ,pm.payroll_year
            ,pm.basic_pay
            ,pm.total_deductions
            ,pm.overtime_pay_rate
            ,pm.ot_amount
            ,pm.ot_hours
            ,pm.cpf_employer 
            ,pm.cpf_employee 
            ,pm.total_cpf_contribution
            ,pm.allowance1
            ,pm.allowance2
            ,pm.allowance3
            ,pm.allowance4
            ,pm.allowance5
            ,pm.allowance6
            ,(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5) AS total_alowance
            ,pm.deduction1
            ,pm.deduction2
            ,pm.deduction3
            ,pm.deduction4
            ,pm.net_total
            ,pm.employee_name
            ,pm.employee_id
            ,pm.status
            ,pm.sdl
            ,pm.reimbursement
            ,pm.director_fee
            ,pm.total_basic_pay_for_month
            ,pm.payroll_management_id 
            ,e.employee_name
            ,e.nric_no
            ,e.fin_no
            ,pm.mode_of_payment
            ,pm.loan_amount
            ,e.position AS designation
            ,e.salary
            ,e.date_of_birth AS dob
            ,e.spr_year
            ,e.citizen
            ,e.status AS employee_status
  FROM payroll_management pm
  LEFT JOIN (employee e) ON (e.employee_id = pm.employee_id)
  WHERE pm.payroll_management_id != ''
  ORDER BY e.employee_name ASC`,
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

app.get('/getEmployeeWithoutJobinfo', (req, res, next) => {
  db.query(`SELECT e.employee_id
            
            ,e.employee_name
  FROM employee e
  LEFT JOIN job_information j ON e.employee_id = j.employee_id
WHERE j.employee_id IS NULL `,
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

app.post('/getpayrollmanagementById', (req, res, next) => {
  db.query(`SELECT pm.payroll_month
  ,pm.payslip_start_date
  ,pm.payslip_end_date
  ,pm.employee_name
  ,pm.employee_id
  ,pm.ot_hours
  ,j.overtime_pay_rate As overtime
  ,j.working_days
            ,pm.payroll_year
            ,pm.total_basic_pay_for_month
            ,pm.total_deductions
            ,pm.basic_pay
            ,pm.ot_amount
            ,pm.cpf_employer
            ,pm.cpf_employee
            ,pm.payroll_management_id
  ,pm.mode_of_payment
  ,pm.pay_sinda
  ,pm.loan_amount
  ,pm.mode_of_payment
  ,pm.working_days_in_month
  ,pm.actual_working_days
  ,pm.notes
  ,pm.basic_pay
  ,pm.pay_cdac
  ,pm.pay_mbmf
  ,pm.pay_eucf
  ,pm.department
  ,pm.flag
  ,pm.status
  ,pm.cpf_account_no
  ,pm.govt_donation
  ,pm.overtime_pay_rate
  ,pm.allowance1
  ,pm.allowance2
  ,pm.allowance3
  ,pm.allowance4
  ,pm.allowance5
  ,pm.allowance6
  ,(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5) AS total_allowance
  ,pm.deduction1
  ,pm.deduction2
  ,pm.deduction3
  ,pm.deduction4
  ,pm.income_tax_amount
   ,pm.sdl
   ,pm.reimbursement
   ,pm.director_fee
   ,pm.generated_date
            ,pm.net_total
            ,pm.payroll_management_id 
            ,e.position AS designation
            ,e.first_name
            ,e.employee_name
            ,e.salary
            ,e.date_of_birth AS dob
            ,e.spr_year
            ,e.citizen
            ,e.nric_no
            ,e.fin_no
            ,e.status AS employee_status
  FROM payroll_management pm
  LEFT JOIN (employee e) ON (e.employee_id = pm.employee_id)
  LEFT JOIN (job_information j) ON (e.employee_id = j.employee_id)
  WHERE pm.payroll_management_id = ${db.escape(req.body.payroll_management_id)}`,
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


app.post('/getpayrollbyMonthYear', (req, res, next) => {
  db.query(`SELECT pm.payroll_month
  ,pm.payslip_start_date
  ,pm.payslip_end_date
  ,pm.generated_date
  ,pm.employee_id
  ,pm.ot_hours
  ,j.overtime_pay_rate As overtime
  ,j.working_days
  ,pm.payroll_year
  ,pm.total_basic_pay_for_month
  ,pm.total_deductions
  ,pm.basic_pay
  ,pm.ot_amount
  ,pm.cpf_employer
  ,pm.cpf_employee
  ,pm.payroll_management_id
  ,pm.mode_of_payment
  ,pm.pay_sinda
  ,pm.loan_amount
  ,pm.mode_of_payment
  ,pm.working_days_in_month
  ,pm.actual_working_days
  ,pm.notes
  ,pm.basic_pay
  ,pm.pay_cdac
  ,pm.pay_mbmf
  ,pm.pay_eucf
  ,pm.department
  ,pm.flag
  ,pm.status
  ,pm.cpf_account_no
  ,pm.govt_donation
  ,pm.overtime_pay_rate
  ,pm.allowance1
  ,pm.allowance2
  ,pm.allowance3
  ,pm.allowance4
  ,pm.allowance5
  ,pm.allowance6
  ,(pm.allowance1 + pm.allowance2 + pm.allowance3 + pm.allowance4 + pm.allowance5 + pm.reimbursement + pm.basic_pay + pm.director_fee) AS total_allowance
  ,(pm.loan_amount + pm.income_tax_amount + pm.sdl + pm.deduction1 + pm.deduction2 + pm.deduction3 + pm.deduction4 + pm.pay_cdac) AS total_deduction
  ,((pm.allowance1 + pm.allowance2 + pm.allowance3 + pm.allowance4 + pm.allowance5 + pm.reimbursement + pm.basic_pay + pm.director_fee) 
    - (pm.loan_amount + pm.income_tax_amount + pm.sdl + pm.deduction1 + pm.deduction2 + pm.deduction3 + pm.deduction4 + pm.pay_cdac)) 
    AS net_total
  ,pm.deduction1
  ,pm.deduction2
  ,pm.deduction3
  ,pm.deduction4
  ,pm.income_tax_amount
  ,pm.sdl
  ,pm.reimbursement
  ,pm.director_fee
  ,pm.generated_date
  ,pm.payroll_management_id 

  ,e.position AS designation
  ,e.first_name
  ,e.employee_name
  ,e.salary
  ,e.date_of_birth AS dob
  ,e.spr_year
  ,e.citizen
  ,e.nric_no
  ,e.status AS employee_status
 
  FROM payroll_management pm
  LEFT JOIN (employee e) ON (e.employee_id = pm.employee_id)
  LEFT JOIN (job_information j) ON (e.employee_id = j.employee_id)
  WHERE pm.payroll_year = ${db.escape(req.body.payroll_year)}
  AND pm.payroll_month = ${db.escape(req.body.payroll_month)}
  AND pm.employee_id = ${db.escape(req.body.employee_id)}`,
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

app.post('/getpayrollmanagementFilterYearMonth', (req, res, next) => {
  db.query(`SELECT pm.payroll_month
  ,pm.payslip_start_date
  ,pm.payslip_end_date
  ,pm.employee_name
  ,pm.employee_id
  ,pm.ot_hours
  ,j.overtime_pay_rate As overtime
  ,j.working_days
            ,pm.payroll_year
            ,pm.total_basic_pay_for_month
            ,pm.total_deductions
            ,pm.basic_pay
            ,pm.ot_amount
            ,pm.cpf_employer
            ,pm.cpf_employee
            ,pm.payroll_management_id
  ,pm.mode_of_payment
  ,pm.pay_sinda
  ,pm.loan_amount
  ,pm.mode_of_payment
  ,pm.working_days_in_month
  ,pm.actual_working_days
  ,pm.notes
  ,pm.basic_pay
  ,pm.pay_cdac
  ,pm.pay_mbmf
  ,pm.pay_eucf
  ,pm.department
  ,pm.flag
  ,pm.status
  ,pm.cpf_account_no
  ,pm.govt_donation
  ,pm.overtime_pay_rate
  ,pm.allowance1
  ,pm.allowance2
  ,pm.allowance3
  ,pm.allowance4
  ,pm.allowance5
  ,pm.allowance6
  ,(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5) AS total_allowance
  ,pm.deduction1
  ,pm.deduction2
  ,pm.deduction3
  ,pm.deduction4
  ,pm.income_tax_amount
   ,pm.sdl
   ,pm.reimbursement
   ,pm.director_fee
   ,pm.generated_date
            ,pm.net_total
            ,pm.payroll_management_id 
            ,e.position AS designation
            ,e.first_name
            ,e.employee_name
            ,e.salary
            ,e.date_of_birth AS dob
            ,e.spr_year
            ,e.citizen
            ,e.nric_no
            ,e.status AS employee_status
  FROM payroll_management pm
  LEFT JOIN (employee e) ON (e.employee_id = pm.employee_id)
  LEFT JOIN (job_information j) ON (e.employee_id = j.employee_id)
  WHERE pm.payroll_year = ${db.escape(req.body.year)}
  AND pm.payroll_month = ${db.escape(req.body.month)}`,
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
app.post("/editLoanCalulation", (req, res, next) => {
  db.query(
    `UPDATE loan_repayment_history
              SET 
              loan_repayment_amount_per_month=${db.escape(req.body.loan_repayment_amount_per_month)}
              ,notes=${db.escape(req.body.notes)}
              ,employee_id=${db.escape(req.body.employee_id)}
              ,loan_id=${db.escape(req.body.loan_id)}
              ,loan_repayment_history_id=${db.escape(req.body.loan_repayment_history_id)}
              ,employee_id=${db.escape(req.body.employee_id)}
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

app.post('/editpayrollmanagementMain', (req, res, next) => {
  db.query(`UPDATE  payroll_management 
            SET employee_id  =${db.escape(req.body.employee_id)}
                ,employee_name =${db.escape(req.body.employee_name)}
                ,payroll_month=${db.escape(req.body.payroll_month)}
                ,payroll_year=${db.escape(req.body.payroll_year)}
                ,ot_hours=${db.escape(req.body.ot_hours)}
                ,additional_wages=${db.escape(req.body.additional_wages)}
                ,cpf_deduction=${db.escape(req.body.cpf_deduction)}
                ,statutary_deduction=${db.escape(req.body.statutary_deduction)}
                ,status=${db.escape(req.body.status)}
                ,net_total=${db.escape(req.body.net_total)}
                ,notes=${db.escape(req.body.notes)}
                ,creation_date=${db.escape(req.body.creation_date)}
                ,modification_date=${db.escape(req.body.modification_date)}
                ,created_by=${db.escape(req.body.created_by)}
                ,modified_by=${db.escape(req.body.modified_by)}
                ,flag=${db.escape(req.body.flag)}
                ,income_tax_amount=${db.escape(req.body.income_tax_amount)}
                ,loan_amount=${db.escape(req.body.loan_amount)}
                ,loan_description=${db.escape(req.body.loan_description)}
                ,commission=${db.escape(req.body.commission)}
                ,sdl=${db.escape(req.body.sdl)}
                ,ot_amount=${db.escape(req.body.ot_amount)}
                ,basic_pay=${db.escape(req.body.basic_pay)}
                ,overtime_pay_rate=${db.escape(req.body.overtime_pay_rate)}
                ,department=${db.escape(req.body.department)}
                ,cpf_account_no=${db.escape(req.body.cpf_account_no)}
                ,pay_cdac=${db.escape(req.body.pay_cdac)}
                ,pay_sinda=${db.escape(req.body.pay_sinda)}
                ,pay_mbmf=${db.escape(req.body.pay_mbmf)}
                ,pay_eucf=${db.escape(req.body.pay_eucf)}
                ,allowance1=${db.escape(req.body.allowance1)}
                ,allowance2=${db.escape(req.body.allowance2)}
                ,allowance3	=${db.escape(req.body.allowance3)}
                ,paid_date=${db.escape(req.body.paid_date)}
                ,deduction1=${db.escape(req.body.deduction1)}
                ,deduction2=${db.escape(req.body.deduction2)}
                ,deduction3=${db.escape(req.body.deduction3)}
                ,deduction4=${db.escape(req.body.deduction4)}
                ,cpf_employee=${db.escape(req.body.cpf_employee)}
                ,cpf_employer=${db.escape(req.body.cpf_employer)}
                ,loan_deduction=${db.escape(req.body.loan_deduction)}
                ,govt_donation=${db.escape(req.body.govt_donation)}
                ,total_cpf_contribution=${db.escape(req.body.total_cpf_contribution)}
                ,actual_working_days=${db.escape(req.body.actual_working_days)}
                ,working_days_in_month=${db.escape(req.body.working_days_in_month)}
                ,reimbursement=${db.escape(req.body.reimbursement)}
                ,allowance4=${db.escape(req.body.allowance4)}
                ,allowance5=${db.escape(req.body.allowance5)}
                ,director_fee=${db.escape(req.body.director_fee)}
                ,total_basic_pay_for_month=${db.escape(req.body.total_basic_pay_for_month)}
                ,mode_of_payment=${db.escape(req.body.mode_of_payment)}
                ,total_deductions=${db.escape(req.body.total_deductions)}
                ,allowance6=${db.escape(req.body.allowance6)}
                WHERE payroll_management_id = ${db.escape(req.body.payroll_management_id  )}`,
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

app.post("/getCpfCalculation", (req, res, next) => {
  db.query(
    `
   SELECT
    e.employee_id,
    e.first_name,
    e.employee_name,
    YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) AS age_dob,
    j.basic_pay AS grosspay,
    j.basic_pay,
    p.cpf_employer AS cpf,
    p.cpf_employee AS cpfE,
    p.cpf_employee AS cpfEmployee,
    p.cpf_employer AS cpfEmployer,
    p.payroll_management_id,
    p.payroll_year,
    p.total_cpf_contribution AS totalCapAmountCpf,
    p.total_cpf_contribution AS totalContributionAmount ,
    c.by_employer AS byEmployer,
    c.by_employee AS byEmployee,
    c.cap_amount_employer AS capAmountEmployer,
    c.cap_amount_employee AS capAmountEmployee,
    c.year,
    e.spr_year
FROM
    employee e
JOIN
    cpf_calculator c ON YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) BETWEEN c.from_age AND c.to_age
LEFT JOIN
    job_information j ON (e.employee_id=j.employee_id)
LEFT JOIN
    payroll_management p ON (e.employee_id=p.employee_id)
WHERE
    e.employee_id =${db.escape(req.body.employee_id)}
    AND YEAR(CURRENT_DATE()) 
   
`,
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


app.post("/getCpfCalculate", (req, res, next) => {
  db.query(
    `
   SELECT
    e.employee_id,
    e.first_name,
    e.employee_name,
    YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) AS age_dob,
    j.basic_pay AS grosspay,
    j.basic_pay,
    p.cpf_employer AS cpfE,
    p.cpf_employee AS cpf,
    p.cpf_employee,
    p.cpf_employer,
    p.cpf_employee AS cpfEmployee,
    p.cpf_employer AS cpfEmployer,
    p.payroll_management_id,
    p.payroll_year,
    p.total_cpf_contribution AS totalCapAmountCpf,
    p.total_cpf_contribution AS totalContributionAmount ,
    c.by_employer AS byEmployer,
    c.by_employee AS byEmployee,
    c.cap_amount_employer AS capAmountEmployer,
    c.cap_amount_employee AS capAmountEmployee,
    c.cap_amount_employer,
    c.cap_amount_employee,
    c.year
FROM
    employee e
JOIN
    cpf_calculator c ON YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) BETWEEN c.from_age AND c.to_age
LEFT JOIN
    job_information j ON (e.employee_id=j.employee_id)
LEFT JOIN
    payroll_management p ON (e.employee_id=p.employee_id)
WHERE
    e.employee_id =${db.escape(req.body.employee_id)}
   
  

    
`,
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

app.post('/updateOt', (req, res, next) => {
  db.query(`UPDATE  payroll_management 
            SET
            payroll_management_id=${db.escape(req.body.payroll_management_id)}
              , ot_hours=${db.escape(req.body.ot_hours)}
             ,ot_amount=${db.escape(req.body.ot_amount)}
             ,overtime_pay_rate=${db.escape(req.body.overtime_pay_rate)}
               ,allowance1=${db.escape(req.body.allowance1)}
                ,allowance2=${db.escape(req.body.allowance2)}
                ,allowance3	=${db.escape(req.body.allowance3)}
                 ,deduction1=${db.escape(req.body.deduction1)}
                ,deduction2=${db.escape(req.body.deduction2)}
                ,deduction3=${db.escape(req.body.deduction3)}
                ,deduction4=${db.escape(req.body.deduction4)}
                ,allowance4=${db.escape(req.body.allowance4)}
                ,allowance5=${db.escape(req.body.allowance5)}
                WHERE payroll_management_id = ${db.escape(req.body.payroll_management_id  )}`,
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
app.post("/getCpfCalc", (req, res, next) => {
  db.query(
    `
   SELECT 
 c.by_employee AS byEmployee
,c.by_employer AS byEmployer
,e.date_of_birth
,j.basic_pay
,YEAR(CURRENT_DATE()) - YEAR(date_of_birth) AS age
,c.cap_amount_employer AS capAmountEmployer
,c.cap_amount_employee AS capAmountEmployee
from employee e

LEFT JOIN job_information j ON (e.employee_id=j.employee_id)
LEFT JOIN cpf_calculator c ON YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) BETWEEN c.from_age AND c.to_age
WHERE 
e.employee_id=${db.escape(req.body.employee_id)} 
AND (YEAR(CURRENT_DATE()))
AND (${db.escape(req.body.basic_pay)} BETWEEN c.from_salary AND c.to_salary)
AND (YEAR(CURRENT_DATE()) - YEAR(e.date_of_birth) BETWEEN c.from_age AND c.to_age)
   
  `,
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

app.get('/getJobinfoArchiveEmployee', (req, res, next) => {
  db.query(`SELECT 
  e.employee_id
 ,e.first_name
 ,e.employee_name
 ,e.nric_no
 ,e.fin_no
 ,e.status
 ,l.amount_payable
 ,(SELECT COUNT(*) FROM job_information ji WHERE ji.employee_id=e.employee_id AND ji.status='current') AS e_count
 FROM employee e 
 LEFT JOIN loan l ON (e.employee_id = l.employee_id)

  `,
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

app.post('/insertpayroll_management', (req, res, next) => {

  let data = {employee_id: req.body.employee_id,
              employee_name: req.body.employee_name,
              payroll_month: req.body.payroll_month,
              payroll_year: req.body.payroll_year,
              ot_hours	: req.body.ot_hours,
              additional_wages: req.body.additional_wages,
              cpf_deduction: req.body.cpf_deduction,
              statutary_deduction: req.body.statutary_deduction,
              status: req.body.status,
              net_total: req.body.net_total,
              notes: req.body.notes,
              creation_date: req.body.creation_date,
              modification_date: req.body.modification_date,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              flag: req.body.flag,
              income_tax_amount: req.body.income_tax_amount,
              loan_amount: req.body.loan_amount,
              loan_description: req.body.loan_description,
              commission: req.body.commission,
              sdl: req.body.sdl,
              ot_amount	: req.body.ot_amount,
              basic_pay: req.body.basic_pay,
              overtime_pay_rate: req.body.overtime_pay_rate,
              department: req.body.department,
              cpf_account_no: req.body.cpf_account_no,
              pay_cdac: req.body.pay_cdac,
              pay_sinda: req.body.pay_sinda,
              pay_mbmf: req.body.pay_mbmf,
              pay_eucf: req.body.pay_eucf,
              allowance1: req.body.allowance1,
              allowance2: req.body.allowance2,
              allowance3: req.body.allowance3,
              paid_date: req.body.paid_date,
              generated_date: new Date(),
              deduction1: req.body.deduction1,
              deduction2: req.body.deduction2,
              deduction3: req.body.deduction3,
              deduction4: req.body.deduction4,
              cpf_employee: req.body.cpf_employee,
              cpf_employer: req.body.cpf_employer,
              loan_deduction: req.body.loan_deduction,
              govt_donation: req.body.govt_donation,
              total_cpf_contribution: req.body.total_cpf_contribution,
              payslip_start_date: req.body.payslip_start_date,
              payslip_end_date: req.body.payslip_end_date,
              actual_working_days: req.body.actual_working_days,
              working_days_in_month: req.body.working_days_in_month,
              reimbursement: req.body.reimbursement,
              allowance4: req.body.allowance4,
              allowance5: req.body.allowance5,
              director_fee: req.body.director_fee,
              total_basic_pay_for_month: req.body.total_basic_pay_for_month,
              total_deductions:req.body.total_deductions,
              mode_of_payment: req.body.mode_of_payment,
              allowance6: req.body.allowance6,
        };

  let sql = "INSERT INTO payroll_management SET ?";
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


app.post("/getEmployeeage", (req, res, next) => {
  let employeeId = req.body.employee_id;
  let age_dob = req.body.age;

  db.query(
    `
    SELECT
    e.employee_id,
    e.first_name,
    e.employee_name,
    j.basic_pay AS grosspay,
    p.cpf_employer AS cpfEmployer,
    p.cpf_employee AS cpfEmployee,
    p.payroll_management_id,
    YEAR(CURRENT_DATE()) - YEAR(date_of_birth) AS age_dob,
    p.payroll_year,
    c.by_employer,
    c.by_employee,
    c.cap_amount_employer,
    c.cap_amount_employee,
    c.year
    FROM employee e
    JOIN cpf_calculator c ON YEAR(CURRENT_DATE()) - YEAR(date_of_birth) BETWEEN c.from_age AND c.to_age
    LEFT JOIN job_information j ON (e.employee_id = j.employee_id)
    LEFT JOIN Payroll_management p ON (e.employee_id = p.employee_id)
    WHERE e.employee_id = ${db.escape(employeeId)}
    AND p.payroll_year =${db.escape(req.body.payroll_year)}
    AND ${db.escape(req.body.basic_pay)} BETWEEN c.from_salary AND c.to_salary
    AND c.spr_year = 3
    AND ${db.escape(age_dob)} BETWEEN c.from_age AND c.to_age
    
    `,
    (err, result) => {
      if (result.length == 0) {
        return res.status(400).send({
          msg: "No result found",
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



app.post("/getEmployeeages", (req, res, next) => {
  db.query(
    `
    SELECT 
    YEAR(CURRENT_DATE()) - YEAR(date_of_birth) AS age
    FROM employee
    WHERE employee_id = ${db.escape(req.body.employee_id)}
    `,
   (err, result) => {
      if (result.length == 0) {
        return res.status(400).send({
          msg: "No result found",
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

app.post('/deletepayroll_management', (req, res, next) => {

  let data = {payroll_management_id : req.body.payroll_management_id };
  let sql = "DELETE FROM payroll_management WHERE ?";
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
    ,l.notes
    ,(SELECT SUM(loan_repayment_amount_per_month) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS total_repaid_amount
    ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
    ,l.amount 
    FROM loan l
    WHERE l.employee_id =${db.escape(req.body.employee_id)} AND l.status ='Active'`,
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

app.post("/TabLoanById", (req, res, next) => {
  db.query(
    `SELECT 
    l.loan_id AS loanID
    
    FROM loan l
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



app.post("/getPreviousEarlierLoanById", (req, res, next) => {
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
    ,l.notes
    ,(SELECT SUM(loan_repayment_amount_per_month) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS total_repaid_amount
    ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
    ,l.amount 
    FROM loan l
    WHERE l.employee_id =${db.escape(req.body.employee_id)} AND l.loan_id =${db.escape(req.body.loan_id)}`,
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

app.post('/getPastLeaveHistory', (req, res, next) => {
  db.query(`SELECT l.from_date
  ,l.to_date
  ,l.no_of_days
  ,l.employee_id
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

app.get('/getJobInformationPayroll', (req, res, next) => {
  db.query(`SELECT j.employee_id
  ,j.job_information_id
  ,j.mode_of_payment
  ,j.pay_sinda
  ,j.mode_of_payment
  ,j.working_days
  ,j.overtime
  ,j.basic_pay
  ,j.pay_cdac
  ,j.pay_mbmf
  ,j.pay_eucf
  ,j.department
  ,j.flag
  ,j.status
  ,j.cpf_applicable
  ,j.cpf_account_no
  ,j.govt_donation
  ,j.overtime_pay_rate
  ,j.allowance1
  ,j.allowance2
  ,j.allowance3
  ,j.allowance4
  ,j.allowance5
  ,j.allowance6
  ,j.deduction1
  ,j.deduction2
  ,j.deduction3
  ,j.deduction4
  ,j.income_tax_amount
  FROM job_information j
WHERE  j.employee_id NOT IN (
    SELECT pm.employee_id
    FROM payroll_management pm
 
)`,
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


app.get('/getJobInformationTerminationPayroll', (req, res, next) => {
    
    const currentDate = new Date();
const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());

// Format the last month's date to MySQL date format
const formattedLastMonth = lastMonth.toISOString().slice(0, 7);
    
  db.query(`SELECT j.employee_id
  ,j.job_information_id
  ,j.mode_of_payment
  ,j.pay_sinda
  ,j.mode_of_payment
  ,j.working_days
  ,j.overtime
  ,j.basic_pay
  ,j.pay_cdac
  ,j.pay_mbmf
  ,j.pay_eucf
  ,j.department
  ,j.flag
  ,j.termination_date
  ,j.status
  ,j.cpf_applicable
  ,j.cpf_account_no
  ,j.govt_donation
  ,j.overtime_pay_rate
  ,j.allowance1
  ,j.allowance2
  ,j.allowance3
  ,j.allowance4
  ,j.allowance5
  ,j.allowance6
  ,j.deduction1
  ,j.deduction2
  ,j.deduction3
  ,j.deduction4
  ,j.income_tax_amount
  ,e.first_name
  ,e.employee_name
 ,e.nric_no
 ,e.fin_no
 ,e.status
 ,l.amount_payable
  FROM job_information j
   LEFT JOIN loan l ON (j.employee_id = l.employee_id)
   LEFT JOIN employee e ON (j.employee_id = e.employee_id)
  WHERE termination_date LIKE '${formattedLastMonth}%' AND j.status = 'Archive' AND j.employee_id NOT IN (
    SELECT pm.employee_id
    FROM payroll_management pm
 )`,
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

app.post('/getTimeSheetPdfById', (req, res, next) => {
  db.query(`SELECT et.*
  ,emp.first_name
  ,emp.employee_name
   ,emp.nric_no
   ,emp.fin_no
   ,emp.citizen
  ,et.normal_hourly_rate
  ,et.admin_charges
  ,et.transport_charges
  ,DATE_FORMAT(MIN(et.date), '%d') AS min_date
  ,DATE_FORMAT(MAX(et.date), '%d') AS max_date
FROM employee_timesheet et  
LEFT JOIN (employee emp) ON (emp.employee_id = et.employee_id)
WHERE et.employee_id =${db.escape(req.body.employee_id )}
AND et.employee_hours != ''`,
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


app.get('/getjobTerminationPayroll', (req, res, next) => {
    
    const currentDate = new Date();
const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());

// Format the last month's date to MySQL date format
const formattedLastMonth = lastMonth.toISOString().slice(0, 7);
    
  db.query(`SELECT j.employee_id
  ,j.job_information_id
  ,j.mode_of_payment
  ,j.pay_sinda
  ,j.mode_of_payment
  ,j.working_days
  ,j.overtime
  ,j.basic_pay
  ,j.pay_cdac
  ,j.pay_mbmf
  ,j.pay_eucf
  ,j.department
  ,j.flag
  ,j.termination_date
  ,j.status
  ,j.cpf_applicable
  ,j.cpf_account_no
  ,j.govt_donation
  ,j.overtime_pay_rate
  ,j.allowance1
  ,j.allowance2
  ,j.allowance3
  ,j.allowance4
  ,j.allowance5
  ,j.allowance6
  ,j.deduction1
  ,j.deduction2
  ,j.deduction3
  ,j.deduction4
  ,j.income_tax_amount
  ,e.first_name
  ,e.employee_name
 ,e.nric_no
 ,e.fin_no
 ,e.status
 ,l.amount_payable
 , l.amount
 ,(SELECT (amount- SUM(loan_repayment_amount_per_month)) FROM loan_repayment_history WHERE loan_id=l.loan_id) AS amount_payable
  FROM job_information j
  LEFT JOIN employee e ON (j.employee_id = e.employee_id)
   LEFT JOIN loan l ON (l.employee_id = e.employee_id)
     WHERE termination_date LIKE '${formattedLastMonth}%' AND j.status = 'Archive' AND j.employee_id IN (
    SELECT pm.employee_id
    FROM payroll_management pm
 )`,
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


app.post('/getCpfSummaryReport', (req, res, next) => {
  db.query(`SELECT pm.*
  ,e.employee_name
  ,e.nric_no
  ,e.salary
  ,e.date_of_birth AS dob
  ,(COALESCE(pm.cpf_employer, 0.0) +COALESCE(pm.cpf_employee, 0.0)) AS total_cpf 
  ,(SELECT SUM(cpf_employee) FROM payroll_management) AS total_cpf_employee
  ,(SELECT SUM(cpf_employer) FROM payroll_management) AS total_cpf_employer
  FROM payroll_management pm
LEFT JOIN (employee e) ON (e.employee_id = pm.employee_id)
WHERE pm.payroll_month = ${db.escape(req.body.month)}
AND pm.payroll_year = ${db.escape(req.body.year)}
AND pm.total_cpf_contribution > 0
ORDER BY e.employee_name ASC`,
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