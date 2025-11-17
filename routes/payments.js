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

// Get all payments (for PaymentsCL table)

app.get('/getPayments', (req, res, next) => {
  const sql = `
    SELECT 
      p.*, 
      s.company_name, 
      pm.paymode_name
    FROM payments p
    LEFT JOIN supplier s ON p.supplier_id = s.supplier_id
    LEFT JOIN paymode pm ON p.paymode_id = pm.paymode_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(400).send({
        data: err,
        msg: 'failed',
      });
    }

    return res.status(200).send({
      data: result,
      msg: 'Success',
    });
  });
});

// Update payment (for EditActionModal)
app.post('/updatePayment', (req, res) => {
  const {
    payment_date,
    paymode_id,
    modified_by,
    modification_date,
    remarks ,
    critical_remarks ,
    bank_name ,
    cheque_reference_no,
    cheque_reference_date,
    accounts,
  } = req.body;

  if (!payments_id) {
    return res.status(400).json({ message: 'payments_id is required' });
  }

  const sql = `
    UPDATE payments
    SET
      payment_date = ?,
      paymode_id= ?,
      modified_by = ?,
      modification_date = ?,
      remarks = ?,
      critical_remarks = ?,
      bank_name = ?,
      cheque_reference_no = ?,
       cheque_reference_date  = ?,
       accounts =?
    WHERE payments_id = ?
  `;

  db.query(
    sql,
    [
      payment_date ,
      paymode_id || null,
      modified_by , // default if not passed
      modification_date,
      remarks ,
      critical_remarks ,
      bank_name ,
      cheque_reference_no ,
      cheque_reference_date ,
      accounts,
      payments_id
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating payment:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.json({ message: 'Payment updated successfully' });
    }
  );
});

// Delete payment API
app.post('/deletePayment', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      msg: 'Payment ID is required',
    });
  }

  const sql = 'DELETE FROM payments WHERE payments_id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting payment:', err);
      return res.status(500).send({
        msg: 'Database error',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({
        msg: 'Payment not found',
      });
    }

    return res.status(200).send({
      msg: 'Payment deleted successfully',
    });
  });
});

app.get('/getPaymodeDropdown', (req, res) => {
  const query = `SELECT * FROM paymode`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching paymodes:', err);
      res.status(500).json({ error: 'Error fetching paymodes' });
    } else {
      res.json(results);
    }
  });
});


app.get('/getBankDropdown', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Bank'`,
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
});

app.get('/getAccountsDropdown', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Accounts'`,
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
});

app.get('/getSupplierDropdown', (req, res) => {
  const query = `SELECT * FROM supplier`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching paymodes:', err);
      res.status(500).json({ error: 'Error fetching paymodes' });
    } else {
      res.json(results);
    }
  });
});


app.get('/getInvoices/:supplierId', (req, res) => {
  const supplierId = req.params.supplierId;
  const { fromDate, toDate } = req.query;

  let query = `
    SELECT pi.*, pp.*
    FROM purchase_invoice pi
    LEFT JOIN pi_product pp 
      ON pp.purchase_invoice_id = pi.purchase_invoice_id
    WHERE pi.supplier_id = ?
  `;
  const params = [supplierId];

  // Add date filtering if both dates are provided
  if (fromDate && toDate) {
    query += ' AND pi.tran_date BETWEEN ? AND ?';
    params.push(fromDate, toDate);
  } else if (fromDate) {
    query += ' AND pi.tran_date >= ?';
    params.push(fromDate);
  } else if (toDate) {
    query += ' AND pi.tran_date <= ?';
    params.push(toDate);
  }

  query += ' ORDER BY pi.tran_date DESC';

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching purchase invoices:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ data: results });
  });
});

