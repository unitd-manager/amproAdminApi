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

app.get("/getContacts", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as mobile
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='contactUs' `,
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

app.get("/getContactSubByiD", (req, res, next) => {
  db.query(
    `Select s.contact_person_sub_id
  ,s.contact_id
  ,s.fax_no
  ,s.contact_person
  ,s.handphone_no
  ,s.designation
  ,s.email
  From contact_person_sub s
  WHERE s.contact_id='${db.escape(req.body.contact_id)}' `,
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

app.get("/getContactBySupplierId", (req, res, next) => {
  db.query(
    `Select s.*
  From contact s
  WHERE s.supplier_id='${db.escape(req.body.supplier_id)}' `,
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

app.post("/getContactByContactId", (req, res, next) => {
  db.query(
    `Select s.*
  From contact s
  WHERE s.company_id=${db.escape(req.body.company_id)} `,
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


app.get("/getMobileContacts", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as mobile1
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='mobile1' `,
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

app.post('/forgotPass', (req, res, next) => {
  db.query(`SELECT email, pass_word FROM contact WHERE email =${db.escape(req.body.email)}`,
    (err, result) => {
     
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
});


app.get("/getEmail", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as mailId
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s 
  WHERE s.key_text='email' `,
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

app.get("/getWebsite", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as web
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='website' `,
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


app.get("/getAddress", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as addr
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='address' `,
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


app.get("/getAddress1", (req, res, next) => {
  db.query(
    `Select s.key_text
  ,s.description
  ,s.value as addr1
  ,s.value_type
  ,s.creation_date
  ,s.modification_date
  ,s.setting_id
  ,s.published
  From setting s
  WHERE s.key_text='address1' `,
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


app.get("/getContacts", (req, res, next) => {
  db.query(
    `select contact_id
  ,name 
  ,company_name
  ,position
  ,email
  ,address2
  ,address_area
  ,address_state
  ,address_country_code
  ,address_po_code
  ,phone
  ,notes
  ,published
  ,creation_date
  ,modification_date
  ,pass_word
  ,subscribe
  ,first_name
  ,last_name
  ,mobile
  ,address
  ,flag
  ,random_no
  ,member_status
  ,member_type
  ,address1
  ,phone_direct
  ,fax
  ,activated
  ,address_city 
  ,department
  from contact
  where contact_id !='' `,
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

app.get('/getContactss', (req, res) => {
  const { company_name, mobile, is_active } = req.query;

  let query = `
    SELECT
      c.*,
      CASE 
        WHEN c.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
      END AS status_display
    FROM company c
    WHERE 1=1
  `;

  const params = [];

  if (company_name) {
    query += ' AND (c.company_name LIKE ? OR c.first_name LIKE ?)';
    params.push(`%${company_name}%`, `%${company_name}%`);
  }

  if (mobile) {
    query += ' AND c.mobile LIKE ?';
    params.push(`%${mobile}%`);
  }

  if (is_active !== undefined && is_active !== '') {
    const active = parseInt(is_active, 10);
    if (active === 1) {
      query += ' AND c.is_active = 1';
    } else if (active === 0) {
      query += ' AND (c.is_active = 0 OR c.is_active IS NULL)';
    }
  }

  query += ' ORDER BY c.company_id DESC';

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      return res.status(500).send({
        msg: 'Error fetching contacts',
        data: err,
        query,
        params
      });
    }

    const processedResults = result.map(contact => ({
      ...contact,
      status_display: contact.is_active === 1 ? 'Active' : 'Inactive'
    }));

    res.status(200).send({
      msg: 'Success',
      data: processedResults,
      total_count: processedResults.length,
      filtered_count: processedResults.length
    });
  });
});

app.post('/updateContactStatus', (req, res) => {
  const { company_id, is_active } = req.body;

  // Validate input
  if (!company_id || typeof is_active === 'undefined') {
    return res.status(400).send({
      msg: 'Missing company_id or is_active in request body',
    });
  }

  const query = `
    UPDATE company 
    SET is_active = ? 
    WHERE company_id = ?
  `;

  db.query(query, [is_active, company_id], (err, result) => {
    if (err) {
      console.error('Error updating contact status:', err);
      return res.status(500).send({
        msg: 'Failed to update contact status',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({
        msg: 'Company not found or no change made',
      });
    }

    res.status(200).send({
      msg: 'Company status updated successfully',
    });
  });
});


app.post('/getContactssById', (req, res, next) => {
  db.query(`select c.*
  from company c
  where c.company_id =${db.escape(req.body.company_id)}`,
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
            });

        }
 
    }
  );
});

app.post('/getFavByContactId', (req, res, next) => {
  db.query(`select w.wish_list_id 
  ,w.qty 
  ,w.unit_price
  ,w.product_id
  ,w.creation_date
  ,w.modification_date
  ,w.order_id
  ,w.contact_id
  ,w.added_to_cart_date
  ,c.first_name
  ,c.contact_id
  ,p.*
   ,GROUP_CONCAT(m.file_name) AS images
     from wish_list w
     LEFT JOIN media m ON (m.record_id = w.product_id) AND (m.room_name='product')
      LEFT JOIN contact c ON (c.contact_id = w.contact_id)
   LEFT JOIN product p ON (p.product_id = w.product_id)
      where c.contact_id =${db.escape(req.body.contact_id)}
     GROUP BY p.product_id`,
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
            });

        }
 
    }
  );
});

app.post('/getRazorpayEmail', (req, res, next) => {
  db.query(`SELECT o.cust_first_name
        ,o.cust_email
        ,o.cust_phone
         FROM orders o  WHERE o.order_id =${db.escape(req.body.order_id)}`,
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
            });

        }
 
    }
  );
});




app.post('/getCompareByContactId', (req, res, next) => {
  db.query(`select w.product_compare_id  
  ,w.qty 
  ,w.unit_price
  ,w.session_id
  ,w.module
  ,w.product_id
  ,w.creation_date
  ,w.modification_date
  ,w.order_id
  ,w.contact_id
  ,w.package_type
  ,w.category_type
  ,w.delivery_mode
  ,m.file_name
  ,c.contact_id
  ,p.*
   ,GROUP_CONCAT(m.file_name) AS images
     from product_compare w
     LEFT JOIN media m ON (m.record_id = w.product_id) AND (m.room_name='product')
      LEFT JOIN contact c ON (c.contact_id = w.contact_id)
   LEFT JOIN product p ON (p.product_id = w.product_id)
      where c.contact_id =${db.escape(req.body.contact_id)}
     GROUP BY p.product_id`,
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
            });

        }
 
    }
  );
});



app.post('/insertToWishlist', (req, res, next) => {

  let data = {contact_id	:req.body.contact_id	
   , product_id	: req.body.product_id	
   ,qty : req.body.qty || 1.00
   , creation_date: req.body.creation_date
   , modification_date: req.body.modification_date
   ,order_id:req.body.order_id
 };
  let sql = "INSERT INTO wish_list SET ?";
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

app.post('/insertToSalesman', (req, res, next) => {

  let data = {company_id	:req.body.company_id	
   , creation_date: req.body.creation_date
    , salesman_title: req.body.salesman_title
   , modification_date: req.body.modification_date
 };
  let sql = "INSERT INTO customer_salesmen SET ?";
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

app.post('/getSalesmanByCustomerId', (req, res, next) => {
  db.query(
    `SELECT b.*
     FROM customer_salesmen b
     WHERE b.company_id = ${db.escape(req.body.company_id)}`,
    (err, result) => {
      if (err) {
        console.log('error:', err);
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


app.post('/insertToCompare', (req, res, next) => {

  let data = {product_compare_id 	:req.body.product_compare_id 	
   , qty	: req.body.qty	
   ,unit_price : req.body.unit_price 
   , session_id: req.body.session_id
   , module: req.body.module
   ,product_id:req.body.product_id
   , creation_date	: req.body.creation_date	
   ,modification_date : req.body.modification_date 
   , order_id: req.body.order_id
   , contact_id: req.body.contact_id
   ,order_date:req.body.order_date
   , package_type	: req.body.package_type	
   ,category_type : req.body.category_type 
   ,delivery_mode: req.body.delivery_mode
   };
  let sql = "INSERT INTO product_compare SET ?";
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


app.post('/getCartProductsByContactId', (req, res, next) => {
  db.query(`select b.basket_id 
  ,b.qty 
  ,b.unit_price
  ,b.product_id
  ,b.creation_date
  ,b.modification_date
  ,b.order_id
  ,b.contact_id
  ,b.session_id
  ,c.first_name
  ,c.contact_id
  ,p.*
  ,p.price
  ,p.discount_amount
 ,GROUP_CONCAT(m.file_name) AS images
      from basket b
    LEFT JOIN media m ON (m.record_id = b.product_id) AND (m.room_name='product')
  LEFT JOIN contact c ON (c.contact_id = b.contact_id)
   LEFT JOIN product p ON (p.product_id = b.product_id)
      where c.contact_id =${db.escape(req.body.contact_id)}
     GROUP BY p.product_id`,
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
            });

        }
 
    }
  );
});

app.post('/update-cart', (req, res, next) => {
  db.query(`UPDATE basket
            SET qty=${db.escape(req.body.qty)}
            WHERE basket_id=${db.escape(req.body.basket_id)}`,
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
                    });
              }
             }
          );
        });
      
app.post('/getCartProductsBySessionId', (req, res, next) => {
  db.query(`select b.basket_id 
  ,b.qty 
  ,b.unit_price
  ,b.product_id
  ,b.creation_date
  ,b.modification_date
  ,b.order_id
  ,b.contact_id
  ,b.session_id
  ,c.first_name
  ,c.contact_id
  ,p.*
  ,p.price
  ,p.discount_amount
 ,GROUP_CONCAT(m.file_name) AS images
      from basket b
    LEFT JOIN media m ON (m.record_id = b.product_id) AND (m.room_name='product')
  LEFT JOIN contact c ON (c.contact_id = b.contact_id)
   LEFT JOIN product p ON (p.product_id = b.product_id)
      where b.session_id =${db.escape(req.body.session_id)}
     GROUP BY p.product_id`,
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
            });

        }
 
    }
  );
});



app.post('/addToCart', (req, res, next) => {

  let data = {contact_id	:req.body.contact_id
  ,session_id:req.body.session_id
   , product_id	: req.body.product_id	
   ,qty : req.body.qty || 1.00
   , creation_date: req.body.creation_date
   , modification_date: req.body.modification_date
   ,order_id:req.body.order_id
 };
  let sql = "INSERT INTO basket SET ?";
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



app.post('/editContact', (req, res, next) => {
  db.query(`UPDATE company
            SET company_name=${db.escape(req.body.company_name)}
            ,position=${db.escape(req.body.position)}
            ,email=${db.escape(req.body.email)}
            ,address2=${db.escape(req.body.address2)}
            ,address_street=${db.escape(req.body.address_street)}
            ,address_area=${db.escape(req.body.address_area)}
            ,address_state=${db.escape(req.body.address_state)}
            ,address_country=${db.escape(req.body.address_country)}
            ,address_po_code=${db.escape(req.body.address_po_code)}
            ,phone=${db.escape(req.body.phone)}
            ,notes=${db.escape(req.body.notes)}
            ,published=${db.escape(req.body.published)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,pass_word=${db.escape(req.body.pass_word)}
            ,subscribe=${db.escape(req.body.subscribe)}
            ,first_name=${db.escape(req.body.first_name)}
            ,last_name=${db.escape(req.body.last_name)}
            ,mobile=${db.escape(req.body.mobile)}
            ,address=${db.escape(req.body.address)}
            ,flag=${db.escape(req.body.flag)}
            ,random_no=${db.escape(req.body.random_no)}
            ,member_status=${db.escape(req.body.member_status)}
            ,member_type=${db.escape(req.body.member_type)}
            ,address1=${db.escape(req.body.address1)}
            ,phone_direct=${db.escape(req.body.phone_direct)}
            ,fax=${db.escape(req.body.fax)}
            ,terms=${db.escape(req.body.terms)}
            ,fax_no=${db.escape(req.body.fax_no)}
            ,credit_limit=${db.escape(req.body.credit_limit)}
             ,web_site=${db.escape(req.body.web_site)}
              ,company_reg_no=${db.escape(req.body.company_reg_no)}
               ,cheque_print_name=${db.escape(req.body.cheque_print_name)}
                        ,currency=${db.escape(req.body.currency)}
                                    ,hand_phone_no=${db.escape(req.body.hand_phone_no)}
            ,area=${db.escape(req.body.area)}
            ,country_postal=${db.escape(req.body.country_postal)}
            ,contact_type=${db.escape(req.body.contact_type)}
             ,tax_type=${db.escape(req.body.tax_type)}
             ,price_group=${db.escape(req.body.price_group)}
             ,remarks=${db.escape(req.body.remarks)}
            ,activated=${db.escape(req.body.activated)}
            ,address_city=${db.escape(req.body.address_city)}
            ,department=${db.escape(req.body.department)}
             ,hand_phone_no=${db.escape(req.body.hand_phone_no)}
            ,is_active=${db.escape(req.body.is_active)}
            WHERE company_id=${db.escape(req.body.company_id)}`,
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
            });
      }
     }
  );
});

app.post('/editContactData', (req, res, next) => {
  db.query(`UPDATE contact
            SET name=${db.escape(req.body.name)}
            ,company_name=${db.escape(req.body.company_name)}
            ,position=${db.escape(req.body.position)}
            ,email=${db.escape(req.body.email)}
            ,phone=${db.escape(req.body.phone)}
            ,notes=${db.escape(req.body.notes)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,first_name=${db.escape(req.body.first_name)}
            ,last_name=${db.escape(req.body.last_name)}
            ,mobile=${db.escape(req.body.mobile)}
            ,phone_direct=${db.escape(req.body.phone_direct)}
            ,fax=${db.escape(req.body.fax)}
            ,department=${db.escape(req.body.department)}
            WHERE contact_id=${db.escape(req.body.contact_id)}`,
    (err, result) => {
     
      if (err) {``
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
     }
  );
});

app.post('/editContactPassword', (req, res, next) => {
  db.query(`UPDATE contact
            SET pass_word=${db.escape(req.body.pass_word)}
            WHERE contact_id=${db.escape(req.body.contact_id)}`,
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
            });
      }
     }
  );
});

app.post('/editContactAddress', (req, res, next) => {
  db.query(`UPDATE contact
            SET address2=${db.escape(req.body.address2)}
            ,address_area=${db.escape(req.body.address_area)}
            ,address_state=${db.escape(req.body.address_state)}
            ,address_country_code=${db.escape(req.body.address_country_code)}
            ,address_po_code=${db.escape(req.body.address_po_code)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,address=${db.escape(req.body.address)}
             ,address1=${db.escape(req.body.address1)}
            ,address_city=${db.escape(req.body.address_city)}
            WHERE contact_id=${db.escape(req.body.contact_id)}`,
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
            });
      }
     }
  );
});


app.post('/insertContact', (req, res, next) => {

  let data = {name	:req.body.name	
   , company_name	: req.body.company_name	
   , position: req.body.position
   , email: req.body.email
    , company_id: req.body.company_id
   , address2: req.body.address2
   , address_area	: req.body.address_area
   , address_state	: req.body.address_state
   , address_country_code: req.body.address_country_code
   , address_po_code: req.body.address_po_code
   , phone: req.body.phone
   , notes	: req.body.notes	
   , published: req.body.published
   , creation_date: req.body.creation_date
   , modification_date: req.body.modification_date
   , pass_word: req.body.pass_word
   , subscribe: req.body.subscribe
   , first_name	: req.body.first_name
   , last_name	: req.body.last_name
   , mobile: req.body.mobile
   , address: req.body.address
   , flag: req.body.flag
   , random_no: req.body.random_no
   , member_status: req.body.member_status
   , member_type: req.body.member_type
   , address1: req.body.address1
   , phone_direct: req.body.phone_direct
   , fax	: req.body.fax
   , activated	: req.body.activated
   , address_city: req.body.address_city
   ,created_by: req.body.created_by
   ,supplier_id: req.body.supplier_id
   ,hand_phone_no : req.body.hand_phone_no
   ,is_active : req.body.is_active
   ,contact_type : req.body.contact_type
   ,designation : req.body.designation
     ,customer_code : req.body.customer_code
   ,price_group : req.body.price_group
    ,currency : req.body.currency
        ,contact_person_sub_id : req.body.contact_person_sub_id
        ,product_id : req.body.product_id
        ,employee_id : req.body.employee_id
        ,transaction_id : req.body.employee_id
   ,department: req.body.department};
  let sql = "INSERT INTO contact SET ?";
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


app.post('/insertShipping', (req, res) => {
  const {
     company_id,
    delivery_name,
    delivery_address1,
    delivery_address2,
    delivery_address3,
    phone_no,
    handphone_no,
    fax_no,
    email,
    country_postal,
    attention,
    default_load_on_invoice,
  } = req.body;

  const sql = `INSERT INTO delivery_address (
    company_id,
    delivery_name,
    delivery_address1,
    delivery_address2,
    delivery_address3,
    phone_no,
    handphone_no,
    fax_no,
    email,
    country_postal,
    attention,
    default_load_on_invoice
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    company_id,
    delivery_name,
    delivery_address1,
    delivery_address2,
    delivery_address3,
    phone_no,
    handphone_no,
    fax_no,
    email,
    country_postal,
    attention,
    default_load_on_invoice,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Error inserting shipping:', err);
      return res.status(500).send({ msg: 'Failed to insert shipping' });
    }
    res.status(200).send({
      msg: 'Shipping inserted successfully',
      data: { insertId: result.insertId },
    });
  });
});



// POST /contact/insertContactPersonsBatch
app.post('/contact/insertContactPersonsBatch', (req, res) => {
    const { contact_id, contact_persons } = req.body;

    if (!contact_id || !Array.isArray(contact_persons) || contact_persons.length === 0) {
        return res.status(400).send({ msg: 'Contact ID and a non-empty array of contact persons are required.' });
    }

    // Prepare data for batch insert
    const values = contact_persons.map(person => [
        contact_id,
        person.contact_person,
        person.email,
        person.phone_no,
        person.handphone_no,
        person.fax_no,
        person.designation
        // moment().format('YYYY-MM-DD HH:mm:ss'), // creation_date
        // moment().format('YYYY-MM-DD HH:mm:ss'), // modification_date
        // Add any other default or system-generated fields here
    ]);

    // SQL for batch insert (assuming you have a `contact_person_sub` table)
    const sql = `INSERT INTO contact_person_sub (
        contact_id,
        contact_person,
        email,
        phone_no,
        handphone_no,
        fax_no,
        designation,
    ) VALUES ?`; // The '?' will be replaced by the array of arrays (values)

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error batch inserting contact persons:', err);
            return res.status(500).send({ data: err, msg: 'Failed to insert contact persons.' });
        }
        res.status(200).send({ data: result, msg: 'Contact persons inserted successfully.' });
    });
});

app.post('/deleteContact', (req, res, next) => {

  let data = {company_id: req.body.company_id};
  let sql = "DELETE FROM company WHERE ?";
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


app.post('/deleteSalesMan', (req, res, next) => {

  let data = {customer_salesmen_id: req.body.customer_salesmen_id};
  let sql = "DELETE FROM customer_salesmen WHERE ?";
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


app.post('/deleteContactss', (req, res, next) => {

  let data = {contact_id: req.body.contact_id};
  let sql = "DELETE FROM contact WHERE ?";
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



app.post('/deleteShipping', (req, res, next) => {

  let data = {delivery_address_id: req.body.delivery_address_id};
  let sql = "DELETE FROM delivery_address  WHERE ?";
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


app.post('/getUserById', (req, res, next) => {
  db.query(`select address2
  ,address_area
  ,address_state
  , address_country_code 
  ,address_po_code
  ,phone
  from contact 
  WHERE contact_id=${db.escape(req.body.contact_id)}`,
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
            });

        }
 
    }
  );
});

app.get('/getClients', (req, res, next) => {
  db.query(`Select c.company_name
  ,c.company_id
  ,c.phone
  ,c.status
  ,c.website
  ,c.email
  ,c.status
  ,c.fax
  ,c.address_flat
  ,c.address_street
  ,c.address_country
  ,c.address_po_code
  ,c.retention
  ,c.creation_date
  ,c.creation_date
  ,c.flag
  From company c 
  Where c.company_id !=''`,
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
            });

        }
 
    }
  );
});

app.post('/getClientsById', (req, res, next) => {
  db.query(`Select c.company_name
  ,c.company_id
  ,c.phone
  ,c.website
  ,c.email
  ,c.status
  ,c.fax
  ,c.flag
  ,c.address_flat
  ,c.address_street
  ,c.address_country
  ,c.address_po_code
  ,c.retention
  ,c.creation_date
  ,c.modification_date
  ,c.created_by
  ,c.modified_by
  From company c 
  Where c.company_id =${db.escape(req.body.company_id)}`,
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
            });

        }
 
    }
  );
});

