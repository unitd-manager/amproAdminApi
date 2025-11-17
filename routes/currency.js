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
app.get('/getCurrency', (req, res, next) => {
  db.query(`Select 
  s.*
  From currency s
  Where s.currency_id !=''`,
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






app.post('/getCuerrencyById', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  From currency s
  Where s.currency_id=${db.escape(req.body.currency_id)}`,
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



app.post('/getCuerrencyByPurchaseorderId', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  s.currency_id,
  s.purchase_order_id
  From currency s
  Where s.purchase_order_id=${db.escape(req.body.purchase_order_id)}`,
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


app.post('/getCuerrencyByGoodsReturnId', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  s.currency_id,
  s.goods_return_id
  From currency s
  Where s.goods_return_id=${db.escape(req.body.goods_return_id)}`,
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

app.post('/getCuerrencyByPurchaseInvoiceId', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  s.currency_id,
  s.purchase_invoice_id
  From currency s
  Where s.purchase_invoice_id=${db.escape(req.body.purchase_invoice_id)}`,
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

app.post('/getCuerrencyByPurchaseDebitNoteId', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  s.currency_id,
  s.purchase_debit_note_id
  From currency s
  Where s.purchase_debit_note_id=${db.escape(req.body.purchase_debit_note_id)}`,
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

app.post('/editCurrency', (req, res, next) => {
  db.query(`UPDATE currency 
            SET currency_name=${db.escape(req.body.currency_name)}
            ,currency_rate=${db.escape(req.body.currency_rate)}
             ,currency_code=${db.escape(req.body.currency_code)}
             ,purchase_order_id = ${db.escape(req.body.purchase_order_id)}
            WHERE currency_id = ${db.escape(req.body.currency_id)}`,
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
  
app.post('/insertCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , purchase_order_id	: req.body.purchase_order_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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

app.post('/insertPurchaseOrderCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , purchase_order_id	: req.body.purchase_order_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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



app.post('/getCuerrencyByGoodsReceiptId', (req, res, next) => {
  db.query(` Select 
  s.currency_code,
  s.currency_rate,
  s.currency_name,
  s.currency_id,
  s.goods_receipt_id
  From currency s
  Where s.goods_receipt_id=${db.escape(req.body.goods_receipt_id)}`,
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


app.post('/editGoodsCurrency', (req, res, next) => {
  db.query(`UPDATE currency 
            SET currency_name=${db.escape(req.body.currency_name)}
            ,currency_rate=${db.escape(req.body.currency_rate)}
             ,currency_code=${db.escape(req.body.currency_code)}
             ,goods_receipt_id = ${db.escape(req.body.goods_receipt_id)}
            WHERE currency_id = ${db.escape(req.body.currency_id)}`,
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
  
  
app.post('/editGoodsReturnCurrency', (req, res, next) => {
  db.query(`UPDATE currency 
            SET currency_name=${db.escape(req.body.currency_name)}
            ,currency_rate=${db.escape(req.body.currency_rate)}
             ,currency_code=${db.escape(req.body.currency_code)}
             ,goods_return_id = ${db.escape(req.body.goods_return_id)}
            WHERE currency_id = ${db.escape(req.body.currency_id)}`,
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
  
  
  
app.post('/editPurchaseInvoiceCurrency', (req, res, next) => {
  db.query(`UPDATE currency 
            SET currency_name=${db.escape(req.body.currency_name)}
            ,currency_rate=${db.escape(req.body.currency_rate)}
             ,currency_code=${db.escape(req.body.currency_code)}
             ,purchase_invoice_id = ${db.escape(req.body.purchase_invoice_id)}
            WHERE currency_id = ${db.escape(req.body.currency_id)}`,
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
  
  
app.post('/editPurchaseDebitNoteCurrency', (req, res, next) => {
  db.query(`UPDATE currency 
            SET currency_name=${db.escape(req.body.currency_name)}
            ,currency_rate=${db.escape(req.body.currency_rate)}
             ,currency_code=${db.escape(req.body.currency_code)}
             ,purchase_debit_note_id = ${db.escape(req.body.purchase_debit_note_id)}
            WHERE currency_id = ${db.escape(req.body.currency_id)}`,
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
  
  
app.post('/insertGoodsCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , goods_receipt_id	: req.body.goods_receipt_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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

app.post('/insertGoodsReturnCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , goods_return_id	: req.body.goods_return_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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

  
app.post('/insertPurchaseInvoiceCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , purchase_invoice_id	: req.body.purchase_invoice_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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

app.post('/insertPurchaseDebitNoteCurrency', (req, res, next) => {

  let data = {	
     creation_date: new Date().toISOString()
    , modification_date: null
    , currency_rate: req.body.currency_rate
    , currency_name	: req.body.currency_name
     , currency_code	: req.body.currency_code
      , purchase_debit_note_id	: req.body.purchase_debit_note_id
    , created_by: req.body.created_by

 };
  let sql = "INSERT INTO currency SET ?";
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





app.post('/deleteCurrency', (req, res, next) => {

  let data = {currency_id: req.body.currency_id};
  let sql = "DELETE FROM currency WHERE ?";
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