const express = require('express');
const axios = require('axios');
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
app.post('/getSalesOrderDashboard', (req, res, next) => {
  db.query(`Select s.*,
  c.company_name,
  cu.currency_name
  From sales_order s
   LEFT JOIN company c ON (c.company_id = s.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.tran_date=${db.escape(req.body.tran_date)}`,
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


app.get("/getLast12WeeksSales", (req, res) => {
  const query = `
    SELECT 
      WEEK(tran_date, 1) AS week, 
      YEAR(tran_date) AS year,
      SUM(GREATEST(net_total, 0)) AS sales   -- ✅ Prevent negative values
    FROM sales_order
    WHERE tran_date >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
    GROUP BY year, week
    ORDER BY year, week;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching weekly sales:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    // ✅ Corrected syntax for template literal
    const formatted = result.map(row => ({
      week: `W${row.week}`,  // e.g. W36
      sales: row.sales
    }));

    res.json({ data: formatted });
  });
});



app.post('/getDeliveryorderById', (req, res, next) => {
  db.query(` Select 
  s.*,
    c.company_name,
    c.customer_code,
    c.address_street,
        c.address_street1,
    c.address1,
    c.address2,
    c.address_town,
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


app.post('/getDeliveryVerificationById', (req, res, next) => {
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
    
    c.notes,
    cu.currency_id,
    cu.currency_code,
    cu.currency_name,
    cu.currency_rate,
    co.first_name AS contact_person 
  From delivery_verification s
   LEFT JOIN company c ON (c.company_id = s.company_id)
      LEFT JOIN company cd ON (cd.company_id = s.delivery_id)

       LEFT JOIN contact co ON (co.company_id = c.company_id)
  LEFT JOIN currency cu ON (cu.currency_id = s.currency_id)
  Where s.delivery_verification_id=${db.escape(req.body.delivery_verification_id)}`,
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
    ${whereClause} ORDER BY s.sales_order_id DESC`,
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

app.post("/generateSalesReturnFromCreditNote", async (req, res, next) => {
  const { sales_return_id, company_id, credit_note_code, sub_total,tax, net_total, tran_date,credit_note_type,} = req.body;

  if (!sales_return_id  || !credit_note_code) {
    return res.status(400).send({
      msg: "sales_return_id, company_id, and credit_note_code are required",
    });
  }

  try {
    // Fetch sales order items by sales_return_id
    const getSalesOrderItemsSql = `
      SELECT * FROM sales_return_item WHERE sales_return_id = ?`;
    const salesOrderItems = await new Promise((resolve, reject) => {
      db.query(getSalesOrderItemsSql, [sales_return_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (salesOrderItems.length === 0) {
      return res.status(404).send({
        msg: "No items found for the provided sales_return_id",
      });
    }

    // Calculate the total amount for the invoice
   // const invoiceAmount = salesOrderItems.reduce((total, item) => total + item.amount, 0);

    const invoiceData = {
      sales_return_id,
      credit_note_code,
      company_id,
      creation_date: new Date(),
      status: "Not Paid",
      sub_total,
      tax,
      credit_note_amount: net_total, // Add the calculated total amount
       balance_amount: net_total,
      credit_note_date: tran_date,
      credit_note_type,
    };

    // Insert invoice into the invoice table
    const createInvoiceSql = "INSERT INTO credit_note SET ?";
    const invoiceResult = await new Promise((resolve, reject) => {
      db.query(createInvoiceSql, invoiceData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const credit_note_id = invoiceResult.insertId;

    // Insert each sales order item into the invoice_item table
    const insertInvoiceItemsSql = `
      INSERT INTO credit_note_item (
        quantity, credit_note_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
      ) VALUES ?`;

    const invoiceItemsData = salesOrderItems.map((item) => [
      item.quantity,
      credit_note_id,
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
      UPDATE sales_return
      SET status = 'Closed'
      WHERE sales_return_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [sales_return_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "sales return and items created successfully. Sales order status updated to 'Closed'.",
      credit_note_id,
    });
  } catch (err) {
    console.error("Error generating invoice:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


app.post('/getcreditnote', (req, res, next) => {
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


app.post('/getDeliveryOrders', (req, res, next) => {
  let conditions = [];
  let params = [];
  
  if (req.body.delivery_code) {
    conditions.push("s.delivery_code LIKE ?");
    params.push(`%${req.body.delivery_code}%`);
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
  if (req.body.delivery_status) {
    conditions.push("s.delivery_status = ?");
    params.push(req.body.delivery_status);
  }
  
  let whereClause = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  
  db.query(`
    SELECT 
      s.*, c.company_name, cu.currency_code, co.first_name AS contact_person
    FROM delivery_order s
    LEFT JOIN company c ON c.company_id = s.company_id
    LEFT JOIN company cd ON cd.company_id = s.delivery_id
    LEFT JOIN contact co ON co.company_id = c.company_id
    LEFT JOIN currency cu ON cu.currency_id = s.currency_id
    ${whereClause} ORDER BY s.delivery_order_id DESC`,
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
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
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
        
        
        
        app.post('/editDeliveryVerification', (req, res, next) => {
  db.query(`UPDATE delivery_verification 
            SET company_id=${db.escape(req.body.company_id)}
            ,currency_id=${db.escape(req.body.currency_id)}
              ,delivery_id=${db.escape(req.body.delivery_id)}
            ,sales_id=${db.escape(req.body.sales_id)}
            ,delivery_verification_code=${db.escape(req.body.delivery_verification_code)}
            ,delivery_verification_date=${db.escape(req.body.delivery_verification_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE delivery_verification_id = ${db.escape(req.body.delivery_verification_id)}`,
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
        
        
        
        app.post('/UpdateSalesOrderStatus', (req, res, next) => {
  db.query(`UPDATE sales_order 
            SET status='Approved'
            
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
        
        
   app.post('/insertCreditNote', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , company_id: req.body.company_id
    , currency_id	: req.body.currency_id
    , credit_note_code: req.body.credit_note_code
    , status: req.body.status
    , credit_note_date: req.body.credit_note_date
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO credit_note SET ?";
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



app.post('/insertDeliveryVerify', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , company_id: req.body.company_id
    , currency_id	: req.body.currency_id
    , delivery_verification_code: req.body.delivery_verification_code
    , status: req.body.status
    , delivery_verification_date: req.body.delivery_verification_date
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO delivery_verification SET ?";
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

     
app.post('/insertSalesOrder', (req, res, next) => {
  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , company_id: req.body.company_id
    , currency_id: req.body.currency_id
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
        data: {
          insertId: result.insertId  // Make sure insertId is nested inside data
        },
        msg: 'Success',
      });
    }
  });
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

app.post('/deleteDeliveryVerification', (req, res, next) => {

  let data = { delivery_verification_item_id: req.body.delivery_verification_item_id};
  let sql = "DELETE FROM  delivery_verification_item WHERE ?";
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

app.post("/repeatSalesReturn", async (req, res) => {
  const { sales_return_id, delivery_code } = req.body;
  if (!sales_return_id || !delivery_code) {
    return res.status(400).send({ msg: "sales_return_id and delivery_code are required" });
  }

  try {
    // 1. Fetch the original sales order
    const [originalOrder] = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM sales_return WHERE sales_return_id = ?", [sales_return_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!originalOrder) {
      return res.status(404).send({ msg: "Original sales order not found" });
    }

    // 2. Fetch the original sales order items
    const originalItems = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM sales_return_item WHERE sales_return_id = ?", [sales_return_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // 3. Use the delivery_code from the frontend as the new tran_no (or use a separate field if you have one)
    const newOrderData = {
      ...originalOrder,
      sales_return_id: undefined, // Let DB auto-increment
      sales_return_code: delivery_code,    // Use delivery_code as the new tran_no
      status: "Open",
      creation_date: new Date(),
      // Set other fields as needed (e.g., reset printed, etc.)
    };

    const insertOrderSql = "INSERT INTO sales_return SET ?";
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
        INSERT INTO sales_return_item (
          quantity, sales_return_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
        ) VALUES ?`;
      await new Promise((resolve, reject) => {
        db.query(insertItemsSql, [newItemsData], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

    return res.status(201).send({
      msg: "Sales order repeated successfully.",
      new_sales_return_id: newSalesOrderId,
      new_tran_no: delivery_code,
    });
  } catch (err) {
    console.error("Error repeating sales order:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});

app.post("/repeatSalesOrder", async (req, res) => {
  const { sales_order_id, delivery_code } = req.body;
  if (!sales_order_id || !delivery_code) {
    return res.status(400).send({ msg: "sales_order_id and delivery_code are required" });
  }

  try {
    // 1. Fetch the original sales order
    const [originalOrder] = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM sales_order WHERE sales_order_id = ?", [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!originalOrder) {
      return res.status(404).send({ msg: "Original sales order not found" });
    }

    // 2. Fetch the original sales order items
    const originalItems = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM sales_order_item WHERE sales_order_id = ?", [sales_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // 3. Use the delivery_code from the frontend as the new tran_no (or use a separate field if you have one)
    const newOrderData = {
      ...originalOrder,
      sales_order_id: undefined, // Let DB auto-increment
      tran_no: delivery_code,    // Use delivery_code as the new tran_no
      status: "Open",
      creation_date: new Date(),
      // Set other fields as needed (e.g., reset printed, etc.)
    };

    const insertOrderSql = "INSERT INTO sales_order SET ?";
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
        INSERT INTO sales_order_item (
          quantity, sales_order_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
        ) VALUES ?`;
      await new Promise((resolve, reject) => {
        db.query(insertItemsSql, [newItemsData], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

    return res.status(201).send({
      msg: "Sales order repeated successfully.",
      new_sales_order_id: newSalesOrderId,
      new_tran_no: delivery_code,
    });
  } catch (err) {
    console.error("Error repeating sales order:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


// app.post("/repeatSalesOrder", async (req, res) => {
//   const { sales_order_id } = req.body;
//   if (!sales_order_id) {
//     return res.status(400).send({ msg: "sales_order_id is required" });
//   }

//   try {
//     // 1. Fetch the original sales order
//     const [originalOrder] = await new Promise((resolve, reject) => {
//       db.query("SELECT * FROM sales_order WHERE sales_order_id = ?", [sales_order_id], (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       });
//     });

//     if (!originalOrder) {
//       return res.status(404).send({ msg: "Original sales order not found" });
//     }

//     // 2. Fetch the original sales order items
//     const originalItems = await new Promise((resolve, reject) => {
//       db.query("SELECT * FROM sales_order_item WHERE sales_order_id = ?", [sales_order_id], (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       });
//     });

//     // 3. Generate a new sales order code/number (implement your own logic here)
//     const newTranNo = `SO${Date.now()}`; // Example: use timestamp

//     // 4. Insert the new sales order
//     const newOrderData = {
//       ...originalOrder,
//       sales_order_id: undefined, // Let DB auto-increment
//       tran_no: newTranNo,
//       status: "Open",
//       creation_date: new Date(),
//       // Set other fields as needed (e.g., reset printed, etc.)
//     };

//     const insertOrderSql = "INSERT INTO sales_order SET ?";
//     const insertResult = await new Promise((resolve, reject) => {
//       db.query(insertOrderSql, newOrderData, (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       });
//     });
//     const newSalesOrderId = insertResult.insertId;

//     // 5. Insert duplicated items for the new sales order
//     if (originalItems.length > 0) {
//       const newItemsData = originalItems.map(item => [
//         item.quantity,
//         newSalesOrderId,
//         item.carton_qty,
//         item.loose_qty,
//         item.carton_price,
//         item.wholesale_price,
//         item.product_id,
//         item.total,
//         item.gross_total,
//         item.foc,
//       ]);
//       const insertItemsSql = `
//         INSERT INTO sales_order_item (
//           quantity, sales_order_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
//         ) VALUES ?`;
//       await new Promise((resolve, reject) => {
//         db.query(insertItemsSql, [newItemsData], (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         });
//       });
//     }

//     return res.status(201).send({
//       msg: "Sales order repeated successfully.",
//       new_sales_order_id: newSalesOrderId,
//     });
//   } catch (err) {
//     console.error("Error repeating sales order:", err.message);
//     return res.status(500).send({
//       msg: "Internal Server Error",
//       error: err.message,
//     });
//   }
// });
app.post("/generateDeliveryVerificationFromDeliveryOrder", async (req, res, next) => {
  const { delivery_verification_id, company_id, delivery_code, sub_total, tax, net_total, tran_date, delivery_type } = req.body;

  if (!delivery_verification_id || !delivery_code) {
    return res.status(400).send({
      msg: "delivery_verification_id, company_id, and delivery_code are required",
    });
  }

  try {
    // Fetch sales order items by delivery_verification_id
    const getSalesOrderItemsSql = `
      SELECT * FROM delivery_verification_item WHERE delivery_verification_id = ?`;
    const salesOrderItems = await new Promise((resolve, reject) => {
      db.query(getSalesOrderItemsSql, [delivery_verification_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (salesOrderItems.length === 0) {
      return res.status(404).send({
        msg: "No items found for the provided delivery_verification_id",
      });
    }

    // Prepare delivery order data
    const deliveryOrderData = {
      delivery_verification_id,
      delivery_code,
      company_id,
      creation_date: new Date(),
      delivery_status: "Closed",
      sub_total,
      tax,
      delivery_amount: net_total,
      date: tran_date,
      delivery_type,
    };

    // Insert delivery order into the delivery_order table
    const createDeliveryOrderSql = "INSERT INTO delivery_order SET ?";
    const deliveryOrderResult = await new Promise((resolve, reject) => {
      db.query(createDeliveryOrderSql, deliveryOrderData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const delivery_order_id = deliveryOrderResult.insertId;

    // Insert each sales order item into the delivery_order_item table
    const insertDeliveryOrderItemsSql = `
      INSERT INTO delivery_order_item (
        quantity, delivery_order_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
      ) VALUES ?`;

    const deliveryOrderItemsData = salesOrderItems.map((item) => [
      item.quantity,
      delivery_order_id,
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
      db.query(insertDeliveryOrderItemsSql, [deliveryOrderItemsData], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // Update sales order status to 'Closed'
    const updateSalesOrderStatusSql = `
      UPDATE delivery_verification
      SET status = 'Delivered'
      WHERE delivery_verification_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [delivery_verification_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "Delivery order and items created successfully. Sales order status updated to 'Closed'.",
      delivery_order_id,
    });
  } catch (err) {
    console.error("Error generating delivery order:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


app.post("/generateDeliveryFromDeliveryOrder", async (req, res, next) => {
  const { sales_order_id, company_id, delivery_code, sub_total, tax, net_total, tran_date, delivery_type } = req.body;

  if (!sales_order_id || !delivery_code) {
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

    // Prepare delivery order data
    const deliveryOrderData = {
      sales_order_id,
      delivery_code,
      company_id,
      creation_date: new Date(),
      delivery_status: "Open",
      sub_total,
      tax,
      delivery_amount: net_total,
      tran_date: tran_date,
      delivery_type,
    };

    // Insert delivery order into the delivery_order table
    const createDeliveryOrderSql = "INSERT INTO delivery_order SET ?";
    const deliveryOrderResult = await new Promise((resolve, reject) => {
      db.query(createDeliveryOrderSql, deliveryOrderData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const delivery_order_id = deliveryOrderResult.insertId;

    // Insert each sales order item into the delivery_order_item table
    const insertDeliveryOrderItemsSql = `
      INSERT INTO delivery_order_item (
        quantity, delivery_order_id, carton_qty, loose_qty, carton_price, wholesale_price, product_id, total, gross_total, foc
      ) VALUES ?`;

    const deliveryOrderItemsData = salesOrderItems.map((item) => [
      item.quantity,
      delivery_order_id,
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
      db.query(insertDeliveryOrderItemsSql, [deliveryOrderItemsData], (err, result) => {
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
      msg: "Delivery order and items created successfully. Sales order status updated to 'Closed'.",
      delivery_order_id,
    });
  } catch (err) {
    console.error("Error generating delivery order:", err.message);
    return res.status(500).send({
      msg: "Internal Server Error",
      error: err.message,
    });
  }
});


app.post("/generateInvoiceFromSalesOrder", async (req, res, next) => {
  const { sales_order_id, company_id, invoice_code, sub_total,tax, net_total, tran_date,invoice_type,} = req.body;

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
      invoice_date: new Date(),
      invoice_type,
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


app.post("/generateInvoiceFromDeliveryOrder", async (req, res, next) => {
  const { delivery_order_id, company_id, invoice_code, sub_total,tax, net_total, tran_date,invoice_type} = req.body;

  if (!delivery_order_id  || !invoice_code) {
    return res.status(400).send({
      msg: "delivery_order_id, company_id, and invoice_code are required",
    });
  }

  try {
    // Fetch sales order items by sales_order_id
    const getSalesOrderItemsSql = `
      SELECT * FROM delivery_order_item WHERE delivery_order_id = ?`;
    const salesOrderItems = await new Promise((resolve, reject) => {
      db.query(getSalesOrderItemsSql, [delivery_order_id], (err, result) => {
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
      delivery_order_id,
      invoice_code,
      company_id,
      creation_date: new Date(),
      status: "Not Paid",
      sub_total,
      tax,
      invoice_amount: net_total, // Add the calculated total amount
       balance_amount: net_total,
      invoice_date: tran_date,
      invoice_type,
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
      UPDATE  delivery_order
      SET delivery_status = 'Closed'
      WHERE  delivery_order_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(updateSalesOrderStatusSql, [ delivery_order_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    return res.status(201).send({
      msg: "Invoice and items created successfully. Delivery order status updated to 'Closed'.",
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
  
 app.post('/edit-TabQuoteLine', (req, res, next) => {
   
    db.query(
      `UPDATE  sales_order_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,foc=${db.escape(req.body.foc)}
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
        
        
        app.post('/edit-TabVerificationLine', (req, res, next) => {
   
    db.query(
      `UPDATE delivery_verification_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,foc=${db.escape(req.body.foc)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,discount_value=${db.escape(req.body.discount_value)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,gross_total=${db.escape(req.body.gross_total)}
            ,total=${db.escape(req.body.total)}
      
            WHERE delivery_verification_item_id =  ${db.escape(req.body.delivery_verification_item_id)}`,
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


  app.post('/getVerifyLineItemsById', (req, res, next) => {
  const salesOrderId = db.escape(req.body.delivery_verification_id);

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
    
    FROM delivery_verification_item qt 
    LEFT JOIN product c ON c.product_id = qt.product_id
    WHERE qt.delivery_verification_id = ${salesOrderId}
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


app.post('/updateBillDiscountDV', (req, res) => {
  const { delivery_verification_id, bill_discount } = req.body;

  if (!delivery_verification_id || isNaN(bill_discount)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE delivery_verification
    SET bill_discount = ?
    WHERE delivery_verification_id = ?
  `;

  db.query(sql, [bill_discount, delivery_verification_id], (err, result) => {
    if (err) {
      console.error('Error updating DV bill discount:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Bill discount updated successfully' });
  });
});


app.post('/updateSalesOrderSummaryDV',  (req, res) => {
  const { delivery_verification_id, sub_total, tax, net_total } = req.body;

  if (!delivery_verification_id || isNaN(sub_total)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const sql = `
    UPDATE delivery_verification
   SET sub_total = ?, tax = ?, net_total = ?
    WHERE delivery_verification_id = ?
  `;

  db.query(sql, [sub_total, tax, net_total,delivery_verification_id], (err, result) => {
    if (err) {
    console.error('Error updating Delivery Verification summary:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Total updated successfully' });
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
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    sales_order_id: req.body.sales_order_id,
    quantity: sanitize(req.body.quantity),
    foc: sanitize(req.body.foc),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),
    carton_price: sanitize(req.body.carton_price),
    discount_value: sanitize(req.body.discount_value),
    wholesale_price: sanitize(req.body.wholesale_price),
    gross_total: sanitize(req.body.gross_total),
    total: sanitize(req.body.total),
  };

  let sql = "INSERT INTO sales_order_item SET ?";
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


app.post('/insertVerificationItems', (req, res, next) => {
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    delivery_verification_id: req.body.delivery_verification_id,
    quantity: sanitize(req.body.quantity),
    foc: sanitize(req.body.foc),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),
    carton_price: sanitize(req.body.carton_price),
    discount_value: sanitize(req.body.discount_value),
    wholesale_price: sanitize(req.body.wholesale_price),
    gross_total: sanitize(req.body.gross_total),
    total: sanitize(req.body.total),
  };

  let sql = "INSERT INTO delivery_verification_item SET ?";
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
  
  
    app.post('/insertDeliveryOrder', (req, res, next) => {
    let data = {
      company_id: req.body.company_id,
      currency_id: req.body.currency_id,
      creation_date: req.body.creation_date,
      delivery_status: req.body.delivery_status,
      date: req.body.date,
      created_by: req.body.created_by,
   
      delivery_code: req.body.delivery_code,
  
    };
  
    let sql = "INSERT INTO delivery_order SET ?";
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
  
  
  
app.post('/createDeliveryOrder', async (req, res) => {
  const { companyId, products, date, delivery_code,delivery_status } = req.body;

//   if (!companyId || !products || !Array.isArray(products) || products.length === 0 ) {
//     return res.status(400).send({ success: false, msg: 'Invalid input data' });
//   }

  try {
    // Insert into delivery_order table
    const deliveryOrderData = {
      company_id: companyId,
      date: date,
      delivery_code:delivery_code,
      delivery_status:delivery_status
    };

    const insertDeliveryOrder = () => {
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO delivery_order SET ?', deliveryOrderData, (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        });
      });
    };

    const deliveryOrderId = await insertDeliveryOrder();

    // Prepare delivery_order_item data
    const deliveryOrderItemsData = products.map(product => [
      deliveryOrderId,
      product.productId
    ]);

    // Insert into delivery_order_item table
    const insertDeliveryOrderItems = () => {
      return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO delivery_order_item (delivery_order_id, product_id) VALUES ?';
        db.query(sql, [deliveryOrderItemsData], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    await insertDeliveryOrderItems();

    return res.status(201).send({ success: true, msg: 'Delivery order created successfully' });
  } catch (error) {
    console.error('Error creating delivery order:', error);
    return res.status(500).send({ success: false, msg: 'Error creating delivery order' });
  }
});


  app.post('/getBulkDeliveryData', async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).send({ success: false, msg: 'Date is required' });
  }

  try {
    // Query delivery orders for the given date
    const deliveryOrders = await new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM delivery_order WHERE date = ?';
      db.query(sql, [date], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (deliveryOrders.length === 0) {
      return res.status(404).send({ success: false, msg: 'No delivery orders found for the given date' });
    }

    // For each delivery order, get the delivery order items and company details
    const products = [];
    const customers = [];

    for (const order of deliveryOrders) {
      // Fetch company details for the order's company_id
      const companyDetails = await new Promise((resolve, reject) => {
        const sql = 'SELECT company_id, customer_code, company_name FROM company WHERE company_id = ?';
        db.query(sql, [order.company_id], (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      customers.push({
        company_id: companyDetails ? companyDetails.company_id : null,
        customer_code: companyDetails ? companyDetails.customer_code : null,
        company_name: companyDetails ? companyDetails.company_name : null,
        date: order.date
      });

      // Fetch delivery order items joined with product details
      const items = await new Promise((resolve, reject) => {
        const sql = `
          SELECT doi.product_id, p.product_code, p.title AS product_name, doi.delivery_order_id
          FROM delivery_order_item doi
          LEFT JOIN product p ON p.product_id = doi.product_id
          WHERE doi.delivery_order_id = ?
        `;
        db.query(sql, [order.delivery_order_id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      for (const item of items) {
        products.push({
          product_id: item.product_id,
          product_code: item.product_code,
          title: item.product_name,
          delivery_order_id: item.delivery_order_id
        });
      }
    }

    return res.status(200).send({
      success: true,
      data: {
        products,
        customers
      }
    });
  } catch (error) {
    console.error('Error fetching bulk delivery data:', error);
    return res.status(500).send({ success: false, msg: 'Internal server error' });
  }
});


app.post('/deleteSalesOrderOld', (req, res, next) => {

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

app.post('/deleteDeliveryOrder', (req, res, next) => {
  let ids = req.body.delivery_order_id.split(","); // ["33","32"]

  let sql = "DELETE FROM delivery_order WHERE delivery_order_id IN (?)";
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({ data: err, msg: 'failed' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});


app.post('/deleteSalesOrder', (req, res, next) => {
  let ids = req.body.sales_order_id.split(","); // ["33","32"]

  let sql = "DELETE FROM sales_order WHERE sales_order_id IN (?)";
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({ data: err, msg: 'failed' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.get('/getFilteredSalesAnalysis', (req, res) => {
  const {
    startDate,
    endDate,
    customerId,
    productId,
    productCode,
    productName,
    siteId,
    year,
    month,
    categoryId,
    subcategoryId,
    departmentId,
    limit = 50,
    offset = 0,
  } = req.query;

  let query = `
    SELECT 
      so.sales_order_id,
      soi.sales_order_item_id,
      so.tran_date,
      so.contact_id,
      soi.product_id,
      soi.item_title,
      soi.model,
      soi.module,
      soi.quantity,
      soi.unit_price,
      soi.amount,
      soi.discount_percentage,
      soi.discount_value,
      soi.total,
      soi.gross_total,
      soi.wholesale_price,
      soi.foc,
      soi.carton_qty,
      soi.carton_price,
      soi.loose_qty,
      soi.mark_up,
      soi.mark_up_type,
      soi.price_from_supplier,
      soi.unit,
      soi.site_id,
      soi.month,
      soi.year,
      p.category_id,
      p.sub_category_id,
      p.department_id,
      p.product_code,
      p.title AS product_name
    FROM sales_order so
    JOIN sales_order_item soi ON so.sales_order_id = soi.sales_order_id 
    JOIN product p ON soi.product_id = p.product_id
    WHERE 1=1
  `;

  const params = [];

  if (startDate) {
    query += " AND DATE(so.tran_date) >= ?";
    params.push(startDate);
  }
  if (endDate) {
    query += " AND DATE(so.tran_date) <= ?";
    params.push(endDate);
  }
  if (customerId) {
    query += " AND so.contact_id = ?";
    params.push(customerId);
  }
  if (productId) {
    query += " AND soi.product_id = ?";
    params.push(productId);
  }
   if (productCode) {
    query += " AND p.product_code = ?";
    params.push(productCode);
  }
   if (productName) {
    query += " AND p.title = ?";
    params.push(productName);
  }
  if (siteId) {
    query += " AND soi.site_id = ?";
    params.push(siteId);
  }
  if (year) {
    query += " AND soi.year = ?";
    params.push(year);
  }
  if (month) {
    query += " AND soi.month = ?";
    params.push(month);
  }
  if (categoryId) {
    query += " AND p.category_id = ?";
    params.push(categoryId);
  }
  if (subcategoryId) {
    query += " AND p.sub_category_id = ?";
    params.push(subcategoryId);
  }
  if (departmentId) {
    query += " AND p.department_id = ?";
    params.push(departmentId);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  console.log('SQL Query:', query, 'Params:', params);

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});



app.get('/getSalesAnalysis', (req, res, next) => {
  db.query(
    `SELECT 
    SUM(so.net_total) AS totalSales,
    COUNT(DISTINCT so.sales_order_id) AS totalBills,
    SUM(soi.quantity) AS totalItems,
    ROUND(SUM(so.net_total) / COUNT(DISTINCT so.sales_order_id), 2) AS avgBill,
    ROUND(SUM(so.net_total) / SUM(soi.quantity), 2) AS avgItem,
    SUM(soi.quantity * soi.price_from_supplier) AS totalCost,
    (SUM(so.net_total) - SUM(soi.quantity * soi.price_from_supplier)) AS profit,
    ROUND(((SUM(so.net_total) - SUM(soi.quantity * soi.price_from_supplier)) / SUM(so.net_total)) * 100, 2) AS margin
FROM sales_order so
JOIN sales_order_item soi ON so.sales_order_id = soi.sales_order_id
`,
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

app.get('/getWeeklySalesReport', (req, res, next) => {
  db.query(
    `SELECT 
  d.day_name AS day,
  SUM(CASE WHEN so.tran_date >= CURDATE() - INTERVAL (WEEKDAY(CURDATE())) DAY 
            AND so.tran_date < CURDATE() + INTERVAL (7 - WEEKDAY(CURDATE())) DAY
           THEN so.net_total ELSE 0 END) AS currentWeek,
  SUM(CASE WHEN so.tran_date >= CURDATE() - INTERVAL (WEEKDAY(CURDATE()) + 7) DAY 
            AND so.tran_date < CURDATE() - INTERVAL (WEEKDAY(CURDATE())) DAY
           THEN so.net_total ELSE 0 END) AS lastWeek,
  SUM(CASE WHEN so.tran_date >= CURDATE() - INTERVAL (WEEKDAY(CURDATE()) + 14) DAY 
            AND so.tran_date < CURDATE() - INTERVAL (WEEKDAY(CURDATE()) + 7) DAY
           THEN so.net_total ELSE 0 END) AS previousWeek
FROM (
  SELECT 'Sunday' AS day_name UNION ALL
  SELECT 'Monday' UNION ALL
  SELECT 'Tuesday' UNION ALL
  SELECT 'Wednesday' UNION ALL
  SELECT 'Thursday' UNION ALL
  SELECT 'Friday' UNION ALL
  SELECT 'Saturday'
) AS d
LEFT JOIN sales_order so 
  ON DAYNAME(so.tran_date) = d.day_name
GROUP BY d.day_name
ORDER BY FIELD(d.day_name, 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
`,
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


// Your corrected API endpoint
app.post('/getRecentInvoices', (req, res) => {
  // Get the date from the request body
  const dateFromFrontend = req.body.date;

  console.log('Date received from frontend:', dateFromFrontend);

  if (!dateFromFrontend) {
    return res.status(400).send({
      msg: 'Date parameter is missing in the request body',
      data: null,
    });
  }

  const sql = `
    SELECT 
      si.invoice_id, 
      si.invoice_code AS invoiceNo,
      DATE_FORMAT(STR_TO_DATE(si.invoice_date, '%Y-%m-%d'), '%d-%m-%Y') AS date, 
      si.invoice_amount AS amount, 
      si.balance_amount AS outstanding, 
      c.company_name AS customer, 
      c.company_id 
    FROM invoice si 
    LEFT JOIN company c ON si.company_id = c.company_id 
    WHERE STR_TO_DATE(si.invoice_date, '%Y-%m-%d') = ?
    ORDER BY si.invoice_date DESC 
    LIMIT 10
  `;

  // Use a prepared statement to prevent SQL injection
  db.query(sql, [dateFromFrontend], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(400).send({
        msg: 'Failed to fetch invoices',
        data: err,
      });
    }

    console.log('Query successful. Found rows:', result.length);
    console.log('Result data:', result);

    return res.status(200).send({
      msg: 'Success',
      data: result,
    });
  });
});


app.post('/getRecentOrders', (req, res) => {
  // Get the date from the request body
  const dateFromFrontend = req.body.date;

  console.log('Date received from frontend:', dateFromFrontend);

  if (!dateFromFrontend) {
    return res.status(400).send({
      msg: 'Date parameter is missing in the request body',
      data: null,
    });
  }

  const sql = `
    SELECT 
      so.sales_order_id,
      so.tran_no AS invoiceNo,
      DATE_FORMAT(STR_TO_DATE(so.tran_date, '%Y-%m-%d'), '%d-%m-%Y') AS date,
      so.net_total AS amount,
      c.company_name AS customer,
      c.company_id
    FROM sales_order so
    LEFT JOIN company c ON so.company_id = c.company_id
    WHERE STR_TO_DATE(so.tran_date, '%Y-%m-%d') = ?
    ORDER BY STR_TO_DATE(so.tran_date, '%Y-%m-%d') DESC
    LIMIT 10
  `;

  // Use a prepared statement to prevent SQL injection
  db.query(sql, [dateFromFrontend], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(400).send({
        msg: 'Failed to fetch invoices',
        data: err,
      });
    }

    console.log('Query successful. Found rows:', result.length);
    console.log('Result data:', result);

    return res.status(200).send({
      msg: 'Success',
      data: result,
    });
  });
});



// salesOrder.js
app.get('/getSalesTotalOutstanding', (req, res) => {
  const sql = `
    SELECT 
      SUM(si.invoice_amount) AS totalSales,
      SUM(si.balance_amount) AS totalOutstanding
    FROM invoice si;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching sales analysis:', err);
      return res.status(400).send({
        msg: 'Failed to fetch sales analysis',
        data: err,
      });
    }
    return res.status(200).send({
      msg: 'Success',
      data: result,
    });
  });
});



app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;