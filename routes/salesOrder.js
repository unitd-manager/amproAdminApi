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
app.get('/getSalesOrder', (req, res, next) => {
  db.query(`Select s.*,
  c.company_name,
  cu.currency_name
  From sales_order s
   LEFT JOIN company c ON (c.company_id = s.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.sales_order_id !=''`,
  (err, result) => {
    if (err) {
      console.log('error: ', err);
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


app.post('/getSalesorderById', (req, res, next) => {
  db.query(` Select 
  s.*,
    c.company_name,
    c.customer_code,
    c.address_street,
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
    
    c.notes,
    cu.currency_id,
    cu.currency_code,
    cu.currency_name,
    cu.currency_rate,
    co.first_name AS contact_person 
  From sales_order s
   LEFT JOIN company c ON (c.company_id = s.company_id)
      LEFT JOIN company cd ON (cd.company_id = s.delivery_id)

       LEFT JOIN contact co ON (co.company_id = c.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.sales_order_id=${db.escape(req.body.sales_order_id)}`,
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

app.post('/getsalesorder', (req, res, next) => {
  let conditions = [];
  let params = [];
  
  if (req.body.tran_no) {
    conditions.push("s.tran_no LIKE ?");
    params.push(`%${req.body.tran_no}%`);
  }
  if (req.body.from_date) {
    conditions.push("s.tran_date >= ?");
    params.push(req.body.from_date);
  }
  if (req.body.to_date) {
    conditions.push("s.tran_date <= ?");
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
    FROM sales_order s
    LEFT JOIN company c ON c.company_id = s.company_id
    LEFT JOIN company cd ON cd.company_id = s.delivery_id
    LEFT JOIN contact co ON co.company_id = c.company_id
    LEFT JOIN currency cu ON cu.currency_id = s.currency_id
    ${whereClause}`,
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

app.post('/editSalesOrder', (req, res, next) => {
  db.query(`UPDATE sales_order 
            SET company_id=${db.escape(req.body.company_id)}
            ,currency_id=${db.escape(req.body.currency_id)}
              ,delivery_id=${db.escape(req.body.delivery_id)}
            ,sales_id=${db.escape(req.body.sales_id)}
            ,tran_no=${db.escape(req.body.tran_no)}
            ,tran_date=${db.escape(req.body.tran_date)}
            WHERE sales_order_id = ${db.escape(req.body.sales_order_id)}`,
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
  
app.post('/insertSalesOrder', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , company_id: req.body.company_id
    , currency_id	: req.body.currency_id
    , tran_no: req.body.tran_no
    , status: req.body.status
    , tran_date: req.body.tran_date
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO sales_order SET ?";
  let query = db.query(sql, data, (err, result) => {
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
})
}
  }
);
});


//  app.post('/getQuoteLineItemsById', (req, res, next) => {
//     db.query(`SELECT
//               qt.* 
             
//               FROM sales_order_item qt 
//               WHERE qt.sales_order_id =  ${db.escape(req.body.sales_order_id)}`,
//             (err, result) => {
         
//         if (err) {
//           return res.status(400).send({
//             msg: 'No result found'
//           });
//         } else {
//               return res.status(200).send({
//                 data: result,
//                 msg:'Success'
//               });
//         }
   
//       }
//     );
//   });
  
  app.get('/getUnitFromValueList', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='UoM'`,
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


app.post('/deleteProjectQuote', (req, res, next) => {

  let data = { sales_order_item_id: req.body. sales_order_item_id};
  let sql = "DELETE FROM  sales_order_item WHERE ?";
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


app.post("/generateInvoiceFromSalesOrder", async (req, res, next) => {
  const { sales_order_id, company_id, invoice_code, sub_total,tax, net_total, tran_date } = req.body;

  if (!sales_order_id  || !invoice_code) {
    return res.status(400).send({
      msg: "sales_order_id, company_id, and invoice_code are required",
    });
  }

  try {
    // Fetch sales order items by sales_order_id
    const getSalesOrderItemsSql = `
      SELECT * FROM sales_order_item WHERE sales_order_id = ?`;
    const salesOrderItems = await new Promise((resolve, reject) => {
      db.query(getSalesOrderItemsSql, [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (salesOrderItems.length === 0) {
      return res.status(404).send({
        msg: "No items found for the provided sales_order_id",
      });
    }

    // Calculate the total amount for the invoice
   // const invoiceAmount = salesOrderItems.reduce((total, item) => total + item.amount, 0);

    const invoiceData = {
      sales_order_id,
      invoice_code,
      company_id,
      creation_date: new Date(),
      status: "Not Paid",
      sub_total,
      tax,
      invoice_amount: net_total, // Add the calculated total amount
       balance_amount: net_total,
      invoice_date: tran_date,
    };

    // Insert invoice into the invoice table
    const createInvoiceSql = "INSERT INTO invoice SET ?";
    const invoiceResult = await new Promise((resolve, reject) => {
      db.query(createInvoiceSql, invoiceData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const invoice_id = invoiceResult.insertId;

    // Insert each sales order item into the invoice_item table
    const insertInvoiceItemsSql = `
      INSERT INTO invoice_item (
        quantity, invoice_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
      ) VALUES ?`;

    const invoiceItemsData = salesOrderItems.map((item) => [
      item.quantity,
      invoice_id,
      item.carton_qty,
      item.loose_qty,
      item.carton_price,
      item.wholesale_price,
      item.product_id,
      item.total,
      item.gross_total,
      item.foc,
    ]);

    await new Promise((resolve, reject) => {
      db.query(insertInvoiceItemsSql, [invoiceItemsData], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // Update sales order status to 'Closed'
    const updateSalesOrderStatusSql = `
      UPDATE sales_order
      SET status = 'Closed'
      WHERE sales_order_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "Invoice and items created successfully. Sales order status updated to 'Closed'.",
      invoice_id,
    });
  } catch (err) {
    console.error("Error generating invoice:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


app.post("/generateDeliveryFromSalesOrder", async (req, res, next) => {
  const { sales_order_id, company_id, delivery_code } = req.body;

  if (!sales_order_id  || !delivery_code) {
    return res.status(400).send({
      msg: "sales_order_id, company_id, and delivery_code are required",
    });
  }

  try {
    // Fetch sales order items by sales_order_id
    const getSalesOrderItemsSql = `
      SELECT * FROM sales_order_item WHERE sales_order_id = ?`;
    const salesOrderItems = await new Promise((resolve, reject) => {
      db.query(getSalesOrderItemsSql, [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (salesOrderItems.length === 0) {
      return res.status(404).send({
        msg: "No items found for the provided sales_order_id",
      });
    }

    // Calculate the total amount for the invoice
    const invoiceAmount = salesOrderItems.reduce((total, item) => total + item.amount, 0);

    const invoiceData = {
      sales_order_id,
      delivery_code,
      company_id,
      creation_date: new Date(),
      delivery_status: "Pending",
      delivery_amount: invoiceAmount, // Add the calculated total amount
    };

    // Insert invoice into the invoice table
    const createInvoiceSql = "INSERT INTO delivery_order SET ?";
    const invoiceResult = await new Promise((resolve, reject) => {
      db.query(createInvoiceSql, invoiceData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const delivery_order_id = invoiceResult.insertId;

    // Insert each sales order item into the invoice_item table
    const insertInvoiceItemsSql = `
      INSERT INTO delivery_order_item (
        qty, delivery_order_id, unit_price, item_title, amount, unit, description, remarks
      ) VALUES ?`;

    const invoiceItemsData = salesOrderItems.map((item) => [
      item.quantity,
      delivery_order_id,
      item.unit_price,
      item.title,
      item.amount,
      item.unit,
      item.description,
      item.remarks,
    ]);

    await new Promise((resolve, reject) => {
      db.query(insertInvoiceItemsSql, [invoiceItemsData], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // Update sales order status to 'Closed'
    const updateSalesOrderStatusSql = `
      UPDATE sales_order
      SET status = 'Closed'
      WHERE sales_order_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "Invoice and items created successfully. Sales order status updated to 'Closed'.",
      delivery_order_id,
    });
  } catch (err) {
    console.error("Error generating invoice:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});

  
 app.post('/edit-TabQuoteLine', (req, res, next) => {
   
    db.query(
      `UPDATE  sales_order_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,discount_value=${db.escape(req.body.discount_value)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,gross_total=${db.escape(req.body.gross_total)}
            ,total=${db.escape(req.body.total)}
      
            WHERE sales_order_item_id =  ${db.escape(req.body.sales_order_item_id)}`,
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
   app.post('/getQuoteLineItemsById', (req, res, next) => {
  const salesOrderId = db.escape(req.body.sales_order_id);

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
      c.carton_qty AS Cqty,
      (
        SELECT SUM(qt2.quantity)
        FROM sales_order_item qt2
        INNER JOIN sales_order so2 ON so2.sales_order_id = qt2.sales_order_id
        WHERE qt2.product_id = qt.product_id 
          AND so2.status = 'Open' 
          AND qt2.sales_order_id != ${salesOrderId}
      ) AS back_order_qty
    FROM sales_order_item qt 
    LEFT JOIN product c ON c.product_id = qt.product_id
    WHERE qt.sales_order_id = ${salesOrderId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'No result found' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});


app.post('/getBackOrderQtyByProductId', (req, res) => {
  const productId = db.escape(req.body.product_id);

  if (!productId) {
    return res.status(400).json({ success: false, message: 'Product ID is required' });
  }

  const query = `
    SELECT SUM(soi.quantity) as back_order_qty
    FROM sales_order_item soi
    JOIN sales_order so ON soi.sales_order_id = so.sales_order_id
    WHERE soi.product_id = ${productId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    const rawQty = result[0]?.back_order_qty;
    const backOrderQty = rawQty !== null && rawQty !== undefined ? parseFloat(rawQty) : 0;

    return res.status(200).json({
      success: true,
      data: {
        product_id: parseInt(req.body.product_id),
        back_order_qty: backOrderQty
      }
    });
  });
});

app.post('/updateBillDiscount', (req, res) => {
  const { sales_order_id, bill_discount } = req.body;

  if (!sales_order_id || isNaN(bill_discount)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE sales_order
    SET bill_discount = ?
    WHERE sales_order_id = ?
  `;

  db.query(sql, [bill_discount, sales_order_id], (err, result) => {
    if (err) {
      console.error('Error updating bill discount:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Bill discount updated successfully' });
  });
});


app.post('/updateSalesOrderSummary',  (req, res) => {
  const { sales_order_id, sub_total, tax, net_total } = req.body;

  if (!sales_order_id || isNaN(sub_total)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE sales_order
   SET sub_total = ?, tax = ?, net_total = ?
    WHERE sales_order_id = ?
  `;

  db.query(sql, [sub_total, tax, net_total,sales_order_id], (err, result) => {
    if (err) {
    console.error('Error updating sales order summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
  });
});


  app.post('/insertQuoteItems', (req, res, next) => {
    let data = {
      product_id: req.body.product_id,
      sales_order_id: req.body.sales_order_id,
      quantity: req.body.quantity,
      loose_qty: req.body.loose_qty,
      carton_qty: req.body.carton_qty,
      carton_price: req.body.carton_price,
      discount_value: req.body.discount_value,
      wholesale_price: req.body.wholesale_price,
      gross_total: req.body.gross_total,
      total: req.body.total,
  
    };
  
    let sql = "INSERT INTO sales_order_item SET ?";
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
  

app.post('/deleteSslesOrder', (req, res, next) => {

  let data = {sales_order_id: req.body.sales_order_id};
  let sql = "DELETE FROM sales_order WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;