const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/Database.js'); // Assuming this path is correct
const userMiddleware = require('../middleware/UserModel.js'); // Assuming this path is correct
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

// ✅ Get all Price Groups
app.get('/getAll', (req, res) => {
    db.query(`SELECT * FROM price_group WHERE price_group_id != '' `, (err, result) => {
        if (err) {
            // Standardizing error response
            return res.status(400).send({ msg: 'Failed', data: err });
        }
        // Standardizing success response
        return res.status(200).send({ msg: 'Success', data: result });
    });
});

// ✅ Get Price Group by ID
app.post('/getPriceGroupById', (req, res) => {
    // Using db.escape for safe parameter handling
    db.query(`SELECT price_group_name, description, status FROM price_group WHERE price_group_id = ${db.escape(req.body.price_group_id)}`, (err, result) => {
        if (err) {
            return res.status(400).send({ msg: 'Failed', data: err });
        }
        return res.status(200).send({ msg: 'Success', data: result });
    });
});

// ✅ Insert Price Group
app.post('/insertPriceGroup', (req, res) => {
    const data = {
        price_group_name: req.body.price_group_name,
        description: req.body.description,
        status: req.body.status || 1, // Default to 1 if not provided, similar to is_active
        creation_date: new Date(),
        created_by: req.body.created_by,
        modified_by: req.body.modified_by, // Can be null initially or same as created_by
        modification_date: new Date() // Can be null initially or same as creation_date
    };

    db.query(`INSERT INTO price_group SET ?`, data, (err, result) => {
        if (err) {
            return res.status(400).send({ msg: 'Failed', data: err });
        }
        return res.status(200).send({ msg: 'Success', data: result });
    });
});

// ✅ Edit Price Group
app.post('/update', (req, res) => {
    const {
        price_group_name,
        description,
        status,
        modified_by,
        price_group_id,
    } = req.body;

    const sql = `
        UPDATE price_group SET
            price_group_name = ?,
            description = ?,
            status = ?,
            modification_date = ?,
            modified_by = ?
        WHERE price_group_id = ?
    `;

    db.query(
        sql,
        [price_group_name, description, status, new Date(), modified_by, price_group_id],
        (err, result) => {
            if (err) {
                return res.status(400).send({ msg: 'Failed', data: err });
            }
            return res.status(200).send({ msg: 'Success', data: result });
        }
    );
});


// ✅ Delete Price Group
app.post('/delete', (req, res) => {
    // Changing to POST and using req.body.price_group_id for consistency
    db.query(
        `DELETE FROM price_group WHERE price_group_id = ${db.escape(req.body.price_group_id)}`,
        (err, result) => {
            if (err) {
                return res.status(400).send({ msg: 'Failed', data: err });
            }
            return res.status(200).send({ msg: 'Success', data: result });
        }
    );
});

module.exports = app;
