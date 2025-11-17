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

app.post('/getTransactionsByCustomerIdOld', async (req, res) => {
  const { customer_id } = req.body;

  if (!customer_id) {
    return sendResponse(res, 400, 'Customer ID is required.');
  }

  const sql = `SELECT * FROM customer_transactions WHERE customer_id = ? ORDER BY tran_date DESC`;
  try {
    const [rows] = await db.query(sql, [customer_id]);
    sendResponse(res, 200, 'Transactions fetched successfully.', rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    sendResponse(res, 500, 'Internal server error while fetching transactions.');
  }
});



app.post('/getTransactionsByCustomerId', (req, res) => {
    const { company_id, transaction_type, from_date, to_date } = req.body;

    if (!company_id) {
        return res.status(400).json({
            status: 'error',
            message: 'Company ID is required'
        });
    }

    let sql = '';
    let params = [company_id];
    
    // Add date parameters if provided
    if (from_date) params.push(from_date);
    if (to_date) params.push(to_date);

    const getDateCondition = (dateField) => {
        return from_date && to_date 
            ? `AND ${dateField} BETWEEN ? AND ?` 
            : from_date 
            ? `AND ${dateField} >= ?` 
            : to_date 
            ? `AND ${dateField} <= ?` 
            : '';
    };

    switch (transaction_type) {
        case 'sales_order':
            sql = `
                SELECT so.*
                FROM sales_order so
                WHERE so.company_id = ? 
                AND so.status = 'Closed'
                ${getDateCondition('so.tran_date')}
                ORDER BY so.tran_date DESC
            `;
            break;

        case 'delivery_order':
            sql = `
                SELECT do.*
                FROM delivery_order do
                WHERE do.company_id = ?
                AND do.status = 'Open'
                ${getDateCondition('do.delivery_order_date')}
                ORDER BY do.delivery_order_date DESC
            `;
            break;

        case 'invoice':
            sql = `
                SELECT inv.*
                FROM invoice inv
                WHERE inv.company_id = ?
                AND inv.status = 'Paid'
                ${getDateCondition('inv.invoice_date')}
                ORDER BY inv.invoice_date DESC
            `;
            break;

        case 'sales_return':
            sql = `
                SELECT sr.*
                FROM sales_return sr
                WHERE sr.company_id = ?
                ${getDateCondition('sr.sales_return_date')}
                ORDER BY sr.sales_return_date DESC
            `;
            break;

        case 'receipt':
            sql = `
                SELECT r.*
                FROM receipt r
                WHERE r.company_id = ?
                ${getDateCondition('r.receipt_date')}
                ORDER BY r.receipt_date DESC
            `;
            break;

        default:
            return res.status(400).json({
                status: 'error',
                message: 'Invalid transaction type'
            });
    }

    db.query(sql, params, (error, results) => {
        if (error) {
            console.error('Error fetching transactions:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error while fetching transactions'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Transactions fetched successfully',
            data: results
        });
    });
});
// @route   POST /api/transaction/insertTransaction
// @desc    Add a new transaction for a customer
// @access  Public (or add userMiddleware if authenticated)
app.post('/insertTransaction', async (req, res) => {
  const {
    customer_id,
    transaction_type, // e.g., 'purchase_order', 'payments'
    tran_no,
    tran_date,
    sub_total,
    tax,
    net_total,
    payment_no,
    payment_date,
    pay_mode,
    gl_name,
    paid_amount,
    created_by, // Assuming this comes from req.body or a middleware
    // ... add any other fields that can be part of a transaction
  } = req.body;

  // Basic validation for essential fields
  if (!customer_id || !transaction_type || !tran_no || !tran_date) {
    return sendResponse(res, 400, 'Missing essential transaction fields (customer_id, type, no, date).');
  }

  // Prepare data for insertion, setting optional fields to null if not provided
  const transactionData = {
    customer_id: customer_id,
    transaction_type: transaction_type,
    tran_no: tran_no,
    tran_date: tran_date, // Ensure format is compatible with SQL DATE/DATETIME
    sub_total: sub_total || null,
    tax: tax || null,
    net_total: net_total || null,
    payment_no: payment_no || null,
    payment_date: payment_date || null,
    pay_mode: pay_mode || null,
    gl_name: gl_name || null,
    paid_amount: paid_amount || null,
    creation_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current timestamp
    created_by: created_by || 'System', // Fallback if created_by is not provided
  };

  const sql = `INSERT INTO customer_transactions SET ?`;
  try {
    const [result] = await db.query(sql, transactionData);
    if (result.affectedRows > 0) {
      sendResponse(res, 200, 'Transaction added successfully.', { transaction_id: result.insertId });
    } else {
      sendResponse(res, 500, 'Failed to add transaction: No rows affected.');
    }
  } catch (err) {
    console.error('Error inserting transaction:', err);
    sendResponse(res, 500, 'Internal server error while adding transaction.');
  }
});

// @route   POST /api/transaction/updateTransaction
// @desc    Update an existing transaction
// @access  Public (or add userMiddleware if authenticated)
app.post('/updateTransaction', async (req, res) => {
  const { transaction_id, modified_by, ...updates } = req.body;

  if (!transaction_id) {
    return sendResponse(res, 400, 'Transaction ID is required for update.');
  }

  // Dynamically build the SET clause for the UPDATE query
  const updateFields = [];
  const updateValues = [];

  for (const key in updates) {
    // Basic check to prevent updating non-existent columns (optional but good)
    // You might want a whitelist of allowed updatable fields here
    if (updates.hasOwnProperty(key) && updates[key] !== undefined) {
      updateFields.push(`${key} = ?`);
      updateValues.push(updates[key]);
    }
  }

  // Add modification timestamp and user
  updateFields.push('modification_date = ?');
  updateValues.push(new Date().toISOString().slice(0, 19).replace('T', ' '));
  updateFields.push('modified_by = ?');
  updateValues.push(modified_by || 'System'); // Fallback for modified_by

  if (updateFields.length === 0) {
    return sendResponse(res, 400, 'No fields provided for update.');
  }

  const sql = `UPDATE customer_transactions SET ${updateFields.join(', ')} WHERE transaction_id = ?`;
  const values = [...updateValues, transaction_id]; // Add transaction_id for the WHERE clause

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows > 0) {
      sendResponse(res, 200, 'Transaction updated successfully.');
    } else {
      sendResponse(res, 404, 'Transaction not found or no changes made.');
    }
  } catch (err) {
    console.error('Error updating transaction:', err);
    sendResponse(res, 500, 'Internal server error while updating transaction.');
  }
});

// @route   POST /api/transaction/deleteTransaction
// @desc    Delete a transaction by transaction_id
// @access  Public (or add userMiddleware if authenticated)
app.post('/deleteTransaction', async (req, res) => {
  const { transaction_id } = req.body;

  if (!transaction_id) {
    return sendResponse(res, 400, 'Transaction ID is required for deletion.');
  }

  const sql = `DELETE FROM customer_transactions WHERE transaction_id = ?`;
  try {
    const [result] = await db.query(sql, [transaction_id]);
    if (result.affectedRows > 0) {
      sendResponse(res, 200, 'Transaction deleted successfully.');
    } else {
      sendResponse(res, 404, 'Transaction not found or already deleted.');
    }
  } catch (err) {
    console.error('Error deleting transaction:', err);
    sendResponse(res, 500, 'Internal server error while deleting transaction.');
  }
}); 


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;