app.post('/insertPayment', (req, res, next) => {

  let data = {payment_no: req.body.payment_no
    , supplier_id: req.body.supplier_id
    , payment_date: req.body.payment_date
    , paymode_id: req.body.paymode_id
    , paid_amount: req.body.paid_amount
    , gl_name: req.body.gl_name
    , credit_amount: req.body.credit_amount
    , deposit_amount: req.body.deposit_amount
    , remarks: req.body.remarks
    , critical_remarks: req.body.critical_remarks
    , created_by: req.body.created_by
    , modified_by: req.body.modified_by
    };
  let sql = "INSERT INTO payments SET ?";
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

app.get('/getInvoices/:supplierId', (req, res) => {
  const supplierId = req.params.supplierId;

  const query = `
    SELECT pi.*, pp.*, p.payment_id, p.amount_paid, p.payment_date
    FROM purchase_invoice pi
    LEFT JOIN pi_product pp 
      ON pp.purchase_invoice_id = pi.purchase_invoice_id
    INNER JOIN payments p
      ON p.purchase_invoice_id = pi.purchase_invoice_id
    WHERE pi.supplier_id = ?
      AND p.status = 'Paid'
    ORDER BY pi.tran_date DESC
  `;

  db.query(query, [supplierId], (err, results) => {
    if (err) {
      console.error('Error fetching paid purchase invoices:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ data: results });
  });
});


// Get a full payment voucher details
// app.get('/getPaymentVoucher/:id', async (req, res) => {
//   try {
//     const paymentId = req.params.id;

//     const [header] = await db.query(`
//       SELECT 
//         p.payments_id,
//         p.payment_no,
//         DATE_FORMAT(p.payment_date, '%d-%m-%Y') AS payment_date,
//         s.company_name,
//         s.address_flat,
//         s.address_street,
//         s.address_po_code,
//         s.address_country,
//         s.phone,
//         s.email
//       FROM payments p
//       LEFT JOIN supplier s ON s.supplier_id = p.supplier_id
//       WHERE p.payment_id = ?
//     `, [paymentId]);

//     const transactions = await db.query(`
//       SELECT
//         t.tran_type,
//         t.tran_no,
//         inv.invoice_no,
//         t.paid_amount,
//         t.credit_amount,
//         t.debit_amount,
//         (t.paid_amount + t.credit_amount - t.debit_amount) AS total
//       FROM payment_transactions t
//       LEFT JOIN invoices inv ON inv.invoice_id = t.invoice_id
//       WHERE t.payment_id = ?
//     `, [paymentId]);

//     const payments = await db.query(`
//       SELECT
//         pm.paymode_name,
//         pd.paid_amount,
//         pd.cheque_date,
//         pd.cheque_no,
//         pd.bank_name
//       FROM payment_details pd
//       LEFT JOIN paymodes pm ON pm.paymode_id = pd.paymode_id
//       WHERE pd.payments_id = ?
//     `, [paymentId]);

//     res.json({
//       header: header[0] || {},
//       transactions,
//       payments
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// 1️⃣ Get supplier data for a payment

// 1️⃣ Supplier data
app.post("/getSupplierData", (req, res) => {
  db.query(
    `SELECT 
      s.supplier_id,
      s.company_name,
      s.address_flat,
      s.address_street,
      s.address_po_code,
      s.address_country,
      s.phone,
      s.email
    FROM payments p
    LEFT JOIN supplier s ON s.supplier_id = p.supplier_id
    WHERE p.payments_id = ${db.escape(req.body.payments_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: "Success" });
      }
    }
  );
});

// 2️⃣ Invoice data
app.post("/getInvoiceData", (req, res) => {
  db.query(
    `SELECT pi.*
     FROM purchase_invoice pi
     INNER JOIN payments p 
       ON p.purchase_invoice_id = pi.purchase_invoice_id
     WHERE p.payments_id = ${db.escape(req.body.payments_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: "Success" });
      }
    }
  );
});

// 3️⃣ Payments data
app.post("/getPaymentsData", (req, res) => {
  db.query(
    `SELECT p.*
     FROM payments p
     WHERE p.payments_id = ${db.escape(req.body.payments_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: "Success" });
      }
    }
  );
});

// Example: routes/payments.js
app.get('/getPaymentVoucher/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Get payment header info
    const headerResult = await db.query(`
      SELECT 
        p.payments_id,
        p.payment_no,
        DATE_FORMAT(p.payment_date, '%d-%m-%Y') AS payment_date,
        s.company_name,
        s.address_flat,
        s.address_street,
        s.address_po_code,
        s.address_country,
        s.phone,
        s.email
      FROM payments p
      LEFT JOIN supplier s ON s.supplier_id = p.supplier_id
      WHERE p.payments_id = ?
    `, [paymentId]);
    const header = headerResult[0] || {};

    // Get payment details
    const payments = await db.query(`
      SELECT
        pd.*
      FROM payments pd
      
      WHERE pd.payments_id = ?
    `, [paymentId]);

    res.json({
      header,
      payments
    });

  } catch (err) {
    console.error('Error in /getPaymentVoucher/:id:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.post('/insertPaymentHistory', (req, res, next) => {
  // Collect data from request body
  let data = {
    payments_id: req.body.payments_id,
    purchase_invoice_id: req.body.purchase_invoice_id,
    paid_amount: req.body.paid_amount,
    created_by: req.body.created_by,
    creation_date: req.body.creation_date,       // You can send as string 'YYYY-MM-DD' or timestamp
    modified_by: req.body.modified_by,
    modification_date: req.body.modification_date
  };

  let sql = "INSERT INTO payments_invoice_history SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log('Error inserting payment history: ', err);
      return res.status(400).send({
        data: err,
        msg: 'Failed to insert payment history',
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'Payment history inserted successfully',
      });
    }
  });
});


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });
  
  module.exports = app;