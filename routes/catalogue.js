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


app.post('/insertCatalogue', (req, res, next) => {
  const data = {
    catalogue_name: req.body.catalogue_name,
    catalogue_code: req.body.catalogue_code,
    remarks: req.body.remarks,
    sort_order: req.body.sort_order,
    in_active: req.body.in_active || '0',
    active: req.body.active || '1',
    created_by: req.body.created_by,
    creation_date: req.body.creation_date,
    modified_by: req.body.modified_by || null,
    modification_date: req.body.modification_date || null,
  };

  const sql = 'INSERT INTO catalogue SET ?';
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log('Insert error:', err);
      return res.status(400).send({
        data: err,
        msg: 'Insert failed',
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'Insert success',
      });
    }
  });
});

app.post('/insertCatalogueProducts', (req, res) => {
  const data = req.body; // Array of products
  if (!Array.isArray(data)) {
    return res.status(400).send({ msg: 'Invalid data format' });
  }

  const values = data.map(d => [
    d.catalogue_id, d.product_id, d.sort_order || 0, d.created_by || 'system'
  ]);

  const sql = `INSERT INTO catalogue_product (catalogue_id, product_id, sort_order, created_by) VALUES ?`;
  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Insert failed', error: err });
    return res.send({ msg: 'Success', data: result });
  });
});


app.post('/catalogue/deleteProduct', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM catalogue_product WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Delete failed', error: err });
    res.send({ msg: 'Deleted successfully', data: result });
  });
});


app.post('/catalogue/updateSortOrders', (req, res) => {
  const items = req.body; // array of { id, sort_order }

  const updates = items.map(item =>
    db.query(
      'UPDATE catalogue_product SET sort_order = ? WHERE id = ?',
      [item.sort_order, item.id],
      (err) => {
        if (err) console.error('Sort update error:', err);
      }
    )
  );

  Promise.all(updates)
    .then(() => res.send({ msg: 'Sort orders updated' }))
    .catch((err) => res.status(500).send({ msg: 'Failed', error: err }));
});

app.post("/getCatalogueProductsByCatalogueId", (req, res, next) => {
  db.query(
    `SELECT 
  cp.product_id,
  cp.catalogue_id,
  cp.sort_order,
  p.title,
  p.product_code,
  p.unit,
  p.quantity,
  m.file_name
FROM catalogue_product cp
LEFT JOIN product p ON p.product_id = cp.product_id
LEFT JOIN media m ON m.record_id = cp.product_id AND m.room_name = 'Product'
    where cp.catalogue_id = ${db.escape(req.body.catalogue_id)}
    ORDER BY cp.catalogue_product_id DESC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
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



app.post("/getCatalogueById", (req, res, next) => {
  db.query(
    `SELECT * FROM catalogue
    where catalogue_id = ${db.escape(req.body.catalogue_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
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

app.get('/getCatalogue', (req, res, next) => {
    db.query(
      `SELECT * from catalogue order by catalogue_id desc`,
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

  // Express endpoint
app.get('/getCatalogueProductWithImage/:catalogueId', (req, res) => {
  const { catalogueId } = req.params;
  db.query(`
    SELECT cp.product_id, cp.catalogue_id, cp.sort_order,
           p.product_code, p.title,
           p.retail_price AS rprice,
           p.wholesale_price AS wprice,
           m.file_name
    FROM catalogue_product cp
    LEFT JOIN product p ON p.product_id = cp.product_id
    LEFT JOIN media m ON m.record_id = cp.product_id AND m.room_name = 'Product'
    WHERE cp.catalogue_id = ?
    ORDER BY cp.sort_order
  `, [catalogueId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ data: result });
  });
});


app.get('/getCatalogueProductold/:catalogueId', (req, res) => {
  const { catalogueId } = req.params;
  console.log(`Received request for catalogueId: ${catalogueId}`);

  // The SQL query string is for reference; the mock db.query doesn't use it directly.
  // In a real setup, this SQL would be executed against your database.
  const sql = `
    SELECT cp.product_id, cp.catalogue_id, cp.sort_order,
           p.product_code, p.title,
           p.retail_price AS rprice,
           p.wholesale_price AS wprice,
           m.file_name
    FROM catalogue_product cp
    LEFT JOIN product p ON p.product_id = cp.product_id
    LEFT JOIN media m ON m.record_id = cp.product_id AND m.room_name = 'Product'
    WHERE cp.catalogue_id = ?
    ORDER BY cp.sort_order
  `;

  db.query(sql, [parseInt(catalogueId)], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    console.log(`Sending ${result.length} products for catalogueId ${catalogueId}`);
    res.json({ data: result });
  });
});

app.get('/getCatalogueProduct/:catalogueId', (req, res) => {
  const { catalogueId } = req.params;
  console.log(`Received request for catalogueId: ${catalogueId}`);

  const sql = `
    SELECT cp.product_id, cp.catalogue_id, cp.sort_order,
           p.product_code, p.title,
           p.retail_price AS rprice,
           p.wholesale_price AS wprice,
            p.unit,
  p.quantity,
           m.file_name
    FROM catalogue_product cp
    LEFT JOIN product p ON p.product_id = cp.product_id
    LEFT JOIN media m ON m.record_id = cp.product_id AND m.room_name = 'Product'
    WHERE cp.catalogue_id = ?
    ORDER BY cp.sort_order
  `;

  db.query(sql, [parseInt(catalogueId)], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({
        error: 'Internal Server Error',
        details: err.message,
      });
    }
    console.log(`Sending ${result.length} products for catalogueId ${catalogueId}`);
    res.json({ data: result });
  });
});

app.post("/EditCatalogue", (req, res, next) => {
  db.query(
    `UPDATE catalogue 
             SET catalogue_name=${db.escape(req.body.catalogue_name)}
             ,remarks=${db.escape(req.body.remarks)}
             ,sort_order=${db.escape(req.body.sort_order)}
             ,in_active=${db.escape(req.body.in_active)}
             ,modification_date =${db.escape(req.body.modification_date)}
             ,modified_by =${db.escape(req.body.modified_by)}
           WHERE catalogue_id  = ${db.escape(req.body.catalogue_id )}`, // Corrected WHERE clause
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
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



app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });
  
  module.exports = app;