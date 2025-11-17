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

app.get('/getstockrequest', (req, res, next) => {
  db.query(`Select s.*
  From stock_request s
  Where s.stock_request_id !=''`,
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

app.post('/getStockRequestById', (req, res, next) => {
  db.query(` Select 
  s.*
  From stock_request s
     Where s.stock_request_id=${db.escape(req.body.stock_request_id)}`,
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
    FROM stock_request s
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

app.post('/getStockRequestProducts', (req, res, next) => {
  const stockRequestId = db.escape(req.body.stock_request_id);

  const query = `
    SELECT 
      sri.*,
      p.title AS product_name,
      p.product_code,
      p.unit,
      p.pcs_per_carton
    FROM stock_request_item sri
    LEFT JOIN product p ON p.product_id = sri.product_id
    WHERE sri.stock_request_id = ${stockRequestId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('error: ', err);
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

app.post('/editStockRequest', (req, res, next) => {
  db.query(`UPDATE stock_request 
            SET from_location=${db.escape(req.body.from_location)}
            ,to_location=${db.escape(req.body.to_location)}
              ,status=${db.escape(req.body.status)}
            ,stock_req_date=${db.escape(req.body.stock_req_date)}
            ,remarks=${db.escape(req.body.remarks)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            WHERE stock_request_id = ${db.escape(req.body.stock_request_id)}`,
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
  db.query(`UPDATE stock_request 
            SET status='Approved'
            
            WHERE stock_request_id = ${db.escape(req.body.stock_request_id)}`,
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
        
        
        
     
  
app.post('/insertStockRequest', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , from_location: req.body.from_location
    , to_location	: req.body.to_location
    , status: req.body.status
    , stock_req_date: req.body.stock_req_date
    , stock_req_no: req.body.stock_req_no
    , remarks: req.body.remarks
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO stock_request SET ?";
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


app.post('/deleteStockRequestProduct', (req, res, next) => {

  let data = { stock_request_item_id: req.body. stock_request_item_id};
  let sql = "DELETE FROM  stock_request_item WHERE ?";
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

 app.post('/edit-TabQuoteLine', (req, res, next) => {
   
    db.query(
      `UPDATE  stock_request_item
            SET product_id=${db.escape(req.body.product_id)}
            ,quantity=${db.escape(req.body.quantity)}
            ,loose_qty=${db.escape(req.body.loose_qty)}
            ,carton_qty=${db.escape(req.body.carton_qty)}
           
            WHERE stock_request_item_id =  ${db.escape(req.body.stock_request_item_id)}`,
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
        
app.post('/getStockRequestItemsById', (req, res, next) => {
  const salesOrderId = db.escape(req.body.stock_request_id);

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
    FROM stock_request_item qt 
    LEFT JOIN product c ON c.product_id = qt.product_id
    WHERE qt.stock_request_id = ${salesOrderId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: 'No result found' });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/insertStockRequestProduct', (req, res, next) => {
  // Helper function to return 0 if the value is empty or not a number
  const sanitize = (value) => {
    return value === undefined || value === null || value === '' ? 0 : value;
  };

  let data = {
    product_id: req.body.product_id,
    stock_request_id: req.body.stock_request_id,
    quantity: sanitize(req.body.quantity),
    loose_qty: sanitize(req.body.loose_qty),
    carton_qty: sanitize(req.body.carton_qty),

  };

  let sql = "INSERT INTO stock_request_item SET ?";
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

app.post('/deleteStockRequest', (req, res, next) => {

  let data = {stock_request_id: req.body.stock_request_id};
  let sql = "DELETE FROM stock_request WHERE ?";
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

// Create Stock Adjustment with items
app.post("/insertStockAdjustment", (req, res) => {
  const { stock_adjustment_date, location_id, remarks, items } = req.body;

  // Step 1: Get next stock_adjustment_no
  db.query(
    "SELECT IFNULL(MAX(stock_adjustment_no), 0) + 1 AS next_no FROM stock_adjustment",
    (err, rows) => {
      if (err) return res.status(500).send(err);

      const nextNo = rows[0].next_no;

      // Step 2: Insert into stock_adjustment (master)
      db.query(
        "INSERT INTO stock_adjustment (stock_adjustment_date, location_id, remarks, stock_adjustment_no) VALUES (?, ?, ?, ?)",
        [stock_adjustment_date, location_id, remarks, nextNo],
        (err2, result) => {
          if (err2) return res.status(500).send(err2);

          const stock_adjustment_id = result.insertId;

          // Step 3: Insert items (if provided)
          if (items && items.length > 0) {
            const values = items.map(item => [
              stock_adjustment_id,
              item.product_id,
              item.stock_in_hand_carton,
              item.stock_in_hand_loose,
              item.stock_in_hand_qty,
              item.adjustment_type,
              item.adjustment_carton,
              item.adjustment_loose,
              item.adjustment_qty,
              item.new_stock_carton,
              item.new_stock_loose,
              item.new_stock_qty
            ]);

            db.query(
              `INSERT INTO stock_adjustment_item 
              (stock_adjustment_id, product_id, stock_in_hand_carton, stock_in_hand_loose, stock_in_hand_qty, 
               adjustment_type, adjustment_carton, adjustment_loose, adjustment_qty, 
               new_stock_carton, new_stock_loose, new_stock_qty) 
               VALUES ?`,
              [values],
              (err3) => {
                if (err3) return res.status(500).send(err3);
                res.send({ message: "Stock adjustment created", stock_adjustment_id });
              }
            );
          } else {
            res.send({ message: "Stock adjustment created (no items)", stock_adjustment_id });
          }
        }
      );
    }
  );
});


app.get("/getStockAdjustment/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM stock_adjustment WHERE stock_adjustment_id = ?", [id], (err, master) => {
    if (err) return res.status(500).send(err);
    if (master.length === 0) return res.status(404).send({ message: "Not found" });

    db.query("SELECT * FROM stock_adjustment_item WHERE stock_adjustment_id = ?", [id], (err2, items) => {
      if (err2) return res.status(500).send(err2);

      res.send({
        ...master[0],
        items
      });
    });
  });
});

app.put("/updateStockAdjustment/:id", (req, res) => {
  const { id } = req.params;
  const { stock_adjustment_date, location_id, remarks, items } = req.body;

  db.query(
    "UPDATE stock_adjustment SET stock_adjustment_date = ?, location_id = ?, remarks = ? WHERE stock_adjustment_id = ?",
    [stock_adjustment_date, location_id, remarks, id],
    (err) => {
      if (err) return res.status(500).send(err);

      if (items && items.length > 0) {
        // Delete old items first
        db.query("DELETE FROM stock_adjustment_item WHERE stock_adjustment_id = ?", [id], (err2) => {
          if (err2) return res.status(500).send(err2);

          const values = items.map(item => [
            id,
            item.product_id,
            item.stock_in_hand_carton,
            item.stock_in_hand_loose,
            item.stock_in_hand_qty,
            item.adjustment_type,
            item.adjustment_carton,
            item.adjustment_loose,
            item.adjustment_qty,
            item.new_stock_carton,
            item.new_stock_loose,
            item.new_stock_qty
          ]);

          db.query(
            `INSERT INTO stock_adjustment_item 
            (stock_adjustment_id, product_id, stock_in_hand_carton, stock_in_hand_loose, stock_in_hand_qty, 
             adjustment_type, adjustment_carton, adjustment_loose, adjustment_qty, 
             new_stock_carton, new_stock_loose, new_stock_qty) 
             VALUES ?`,
            [values],
            (err3) => {
              if (err3) return res.status(500).send(err3);
              res.send({ message: "Stock adjustment updated" });
            }
          );
        });
      } else {
        res.send({ message: "Stock adjustment updated (no items)" });
      }
    }
  );
});


app.get('/getFilteredStockAdjustment', (req, res) => {
  const {
    stock_adjustment_no,
    from_date,
    to_date,
   location_id
  } = req.query;

  let query = `
    SELECT gr.*, s.location_name,s.location_code 
    FROM stock_adjustment gr 
    LEFT JOIN location s ON gr.location_id = s.location_id 
    WHERE 1=1
  `;
  const values = [];

  if (stock_adjustment_no && stock_adjustment_no.trim()) {
    query += ` AND gr.stock_adjustment_no = ?`;
    values.push(stock_adjustment_no.trim());
  }

  if (from_date && from_date.trim()) {
    query += ` AND gr.stock_adjustment_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    query += ` AND gr.stock_adjustment_date <= ?`;
    values.push(to_date.trim());
  }
  
if (location_id && location_id.trim()) {
    query += ` AND gr.location_id = ?`;
    values.push(location_id.trim());
  }

  console.log('SQL Query:', query, 'Values:', values); // For debugging

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});


app.delete("/deleteStockAdjustment/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM stock_adjustment WHERE stock_adjustment_id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Stock adjustment deleted" });
  });
});

app.get('/getAllLocations', (req, res, next) => {
  db.query(`Select s.*
  From location s
  Where s.location_id !=''`,
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


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});



module.exports = app;