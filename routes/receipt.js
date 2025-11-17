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

// GET all receipts
app.get("/getReceipts", (req, res, next) => {
  const sql = `SELECT 
    r.*, 
    IFNULL(r.payment_status, '') AS payment_status,
    c.company_name,
    e.employee_name
FROM 
    receipt r
LEFT JOIN 
  company c ON r.company_id = c.company_id
 LEFT JOIN 
 employee e ON r.employee_id = e.employee_id
WHERE 
    r.receipt_id != ''
ORDER BY 
    r.receipt_date DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    }
    return res.status(200).send({ data: result, msg: "Success" });
  });
});

// GET single receipt by id
app.post("/getReceiptById", (req, res, next) => {
  const receipt_id = req.body.receipt_id;
  const sql = `SELECT 
    r.*, 
    c.company_name,
    e.employee_name
FROM 
    receipt r
LEFT JOIN 
  company c ON r.company_id = c.company_id
 LEFT JOIN 
 employee e ON r.employee_id = e.employee_id
     WHERE r.receipt_id = ${db.escape(receipt_id)} LIMIT 1`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result[0] || null, msg: "Success" });
  });
});

// Create receipt
app.post("/createReceipt", (req, res, next) => {
  const data = {
    receipt_code: req.body.receipt_code,
    amount: req.body.amount,
    amount_paid: req.body.amount_paid || req.body.amount,
    company_id: req.body.company_id,
    invoice_id: req.body.invoice_id,
    mode_of_payment: req.body.mode_of_payment,
    remarks: req.body.remarks,
    receipt_date: req.body.receipt_date,
    published: req.body.published || 1,
    flag: req.body.flag || 1,
    creation_date: req.body.creation_date || new Date(),
    modification_date: req.body.modification_date || new Date(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    order_id: req.body.order_id,
    receipt_status: req.body.receipt_status || 'COMPLETED',
    cheque_date: req.body.cheque_date,
    bank_name: req.body.bank_name,
    site_id: req.body.site_id,
    cheque_no: req.body.cheque_no,
    project_id: req.body.project_id,
    // new fields
    company_id: req.body.company_id,
    employee_id: req.body.employee_id,
    currency: req.body.currency || 'SGD',
    exchange_rate: req.body.exchange_rate || 1,
    total_amount: req.body.total_amount,
    balance_amount: req.body.balance_amount,
    account_id: req.body.account_id,
    payment_reference: req.body.payment_reference,
    payment_status: req.body.payment_status || 'PENDING',
    transaction_type: req.body.transaction_type || 'PAYMENT',
    bank_account_no: req.body.bank_account_no,
    bank_branch: req.body.bank_branch,
    receipt_source: req.body.receipt_source,
  };

  const sql = "INSERT INTO receipt SET ?";
  db.query(sql, data, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Success" });
  });
});

// Update receipt
app.post("/updateReceipt", (req, res, next) => {
  const receipt_id = req.body.receipt_id;
  // you can list allowed update fields explicitly to avoid mass assignment
  const updates = {
    receipt_code: req.body.receipt_code,
    amount: req.body.amount,
    amount_paid: req.body.amount_paid,
    mode_of_payment: req.body.mode_of_payment,
    remarks: req.body.remarks,
    receipt_date: req.body.receipt_date,
    modification_date: req.body.modification_date || new Date(),
    modified_by: req.body.modified_by,
    cheque_date: req.body.cheque_date,
    bank_name: req.body.bank_name,
    cheque_no: req.body.cheque_no,
    // new fields
    company_id: req.body.company_id,
    employee_id: req.body.employee_id,
    currency: req.body.currency,
    exchange_rate: req.body.exchange_rate,
    total_amount: req.body.total_amount,
    balance_amount: req.body.balance_amount,
    account_id: req.body.account_id,
    payment_reference: req.body.payment_reference,
    payment_status: req.body.payment_status,
    transaction_type: req.body.transaction_type,
    bank_account_no: req.body.bank_account_no,
    bank_branch: req.body.bank_branch,
    receipt_source: req.body.receipt_source,
  };

  // Remove undefined keys
  Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

  const sql = `UPDATE receipt SET ? WHERE receipt_id = ${db.escape(receipt_id)}`;
  db.query(sql, updates, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Success" });
  });
});

// Delete receipt
app.post("/deleteReceipt", (req, res, next) => {
  const receipt_id = req.body.receipt_id;
  const sql = `DELETE FROM receipt WHERE receipt_id = ${db.escape(receipt_id)}`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Success" });
  });
});

// Get receipts by invoice
app.post("/getReceiptsByInvoice", (req, res, next) => {
  const invoice_id = req.body.invoice_id;
  const sql = `SELECT * FROM receipt WHERE invoice_id = ${db.escape(invoice_id)} ORDER BY receipt_date DESC`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Success" });
  });
});

// Get receipts by customer
app.post("/getReceiptsByCustomer", (req, res, next) => {
  const customer_id = req.body.customer_id;
  const sql = `SELECT * FROM receipt WHERE customer_id = ${db.escape(customer_id)} ORDER BY receipt_date DESC`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Success" });
  });
}); 

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;