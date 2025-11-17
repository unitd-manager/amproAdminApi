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

app.post('/insert_department_cli', (req, res) => {
  const {
    department_name, product_prefix, sort_order,
    department_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    created_by, updated_by
  } = req.body;

  const query = `
    INSERT INTO department_cli (
      department_name, product_prefix, sort_order,
      department_image, show_on_ecommerce, show_on_eprocurement,
      show_on_pos, read_weight_from_scale, is_active,
      created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    department_name, product_prefix, sort_order,
    department_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    created_by, updated_by
  ], (err, result) => {
    if (err) {return res.status(500).send({ msg: 'Insert failed', error: err });}
     else {
    return res.status(200).send({
        data: result,
        msg: "Success",
      });
        
    }
  });
});

app.get('/getalldepartments', (req, res) => {
  db.query('SELECT * FROM department_cli', (err, results) => {
    if (err) return res.status(500).send({ msg: 'Database error', error: err });
    if (!results.length) return res.status(404).send({ msg: 'No departments found' });
    res.status(200).send({ data: results, msg: 'Success' });
  });
});

app.get('/get_all_department_cli', (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const search = req.query.search || '';

  const offset = (page - 1) * limit;
  const searchCondition = `%${search}%`;

  const dataQuery = `
    SELECT * FROM department_cli
    WHERE department_name LIKE ?
    ORDER BY department_cli_id DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total FROM department_cli
    WHERE department_name LIKE ?
  `;

  db.query(countQuery, [searchCondition], (countErr, countResult) => {
    if (countErr) {
      return res.status(500).send({ msg: 'Count query error', error: countErr });
    }

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    db.query(dataQuery, [searchCondition, limit, offset], (err, results) => {
      if (err) {
        return res.status(500).send({ msg: 'Data query error', error: err });
      }

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



app.get('/get_department_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM department_cli WHERE department_cli_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send({ msg: 'Error fetching department', error: err });
    if (!results.length) return res.status(404).send({ msg: 'Department not found' });
    res.status(200).send({ data: results[0], msg: 'Success' });
  });
});


app.put('/update_department_cli/:id', (req, res) => {
  const id = req.params.id;
  const {
    department_name
  } = req.body;

  const query = `
    UPDATE department_cli SET 
      department_name = ?
    WHERE department_cli_id = ?
  `;

  db.query(query, [
    department_name, id
  ], (err, result) => {
    if (err) {
      console.error('SQL ERROR:', err);
      return res.status(500).send({ msg: 'Update failed', error: err.sqlMessage || err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: 'Department not found' });
    }
    res.status(200).send({ msg: 'Updated successfully' });
  });
});

app.post('/update_departments_cli', (req, res) => {
 
  const {
    department_name, product_prefix, sort_order,
    department_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    updated_by, department_cli_id
  } = req.body;

  const query = `
    UPDATE department_cli SET 
      department_name = ?, product_prefix = ?, sort_order = ?, 
      department_image = ?, show_on_ecommerce = ?, show_on_eprocurement = ?, 
      show_on_pos = ?, read_weight_from_scale = ?, is_active = ?, 
      updated_by = ?
    WHERE department_cli_id = ?
  `;

  db.query(query, [
    department_name, product_prefix, sort_order,
    department_image, show_on_ecommerce, show_on_eprocurement,
    show_on_pos, read_weight_from_scale, is_active,
    updated_by, department_cli_id
  ], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Update failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Department not found' });
    res.status(200).send({ msg: 'Updated successfully' });
  });
});

app.delete('/delete_department_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM department_cli WHERE department_cli_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Department not found' });
    res.status(200).send({ msg: 'Deleted successfully' });
  });
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app