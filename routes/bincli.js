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

app.post('/insert_bin_cli', (req, res) => {
  const {
    bin_name, category_id, product_prefix, floor_level,
    rack_no, rack_level, max_occupancy, sort_order, bin_image,
    show_on_ecommerce, show_on_eprocurement, show_on_pos,
    read_weight_from_scale, is_active, created_by, updated_by
  } = req.body;

  const query = `
    INSERT INTO bin_cli (
      bin_name, category_id, product_prefix, floor_level,
      rack_no, rack_level, max_occupancy, sort_order, bin_image,
      show_on_ecommerce, show_on_eprocurement, show_on_pos,
      read_weight_from_scale, is_active, created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    bin_name, category_id, product_prefix, floor_level,
    rack_no, rack_level, max_occupancy, sort_order, bin_image,
    show_on_ecommerce, show_on_eprocurement, show_on_pos,
    read_weight_from_scale, is_active, created_by, updated_by
  ], (err, result) => {
    if (err){ return res.status(500).send({ msg: 'Insert failed', error: err });}
     else {
    return res.status(200).send({
        data: result,
        msg: "Success",
      });
        
    }
  });
});

app.get('/get_all_bin_cli', (req, res) => {
  db.query('SELECT * FROM bin_cli', (err, results) => {
    if (err) return res.status(500).send({ msg: 'Database error', error: err });
    if (!results.length) return res.status(404).send({ msg: 'No bins found' });
    res.status(200).send({ data: results, msg: 'Success' });
  });
});

app.get('/get_all_bin_clis', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const offset = (page - 1) * limit;
  const searchCondition = `%${search}%`;

  const dataQuery = `
    SELECT * FROM bin_cli
    WHERE bin_name LIKE ?
    ORDER BY bin_cli_id DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total FROM bin_cli
    WHERE bin_name LIKE ?
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


app.get('/get_bin_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM bin_cli WHERE bin_cli_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send({ msg: 'Error fetching bin', error: err });
    if (!results.length) return res.status(404).send({ msg: 'Bin not found' });
    res.status(200).send({ data: results[0], msg: 'Success' });
  });
});

app.put('/update_bin_cli/:id', (req, res) => {
  const id = req.params.id;
  const {
    bin_name, category_id, product_prefix, floor_level,
    rack_no, rack_level, max_occupancy, sort_order, bin_image,
    show_on_ecommerce, show_on_eprocurement, show_on_pos,
    read_weight_from_scale, is_active, updated_by
  } = req.body;

  const query = `
    UPDATE bin_cli SET 
      bin_name = ?, category_id = ?, product_prefix = ?, floor_level = ?,
      rack_no = ?, rack_level = ?, max_occupancy = ?, sort_order = ?, bin_image = ?,
      show_on_ecommerce = ?, show_on_eprocurement = ?, show_on_pos = ?,
      read_weight_from_scale = ?, is_active = ?, updated_by = ?
    WHERE bin_cli_id = ?
  `;

  db.query(query, [
    bin_name, category_id, product_prefix, floor_level,
    rack_no, rack_level, max_occupancy, sort_order, bin_image,
    show_on_ecommerce, show_on_eprocurement, show_on_pos,
    read_weight_from_scale, is_active, updated_by, id
  ], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Update failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Bin not found' });
    res.status(200).send({ msg: 'Updated successfully' });
  });
});

app.delete('/delete_bin_cli/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM bin_cli WHERE bin_cli_id = ?', [id], (err, result) => {
    if (err) return res.status(500).send({ msg: 'Delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).send({ msg: 'Bin not found' });
    res.status(200).send({ msg: 'Deleted successfully' });
  });
});

app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app