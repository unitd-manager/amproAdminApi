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


app.get("/getContact", (req, res, next) => {
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

app.post('/getContactsById', (req, res, next) => {
  db.query(`select contact_id
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
  ,otp_no
  ,created_by
  ,modified_by
  from contact
  where contact_id =${db.escape(req.body.contact_id)}`,
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
  db.query(`UPDATE contact
            SET name=${db.escape(req.body.name)}
            ,company_name=${db.escape(req.body.company_name)}
            ,position=${db.escape(req.body.position)}
            ,email=${db.escape(req.body.email)}
            ,address2=${db.escape(req.body.address2)}
            ,address_area=${db.escape(req.body.address_area)}
            ,address_state=${db.escape(req.body.address_state)}
            ,address_country_code=${db.escape(req.body.address_country_code)}
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
            ,activated=${db.escape(req.body.activated)}
            ,address_city=${db.escape(req.body.address_city)}
            ,department=${db.escape(req.body.department)}
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
   , department: req.body.department};
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

app.post('/deleteContact', (req, res, next) => {

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




app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;