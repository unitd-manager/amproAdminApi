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
app.get('/getClients', (req, res, next) => {
  db.query(`Select c.company_name
  ,c.company_id
  ,c.phone
  ,c.status
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
  ,c.creation_date
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

app.get('/getClientsbyfilter', (req, res, next) => {
const { keyword } = req.query; // Extract query parameters

db.query(`Select c.company_name
,c.company_id
,c.phone
,c.status
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
,c.creation_date
From company c 
where c.company_name LIKE CONCAT('%',  ${db.escape(keyword)}, '%') 
GROUP BY c.company_id`,
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




app.post('/editClients', (req, res, next) => {
  db.query(`UPDATE company
            SET company_name=${db.escape(req.body.company_name)}
            ,phone=${db.escape(req.body.phone)}
            ,website=${db.escape(req.body.website)}
            ,email=${db.escape(req.body.email)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
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


app.post('/insertCompany', (req, res, next) => {

  let data = {company_name	:req.body.company_name	
   , email	: req.body.email	
   , address_street: req.body.address_street
   , address_town: req.body.address_town
   , address_state: req.body.address_state
   , address_country	: req.body.address_country
   , address_po_code	: req.body.address_po_code
   , phone: req.body.phone
   , fax: req.body.fax
   , notes: req.body.notes
   , creation_date: req.body.creation_date
   , modification_date	: req.body.modification_date	
   , mobile	: req.body.mobile	
   , flag: req.body.flag
   , address_flat: req.body.address_flat
   , status: 'current'
   , website: req.body.website
   , category: req.body.category
   , comment_by	: req.body.comment_by
   , company_size	: req.body.company_size
   , industry: req.body.industry
   , source: req.body.source
   , group_name: req.body.group_name
   , supplier_type: req.body.supplier_type
   , created_by		: req.body.created_by
   , modified_by	: req.body.modified_by	
   , chi_company_name: req.body.chi_company_name
   , chi_company_address: req.body.chi_company_address
   , company_address_id: req.body.company_address_id
   , contact_person: req.body.contact_person
   , billing_address_flat	: req.body.billing_address_flat
   , billing_address_street	: req.body.billing_address_street
   , billing_address_country: req.body.billing_address_country
   , billing_address_po_code: req.body.billing_address_po_code
   , client_code: req.body.client_code
   , latitude: req.body.latitude
   , longitude	: req.body.longitude	
   , retention	: req.body.retention };
  let sql = "INSERT INTO company SET ?";
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

app.post('/deleteCompany', (req, res, next) => {

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


app.get('/getContactLinked', (req, res, next) => {
  db.query(`SELECT c.contact_id 
  ,c.first_name
  ,c.email
  ,c.phone
  ,c.mobile
  ,c.position
  ,c.department 
   ,c.salutation
  FROM contact c WHERE c.company_id != ''`,
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

app.post('/getContactLinkedByCompanyId', (req, res, next) => {
  db.query(`SELECT c.company_id
   ,c.contact_id 
  ,c.first_name
  ,c.email
  ,c.phone
  ,c.phone_direct
  ,c.fax
  ,c.mobile
  ,c.position
  ,c.department 
  ,c.salutation
  FROM contact c WHERE company_id=${db.escape(req.body.company_id)}`,
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

app.post('/getContactLinkedByContactId', (req, res, next) => {
  db.query(`SELECT c.company_id
  ,c.contact_id 
  ,c.first_name
  ,c.email
  ,c.phone
  ,c.phone_direct
  ,c.fax
  ,c.mobile
  ,c.position
  ,c.department 
   ,c.salutation
  FROM contact c WHERE contact_id =  ${db.escape(req.body.contact_id)}`,
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

app.post('/editContact', (req, res, next) => {
  db.query(`UPDATE contact
            SET 
            first_name=${db.escape(req.body.first_name)}
            ,email=${db.escape(req.body.email)}
            ,phone_direct=${db.escape(req.body.phone_direct)}
            ,phone=${db.escape(req.body.phone)}
            ,mobile=${db.escape(req.body.mobile)}
            ,fax=${db.escape(req.body.fax)}
            ,position=${db.escape(req.body.position)}
            ,department=${db.escape(req.body.department)}
            ,salutation=${db.escape(req.body.salutation)}
            WHERE contact_id = ${db.escape(req.body.contact_id)}`,
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

app.post('/getContactLinkedById', (req, res, next) => {
  db.query(`SELECT 
   c.contact_id 
  ,c.first_name
  ,c.email
  ,c.phone
  ,c.mobile
  ,c.position
  ,c.department 
  ,c.salutation
  FROM contact c WHERE company_id =  ${db.escape(req.body.company_id)}`,
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
app.get('/getCountry', (req, res, next) => {
  db.query(
    `SELECT * from geo_country`,
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
})


app.post('/insertContact', (req, res, next) => {

  let data = {company_name	:req.body.company_name	
   , position	: req.body.position	
   , email: req.body.email
   , address_street: req.body.address_street
   , address_area: req.body.address_area
   , address_town: req.body.address_town
   , address_state: req.body.address_state
   , address_country	: req.body.address_country
   , address_po_code	: req.body.address_po_code
   , phone: req.body.phone
   , fax: req.body.fax
   , sort_order: req.body.sort_order
   , published: req.body.published
   , creation_date		: req.body.creation_date		
   , modification_date	: req.body.modification_date	
   , protected	: req.body.protected	
   , pass_word: req.body.pass_word
   , subscribe: req.body.subscribe
   , first_name: req.body.first_name
   , last_name: req.body.last_name
   , mobile: req.body.mobile
   , religion	: req.body.religion
   , relationship	: req.body.relationship
   , known_as_name: req.body.known_as_name
   , address_street1: req.body.address_street1
   , phone_direct: req.body.phone_direct
   , flag		: req.body.flag		
  
   , address_flat	: req.body.address_flat

   , company_id : req.body.company_id 
   , salutation: req.body.salutation
   , department: req.body.department
   , created_by: req.body.created_by
   , modified_by	: req.body.modified_by	
  
   , status	: req.body.status	
   , user_group_id	: req.body.user_group_id	
   , name	: req.body.name	
   , notes	: req.body.notes	
   , address	: req.body.address	
   , login_count	: req.body.login_count	
  
    
 };
  let sql = "INSERT INTO contact SET ?";
 let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
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
app.post('/getMainInvoiceByidCompanyOld', (req, res, next) => {
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


app.post('/getMainInvoiceByidCompany', (req, res, next) => {
  db.query(`SELECT 
  i.*

  FROM invoice i 
 
   WHERE i.company_id = ${db.escape(req.body.company_id)}`,
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




app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;