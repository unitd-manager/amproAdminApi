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

app.get('/getSupplier', (req, res) => {
  const { supplier_name, mobile, is_active } = req.query;

  let query = `
    SELECT 
      s.company_name AS supplier_name,
      s.supplier_id,
      s.email,
      s.fax,
      s.mobile,
      s.status,
      s.gst_no,
      s.contact_person,
      s.address_flat,
      s.address1,
      s.address2,
      s.address_street,
      s.address_state,
      s.address_country,
      s.address_po_code,
      s.payment_details,
      s.terms,
      s.is_active,
      s.phone,
      s.supplier_code,
      gc.name AS country_name,
      CASE 
        WHEN s.is_active = 1 THEN 'Active'
        ELSE 'Inactive'
      END AS status_display
    FROM supplier s
    LEFT JOIN geo_country gc ON s.address_country = gc.country_code
    WHERE 1=1
  `;

  const params = [];

  // 🔍 Supplier Name Search
  if (supplier_name) {
    query += ' AND (s.company_name LIKE ? OR s.contact_person LIKE ? OR s.supplier_code LIKE ?)';
    params.push(`%${supplier_name}%`, `%${supplier_name}%`, `%${supplier_name}%`);
  }

  // 📞 Mobile Number Search
  if (mobile) {
    query += ' AND s.mobile LIKE ?';
    params.push(`%${mobile}%`);
  }

  // ⚙️ Status Filter (active/inactive)
  if (is_active !== undefined && is_active !== '') {
    const active = parseInt(is_active, 10);
    if (active === 1) {
      query += ' AND s.is_active = 1';
    } else if (active === 0) {
      query += ' AND (s.is_active = 0 OR s.is_active IS NULL)';
    }
  }

  query += ' ORDER BY s.supplier_id DESC';

  // 🧠 Execute Query
  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      return res.status(500).send({
        msg: 'Error fetching supplier data',
        data: err,
        query,
        params,
      });
    }

    // 🧩 Process Results
    const processedResults = result.map((supplier) => ({
      ...supplier,
      status_display: supplier.is_active === 1 ? 'Active' : 'Inactive',
    }));

    return res.status(200).send({
      msg: 'Success',
      data: processedResults,
      total_count: processedResults.length,
      filtered_count: processedResults.length,
    });
  });
});



app.post('/get-SupplierById', (req, res, next) => {
  db.query(`SELECT s.company_name
  ,s.supplier_id
  ,s.email
  ,s.fax
  ,s.mobile
  ,s.status
  ,s.gst_no
  ,s.contact_person
  ,s.address_flat
  ,s.address1
  ,s.address2
  ,s.address_street
  ,s.address_state
  ,s.address_country
  ,s.address_po_code
  ,s.payment_details
  ,s.terms
  ,s.phone
  ,s.supplier_code
  ,s.user_name
  ,s.password
  ,s.price_group
  ,s.tax
  ,s.tax_type
  ,s.contact_type
  ,s.currency
  ,s.area
  ,s.is_active
  ,s.website
  ,s.hand_phone_no
  ,s.cheque_print_name
  ,s.company_reg_no 
  ,s.credit_limit
  ,s.remarks
  ,s.creation_date
  ,s.modification_date
  ,s.created_by
  ,s.modified_by
  ,gc.name AS country_name 
  ,p.payment_status
  FROM supplier s LEFT JOIN (geo_country gc) ON (s.address_country = gc.country_code)
   LEFT JOIN (purchase_order p) ON (s.supplier_id = p.supplier_id) WHERE s.supplier_id=${db.escape(req.body.supplier_id)} 
   AND (p.payment_status = 'Due' || p.payment_status = 'Partially Paid' || p.payment_status IS NULL)`,
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
  }
);
});