app.post('/getContactByCompanyId', (req, res, next) => {
  db.query(`SELECT * FROM contact WHERE company_id =${db.escape(req.body.company_id)}`,
    (err, result) => {
     
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
});


app.post('/getShippingByContactId', (req, res, next) => {
  db.query(`SELECT * FROM delivery_address WHERE company_id =${db.escape(req.body.company_id)}`,
    (err, result) => {
     
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
        }
 
    }
  );
});

app.post('/update-flag', (req, res, next) => {
  db.query(`UPDATE company
            SET flag=${db.escape(req.body.flag)}
            WHERE company_id=${db.escape(req.body.company_id)}`,
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
                    });
              }
             }
          );
        });
      
        
app.post('/editClients', (req, res, next) => {
  db.query(`UPDATE company
            SET company_name=${db.escape(req.body.company_name)}
            ,phone=${db.escape(req.body.phone)}
            ,website=${db.escape(req.body.website)}
            ,email=${db.escape(req.body.email)}
            ,modification_date=${db.escape(new Date().toISOString())}
            ,modified_by=${db.escape(req.staff)}
            ,fax=${db.escape(req.body.fax)}
            ,address_flat=${db.escape(req.body.address_flat)}
            ,address_street=${db.escape(req.body.address_street)}
            ,address_country=${db.escape(req.body.address_country)}
            ,address_po_code=${db.escape(req.body.address_po_code)}
            ,retention=${db.escape(req.body.retention)}
            WHERE company_id=${db.escape(req.body.company_id)}`,
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
            });
      }
     }
  );
});



