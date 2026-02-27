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


app.post('/getMainInvoice', (req, res, next) => {
  db.query(
    `SELECT i.*
    ,c.company_id
    ,c.company_name
  
    FROM invoice i
     LEFT JOIN (sales_order p) ON (i.sales_order_id = p.sales_order_id)
    LEFT JOIN (company c) 	ON (p.company_id = c.company_id)
    Where i.invoice_date=${db.escape(req.body.invoice_date)} ORDER BY i.invoice_code DESC`,
    (err, result) => {
      if (err) {
        console.log('error: ', err)
        return res.status(400).send({
          data: err,
          msg: 'failed',
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: 'Staff has been removed successfully',
        })
     }
   }
  );
});


app.post('/getMainInvoiceSearch', (req, res, next) => {
  let conditions = [];
  let params = [];
  
  if (req.body.invoice_code) {
    conditions.push("s.invoice_code LIKE ?");
    params.push(`%${req.body.invoice_code}%`);
  }
  if (req.body.from_date) {
    conditions.push("s.invoice_date >= ?");
    params.push(req.body.from_date);
  }
  if (req.body.to_date) {
    conditions.push("s.invoice_date <= ?");
    params.push(req.body.to_date);
  }
  if (req.body.customer) {
    conditions.push("c.company_name LIKE ?");
    params.push(`%${req.body.customer}%`);
  }
  if (req.body.status) {
    conditions.push("s.status = ?");
    params.push(req.body.status);
  }
  
  let whereClause = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  
  db.query(`
    SELECT 
      s.*, c.company_name, cu.currency_code, co.first_name AS contact_person
    FROM invoice s
    LEFT JOIN (company c) 	ON (s.company_id = c.company_id)
    LEFT JOIN company cd ON cd.company_id = s.delivery_id
    LEFT JOIN contact co ON co.company_id = c.company_id
    LEFT JOIN currency cu ON cu.currency_id = s.currency_id
    ${whereClause}
    AND s.status != LOWER('Cancelled')
ORDER BY s.invoice_id DESC`,
    params,
    (err, result) => {
      if (err) {
        console.log('error: ', err);
        return res.status(400).send({ data: err, msg: 'failed' });
      } else {
        return res.status(200).send({ data: result, msg: 'Success' });
      }
    }
  );
  
});

   app.post('/edit-TabQuoteLine', (req, res, next) => {
   
    db.query(
      `UPDATE  invoice_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,discount_value=${db.escape(req.body.discount_value)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,gross_total=${db.escape(req.body.gross_total)}
            ,total=${db.escape(req.body.total)}
            ,foc=${db.escape(req.body.foc)}
      
            WHERE invoice_item_id =  ${db.escape(req.body. invoice_item_id)}`,
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
        
        
          app.post('/edit-TabCreditLine', (req, res, next) => {
   
    db.query(
      `UPDATE  credit_note_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,discount_value=${db.escape(req.body.discount_value)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,gross_total=${db.escape(req.body.gross_total)}
            ,total=${db.escape(req.body.total)}
            ,foc=${db.escape(req.body.foc)}
      
            WHERE credit_note_item_id =  ${db.escape(req.body.credit_note_item_id)}`,
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
        
        
        
        
        
          app.post('/edit-TabDeliveryLine', (req, res, next) => {
   
    db.query(
      `UPDATE  delivery_order_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,discount_value=${db.escape(req.body.discount_value)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,gross_total=${db.escape(req.body.gross_total)}
            ,total=${db.escape(req.body.total)}
            ,foc=${db.escape(req.body.foc)}
      
            WHERE delivery_order_item_id =  ${db.escape(req.body. delivery_order_item_id)}`,
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
        
        
        app.post('/getDeliveryorderById', (req, res, next) => {
  db.query(` Select 
  s.*,
    c.company_name,
    c.customer_code,
    c.address_street,
    c.address_town,
        c.address_street1,
    c.address1,
    c.address2,
    c.phone,
    c.address_state,
    c.address_country,
    c.address_po_code,
    c.tax_type,
       cd.billing_address_street,
    cd.billing_address_town,
    cd.billing_address_state,
    cd.billing_address_country,
    cd.billing_address_po_code,
    
    c.notes,
    cu.currency_id,
    cu.currency_code,
    cu.currency_name,
    cu.currency_rate,
    co.first_name AS contact_person 
  From delivery_order s
   LEFT JOIN company c ON (c.company_id = s.company_id)
      LEFT JOIN company cd ON (cd.company_id = s.delivery_id)

       LEFT JOIN contact co ON (co.company_id = c.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.delivery_order_id=${db.escape(req.body.delivery_order_id)}`,
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

app.post('/getSalesorderById', (req, res, next) => {
  db.query(` Select 
  s.*,
    c.company_name,
    c.customer_code,
    c.address_street,
        c.address_street1,
    c.address1,
    c.address2,
    c.phone,
    c.address_town,
    c.address_state,
    c.address_country,
    c.address_po_code,
    c.tax_type,
       cd.billing_address_street,
    cd.billing_address_town,
    cd.billing_address_state,
    cd.billing_address_country,
    cd.billing_address_po_code,
    sp.salesman_name,
    sp.salesman_phone,
    c.notes,
    cu.currency_id,
    cu.currency_code,
    cu.currency_name,
    cu.currency_rate,
    co.first_name AS contact_person 
  From invoice s
   LEFT JOIN company c ON (c.company_id = s.company_id)
      LEFT JOIN company cd ON (cd.company_id = s.delivery_id)

       LEFT JOIN contact co ON (co.company_id = c.company_id)
        LEFT JOIN sales_person sp ON (sp.sales_id = s.sales_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.invoice_id=${db.escape(req.body.invoice_id)}`,
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


app.get('/getInvoicesByCompany', (req, res) => {
  const companyId = req.query.company_id;
  if (!companyId) return res.status(400).send({ msg: 'company_id is required' });

  const sql = `
    SELECT 
      i.invoice_id,
      i.invoice_code AS invoice_no,
      i.invoice_date,
      i.invoice_due_date,
      i.company_id,
      i.invoice_amount AS credit_amount,
      IFNULL(SUM(r.amount), 0) AS debit_amount,
      (i.invoice_amount - IFNULL(SUM(r.amount), 0)) AS balance_amount,
      DATEDIFF(CURDATE(), i.invoice_date) AS carry_days,
      DATEDIFF(i.invoice_due_date, i.invoice_date) AS credit_days,
      i.invoice_type AS tran_type
    FROM invoice i
    LEFT JOIN receipt r ON r.invoice_id = i.invoice_id
    WHERE i.company_id = ?
    GROUP BY i.invoice_id
    HAVING balance_amount > 0
    ORDER BY i.invoice_date DESC
  `;

  // IMPORTANT: bind the parameter array
  db.query(sql, [companyId], (err, result) => {
    if (err) return res.status(400).send({ data: err, msg: 'failed' });
    return res.status(200).send({ data: result, msg: 'Success' });
  });
});

app.post('/convertToSalesReturn', (req, res) => {
  const { invoice_id,sales_return_code } = req.body;

  // 1. Get invoice
  db.query('SELECT * FROM invoice WHERE invoice_id = ?', [invoice_id], (err, invoiceRows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    if (!invoiceRows.length) return res.status(404).json({ msg: 'Invoice not found' });
    const invoice = invoiceRows[0];

    // 2. Create sales_return
    db.query(
      'INSERT INTO sales_return (company_id, invoice_id, sales_return_date, sales_return_amount, status, sub_total, tax, delivery_id, currency_id, sales_id,sales_return_code) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?,?)',
      [
        invoice.company_id,
        invoice.invoice_id,
        invoice.invoice_amount,
        'Pending',
        invoice.sub_total,
        invoice.tax,
        invoice.delivery_id,
        invoice.currency_id,
        invoice.sales_id,
        sales_return_code
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Server error' });
        }
        const sales_return_id = result.insertId;

        // 3. Get invoice items
        db.query('SELECT * FROM invoice_item WHERE invoice_id = ?', [invoice_id], (err, items) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Server error' });
          }

          // 4. Insert sales_return_items
          let completed = 0;
          if (!items.length) {
            return res.json({ msg: 'Sales Return created successfully', sales_return_id });
          }
          items.forEach((item) => {
            db.query(
              'INSERT INTO sales_return_item (sales_return_id, product_id, quantity, carton_price, total, carton_qty, loose_qty, discount_value, gross_total, wholesale_price, foc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                sales_return_id,
                item.product_id,
                item.quantity,
                item.carton_price,
                item.total,
                item.carton_qty,
                item.loose_qty,
                item.discount_value,
                item.gross_total,
                item.wholesale_price,
                item.foc
              ],
              (err) => {
                completed++;
                if (err) {
                  console.error(err);
                  // Don't return here, just log error and continue
                }
                if (completed === items.length) {
                  return res.json({ msg: 'Sales Return created successfully', sales_return_id });
                }
              }
            );
          });
        });
      }
    );
  });
});


app.post('/convertToDelivryVerification', (req, res) => {
  const { invoice_id } = req.body;

  // 1. Get invoice
  db.query('SELECT * FROM invoice WHERE invoice_id = ?', [invoice_id], (err, invoiceRows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    if (!invoiceRows.length) return res.status(404).json({ msg: 'Invoice not found' });
    const invoice = invoiceRows[0];

    // 2. Create delivery_verification
    db.query(
      'INSERT INTO delivery_verification (company_id, invoice_id, delivery_verification_date, delivery_verification_amount, status, sub_total, tax, delivery_id, currency_id, sales_id,paid_amount,balance_amount,delivery_verification_code) VALUES (?,?, NOW(),?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        invoice.company_id,
        invoice.invoice_id,
        invoice.invoice_amount,
        'Not Delivered',
        invoice.sub_total,
        invoice.tax,
        invoice.delivery_id,
        invoice.currency_id,
        invoice.sales_id,
        invoice.paid_amount,
        invoice.balance_amount,
        invoice.invoice_code
        
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Server error' });
        }
        const delivery_verification_id = result.insertId;

        // 3. Get invoice items
        db.query('SELECT * FROM invoice_item WHERE invoice_id = ?', [invoice_id], (err, items) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Server error' });
          }

          // 4. Insert delivery_verification_items
          let completed = 0;
          if (!items.length) {
            return res.json({ msg: 'Sales Return created successfully', delivery_verification_id });
          }
          items.forEach((item) => {
            db.query(
              'INSERT INTO delivery_verification_item (delivery_verification_id, product_id, quantity, carton_price, total, carton_qty, loose_qty, discount_value, gross_total, wholesale_price, foc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                delivery_verification_id,
                item.product_id,
                item.quantity,
                item.carton_price,
                item.total,
                item.carton_qty,
                item.loose_qty,
                item.discount_value,
                item.gross_total,
                item.wholesale_price,
                item.foc
              ],
              (err) => {
                completed++;
                if (err) {
                  console.error(err);
                  // Don't return here, just log error and continue
                }
                if (completed === items.length) {
                  return res.json({ msg: 'Delivery Verification created successfully', delivery_verification_id });
                }
              }
            );
          });
        });
      }
    );
  });
});


app.post("/repeatInvoice", async (req, res) => {
  const { invoice_id, invoice_code } = req.body;
  if (!invoice_id || !invoice_code) {
    return res.status(400).send({ msg: "invoice_id and invoice_code are required" });
  }

  try {
    // 1. Fetch the original sales order
    const [originalOrder] = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM invoice WHERE invoice_id = ?", [invoice_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!originalOrder) {
      return res.status(404).send({ msg: "Original sales order not found" });
    }

    // 2. Fetch the original sales order items
    const originalItems = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM invoice_item WHERE invoice_id = ?", [invoice_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // 3. Use the invoice_code from the frontend as the new tran_no (or use a separate field if you have one)
    const newOrderData = {
      ...originalOrder,
      invoice_id: undefined, // Let DB auto-increment
      invoice_code: invoice_code,    // Use invoice_code as the new tran_no
      status: "Open",
      creation_date: new Date(),
      // Set other fields as needed (e.g., reset printed, etc.)
    };

    const insertOrderSql = "INSERT INTO invoice SET ?";
    const insertResult = await new Promise((resolve, reject) => {
      db.query(insertOrderSql, newOrderData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    const newSalesOrderId = insertResult.insertId;

    // 4. Insert duplicated items for the new sales order
    if (originalItems.length > 0) {
      const newItemsData = originalItems.map(item => [
        item.quantity,
        newSalesOrderId,
        item.carton_qty,
        item.loose_qty,
        item.carton_price,
        item.wholesale_price,
        item.product_id,
        item.total,
        item.gross_total,
        item.foc,
      ]);
      const insertItemsSql = `
        INSERT INTO invoice_item (
          quantity, invoice_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
        ) VALUES ?`;
      await new Promise((resolve, reject) => {
        db.query(insertItemsSql, [newItemsData], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

    return res.status(201).send({
      msg: "Invoice repeated successfully.",
      new_invoice_id: newSalesOrderId,
      new_tran_no: invoice_code,
    });
  } catch (err) {
    console.error("Error repeating invoice:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


app.get('/getInvoiceSummary', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code 
  ,ir.amount as received
  ,(select(i.invoice_amount-ir.amount)) as balance
  ,i.invoice_due_date
  ,i.invoice_date
  ,i.invoice_amount
  ,i.selling_company
  ,i.start_date
  ,i.end_date
  ,i.quote_code
  ,i.po_number
  ,i.project_location
  ,i.project_reference
  ,i.so_ref_no
  ,i.code
  ,i.reference
   ,i.invoice_terms
   ,i.attention
   ,i.status
 from invoice i
  LEFT JOIN invoice_receipt_history ir ON ir.invoice_id=i.invoice_id
WHERE i.invoice_id !='' AND i.status != LOWER('Cancelled')
ORDER BY i.invoice_date DESC`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
           });
     } else {
           return res.status(200).send({
             data: result,
             msg:'Success'
           });
  
     }
   }
  );
});


app.post("/generateReceiptFromSalesOrder", async (req, res, next) => {
  const { invoice_id, company_id, receipt_code, amount } = req.body;

  if (!invoice_id || !receipt_code) {
    return res.status(400).send({
      msg: "invoice_id, company_id, and receipt_code are required",
    });
  }

  try {
    const invoiceData = {
      invoice_id,
      receipt_code,
      amount,
      company_id,
      creation_date: new Date(),
      receipt_status: "Paid"
    };

    const createInvoiceSql = "INSERT INTO receipt SET ?";
    await new Promise((resolve, reject) => {
      db.query(createInvoiceSql, invoiceData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const updateSalesOrderStatusSql = `
      UPDATE invoice
      SET status = 'Paid',
          balance_amount = 0,
          paid_amount = ?
      WHERE invoice_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [amount, invoice_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "Receipt created and invoice marked as 'Paid'.",
      invoice_id,
    });
  } catch (err) {
    console.error("Error generating receipt:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});



   app.post('/getDeliveryLineItemsById', (req, res, next) => {
  const salesOrderId = db.escape(req.body.delivery_order_id);

  const query = `
    SELECT 
      qt.*, 
      c.title AS product_name,
      c.product_code,
      c.unit,
      c.pcs_per_carton,
      c.purchase_unit_cost,
      c.wholesale_price AS whole_price,
      c.carton_price AS Cprice,
      c.carton_qty AS Cqty
     
    FROM delivery_order_item qt 
    LEFT JOIN product c ON c.product_id = qt.product_id
    WHERE qt.delivery_order_id = ${salesOrderId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'No result found' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});




   app.post('/getQuoteLineItemsById', (req, res, next) => {
  const salesOrderId = db.escape(req.body.invoice_id);

  const query = `
    SELECT 
      qt.*, 
      c.title AS product_name,
      c.product_code,
      c.unit,
      c.pcs_per_carton,
      c.purchase_unit_cost,
      c.wholesale_price AS whole_price,
      c.carton_price AS Cprice,
      c.carton_qty AS Cqty
     
    FROM invoice_item qt 
    LEFT JOIN product c ON c.product_id = qt.product_id
    WHERE qt.invoice_id = ${salesOrderId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'No result found' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/deleteProjectQuote', (req, res, next) => {

  let data = { invoice_item_id: req.body. invoice_item_id};
  let sql = "DELETE FROM  invoice_item WHERE ?";
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


app.post('/deleteDeliveryItem', (req, res, next) => {

  let data = { delivery_order_item_id: req.body.delivery_order_item_id};
  let sql = "DELETE FROM  delivery_order_item WHERE ?";
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


app.post('/getInvoiceItemsById', (req, res, next) => {
  db.query(`SELECT it.item_title,
  it.invoice_item_id,
i.invoice_id,
it.description,
it.total_cost,
it.unit,
it.qty,
it.unit_price,
it.remarks
FROM invoice_item it
LEFT JOIN (invoice i) ON (i.invoice_id=it.invoice_id)
WHERE i.invoice_id = ${db.escape(req.body.invoice_id)}`,
          (err, result) => {
       
      if (result.length === 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
 
    }
  );
});

app.post('/getInvoiceById', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_percentage
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,i.site_code
     ,i.payment_terms
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE i.order_id= ${db.escape(req.body.order_id)} AND i.status != LOWER('Cancelled')`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});


app.post('/getInvoiceorderById', (req, res, next) => {
  db.query(` Select 
  s.*,
    c.company_name,
    c.customer_code,
    c.address_street,
    c.address_town,
    c.address_state,
    c.address_country,
    c.address_po_code,
       cd.billing_address_street,
    cd.billing_address_town,
    cd.billing_address_state,
    cd.billing_address_country,
    cd.billing_address_po_code,
    
    c.notes,
    cu.currency_id,
    cu.currency_code,
    cu.currency_name,
    cu.currency_rate,
    co.first_name AS contact_person 
  From invoice s
   LEFT JOIN company c ON (c.company_id = s.company_id)
      LEFT JOIN company cd ON (cd.company_id = s.delivery_id)

       LEFT JOIN contact co ON (co.company_id = c.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.invoice_id=${db.escape(req.body.invoice_id)}`,
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



app.post('/getInvoicesById', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,i.site_code
     ,i.payment_terms
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE i.invoice_id= ${db.escape(req.body.invoice_id)} AND i.status != LOWER('Cancelled')`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

app.post('/getProjectInvoiceById', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,i.site_code
     ,i.payment_terms
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE o.sales_order_id = ${db.escape(req.body.sales_order_id)} AND i.status != LOWER('Cancelled')`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});


app.post('/getProjectInvoicePdf', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,i.site_code
     ,i.payment_terms
     ,it.item_title
     ,it.description
     ,it.total_cost
     from invoice_item it
    
    LEFT JOIN invoice i ON it.invoice_id=i.invoice_id
    LEFT JOIN orders o ON o.order_id=i.order_id
    WHERE i.invoice_id=${db.escape(req.body.invoice_id)} AND i.status != LOWER('Cancelled')
    `,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});


app.post('/getReceiptCancel', (req, res, next) => {
  db.query(`SELECT DISTINCT r.receipt_id
  ,r.receipt_id
  ,r.receipt_code
  ,r.receipt_status
  ,r.amount
  ,r.receipt_date
  ,r.mode_of_payment
  ,r.remarks
  ,r.creation_date
  ,r.created_by
  ,r.modification_date
  ,r.modified_by 
  FROM receipt r  
  LEFT JOIN orders o ON (o.order_id = r.order_id) WHERE o.order_id =${db.escape(req.body.order_id)} 
 AND r.receipt_status = LOWER('Cancelled')`,
    (err, result) => {
     
      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
}); 

app.post('/editSalesOrder', (req, res, next) => {
  db.query(`UPDATE invoice
            SET company_id=${db.escape(req.body.company_id)}
            ,currency_id=${db.escape(req.body.currency_id)}
              ,delivery_id=${db.escape(req.body.delivery_id)}
            ,sales_id=${db.escape(req.body.sales_id)}
            ,invoice_code=${db.escape(req.body.invoice_code)}
            ,invoice_date=${db.escape(req.body.invoice_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE invoice_id = ${db.escape(req.body.invoice_id)}`,
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
        
        
        
        app.post('/editDeliveryOrder', (req, res, next) => {
          db.query(`UPDATE delivery_order
            SET company_id=${db.escape(req.body.company_id)}
            ,currency_id=${db.escape(req.body.currency_id)}
            ,delivery_id=${db.escape(req.body.delivery_id)}
            ,sales_id=${db.escape(req.body.sales_id)}
            ,delivery_code=${db.escape(req.body.delivery_code)}
            ,tran_date=${db.escape(req.body.tran_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE delivery_order_id = ${db.escape(req.body.delivery_order_id)}`,
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
        
        
app.post('/editInvoiceStatus', (req, res, next) => {
  db.query(`UPDATE invoice 
            SET status = ${db.escape(req.body.status)}
             WHERE invoice_id =  ${db.escape(req.body.invoice_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});

app.post('/getInvoiceCancel', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE i.order_id= ${db.escape(req.body.order_id)} AND i.status = LOWER('Cancelled')`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

app.post('/getProjectInvoiceCancel', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE o.sales_order_id= ${db.escape(req.body.sales_order_id)} AND i.status = LOWER('Cancelled')`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});


app.post('/getInvoiceByInvoiceId', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
  ,i.invoice_amount
  ,i.gst_percentage
   ,i.invoice_amount 
   ,i.invoice_amount AS total_cost
   ,i.gst_value
   ,i.discount
   ,i.payment_terms
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.site_code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,c.company_name AS company_name
     ,o.cust_address1
  ,o.cust_address2
  ,o.cust_address_country
  ,o.cust_address_po_code
  ,p.title
   from invoice i
  LEFT JOIN orders o ON o.order_id=i.order_id
  LEFT JOIN company c ON (o.company_id = c.company_id) 
  LEFT JOIN sales order p ON (p.sales_order_id = i.sales_order_id) 
 WHERE i.invoice_id= ${db.escape(req.body.invoice_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
           });
     } else {
           return res.status(200).send({
             data: result[0],
             msg:'Success'
           });
  
     }

    }
   );
});



app.post('/getReceiptData', (req, res, next) => {
  db.query(`select i.receipt_id
  ,i.remarks
  ,i.creation_date
  ,i.modification_date
  ,i.created_by
  ,i.modified_by
  ,i.receipt_code  
  ,i.receipt_status
  ,i.amount
  ,i.mode_of_payment
   ,i.receipt_date
   from receipt i
  LEFT JOIN orders o ON o.order_id=i.order_id
 WHERE i.receipt_id= ${db.escape(req.body.receipt_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
    }
  );
});


app.post('/getReceiptByIds', (req, res, next) => {
  db.query(`SELECT DISTINCT r.receipt_id
  ,r.receipt_id
  ,o.order_id
  ,r.receipt_code
  ,r.receipt_status
  ,r.amount
  ,r.receipt_date
  ,r.mode_of_payment
  ,r.remarks
  ,r.creation_date
  ,r.created_by
  ,r.modification_date
  ,r.modified_by 
  FROM receipt r  
  LEFT JOIN invoice_receipt_history ih ON (ih.receipt_id = r.receipt_id) 
   LEFT JOIN invoice i ON (i.invoice_id = ih.invoice_id) 
 LEFT JOIN orders o ON (o.order_id = i.order_id) WHERE o.order_id = ${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

app.post('/editInvoiceStatus', (req, res, next) => {
  db.query(`UPDATE invoice 
            SET status = 'Paid'
             WHERE invoice_id =  ${db.escape(req.body.invoice_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});

app.post('/editInvoicePartialStatus', (req, res, next) => {
  db.query(`UPDATE invoice 
            SET status = 'Partial Payment'
             WHERE invoice_id =  ${db.escape(req.body.invoice_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});

app.post('/getProjectReceiptByIdOld', (req, res, next) => {
  db.query(`SELECT DISTINCT ih.receipt_id
  ,o.order_id
  ,r.receipt_code
  ,r.receipt_status
  ,r.amount
  ,r.receipt_date
  ,r.mode_of_payment
  ,r.remarks
  ,r.creation_date
  ,r.created_by
  ,r.modification_date
  ,r.modified_by 
  ,ih.invoice_id
  FROM invoice_receipt_history ih  
  LEFT JOIN receipt r ON (ih.receipt_id = r.receipt_id) 
   LEFT JOIN invoice i ON (i.invoice_id = ih.invoice_id) 
 LEFT JOIN orders o ON (o.order_id = i.order_id) WHERE r.order_id = ${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});


app.post('/getProjectReceiptById', (req, res, next) => {
  db.query(`SELECT DISTINCT r.*
  FROM receipt r  
 WHERE r.order_id = ${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});
 
 app.post('/getCheckboxReceiptById', (req, res, next) => {
  db.query(`SELECT DISTINCT
    r.receipt_id,
    r.receipt_id AS r_receipt_id,
    o.order_id,
    r.order_id AS r_order_id,
    r.receipt_code,
    r.receipt_status,
    r.amount,
    r.receipt_date,
    r.mode_of_payment,
    r.remarks,
    r.creation_date,
    r.created_by,
    r.modification_date,
    r.modified_by
FROM receipt r
LEFT JOIN invoice_receipt_history ih ON (ih.receipt_id = r.receipt_id)
LEFT JOIN invoice i ON (i.invoice_id = ih.invoice_id)
LEFT JOIN orders o ON (o.order_id = i.order_id)
WHERE r.order_id =  ${db.escape(req.body.order_id)} AND i.invoice_id IS NULL AND r.receipt_status <> 'cancelled';
`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

 app.post('/getPDfProjectReceiptById', (req, res, next) => {
  db.query(`SELECT DISTINCT r.receipt_id
  ,r.receipt_id
  ,o.order_id
  ,r.receipt_code
  ,r.receipt_status
  ,r.amount
  ,r.receipt_date
  ,r.mode_of_payment
  ,r.remarks
  ,r.creation_date
  ,r.created_by
  ,i.invoice_code
  ,i.invoice_amount
  ,r.modification_date
  ,r.modified_by 
    ,o.cust_address1
  ,o.cust_address2
  ,o.cust_address_country
  ,o.cust_address_po_code
  , o.cust_company_name
  FROM receipt r  
  LEFT JOIN invoice_receipt_history ih ON (ih.receipt_id = r.receipt_id) 
   LEFT JOIN invoice i ON (i.invoice_id = ih.invoice_id) 
 LEFT JOIN orders o ON (o.order_id = i.order_id) WHERE r.receipt_id =${db.escape(req.body.receipt_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});
app.post("/getCodeValue", (req, res, next) => {
  var type = req.body.type;
  let sql = '';
  let key_text = '';
  let withprefix = true;
  if(type == 'opportunity'){
      key_text = 'nextOpportunityCode';
      sql = "SELECT * FROM setting WHERE key_text='opportunityCodePrefix' OR key_text='nextOpportunityCode'";
  }else if(type == 'receipt'){
      key_text = 'nextReceiptCode';
      sql = "SELECT * FROM setting WHERE key_text='receiptCodePrefix' OR key_text='nextReceiptCode'";
  }else if(type == 'lead'){
      key_text = 'nextLeadsCode';
      sql = "SELECT * FROM setting WHERE key_text='leadsPrefix' OR key_text='nextLeadsCode'";  
  }else if(type == 'invoicestype'){
      key_text = 'nextInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='invoiceCodePrefixes' OR key_text='nextInvoiceCode'";  
  }else if(type == 'subConworkOrder'){
      key_text = 'nextSubconCode';
    sql = "SELECT * FROM setting WHERE key_text='subconCodePrefix' OR key_text='nextSubconCode'";  
  }
  else if(type == 'project'){
      key_text = 'nextProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='projectCodePrefix' OR key_text='nextProjectCode'";  
  }else if(type == 'quote'){
      key_text = 'nextQuoteCode';
      sql = "SELECT * FROM setting WHERE key_text='quoteCodePrefix' OR key_text='nextQuoteCode'";  
  }
  else if(type == 'creditNote'){
      key_text = 'nextCreditNoteCode';
      sql = "SELECT * FROM setting WHERE key_text='creditNotePrefix' OR key_text='nextCreditNoteCode'";  
  }else if(type == 'employee'){
      withprefix = false;
      key_text = 'nextEmployeeCode';
    sql = "SELECT * FROM setting WHERE  key_text='nextEmployeeCode'";  
  }
  else if(type == 'claim'){
      withprefix = false;
      key_text = 'nextClaimCode';
      sql = "SELECT * FROM setting WHERE  key_text='nextClaimCode'";  
  }
  else if(type == 'QuoteCodeOpp'){
      withprefix = false;
      key_text = 'nextQuoteCodeOpp';
      sql = "SELECT * FROM setting WHERE  key_text='nextQuoteCodeOpp'";  
  }
  else if(type == 'wocode'){
      key_text = 'nextWOCode';
      sql = "SELECT * FROM setting WHERE key_text='wOCodePrefix' OR key_text='nextWOCode'";  
  }
  let query = db.query(sql, (err, result) => {
      let old = result
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
        var finalText = '';
        var newvalue = 0
        if(withprefix == true){
            finalText = result[1].value + result[0].value;
            newvalue = parseInt(result[0].value) + 1
        }else{
            finalText = result[0].value
            newvalue = parseInt(result[0].value) + 1
        }
        newvalue = newvalue.toString()
         let query = db.query(`UPDATE setting SET value=${db.escape(newvalue)} WHERE key_text = ${db.escape(key_text)}`, (err, result) => {
            if (err) {
              return res.status(400).send({
                data: err,
                msg: "failed",
              });
            } else {
              return res.status(200).send({
                data: finalText,
                result:old
              });
            }
        });
    }
  });
});
app.post('/getNoteById', (req, res, next) => {
  db.query(`select i.credit_note_id 
  ,i.credit_note_code  
  ,i.amount
  ,i.from_date
  ,i.order_id
   from credit_note i
   Where i.order_id = ${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
           });
     } else {
           return res.status(200).send({
             data: result,
             msg:'Success'
           });
  
     }

    }
  );
});
app.post('/getInvoiceItemByInvoiceId', (req, res, next) => {
  db.query(`select i.item_title  
  ,i.description
  ,i.unit
   ,i.qty
   ,i.unit_price
   ,i.total_cost
   ,(i.qty*unit_price) AS amount
   from invoice_item i
  WHERE i.invoice_id= ${db.escape(req.body.invoice_id)}`,
    (err, result) => {

      if (err) {
       return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

app.post('/getReceiptById', (req, res, next) => {
  db.query(`SELECT DISTINCT r.receipt_id
  ,r.receipt_id
  ,o.order_id
  ,r.receipt_code
  ,r.receipt_status
  ,r.amount
  ,r.receipt_date
  ,r.mode_of_payment
  ,r.remarks
  ,r.creation_date
  ,r.created_by
  ,r.modification_date
  ,r.modified_by 
  ,i.invoice_id
  FROM receipt r  
  LEFT JOIN invoice_receipt_history ih ON (ih.receipt_id = r.receipt_id) 
   LEFT JOIN invoice i ON (i.invoice_id = ih.invoice_id) 
 LEFT JOIN orders o ON (o.order_id = i.order_id) WHERE r.order_id =${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});

app.post('/editInvoice', (req, res, next) => {
  db.query(`UPDATE invoice 
            SET company_id=${db.escape(req.body.company_id)}
            ,currency_id=${db.escape(req.body.currency_id)}
              ,delivery_id=${db.escape(req.body.delivery_id)}
            ,sales_id=${db.escape(req.body.sales_id)}
            ,tran_no=${db.escape(req.body.tran_no)}
            ,tran_date=${db.escape(req.body.tran_date)}
            WHERE invoice_id = ${db.escape(req.body.invoice_id)}`,
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
  

app.post('/getInvoiceReceiptById', (req, res, next) => {
  db.query(`SELECT i.invoice_code 
  ,i.status
  ,i.invoice_id
  ,i.invoice_amount
  ,(SELECT SUM(invHist.amount) AS prev_sum 
  FROM invoice_receipt_history invHist 
  LEFT JOIN receipt r ON (r.receipt_id = invHist.receipt_id) 
  WHERE invHist.invoice_id = i.invoice_id AND i.status != 'Cancelled' AND r.receipt_status !='cancelled') as prev_amount 
  FROM invoice i
  LEFT JOIN orders o ON (o.order_id = i.order_id) 
  WHERE o.order_id = ${db.escape(req.body.order_id)} AND (i.status='due' OR i.status='Partial Payment')`,
    (err, result) => {

      if (err) {
       return res.status(400).send({
              data: err,
              msg:'failed'
            });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

      }

    }
  );
});




app.post('/getInvoiceItemById', (req, res, next) => {
  db.query(`SELECT item_title,
invoice_id,
description,
unit,
qty,
unit_price,
amount,
total_cost,
remarks
FROM invoice_item
WHERE invoice_id = ${db.escape(req.body.invoice_id)}`,
          (err, result) => {
       
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
 
    }
  );
});


app.post('/getInvoiceLineItemsById', (req, res, next) => {
  db.query(`select i.invoice_id
  ,i.invoice_code  
  ,i.status
  ,i.invoice_date
   ,i.invoice_amount
   ,i.gst_value
   ,i.discount
   ,i.payment_terms
   ,i.quote_code
   ,i.po_number
    ,i.project_location
    ,i.project_reference
    ,i.so_ref_no
    ,i.code
    ,i.site_code
    ,i.reference
     ,i.invoice_terms
     ,i.attention
     ,c.company_name AS company_name
     ,o.cust_address1
  ,o.cust_address2
  ,o.cust_address_country
  ,o.cust_address_po_code
  ,p.title
  ,it.item_title
  ,it.description
  ,it.amount
  ,it.foc
   from invoice i
    LEFT JOIN invoice_item it ON (it.invoice_id = i.invoice_id) 
  LEFT JOIN orders o ON o.order_id=i.order_id
  LEFT JOIN company c ON (o.company_id = c.company_id) 
  LEFT JOIN sales order p ON (p.sales_order_id = i.sales_order_id) 
 WHERE i.invoice_id= ${db.escape(req.body.invoice_id)}`,
          (err, result) => {
       
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
 
    }
  );
});

app.post('/insertQuoteItems', (req, res, next) => {
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    invoice_id: req.body.invoice_id,
    quantity: sanitize(req.body.quantity),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),
    carton_price: sanitize(req.body.carton_price),
    discount_value: sanitize(req.body.discount_value),
    wholesale_price: sanitize(req.body.wholesale_price),
    gross_total: sanitize(req.body.gross_total),
    total: sanitize(req.body.total),
     foc: sanitize(req.body.foc),
  };

  let sql = "INSERT INTO invoice_item SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).send({ error: "Database insert failed." });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'New Tender has been created successfully'
      });
    }
  });
});

app.post('/insertCreditItems', (req, res, next) => {
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    credit_note_id: req.body.credit_note_id,
    quantity: sanitize(req.body.quantity),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),
    carton_price: sanitize(req.body.carton_price),
    discount_value: sanitize(req.body.discount_value),
    wholesale_price: sanitize(req.body.wholesale_price),
    gross_total: sanitize(req.body.gross_total),
    total: sanitize(req.body.total),
     foc: sanitize(req.body.foc),
  };

  let sql = "INSERT INTO credit_note_item SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).send({ error: "Database insert failed." });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'New Tender has been created successfully'
      });
    }
  });
});


app.post('/insertDeliveryItems', (req, res, next) => {
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    delivery_order_id: req.body.delivery_order_id,
    quantity: sanitize(req.body.quantity),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),
    carton_price: sanitize(req.body.carton_price),
    discount_value: sanitize(req.body.discount_value),
    wholesale_price: sanitize(req.body.wholesale_price),
    gross_total: sanitize(req.body.gross_total),
    total: sanitize(req.body.total),
     foc: sanitize(req.body.foc),
    
    
  };

  let sql = "INSERT INTO delivery_order_item SET ?";
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).send({ error: "Database insert failed." });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'New Tender has been created successfully'
      });
    }
  });
});



  app.post('/insertQuoteItemsOld', (req, res, next) => {
    let data = {
      product_id: req.body.product_id,
      invoice_id: req.body.invoice_id,
      quantity: req.body.quantity,
      loose_qty: req.body.loose_qty,
      carton_qty: req.body.carton_qty,
      carton_price: req.body.carton_price,
      discount_value: req.body.discount_value,
      wholesale_price: req.body.wholesale_price,
      gross_total: req.body.gross_total,
      total: req.body.total,
      foc: req.body.foc,
  
    };
  
    let sql = "INSERT INTO invoice_item SET ?";
    let query = db.query(sql, data,(err, result) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'New Tender has been created successfully'
            });
      }
    });
  });
  
  
  app.post('/updateBillDiscount', (req, res) => {
  const { invoice_id, bill_discount } = req.body;

  if (!invoice_id || isNaN(bill_discount)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE invoice
    SET bill_discount = ?
    WHERE invoice_id = ?
  `;

  db.query(sql, [bill_discount, invoice_id], (err, result) => {
    if (err) {
      console.error('Error updating bill discount:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Bill discount updated successfully' });
  });
});


  app.post('/updateBillDiscountCN', (req, res) => {
  const { credit_note_id, bill_discount } = req.body;

  if (!credit_note_id || isNaN(bill_discount)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE credit_note
    SET bill_discount = ?
    WHERE credit_note_id = ?
  `;

  db.query(sql, [bill_discount, credit_note_id], (err, result) => {
    if (err) {
      console.error('Error updating bill discount:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Bill discount updated successfully' });
  });
});

  app.post('/updateBillDelDiscount', (req, res) => {
  const { delivery_order_id, bill_discount } = req.body;

  if (!delivery_order_id || isNaN(bill_discount)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE delivery_order
    SET bill_discount = ?
    WHERE delivery_order_id = ?
  `;

  db.query(sql, [bill_discount, delivery_order_id], (err, result) => {
    if (err) {
      console.error('Error updating bill discount:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Bill discount updated successfully' });
  });
});


app.post('/updateSalesOrderSummary', (req, res) => {
  const { invoice_id, sub_total, tax, net_total } = req.body;

  if (!invoice_id || isNaN(sub_total)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE invoice
    SET sub_total = ?, tax = ?, invoice_amount = ?, balance_amount = ?
    WHERE invoice_id = ?
  `;

  db.query(sql, [sub_total, tax, net_total, net_total, invoice_id], (err, result) => {
    if (err) {
      console.error('Error updating invoice summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
  });
});


app.post('/updateSalesOrderSummaryCN', (req, res) => {
  const { credit_note_id, sub_total, tax, net_total } = req.body;

  if (!credit_note_id || isNaN(sub_total)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE credit_note
    SET sub_total = ?, tax = ?, credit_note_amount = ?, balance_amount = ?
    WHERE credit_note_id = ?
  `;

  db.query(sql, [sub_total, tax, net_total, net_total, credit_note_id], (err, result) => {
    if (err) {
      console.error('Error updating invoice summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
  });
});


app.post('/updateDeliveryDate', (req, res) => {
  const { delivery_order_id,  delivery_date } = req.body;

  if (!delivery_order_id) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE delivery_order
    SET date = ?
    WHERE delivery_order_id = ?
  `;

  db.query(sql, [ delivery_date, delivery_order_id], (err, result) => {
    if (err) {
      console.error('Error updating invoice summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
  });
});





app.post('/updateDeliveryOrderSummary', (req, res) => {
  const { delivery_order_id, sub_total, tax, net_total } = req.body;

  if (!delivery_order_id || isNaN(sub_total)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE delivery_order
    SET sub_total = ?, tax = ?, delivery_amount = ?
    WHERE delivery_order_id = ?
  `;

  db.query(sql, [sub_total, tax, net_total, delivery_order_id], (err, result) => {
    if (err) {
      console.error('Error updating invoice summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
  });
});


app.post('/insertInvoice', (req, res, next) => {

  let data = {
    invoice_code: req.body.invoice_code
    ,  invoice_id: req.body.invoice_id
    , invoice_amount: req.body.invoice_amount
    , invoice_date: req.body.invoice_date
 ,delivery_id: req.body.delivery_id
  ,sales_id: req.body.sales_id
      ,bill_discount: req.body.bill_discount
    , status: 'Not Paid'
    , flag: req.body.flag
    , created_by: req.body.created_by
   
  
    , sales_order_id: req.body.sales_order_id

    , modified_by: req.body.modified_by
    
   
    ,  creation_date: new Date().toISOString()
    , modification_date: null
    , company_id: req.body.company_id
    , currency_id	: req.body.currency_id
  
 };
  let sql = "INSERT INTO invoice SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
           data: err,
           msg:'Failed'
         });
   } else {
         return res.status(200).send({
           data: result,
           msg:'Success'
         });

   }
  });
});

app.post('/deleteInvoice', (req, res, next) => {
  let ids = req.body.invoice_id.split(","); // ["33","32"]

  let sql = "DELETE FROM invoice WHERE invoice_id IN (?)";
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({ data: err, msg: 'failed' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});


app.post('/deleteCreditNote', (req, res, next) => {
  let ids = req.body.credit_note_id.split(","); // ["33","32"]

  let sql = "DELETE FROM credit_note WHERE credit_note_id IN (?)";
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({ data: err, msg: 'failed' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});


app.delete('/deleteInvoice', (req, res, next) => {

  let data = {invoice_code: req.body.invoice_code};
  let sql = "DELETE FROM invoice WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
     return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});


app.post('/insertBranch', (req, res, next) => {
  let data = {
    title: req.body.title
    , currency: req.body.currency
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
 };
  let sql = "INSERT INTO branch SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});

app.delete('/deleteBranch', (req, res, next) => {

  let data = {title: req.body.title};
  let sql = "DELETE FROM branch WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});

app.post('/insertInvoiceItem', (req, res, next) => {

  let data = {
    qty: req.body.qty
    ,invoice_id: req.body.invoice_id
     , unit_price: req.body.unit_price
 , item_title: req.body.item_title
 , model: req.body.model
 , module: req.body.module
 , cost_price: req.body.cost_price
 , item_code: req.body.item_code
 , vat: req.body.vat
 , discount_percentage: req.body.discount_percentage
 , discount_type: req.body.discount_type
 , amount: req.body.amount
 , s_no: req.body.s_no
 , site_id: req.body.site_id
 , item_code_backup: req.body.item_code_backup
 , unit: req.body.unit
 , description: req.body.description
 , remarks: req.body.remarks
 , modification_date: req.body.modification_date
 , modified_by: req.body.modified_by
 , month: req.body.month
 , year: req.body.year
 , total_cost: req.body.total_cost
 };
  let sql = "INSERT INTO invoice_item SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});



app.post('/insertCompanyAddress', (req, res, next) => {

  let data = {
    address_street: req.body.address_street
    , address_town: req.body.address_town
    , address_state: req.body.address_state
    , address_country: req.body.address_country
    , address_po_code: req.body.address_po_code
    , phone: req.body.phone
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , address_flat: req.body.address_flat
    , company_id: req.body.company_id
 };
  let sql = "INSERT INTO company_address SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
}); 

app.delete('/deleteCompanyAddress', (req, res, next) => {

  let data = {company_id: req.body.company_id};
  let sql = "DELETE FROM company_address WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
     return res.status(400).send({
              data: err,
              msg:'failed'
            });
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});

app.post('/getNoteById', (req, res, next) => {
  db.query(`select i.credit_note_id 
  ,i.credit_note_code  
  ,i.amount
  ,i.from_date
  ,i.order_id
   from credit_note i
   Where i.order_id = ${db.escape(req.body.order_id)}`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
           });
     } else {
           return res.status(200).send({
             data: result[0],
             msg:'Success'
           });
  
     }

    }
  );
});
app.post('/getInvoicePdf', (req, res, next) => {
  db.query(`SELECT ini.item_title
  ,ini.amount
  ,ini.qty
  ,ini.description
  ,ini.unit
                ,c.company_name
                ,o.cust_address1
                ,o.cust_address2
                ,o.cust_address_po_code
                ,o.cust_email
                ,o.cust_phone
                ,o.cust_fax
                ,gc.name AS cust_address_country
                ,c.company_id
                ,i.invoice_date
                ,ini.unit_price
                ,i.invoice_code
                ,i.invoice_type
                ,i.qty_text
                ,i.rate_text
                ,i.invoice_terms
                ,i.invoice_due_date
                ,i.notes
                ,i.gst_percentage
                ,i.discount
                ,i.project_location
                ,i.project_reference
                ,i.title AS invoice_title
                ,i.payment_terms
                ,i.po_number
                ,co.first_name
                ,co.salutation
        FROM invoice_item ini
        LEFT JOIN invoice i  ON (i.invoice_id  = ini.invoice_id)
        LEFT JOIN orders o  ON (o.order_id	= i.order_id)
        LEFT JOIN company c  ON (c.company_id  = o.company_id)
        LEFT JOIN contact co ON (co.contact_id = o.contact_id)
        LEFT JOIN geo_country gc ON (o.cust_address_country = gc.country_code)
        WHERE i.invoice_id = ${db.escape(req.body.invoice_id)}
        ORDER BY ini.invoice_item_id`,
    (err, result) => {

      if (err) {
        return res.status(400).send({
             data: err,
             msg:'Failed'
           });
     } else {
           return res.status(200).send({
             data: result[0],
             msg:'Success'
           });
  
     }

    }
  );
});

app.get('/getInvoiveByMonth', (req, res, next) => {
  db.query(`SELECT DATE_FORMAT(i.invoice_date, '%b %Y') AS invoice_month
  ,(SUM(i.invoice_amount + 
        ((i.invoice_amount * i.gst_percentage) / 100)
                    )
                ) AS invoice_amount_monthly
        FROM invoice i
        LEFT JOIN orders o   ON (o.order_id   = i.order_id)
         WHERE o.record_type = 'Project'
 AND i.status != 'Cancelled'
 AND i.invoice_date BETWEEN '2021-03-1' AND '2023-03-31'
 GROUP BY DATE_FORMAT(i.invoice_date, '%Y-%m')
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


app.get('/getInvoiveBestMonthSummary', (req, res, next) => {
  db.query(`SELECT DATE_FORMAT(i.creation_date, '%Y-%m') AS monthYear
                  ,COUNT(i.invoice_id) AS total
                  ,SUM(i.invoice_amount) AS totalAmount 
            FROM invoice i
            WHERE DATE_FORMAT(i.creation_date, '%Y-%m-%d') > Date_add(Now(), interval - 12 month)
              AND DATE_FORMAT(i.creation_date, '%Y-%m-%d') < Date_add(Now(), interval - 1 month)
            GROUP BY DATE_FORMAT(i.creation_date, '%m-%Y')
            ORDER BY total DESC, DATE_FORMAT(i.creation_date, '%m-%Y') DESC
            LIMIT 1`,
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

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;