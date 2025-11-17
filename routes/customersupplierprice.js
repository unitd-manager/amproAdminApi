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

app.get("/getCustomerPrice", (req, res, next) => {
 db.query(
    `SELECT csp.customer_supplier_price_id,
            csp.contact_id,
            cli.contact_name,
            csp.product_count,
            csp.customer,
            csp.supplier,
            csp.product_code,
            csp.price,
            csp.created_user,
            csp.created_at,
            csp.updated_at
     FROM customer_supplier_price csp
     LEFT JOIN contact_cli cli ON csp.contact_id = cli.contact_cli_id
     WHERE csp.customer = 1
     ORDER BY csp.customer_supplier_price_id ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(500).send({
          msg: "Database error",
          error: err
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

app.get("/getSupplierPrice", (req, res, next) => {
  db.query(
    `SELECT csp.customer_supplier_price_id,
            csp.contact_id,
            cli.contact_name,
            csp.product_count,
            csp.customer,
            csp.supplier,
            csp.product_code,
            csp.price,
            csp.created_user,
            csp.created_at,
            csp.updated_at
     FROM customer_supplier_price csp
     LEFT JOIN contact_cli cli ON csp.contact_id = cli.contact_cli_id
     WHERE csp.supplier = 1
     ORDER BY csp.customer_supplier_price_id ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(500).send({
          msg: "Database error",
          error: err
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

app.get("/getCustomerSupplierPrice", (req, res, next) => {
  db.query(
    `SELECT customer_supplier_price_id
          ,contact_id
          ,product_count
          ,customer
          ,supplier
          ,product_code
          ,price
          ,created_user
          ,created_at
          ,updated_at
     FROM customer_supplier_price
     ORDER BY customer_supplier_price_id ASC`,
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

app.get("/getContactclis", (req, res, next) => {
  db.query(
    `SELECT * 
     FROM contact_cli 
     ORDER BY contact_cli_id ASC`,
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

app.get("/getProductclis", (req, res, next) => {
  db.query(
    `SELECT * 
     FROM product 
     ORDER BY product_id ASC`,
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

app.get("/getCustomerSupplierPriceById/:id", (req, res, next) => {
  db.query(
    `SELECT csp.customer_supplier_price_id,
            csp.contact_id,
            cli.contact_code,
            cli.contact_name,
            csp.product_count,
            csp.customer,
            csp.supplier,
            csp.product_code,
            csp.price,
            csp.created_user,
            csp.created_at,
            csp.updated_at
     FROM customer_supplier_price csp
     LEFT JOIN contact_cli cli ON csp.contact_id = cli.contact_cli_id
     WHERE csp.customer_supplier_price_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(500).send({
          msg: "Database error",
          error: err
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

app.post("/addCustomerSupplierPrice", (req, res, next) => {
  const data = req.body;
  db.query(
    `INSERT INTO customer_supplier_price 
      (contact_id, product_count, customer, supplier, product_code, price, created_user) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.contact_id,
      data.product_count,
      data.customer,
      data.supplier,
      data.product_code,
      data.price,
      data.created_user
    ],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: { insertId: result.insertId },
          msg: "Inserted successfully",
        });
      }
    }
  );
});
app.post("/updateCustomerSupplierPrice", (req, res) => {
  const data = req.body;
  console.log("Updating data:", data);

  const query = `
    UPDATE customer_supplier_price SET 
      contact_id = ?,
      product_count = ?,
       customer = ?,
      supplier = ?,
    WHERE customer_supplier_price_id = ?
  `;

  const values = [
    data.contact_id,
    data.product_count,
    data.customer,
    data.supplier,
    data.customer_supplier_price_id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("MySQL error:", err.sqlMessage || err);
      return res.status(500).send({ error: err.sqlMessage || "Database error" });
    }

    return res.status(200).send({
      data: { affectedRows: result.affectedRows },
      msg: "Updated successfully"
    });
  });
});



app.delete("/deleteCustomerSupplierPrice/:id", (req, res, next) => {
  db.query(
    `DELETE FROM customer_supplier_price WHERE customer_supplier_price_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: { affectedRows: result.affectedRows },
          msg: "Deleted successfully",
        });
      }
    }
  );
});


app.get("/getCsProduct", (req, res, next) => {
  db.query(
    `SELECT cs_product_id,
            customer_supplier_price_id,
            product_code,
            product_id,
            purchase_unit_cost,
            pcs_per_carton,
            wholesale_price,
            carton_price,
            margin_perc,
            created_at,
            updated_at
     FROM cs_product
     ORDER BY cs_product_id ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  );
});

app.get("/getCsProductById/:id", (req, res, next) => {
  db.query(
    `SELECT cs_product_id,
            customer_supplier_price_id,
            product_code,
            product_id,
            purchase_unit_cost,
            pcs_per_carton,
            wholesale_price,
            carton_price,
            margin_perc,
            created_at,
            updated_at
     FROM cs_product
     WHERE cs_product_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  );
});

app.get("/getCsProductByCSPId/:customer_supplier_price_id", (req, res, next) => {
  db.query(
    `SELECT c.cs_product_id,
            c.customer_supplier_price_id,
            p.product_code,
            c.product_id,
            p.title,
            c.purchase_unit_cost,
            c.pcs_per_carton,
            c.wholesale_price,
            c.carton_price,
            c.margin_perc,
            c.created_at,
            c.updated_at
     FROM cs_product c
     LEFT JOIN product p ON c.product_id = p.product_id
     WHERE customer_supplier_price_id = ?`,
    [req.params.customer_supplier_price_id],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  );
});

app.post("/addCsProduct", (req, res, next) => {
  const data = req.body;
  db.query(
    `INSERT INTO cs_product 
      (customer_supplier_price_id, product_code, product_id, purchase_unit_cost, pcs_per_carton, wholesale_price, carton_price, margin_perc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.customer_supplier_price_id,
      data.product_code,
      data.product_id,
      data.purchase_unit_cost,
      data.pcs_per_carton,
      data.wholesale_price,
      data.carton_price,
      data.margin_perc
    ],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: { insertId: result.insertId },
        msg: "Inserted successfully",
      });
    }
  );
});
app.post("/updateCsProduct", (req, res, next) => {
  const data = req.body;
  db.query(
    `UPDATE cs_product SET
      customer_supplier_price_id = ?,
      product_code = ?,
      product_id = ?,
      purchase_unit_cost = ?,
      pcs_per_carton = ?,
      wholesale_price = ?,
      carton_price = ?,
      margin_perc = ?
     WHERE cs_product_id = ?`,
    [
      data.customer_supplier_price_id,
      data.product_code,
      data.product_id,
      data.purchase_unit_cost,
      data.pcs_per_carton,
      data.wholesale_price,
      data.carton_price,
      data.margin_perc,
      data.cs_product_id
    ],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: { affectedRows: result.affectedRows },
        msg: "Updated successfully",
      });
    }
  );
});

app.delete("/deleteCsProduct/:id", (req, res, next) => {
  db.query(
    `DELETE FROM cs_product WHERE cs_product_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      return res.status(200).send({
        data: { affectedRows: result.affectedRows },
        msg: "Deleted successfully",
      });
    }
  );
});


app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;