app.post('/getProjectsByIdCompany', (req, res, next) => {
  db.query(`SELECT title
  ,category
  ,company_id
  ,project_value
  ,status
  ,contact_id
  ,start_date
  ,estimated_finish_date
  ,description
  ,project_manager_id
  ,project_id
  ,project_code
  FROM project WHERE company_id=${db.escape(req.body.company_id)}` ,
    (err, result) => {
       
      if (result.length === 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

        }
 
    }
  );
});




app.post('/getTendersByIdcompany', (req, res, next) => {
  db.query(`SELECT 
  title
  ,office_ref_no
  ,company_id
  ,contact_id
  ,mode_of_submission
  ,services
  ,site_show_date
  ,site_show_attendee
  ,actual_submission_date
  ,project_end_date
  ,status
  ,email
  ,opportunity_id
  ,opportunity_code
  ,price
  ,itq_ref_no
  FROM opportunity WHERE company_id=${db.escape(req.body.company_id)}` ,
    (err, result) => {
       
      if (result.length == 0) {
        return res.status(400).send({
          msg: 'No result found'
        });
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });

        }
 
    }
  );
});
app.post('/getMainInvoiceByidCompany', (req, res, next) => {
  db.query(`SELECT 
  i.invoice_id
  ,i.invoice_code
  ,i.invoice_date
  ,i.invoice_amount
  ,i.invoice_due_date
  ,i.title
  ,i.status
  ,i.invoice_type 
  ,cont.contact_id 
  ,c.company_id 
  ,CONCAT_WS(' ', cont.first_name, cont.last_name) AS contact_name 
  ,cont.position as position 
  ,cont.company_address_flat 
  ,cont.company_address_street 
  ,cont.company_address_town 
  ,cont.company_address_state 
  ,cont.company_address_country 
  ,c.company_name 
  ,p.title AS project_title 
  ,p.project_value AS project_value 
  ,p.currency AS project_currency 
  ,p.description AS project_description 
  ,p.project_code as project_code 
  ,ca.address_flat AS comp_mul_address_flat 
  ,ca.address_street AS comp_mul_address_street 
  ,ca.address_town AS comp_mul_address_town 
  ,ca.address_state AS comp_mul_address_state 
  ,ca.address_country AS comp_mul_address_country 
  ,DATEDIFF(Now() ,i.invoice_due_date) AS age 
  ,(IF(ISNULL(( SELECT FORMAT(SUM(invoice_amount), 0) 
  FROM invoice 
  WHERE project_id = i.project_id AND invoice_code < i.invoice_code AND status != LOWER('Cancelled') )), 0, ( SELECT FORMAT(SUM(invoice_amount), 0) 
  FROM invoice 
  WHERE project_id = i.project_id AND invoice_code < i.invoice_code AND status != LOWER('Cancelled') ))) AS prior_invoice_billed ,b.title AS branch_name 
  FROM invoice i LEFT JOIN (project p) ON (i.project_id = p.project_id) 
  LEFT JOIN (contact cont) ON (p.contact_id = cont.contact_id) 
  LEFT JOIN (company c) ON (p.company_id = c.company_id) 
  LEFT JOIN (company_address ca)ON (cont.company_address_id = ca.company_address_id) 
  LEFT JOIN branch b ON(p.branch_id = b.branch_id)
   WHERE c.company_id = ${db.escape(req.body.company_id)}`,
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
            });

      }

    }
  );
});