app.put('/updateSupplierPaymentsAndPurchaseOrder', (req, res) => {
  // const supplier_receipt_id = req.body.supplier_receipt_id;
  const supplier_receipt_history_id = req.body.supplier_receipt_history_id;
  const purchase_order_id = req.body.purchase_order_id;

  const updateSubConPaymentsQuery = `
    UPDATE supplier_receipt_history
    SET invoice_paid_status = 'Cancelled'
    WHERE supplier_receipt_history_id = ?
  `;

  const updateSubConWorkOrderQuery = `
    UPDATE purchase_order
    SET payment_status = 
      CASE
        WHEN EXISTS (
          SELECT * FROM supplier_receipt_history
          WHERE purchase_order_id = ? AND invoice_paid_status != 'Cancelled'
        ) THEN 'Partially Paid'
        ELSE 'Due'
      END
    WHERE purchase_order_id = ?
  `;

  // Execute the first update query
  db.query(updateSubConPaymentsQuery, [supplier_receipt_history_id], (err, result1) => {
    if (err) {
      console.error('Error updating supplier_receipt:', err);
      return res.status(400).json({ error: 'An error occurred while updating supplier_receipt' });
    }

    // Execute the second update query
    db.query(updateSubConWorkOrderQuery, [purchase_order_id, purchase_order_id], (err, result2) => {
      if (err) {
        console.error('Error updating purchase_order:', err);
        return res.status(400).json({ error: 'An error occurred while updating purchase_order' });
      }

      // Both updates were successful
      return res.status(200).json({ message: 'Updates completed successfully' });
    });
  });
});


app.post('/edit-Supplier', (req, res, next) => {
  db.query(`UPDATE supplier 
            SET company_name=${db.escape(req.body.company_name)}
            ,email=${db.escape(req.body.email)}
            ,fax=${db.escape(req.body.fax)}
            ,mobile=${db.escape(req.body.mobile)}
            ,status=${db.escape(req.body.status)}
            ,gst_no=${db.escape(req.body.gst_no)}
            ,contact_person=${db.escape(req.body.contact_person)}
            ,address_flat=${db.escape(req.body.address_flat)}
             ,address1=${db.escape(req.body.address1)}
              ,address2=${db.escape(req.body.address2)}
            ,address_street=${db.escape(req.body.address_street)}
            ,address_state=${db.escape(req.body.address_state)}
            ,address_country=${db.escape(req.body.address_country)}
            ,address_po_code=${db.escape(req.body.address_po_code)}
            ,payment_details=${db.escape(req.body.payment_details)}
            ,terms=${db.escape(req.body.terms)}
            ,price_group=${db.escape(req.body.price_group)}
            ,tax=${db.escape(req.body.tax)}
            ,contact_type=${db.escape(req.body.contact_type)}
            ,currency=${db.escape(req.body.currency)}
               ,tax_type=${db.escape(req.body.tax_type)}
             ,price_group=${db.escape(req.body.price_group)}
             ,remarks=${db.escape(req.body.remarks)}
            ,area=${db.escape(req.body.area)}
            ,credit_limit=${db.escape(req.body.credit_limit)}
            ,cheque_print_name=${db.escape(req.body.cheque_print_name)}
            ,company_reg_no=${db.escape(req.body.company_reg_no)}
            ,is_active=${db.escape(req.body.is_active)}
            ,website=${db.escape(req.body.website)}
            ,hand_phone_no=${db.escape(req.body.hand_phone_no)}
            ,user_name=${db.escape(req.body.user_name)}
            ,password=${db.escape(req.body.password)}
            ,phone=${db.escape(req.body.phone)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,modification_date=${db.escape(req.body.modification_date)}
            WHERE supplier_id =${db.escape(req.body.supplier_id)}`,
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
            }
          );
        });
        
        
        app.post('/activateSupplier', (req, res, next) => {
  db.query(`UPDATE supplier 
            SET status = 'Active'
          
          
            WHERE supplier_id =${db.escape(req.body.supplier_id)}`,
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
            }
          );
        });



