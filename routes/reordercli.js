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

app.post('/insert_reorder_cli', (req, res) => {
  const {
    supplier_id, product_id, product_code, available_qty,
    reorder_qty, minimum_qty, purchase_unit_cost, whole_sale_price,
    sort_order, bin_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active, created_by, updated_by
  } = req.body;

  const query = `
    INSERT INTO reorder_cli (
      supplier_id, product_id, product_code, available_qty,
      reorder_qty, minimum_qty, purchase_unit_cost, whole_sale_price,
      sort_order, bin_image, show_on_ecommerce, show_on_eprocurement,
      show_on_pos, read_weight_from_scale, is_active, created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    supplier_id, product_id, product_code, available_qty,
    reorder_qty, minimum_qty, purchase_unit_cost, whole_sale_price,
    sort_order, bin_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active, created_by, updated_by
  ], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Insert failed', error: err });
    res.status(201).send({ msg: 'Inserted successfully', id: result.insertId });
  });
});

// app.get('/get_all_reorder_cli', (req, res) => {
//   db.query('SELECT * FROM reorder_cli', (err, results) => {
//     if (err) return res.status(500).send({ msg: 'Database error', error: err });
//     if (!results.length) return res.status(404).send({ msg: 'No reorder records found' });
//     res.status(200).send({ data: results, msg: 'Success' });
//   });
// });

app.get('/get_all_reorder_cli', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = `%${req.query.search || ''}%`;
  const offset = (page - 1) * limit;

  const dataQuery = `
    SELECT 
      p.product_code,
      p.title AS product_name,
      p.qty_in_stock AS available_qty,
      p.supplier_id,
      ps.*,
      s.company_name AS supplier_name
    FROM product p
    JOIN product_stock ps ON ps.product_id = p.product_id
    JOIN supplier s ON s.supplier_id = p.supplier_id
    WHERE ps.qty < ps.minimum_qty
      AND (p.title LIKE ? OR p.product_code LIKE ?)
    GROUP BY p.product_id
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(DISTINCT p.product_id) AS total
    FROM product p
    JOIN product_stock ps ON ps.product_id = p.product_id
    JOIN supplier s ON s.supplier_id = p.supplier_id
    WHERE ps.qty < ps.minimum_qty
      AND (p.title LIKE ? OR p.product_code LIKE ?)
  `;

  db.query(countQuery, [search, search], (err, countResult) => {
    if (err) {
      console.error('Count error:', err);
      return res.status(500).json({ error: 'Count error', details: err.message });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    db.query(dataQuery, [search, search, limit, offset], (err, dataResult) => {
      if (err) {
        console.error('Data fetch error:', err);
        return res.status(500).json({ error: 'Data fetch error', details: err.message });
      }

      res.json({
        currentPage: page,
        totalPages,
        totalRecords: total,
        data: dataResult
      });
    });
  });
});



// app.get('/get_all_reorder_cli', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const search = req.query.search || '';

//   const offset = (page - 1) * limit;

//   // Use wildcard search on product_code, or extend to other fields if needed
//   const searchCondition = `%${search}%`;

//   const query = `
//     SELECT * FROM reorder_cli 
//     WHERE product_code LIKE ?
//     ORDER BY reorder_cli_id DESC
//     LIMIT ? OFFSET ?
//   `;

//   const countQuery = `
//     SELECT COUNT(*) as total FROM reorder_cli 
//     WHERE product_code LIKE ?
//   `;

//   db.query(countQuery, [searchCondition], (countErr, countResult) => {
//     if (countErr) return res.status(500).send({ msg: 'Count query failed', error: countErr });

//     const totalRecords = countResult[0].total;
//     const totalPages = Math.ceil(totalRecords / limit);

//     db.query(query, [searchCondition, limit, offset], (err, results) => {
//       if (err) return res.status(500).send({ msg: 'Query failed', error: err });

//       res.status(200).send({
//         data: results,
//         pagination: {
//           totalRecords,
//           totalPages,
//           currentPage: page,
//           perPage: limit,
//         },
//         msg: 'Success'
//       });
//     });
//   });
// });

app.get('/get_reorder_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM reorder_cli WHERE reorder_cli_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send({ msg: 'Error fetching record', error: err });
    if (!results.length) return res.status(404).send({ msg: 'Record not found' });
    res.status(200).send({ data: results[0], msg: 'Success' });
  });
});

app.put('/update_reorder_cli/:id', (req, res) => {
  const id = req.params.id;
  const {
    supplier_id, product_id, product_code, available_qty,
    reorder_qty, minimum_qty, purchase_unit_cost, whole_sale_price,
    sort_order, bin_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active, updated_by
  } = req.body;

  const query = `
    UPDATE reorder_cli SET
      supplier_id = ?, product_id = ?, product_code = ?, available_qty = ?,
      reorder_qty = ?, minimum_qty = ?, purchase_unit_cost = ?, whole_sale_price = ?,
      sort_order = ?, bin_image = ?, show_on_ecommerce = ?, show_on_eprocurement = ?,
      show_on_pos = ?, read_weight_from_scale = ?, is_active = ?, updated_by = ?
    WHERE reorder_cli_id = ?
  `;

  db.query(query, [
    supplier_id, product_id, product_code, available_qty,
    reorder_qty, minimum_qty, purchase_unit_cost, whole_sale_price,
    sort_order, bin_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active, updated_by, id
  ], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Update failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Record not found' });
    res.status(200).send({ msg: 'Updated successfully' });
  });
});


app.delete('/delete_reorder_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM reorder_cli WHERE reorder_cli_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Record not found' });
    res.status(200).send({ msg: 'Deleted successfully' });
  });
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app