app.post("/deleteCartItem", (req, res, next) => {
  let data = { basket_id: req.body.basket_id };
  let sql = "DELETE FROM basket WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.post("/deleteWishlistItem", (req, res, next) => {
  let data = { wish_list_id: req.body.wish_list_id };
  let sql = "DELETE FROM wish_list WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.post("/deleteCompareItem", (req, res, next) => {
  let data = { product_compare_id: req.body.product_compare_id };
  let sql = "DELETE FROM product_compare WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.post("/clearWishlistItems", (req, res, next) => {
  let data = { contact_id: req.body.contact_id };
  let sql = "DELETE FROM wish_list WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});

app.post("/clearCartItems", (req, res, next) => {
  let data = { contact_id: req.body.contact_id };
  let sql = "DELETE FROM basket WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  });
});



app.post('/contact/insertContact', (req, res, next) => {
    let customerData = req.body;

    // Set creation/modification dates and created/modified by
    // customerData.creation_date = moment().format('YYYY-MM-DD HH:mm:ss');
    // customerData.modification_date = moment().format('YYYY-MM-DD HH:mm:ss');
    // For 'created_by' and 'modified_by', you should ideally get this from authenticated user context

    // Remove any fields that should not be directly inserted into 'contact' table
    // E.g., the 'salesmen' array from the frontend.
    // Ensure you only insert columns that actually exist in your 'contact' table.
    const { salesmen, ...coreContactData } = customerData; // Exclude 'salesmen' array

    let sql = 'INSERT INTO contact SET ?';
    db.query(sql, coreContactData, (err, result) => {
        if (err) {
            console.error('Error inserting contact:', err);
            return res.status(400).send({ data: err, msg: 'Failed to insert contact' });
        } else {
            return res.status(200).send({
                data: result,
                msg: 'Contact inserted successfully',
                insertId: result.insertId // Return the ID of the new contact
            });
        }
    });
});

// 2. Add Salesman to Customer (Association)
app.post('/customer/addCustomerSalesman', (req, res, next) => {
    const { contact_id, employee_id } = req.body;

    if (!contact_id || !employee_id) {
        return res.status(400).send({ msg: 'Contact ID and Employee ID are required' });
    }

    // Optional: Check if association already exists to prevent duplicates (good practice)
    db.query(
        `SELECT * FROM customer_salesmen WHERE contact_id = ? AND employee_id = ?`,
        [contact_id, employee_id],
        (err, result) => {
            if (err) {
                console.error('Error checking existing salesman association:', err);
                return res.status(500).send({ data: err, msg: 'Failed to check existing association' });
            }

            if (result.length > 0) {
                return res.status(409).send({ msg: 'Salesman already associated with this customer' });
            }

            // If not exists, proceed with insert
            let data = {
                contact_id: contact_id,
                employee_id: employee_id,
                creation_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                modification_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            };

            let sql = 'INSERT INTO customer_salesmen SET ?';
            db.query(sql, data, (err, result) => {
                if (err) {
                    console.error('Error adding salesman to customer:', err);
                    return res.status(400).send({ data: err, msg: 'Failed to add salesman to customer' });
                } else {
                    return res.status(200).send({
                        data: result,
                        msg: 'Salesman added successfully to customer',
                        customer_salesmen_id: result.insertId
                    });
                }
            });
        }
    );
});

// 3. Get All Salesmen (for dropdown in frontend)
app.get('/customer/getAllSalesmen', (req, res, next) => {
    db.query(
        `SELECT employee_id, employee_name
         FROM employee ORDER BY employee_name ASC`, // Order for better display
        (err, result) => {
            if (err) {
                console.error('Error fetching salesmen list:', err);
                return res.status(400).send({ data: err, msg: 'Failed to get salesmen list' });
            } else {
                return res.status(200).send({
                    data: result,
                    msg: 'Success',
                });
            }
        }
    );
});

// You'll also need a DELETE endpoint for salesmen if you manage associations after creation
app.post('/customer/deleteCustomerSalesman', (req, res, next) => {
    const { customer_salesmen_id } = req.body;

    if (!customer_salesmen_id) {
        return res.status(400).send({ msg: 'customer_salesmen_id is required' });
    }

    let sql = 'DELETE FROM customer_salesmen WHERE customer_salesmen_id = ?';
    db.query(sql, [customer_salesmen_id], (err, result) => {
        if (err) {
            console.error('Error deleting salesman from customer:', err);
            return res.status(400).send({ data: err, msg: 'Failed to delete salesman from customer' });
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send({ msg: 'Salesman association not found' });
            }
            return res.status(200).send({
                data: result,
                msg: 'Salesman deleted successfully from customer',
            });
        }
    });
}); 

app.post('/updateContactPerson', (req, res) => {
  const { contact_person, contact_id, fax_no, phone_no, handphone_no,email } = req.body;

  const query = `
    UPDATE contact_person_sub
    SET contact_person = ?, designation = ?, contact_id = ?, fax_no = ?, phone_no = ? ,handphone_no = ?,email = ?
    WHERE contact_person_sub_id = ?
  `;

  db.query(query, [designation, fax_no, phone_no, contact_person,handphone_no,email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating UOM' });
    res.json({ message: 'UOM updated successfully' });
  });
});  



app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;