app.post('/insert-Supplier', (req, res, next) => {

  let data = {company_name: req.body.company_name,
              email: req.body.email,
              address_street: req.body.address_street,
              address1: req.body.address1,
              address2: req.body.address2,
              tax_type: req.body.tax_type,
              address_town: req.body.address_town,
              address_state: req.body.address_state,
              address_country: req.body.address_country,
              address_po_code: req.body.address_po_code,
              phone: req.body.phone,
              fax: req.body.fax,
              notes: req.body.notes,
              creation_date: req.body.creation_date,
              modification_date: req.body.modification_date,
              mobile: req.body.mobile,
              flag: req.body.flag,
              address_flat: req.body.address_flat,
              status: req.body.status,
              website: req.body.website,
              category: req.body.category,
              comment_by: req.body.comment_by,
              company_size: req.body.company_size,
              industry: req.body.industry,
              source: req.body.source,
              group_name: req.body.group_name,
              supplier_type: req.body.supplier_type,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              chi_company_name: req.body.chi_company_name,
              chi_company_address: req.body.chi_company_address,
              company_address_id: req.body.company_address_id,
              contact_person: req.body.contact_person,
              billing_address_flat: req.body.billing_address_flat,
              billing_address_street: req.body.billing_address_street,
              billing_address_country: req.body.billing_address_country,
              billing_address_po_code: req.body.billing_address_po_code,
              gst_no: req.body.gst_no,
              terms: req.body.terms,
              supplier_code: req.body.supplier_code,
              is_active:0,
              payment_details: req.body.payment_details};
  let sql = "INSERT INTO supplier SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});


app.post('/insert-SupplierReceipt', (req, res, next) => {

  let data = {receipt_code: req.body.receipt_code,
              amount: req.body.amount,
              mode_of_payment: req.body.mode_of_payment,
              remarks: req.body.remarks,
              date: req.body.date,
              published: req.body.published,
              flag: req.body.flag,
              creation_date: req.body.creation_date,
              supplier_id: req.body.supplier_id,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              receipt_status: req.body.receipt_status,
              type: req.body.type,
              cheque_date: req.body.cheque_date,
              bank_name: req.body.bank_name,
              issued_by: req.body.issued_by,
              cheque_no: req.body.cheque_no,
              coi_no: req.body.coi_no,
              company_contact_salutation: req.body.company_contact_salutation,
              company_contact_name: req.body.company_contact_name,
              cust_first_name: req.body.cust_first_name,
              cust_email: req.body.cust_email,
              cust_address1: req.body.cust_address1,
              cust_address2: req.body.cust_address2,
              cust_address_po_code: req.body.cust_address_po_code,
              cust_address_country_code: req.body.cust_address_country_code,
              site_id: req.body.site_id,
              advance_payment_used: req.body.advance_payment_used};
  let sql = "INSERT INTO supplier_receipt SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});




app.post('/deleteSupplier', (req, res, next) => {

  let data = {supplier_id : req.body.supplier_id  };
  let sql = "DELETE FROM supplier WHERE ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});


app.post('/insertGeo_country', (req, res, next) => {

  let data = {country_code: req.body.country_code,
              name: req.body.name,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              published: req.body.published,
              flag: req.body.flag,
              chi_name: req.body.chi_name};
  let sql = "INSERT INTO geo_country SET ?";
  let query = db.query(sql, data,  (err, result) => {
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
  }
);
});

app.delete('/deleteGeo_country', (req, res, next) => {

  let data = {geo_country_id  : req.body.geo_country_id   };
  let sql = "DELETE FROM geo_country WHERE ?";
  let query = db.query(sql, data,  (err, result) => {
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
  }
);
});


app.get('/getTabPurchaseOrderLinked', (req, res, next) => {
  db.query(`SELECT p.purchase_order_id 
            FROM purchase_order p 
            WHERE p.supplier_id != '' AND (p.payment_status != 'Cancelled' OR p.payment_status IS NULL)`,
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
            }
          );
        }); 

app.post('/getMakePayment', (req, res, next) => {
  db.query(`SELECT i.po_code,
  i.purchase_order_id,
  i.supplier_id,
  i.payment_status
  ,(SELECT SUM(pop.cost_price*pop.quantity) AS prev_sum 
    FROM po_product pop
    WHERE pop.purchase_order_id =  i.purchase_order_id) as prev_inv_amount
    ,(SELECT SUM(supHist.amount) AS prev_sum 
  FROM supplier_receipt_history supHist 
  LEFT JOIN supplier_receipt r ON (r.supplier_receipt_id = supHist.supplier_receipt_id) 
  WHERE supHist.purchase_order_id = i.purchase_order_id AND i.status != 'Cancelled' ) as prev_amount 
FROM purchase_order i 
LEFT JOIN supplier o ON (i.supplier_id = o.supplier_id)
WHERE i.supplier_id=${db.escape(req.body.supplier_id)} 
AND (i.payment_status = 'Due' || i.payment_status = 'Partially Paid' || i.payment_status IS NULL)
`,
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
}
);
});

app.post('/getPurchaseOrderLinkedss', (req, res, next) => {
  db.query(`SELECT p.po_code,
  p.po_date,
  p.payment_status,
  p.purchase_order_id,
  sup.amount
    ,(
    SELECT SUM(pop.cost_price*pop.quantity) AS po_value
    FROM po_product pop
    WHERE pop.purchase_order_id =  p.purchase_order_id) as po_value
    ,(SELECT SUM(supHist.amount) AS prev_sum 
    FROM supplier_receipt_history supHist 
    LEFT JOIN supplier_receipt r ON (r.supplier_receipt_id = supHist.supplier_receipt_id) 
    WHERE supHist.purchase_order_id = p.purchase_order_id AND p.status != 'Cancelled' ) as prev_amount 
  FROM purchase_order p
  LEFT JOIN supplier o ON (p.supplier_id = o.supplier_id)
  LEFT JOIN supplier_receipt sup ON (sup.supplier_id = o.supplier_id)
  WHERE p.supplier_id=${db.escape(req.body.supplier_id)};`,
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
  }
);
});

app.post('/SupplierPayment', (req, res, next) => {
  db.query(`SELECT sr.amount
  ,srh.creation_date
  ,sr.mode_of_payment
  ,sr.receipt_status
  ,sr.supplier_receipt_id
  ,sr.supplier_id
  ,srh.purchase_order_id
FROM supplier_receipt_history srh
LEFT JOIN (supplier_receipt sr) ON (sr.supplier_receipt_id = srh.supplier_receipt_id)
WHERE srh.purchase_order_id = ${db.escape(req.body.purchase_order_id)}
ORDER BY srh.supplier_receipt_history_id;`,
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
}
);
});

app.post('/insert-SupplierReceipt', (req, res, next) => {
  let data = {receipt_code: req.body.receipt_code,
              amount: req.body.amount,
              mode_of_payment: req.body.mode_of_payment,
              remarks: req.body.remarks,
              date: req.body.date,
              published: req.body.published,
              flag: req.body.flag,
              creation_date: req.body.creation_date,
              modification_date: req.body.modification_date,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              supplier_id: req.body.supplier_id,
              receipt_status: req.body.receipt_status,
              type: req.body.type,
              cheque_date: req.body.cheque_date,
              bank: req.body.bank,
              issued_by: req.body.issued_by,
              cheque_no: req.body.cheque_no,
              coi_no: req.body.coi_no,
              company_contact_salutation: req.body.company_contact_salutation,
              company_contact_name: req.body.company_contact_name,
              cust_first_name: req.body.cust_first_name,
              cust_email: req.body.cust_email,
              cust_address1: req.body.cust_address1,
              cust_address2: req.body.cust_address2,
              cust_address_po_code: req.body.cust_address_po_code,
              cust_address_country_code: req.body.cust_address_country_code,
              site_id: req.body.site_id,
              advance_payment_used: req.body.advance_payment_used,};
  let sql = "INSERT INTO supplier_receipt SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});

app.post('/insert-SupplierReceiptsHistory', (req, res, next) => {
  let data = {purchase_order_id: req.body.purchase_order_id,
              supplier_receipt_id: req.body.supplier_receipt_id,
              published: req.body.published,
              flag: req.body.flag,
              creation_date: req.body.creation_date,
              modification_date: req.body.modification_date,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              amount: req.body.amount,
              purchase_order_date: req.body.purchase_order_date,
              invoice_paid_status: req.body.invoice_paid_status,
              title: req.body.title,
              installment_id: req.body.installment_id,
              receipt_type: req.body.receipt_type,
              related_purchase_order_id: req.body.related_purchase_order_id,
              gst_amount: req.body.gst_amount};
  let sql = "INSERT INTO supplier_receipt_history SET ?";
  let query = db.query(sql, data, (err, result) => {
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
  }
);
});

app.delete('/deleteSupplier_receipt_history', (req, res, next) => {

  let data = {supplier_receipt_history_id : req.body.supplier_receipt_history_id};
  let sql = "DELETE FROM supplier_receipt_history WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } else {
          return res.status(200).send({
            data: result,
            msg:'Success'
          });
    }
  });
});
app.post('/editPurchaseStatus', (req, res, next) => {
  db.query(`UPDATE purchase_order 
            SET payment_status = 'paid'
             WHERE purchase_order_id =  ${db.escape(req.body.purchase_order_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});

app.post('/editPartialPurchaseStatus', (req, res, next) => {
  db.query(`UPDATE purchase_order 
            SET status = 'Partially Paid'
             WHERE purchase_order_id =  ${db.escape(req.body.purchase_order_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
            return res.status(200).send({
              data: result,
              msg:'Success'
            });
      }
     }
  );
});

app.get('/getValueList', (req, res, next) => {
  db.query(`SELECT 
  value,valuelist_id
  FROM valuelist WHERE key_text="Company Status"`,
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
app.post('/getStatus', (req, res, next) => {
  db.query(`SELECT 
 p.payment_status from supplier s 
 LEFT JOIN purchase_order p ON p.supplier_id = s.supplier_id 
  AND (p.payment_status = 'Due' || p.payment_status = 'Partially Paid' || p.payment_status = 'Paid')
  WHERE s.supplier_id= ${db.escape(req.body.supplier_id)}`,
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

app.get('/getPriceGroupDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Price Group'`,
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

app.get('/getContactTypeDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Contact Type'`,
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

app.get('/getAreaDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Area'`,
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

app.get('/getTermsDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Supplier Terms'`,
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

app.get('/getCurrencyDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Currency'`,
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

app.get('/getTaxDrodownFromValuelist', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='Tax'`,
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

app.post('/getContactBySupplierId', (req, res, next) => {
  db.query(`SELECT * FROM contact
  WHERE supplier_id=${db.escape(req.body.supplier_id)}`,
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
  }
);
});

app.post('/getSupplierTransactionReport', (req, res, next) => {
  const { supplier_id, fromDate, toDate } = req.body;

  db.query(
    `SELECT
      p.tran_no,
      p.tran_date,
      p.sub_total,
      p.net_total,
      p.gst,
      p.purchase_order_id,
      p.purchase_order_date
    FROM purchase_order p
    WHERE p.supplier_id = ?
      AND p.tran_date BETWEEN ? AND ?`,
    [supplier_id, fromDate, toDate], 
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

app.post('/getGoodsReturnReport', (req, res, next) => {
  const { supplier_id, fromDate, toDate } = req.body;

  db.query(
    `SELECT
      g.tran_no,
      g.tran_date,
      g.sub_total,
      g.net_total,
      g.gst
    FROM goods_return g
    WHERE g.supplier_id = ?
      AND g.tran_date BETWEEN ? AND ?`,
    [supplier_id, fromDate, toDate], 
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

app.post('/getGoodsReceiptReport', (req, res, next) => {
  const { supplier_id, fromDate, toDate } = req.body;

  db.query(
    `SELECT
      g.tran_no,
      g.tran_date,
      g.sub_total,
      g.net_total,
      g.gst
    FROM goods_receipt g
    WHERE g.supplier_id = ?
      AND g.tran_date BETWEEN ? AND ?`,
    [supplier_id, fromDate, toDate], 
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

app.post('/getPurchaseInvoiceReport', (req, res, next) => {
  const { supplier_id, fromDate, toDate } = req.body;

  db.query(
    `SELECT
      pi.tran_no,
      pi.tran_date,
      pi.sub_total,
      pi.net_total,
      pi.gst
    FROM purchase_invoice pi
    WHERE pi.supplier_id = ?
      AND pi.tran_date BETWEEN ? AND ?`,
    [supplier_id, fromDate, toDate], 
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

app.post('/getPaymentsReport', (req, res, next) => {
  const { supplier_id, fromDate, toDate } = req.body;

  db.query(
    `SELECT
      p.payment_no,
      p.payment_date,
      p.pay_mode,
      p.paid_amount,
      p.gl_name,
      p.credit_amount,
      p.deposit_amount
    FROM payments p
    WHERE p.supplier_id = ?
      AND p.payment_date BETWEEN ? AND ?`,
    [supplier_id, fromDate, toDate], 
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


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = app;