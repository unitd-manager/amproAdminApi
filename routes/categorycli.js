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

app.post('/insert_category_cli', (req, res) => {
  const {
    category_name, product_prefix, sort_order,department_cli_id,
    category_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    created_by, updated_by
  } = req.body;

  const query = `
    INSERT INTO category_cli (
      category_name, product_prefix, sort_order,department_cli_id,
      category_image, show_on_ecommerce, show_on_eprocurement,
      show_on_pos, read_weight_from_scale, is_active,
      created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    category_name, product_prefix, sort_order,department_cli_id,
    category_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    created_by, updated_by
  ], (err, result) => {
    if (err){return res.status(500).send({ msg: 'Insert failed', error: err });}
    else {
    return res.status(200).send({
        data: result,
        msg: "Success",
      });
        
    }
  });
});

app.get('/getallcategoryclis', (req, res) => {
  db.query('SELECT * FROM category_cli', (err, results) => {
    if (err) return res.status(500).send({ msg: 'Database error', error: err });
    if (!results.length) return res.status(404).send({ msg: 'No categorys found' });
    res.status(200).send({ data: results, msg: 'Success' });
  });
});

app.get('/get_all_category_cli', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const status = req.query.status; // Get the status from the query parameters

  const offset = (page - 1) * limit;
  const searchCondition = `%${search}%`;

  let statusCondition = '';
  let statusParams = [];

  if (status === 'Active') {
    statusCondition = 'AND c.is_active = 1';
  } else if (status === 'Inactive') {
    statusCondition = 'AND c.is_active = 0';
  }
  // If status is 'All' or not provided, statusCondition remains empty,
  // and no status filtering is applied.

  const dataQuery = `
    SELECT c.*, d.department_name
    FROM category_cli c
    LEFT JOIN department_cli d ON c.department_cli_id = d.department_cli_id
    WHERE c.category_name LIKE ?
    ${statusCondition}
    ORDER BY c.category_cli_id DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM category_cli c
    LEFT JOIN department_cli d ON c.department_cli_id = d.department_cli_id
    WHERE c.category_name LIKE ?
    ${statusCondition}
  `;

  // Parameters for the count query
  const countQueryParams = [searchCondition, ...statusParams];
  // Parameters for the data query
  const dataQueryParams = [searchCondition, ...statusParams, limit, offset];

  db.query(countQuery, countQueryParams, (countErr, countResult) => {
    if (countErr) return res.status(500).send({ msg: 'Count query failed', error: countErr });

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    db.query(dataQuery, dataQueryParams, (err, results) => {
      if (err) return res.status(500).send({ msg: 'Data query failed', error: err });

      res.status(200).send({
        data: results,
        pagination: {
          totalRecords,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
        msg: 'Success',
      });
    });
  });
});


app.get('/get_category_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT c.*, d.department_name 
     FROM category_cli c 
     LEFT JOIN department_cli d ON c.department_cli_id = d.department_cli_id
     WHERE c.category_cli_id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).send({ msg: 'Error fetching category', error: err });
      if (!results.length) return res.status(404).send({ msg: 'Category not found' });
      res.status(200).send({ data: results[0], msg: 'Success' });
    }
  );
});


app.post('/update_category_cli', (req, res) => {
 
  const {
    category_name, product_prefix, sort_order,department_cli_id,
    category_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    updated_by,category_cli_id
  } = req.body;

  const query = `
    UPDATE category_cli SET 
      category_name = ?, product_prefix = ?, sort_order = ?, department_cli_id =?,
      category_image = ?, show_on_ecommerce = ?, show_on_eprocurement = ?, 
      show_on_pos = ?, read_weight_from_scale = ?, is_active = ?, 
      updated_by = ?
    WHERE category_cli_id = ?
  `;

  db.query(query, [
    category_name, product_prefix, sort_order,department_cli_id,
    category_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    updated_by, category_cli_id
  ], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Update failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'category not found' });
    res.status(200).send({ msg: 'Updated successfully' });
  });
});

app.delete('/delete_category_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM category_cli WHERE category_cli_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'category not found' });
    res.status(200).send({ msg: 'Deleted successfully' });
  });
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app
