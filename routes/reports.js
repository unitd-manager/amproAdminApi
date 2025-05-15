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



app.get('/TabPurchaseOrder', (req, res, next) => {
  db.query(`SELECT 
  po.purchase_order_id 
  ,CONCAT('Purchase from',' ',s.company_name ) AS title
  ,po.status
  ,po.supplier_id
  ,po.priority
  ,po.notes
  ,po.purchase_order_date
  ,po.creation_date
  ,po.follow_up_date
  ,po.delivery_terms
  ,po.payment_terms
  ,po.payment_status
  ,po.supplier_inv_code
  ,po.po_code
  ,s.company_name
  FROM purchase_order po 
  LEFT JOIN (supplier s) ON (po.supplier_id = s.supplier_id) WHERE po.purchase_order_id != ''  ORDER BY po.purchase_order_id ASC;`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/getPayslipEmployeeReport', (req, res, next) => {
  db.query(` SELECT pm.payroll_management_id,
       pm.reimbursement,
       pm.cpf_employee,
       pm.cpf_employer,
       pm.basic_pay,
       pm.total_deductions,
       pm.total_basic_pay_for_month,
       allowance.total_allowance,
       pm.ot_amount,
       pm.net_total,
       CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name,
       e.date_of_birth AS dob,
       e.citizen,
       e.nric_no,
       e.fin_no,
       e.status AS employee_status
FROM payroll_management pm
LEFT JOIN employee e ON pm.employee_id = e.employee_id
LEFT JOIN (
    SELECT payroll_month,
           payroll_year,
           employee_id,
           COALESCE(allowance1, 0.0) +
           COALESCE(allowance2, 0.0) +
           COALESCE(allowance3, 0.0) +
           COALESCE(allowance4, 0.0) +
           COALESCE(allowance5, 0.0) +
           COALESCE(allowance6, 0.0) AS total_allowance
    FROM payroll_management
    GROUP BY payroll_month, payroll_year, employee_id
) AS allowance ON pm.payroll_month = allowance.payroll_month
               AND pm.payroll_year = allowance.payroll_year
               AND pm.employee_id = allowance.employee_id
WHERE pm.payroll_month = ${db.escape(req.body.month)}
  AND pm.payroll_year = ${db.escape(req.body.year)}
ORDER BY e.first_name ASC`,
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


app.post('/getPayslipGeneratedReport', (req, res, next) => {
  db.query(` SELECT pm.payroll_management_id
                ,(
        SELECT SUM(pmi.allowance1 + pmi.allowance2 + pmi.allowance3 + pmi.allowance4 + pmi.allowance5)
        FROM payroll_management pmi
        WHERE pmi.employee_id = e.employee_id
      ) AS total_allowance
  ,pm.total_deductions
  ,pm.reimbursement
  ,pm.cpf_employee
  ,pm.cpf_employer
  ,pm.basic_pay
  ,pm.total_basic_pay_for_month
  ,pm.net_total
  ,e.employee_name
  ,e.date_of_birth AS dob
  ,e.citizen
  ,e.nric_no
  ,e.fin_no
  ,e.status AS employee_status
 FROM payroll_management pm
LEFT JOIN (employee e) ON (pm.employee_id = e.employee_id)
LEFT JOIN (job_information j) ON (j.employee_id = e.employee_id)
WHERE pm.payroll_month = ${db.escape(req.body.month)}
    AND pm.payroll_year = ${db.escape(req.body.year)}
    ORDER BY e.first_name ASC `,
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



app.post('/getPurchaseOrders', (req, res, next) => {
  db.query(`SELECT 
  po.purchase_order_id 
  ,CONCAT('Purchase from',' ',s.company_name ) AS title
  ,po.status
  ,po.supplier_id
  ,po.priority
  ,po.notes
  ,po.purchase_order_date
  ,po.creation_date
  ,po.follow_up_date
  ,po.delivery_terms
  ,po.payment_terms
  ,po.payment_status
  ,po.supplier_inv_code
  ,po.po_code
  FROM purchase_order po 
  ORDER BY po.purchase_order_id ASC;`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/getPurchaseOrderById', (req, res, next) => {
  db.query(`SELECT
  po.purchase_order_id 
  ,CONCAT('Purchase from',' ',s.company_name ) AS title
  ,po.status
  ,po.supplier_id
  ,po.priority
  ,po.notes
  ,po.purchase_order_date
  ,po.creation_date
  ,po.modification_date
  ,po.follow_up_date
  ,po.delivery_terms
  ,po.payment_terms
  ,po.supplier_reference_no
  ,po.our_reference_no
  ,po.shipping_address_flat
  ,po.shipping_address_street
  ,po.shipping_address_country
  ,po.shipping_address_po_code
  ,po.payment_status
  ,po.supplier_inv_code
  ,po.po_code
  ,po.payment
  ,po.contact
  ,po.delivery_to
  ,po.mobile
  ,po.project
  ,po.shipping_method
  ,s.company_name AS supplier_name
  FROM purchase_order po 
  LEFT JOIN (supplier s) ON (po.supplier_id = s.supplier_id) WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/testAPIendpoint', (req, res, next) => {
  
  db.query(`
  SELECT pp.*, s.company_name
  ,po.purchase_order_date
  ,po.gst
  ,po.purchase_order_id
  FROM po_product pp
  JOIN purchase_order po ON pp.purchase_order_id = po.purchase_order_id
  JOIN supplier s ON po.supplier_id = s.supplier_id
  WHERE po.project_id = ${db.escape(req.body.project_id)}`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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


app.post('/editTabPurchaseOrder', (req, res, next) => {
  db.query(`UPDATE purchase_order
             SET title=${db.escape(req.body.title)}
            ,notes=${db.escape(req.body.notes)}
            ,gst=${db.escape(req.body.gst)}
            ,po_code=${db.escape(req.body.po_code)}
            ,purchase_order_date=${db.escape(req.body.purchase_order_date)}
            ,follow_up_date=${db.escape(req.body.follow_up_date)}
            ,delivery_terms=${db.escape(req.body.delivery_terms)}
            ,payment_terms=${db.escape(req.body.payment_terms)}
            ,supplier_inv_code=${db.escape(req.body.supplier_inv_code)}
            ,status=${db.escape(req.body.status)}
            ,payment_status=${db.escape(req.body.payment_status)}
            ,modification_date=${db.escape(new Date())}
            ,supplier_id=${db.escape(req.body.supplier_id)}
            ,delivery_to=${db.escape(req.body.delivery_to)}
            ,delivery_date=${db.escape(req.body.delivery_date)}
            ,contact=${db.escape(req.body.contact)}
            ,mobile=${db.escape(req.body.mobile)}
            ,payment=${db.escape(req.body.payment)}
            ,project=${db.escape(req.body.project)}
            ,shipping_method=${db.escape(req.body.shipping_method)}
            WHERE purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  data: err,
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
  
app.post('/insertPurchaseOrder', (req, res, next) => {

  let data = {po_code:req.body.po_code
   , supplier_id: req.body.supplier_id
   , contact_id_supplier: req.body.contact_id_supplier
   , delivery_terms: req.body.delivery_terms
   , status: req.body.status
   , project_id: req.body.project_id
   , flag: req.body.flag
   , creation_date: req.body.creation_date
   , modification_date: req.body.modification_date
   , created_by: req.body.created_by
   , modified_by: req.body.modified_by
   , supplier_reference_no: req.body.supplier_reference_no
   , our_reference_no	: req.body.our_reference_no	
   , shipping_method: req.body.shipping_method
   , payment_terms: req.body.payment_terms
   , delivery_date: req.body.delivery_date
   , po_date: req.body.mr_date
   , shipping_address_flat: req.body.shipping_address_flat
   , shipping_address_street: req.body.shipping_address_street
   , shipping_address_country: req.body.shipping_address_country
   , shipping_address_po_code: req.body.shipping_address_po_code
   , expense_id: req.body.expense_id
   , staff_id: req.body.staff_id
   , purchase_order_date: req.body.purchase_order_date
   , payment_status: "Due"
   , title: req.body.title
   , priority: req.body.priority
   , follow_up_date: req.body.follow_up_date
   , notes: req.body.notes
   , supplier_inv_code: req.body.supplier_inv_code
   , gst: req.body.gst
   , gst_percentage: req.body.gst_percentage
   , delivery_to: req.body.delivery_to
   , contact: req.body.contact
   , mobile: req.body.mobile
   , payment: req.body.payment
   , project: req.body.project
    
 };
  let sql = "INSERT INTO purchase_order SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/deletePurchaseOrder', (req, res, next) => {

  let data = {purchase_order_id: req.body.purchase_order_id};
  let sql = "DELETE FROM purchase_order WHERE ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.get('/TabPurchaseOrderLineItem', (req, res, next) => {
  db.query(`SELECT
  p.item_code
  ,po.po_product_id
  ,po.product_id
  ,p.title
  ,po.item_title
  ,p.qty_in_stock
  ,po.description
  ,po.amount
  ,po.selling_price
  ,po.cost_price
  ,po.gst
  ,po.status
  ,po.damage_qty
  ,po.qty_delivered
  ,po.qty
  ,(po.cost_price*po.quantity) AS po_value
  FROM po_product po
  LEFT JOIN (product p) ON (po.product_id = p.product_id) 
  WHERE po.po_product_id = ${db.escape(req.body.po_product_id)} ORDER BY po.item_title ASC;`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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
app.post('/TabPurchaseOrderLineItemById', (req, res, next) => {
  db.query(`SELECT
  p.item_code
  ,p.qty_in_stock
  ,po.product_id
  ,po.po_product_id
  ,p.title
  ,po.item_title
  ,po.description
  ,po.amount
  ,po.selling_price
  ,po.cost_price
  ,(po.qty-po.qty_delivered) AS qty_balance
  ,po.gst
  ,po.qty
  ,(po.cost_price*po.qty_delivered) AS actual_value 
  ,po.price
  ,po.status
  ,po.damage_qty
  ,po.qty_delivered
  ,i.actual_stock AS stock
  ,(po.cost_price*po.quantity) AS po_value FROM po_product po
  LEFT JOIN (product p) ON (po.product_id = p.product_id) 
  LEFT JOIN (inventory i) ON (i.inventory_id = p.product_id) 
  WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}
  `,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/editTabPurchaseOrderLineItem', (req, res, next) => {
  db.query(`UPDATE po_product
            SET description=${db.escape(req.body.description)}
            ,qty_updated=${db.escape(req.body.qty_updated)}
            ,amount=${db.escape(req.body.amount)}
            ,item_title=${db.escape(req.body.item_title)}
            ,selling_price=${db.escape(req.body.selling_price)}
            ,cost_price=${db.escape(req.body.cost_price)}
            ,gst=${db.escape(req.body.gst)}
            ,unit=${db.escape(req.body.unit)}
            ,qty=${db.escape(req.body.qty)}
            ,damage_qty=${db.escape(req.body.damage_qty)}
            ,qty_delivered=${db.escape(req.body.qty_delivered)}
            ,status=${db.escape(req.body.status)}
            WHERE po_product_id = ${db.escape(req.body.po_product_id)}`,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  data: err,
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

app.get("/getMaxItemCode", (req, res, next) => {
  db.query(
    `SELECT MAX (item_code) As item
  FROM product
  WHERE product_id !=''`,
  (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/insertPoProduct', (req, res, next) => {

  let data = {
    purchase_order_id:req.body.purchase_order_id
     ,item_title: req.body.item_title
     ,product_id:req.body.product_id
    , quantity: req.body.quantity
    , unit: req.body.unit
    , amount: req.body.amount
    , description: req.body.description??'desc'
    , creation_date: new Date()
    , created_by: req.body.created_by
    , modified_by: req.body.modified_by
    , status: req.body.status
    , cost_price	: req.body.cost_price	
    , selling_price: req.body.selling_price
    , qty_updated: req.body.qty_updated
    , qty: req.body.qty
    , product_id: req.body.product_id
    , supplier_id: 0
    , gst:req.body.gst
    , damage_qty: req.body.damage_qty
    , brand: req.body.brand
    , qty_requested: req.body.qty_requested
    , qty_delivered: req.body.qty_delivered
    , price: req.body.price??0
    
 };
 console.log(data)
  let sql = "INSERT INTO po_product SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

 app.post('/deletePoProduct', (req, res, next) => {

    let data = {po_product_id: req.body.po_product_id};
    let sql = "DELETE FROM po_product WHERE ?";
    let query = db.query(sql, data,(err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
        });
      } else {
        return res.status(200).send({
          data: result,
          msg: "Loan has been removed successfully",
        });
      }
    }
  );
});

  app.get('/getSupplier', (req, res, next) => {
    db.query(`SELECT 
    e.supplier_id
   ,e.company_name
   
    FROM supplier e 
    `,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
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



app.post('/insertPurchaseProduct', (req, res, next) => {

  let data = {category_id: req.body.category_id
    ,  sub_category_id : req.body. sub_category_id 
    , title: req.body.title
    , product_code: req.body.product_code
    , description: req.body.description
    , qty_in_stock: req.body.qty_in_stock
    , price: req.body.price
    , published:req.body.published
    , member_only: req.body.member_only
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , chi_title: req.body.chi_title
    , chi_description: req.body.chi_description
    , sort_order: req.body.sort_order
    , meta_title: req.body.meta_title
    , meta_description: req.body.meta_description
    , meta_keyword: req.body.meta_keyword
    , latest : req.body. latest 
    , description_short: req.body.description_short
    , chi_description_short: req.body.chi_description_short
    , general_quotation: req.body.general_quotation
    , unit: req.body.unit
    , product_group_id: req.body.product_group_id
    , department_id: req.body.department_id
    , item_code: req.body.item_code
    , modified_by: req.body.modified_by
    , created_by: req.user
    , part_number: req.body.part_number
    , price_from_supplier: req.body.price_from_supplier
    , model: req.body.model
    , carton_no: req.body.carton_no
    , batch_no: req.body.batch_no
    , vat: req.body.vat
    , fc_price_code: req.body.fc_price_code
    , batch_import: req.body.batch_import
    , commodity_code: req.body.commodity_code
    , show_in_website: req.body.show_in_website
    , most_selling_product: req.body.most_selling_product
    , site_id: req.body.site_id
    , damaged_qty: req.body.damaged_qty
    , item_code_backup: req.body.item_code_backup
    , hsn_sac: req.body.hsn_sac
    , deals_of_week: req.body.deals_of_week
    , top_seller: req.body.top_seller
    , hot_deal: req.body.hot_deal
    , most_popular : req.body. most_popular 
    , top_rating: req.body.top_rating
    , section_id: req.body.section_id
    , discount_type: req.body.discount_type
    , discount_percentage: req.body.discount_percentage
    , discount_amount: req.body.discount_amount
    , hsn: req.body.hsn
    , gst: req.body.gst
    , product_weight: req.body.product_weight
    , tam_title: req.body.tam_title
    , tam_description: req.body.tam_description
    , tam_description_short: req.body.tam_description_short
    , supplier_id: req.body.supplier_id
    , product_type: req.body.product_type
    , bar_code: req.body.bar_code
    , tag_no: req.body.tag_no
    , pack_size : req.body. pack_size 
    , discount_from_date: req.body.discount_from_date
    , discount_to_date: req.body.discount_to_date
    , mrp: req.body.mrp};
  let sql = "INSERT INTO product SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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

app.post('/insertPurchaseProductPagination', (req, res, next) => {

  let data = {category_id: req.body.category_id
    ,  sub_category_id : req.body. sub_category_id 
    , title: req.body.title
    , product_code: req.body.product_code
    , description: req.body.description
    , qty_in_stock: req.body.qty_in_stock
    , price: req.body.price
    , published:req.body.published
    , member_only: req.body.member_only
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
    , chi_title: req.body.chi_title
    , chi_description: req.body.chi_description
    , sort_order: req.body.sort_order
    , meta_title: req.body.meta_title
    , meta_description: req.body.meta_description
    , meta_keyword: req.body.meta_keyword
    , latest : req.body. latest 
    , description_short: req.body.description_short
    , chi_description_short: req.body.chi_description_short
    , general_quotation: req.body.general_quotation
    , unit: req.body.unit
    , product_group_id: req.body.product_group_id
    , department_id: req.body.department_id
    , item_code: req.body.item_code
    , modified_by: req.body.modified_by
    , created_by: req.user
    , part_number: req.body.part_number
    , price_from_supplier: req.body.price_from_supplier
    , model: req.body.model
    , carton_no: req.body.carton_no
    , batch_no: req.body.batch_no
    , vat: req.body.vat
    , fc_price_code: req.body.fc_price_code
    , batch_import: req.body.batch_import
    , commodity_code: req.body.commodity_code
    , show_in_website: req.body.show_in_website
    , most_selling_product: req.body.most_selling_product
    , site_id: req.body.site_id
    , damaged_qty: req.body.damaged_qty
    , item_code_backup: req.body.item_code_backup
    , hsn_sac: req.body.hsn_sac
    , deals_of_week: req.body.deals_of_week
    , top_seller: req.body.top_seller
    , hot_deal: req.body.hot_deal
    , most_popular : req.body. most_popular 
    , top_rating: req.body.top_rating
    , section_id: req.body.section_id
    , discount_type: req.body.discount_type
    , discount_percentage: req.body.discount_percentage
    , discount_amount: req.body.discount_amount
    , hsn: req.body.hsn
    , gst: req.body.gst
    , product_weight: req.body.product_weight
    , tam_title: req.body.tam_title
    , tam_description: req.body.tam_description
    , tam_description_short: req.body.tam_description_short
    , supplier_id: req.body.supplier_id
    , product_type: req.body.product_type
    , bar_code: req.body.bar_code
    , tag_no: req.body.tag_no
    , pack_size : req.body. pack_size 
    , discount_from_date: req.body.discount_from_date
    , discount_to_date: req.body.discount_to_date
    , mrp: req.body.mrp};
  let sql = "INSERT INTO product_pagination SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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


      app.post('/editDelieryOrderHistory', (req, res, next) => {
        db.query(`UPDATE delivery_order_history
                  SET product_id=${db.escape(req.body.product_id)}
                  ,quantity=${db.escape(req.body.quantity)}
                  ,remarks=${db.escape(req.body.remarks)}
                  ,status=${db.escape(req.body.status)}
                  WHERE product_id=${db.escape(req.body.product_id)}`,
          (err, result) => {
           
            if (err) {
               return res.status(400).send({
                  data: err,
                  msg:'Failed'
                });
            } else {
                  return res.status(200).send({
                    data: result,
                    msg:'record edited successfully'
                  });
            
            }
           }
         );
      });
app.post('/getDeliveryOrder', (req, res, next) => {
  db.query(`SELECT do.date,do.delivery_order_id  FROM delivery_order do WHERE purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
      (err, result) => {
         
        if (err) {
           return res.status(400).send({
                data: err,
                msg:'Failed'
              });
        } else {
              return res.status(200).send({
                data: result,
                msg:'Delivery order data fetched successfully'
              });
        }
  
          
   
      }
    );
  });
app.post('/getDeliveryOrderHistory', (req, res, next) => {
        
  db.query(`SELECT 
            p.item_title,
              doh.product_id
              ,doh.quantity
              ,doh.remarks
              ,doh.status
              ,doh.delivery_order_id
        FROM delivery_order_history doh
        LEFT JOIN (delivery_order do) ON (do.delivery_order_id = doh.delivery_order_id)
        LEFT JOIN (po_product p) ON (p.po_product_id = doh.product_id)
        WHERE doh.delivery_order_id=${db.escape(req.body.delivery_order_id)}`,
      (err, result) => {
         
        if (err) {
           return res.status(400).send({
              data: err,
              msg:'Failed'
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
app.post('/getProductsfromOtherSuppliers', (req, res, next) => {
  db.query(`SELECT p.product_id
  ,pop.qty as po_QTY
  ,pop.item_title
  ,pop.unit
  ,pop.amount
  ,pop.gst
  ,pop.qty_delivered
  ,(pop.qty - pop.qty_delivered) AS qty_balance
  ,pop.status
  ,pop.cost_price
  ,(pop.qty*pop.cost_price) AS total_price
  ,po.purchase_order_date
  ,po.supplier_reference_no
  ,po.title
  ,po.follow_up_date
  ,po.po_code
  ,po.purchase_order_id
  ,m.company_name AS supplier_name
FROM purchase_order po
LEFT JOIN po_product pop ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN product p ON p.product_id = pop.product_id
LEFT JOIN supplier m ON m.supplier_id = po.supplier_id
WHERE pop.product_id = ${db.escape(req.body.product_id)} AND pop.supplier_id != ${db.escape(req.body.supplier_id)}`,
  (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } 
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
app.post('/getProductsfromSupplier', (req, res, next) => {
  db.query(`SELECT p.product_id
  ,pop.qty
  ,pop.item_title
  ,pop.unit
  ,pop.amount
  ,pop.gst
  ,pop.qty_delivered
  ,(pop.qty - pop.qty_delivered) AS qty_balance
  ,pop.status
  ,pop.cost_price
  ,(pop.qty*pop.cost_price) AS total_price
  ,po.purchase_order_date
  ,po.supplier_reference_no
  ,po.title
  ,po.follow_up_date
  ,po.po_code
  ,po.purchase_order_id
  ,m.company_name AS supplier_name
FROM purchase_order po
LEFT JOIN po_product pop ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN product p ON p.product_id = pop.product_id
LEFT JOIN supplier m ON m.supplier_id = po.supplier_id
WHERE pop.product_id = ${db.escape(req.body.product_id)} AND pop.supplier_id = ${db.escape(req.body.supplier_id)}`,
  (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    } 
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

app.post('/getPurchaseOrderByPdf', (req, res, next) => {
    db.query(`SELECT p.product_id
    ,pop.qty as po_QTY
    ,pop.item_title
    ,pop.unit
    ,pop.amount
    ,pop.gst
    ,pop.creation_date
    ,pop.qty_delivered
    ,(pop.qty - pop.qty_delivered) AS qty_balance
    ,pop.status
    ,pop.cost_price
    ,(pop.qty*pop.cost_price) AS total_price
    ,po.purchase_order_date
    ,po.supplier_reference_no
    ,po.our_reference_no
    ,po.shipping_method
    ,po.payment_terms
    ,po.title
    ,po.follow_up_date
    ,po.shipping_address_flat
    ,po.shipping_address_street
    ,po.shipping_address_country
    ,po.po_code
    ,po.purchase_order_id
    ,m.company_name AS supplier_name
    ,c.company_name 
    ,m.address_flat
    ,m.address_street
    ,m.address_town
    ,m.address_state
    ,m.address_country
FROM purchase_order po
LEFT JOIN po_product pop ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN (company c) ON (po.supplier_id = c.company_id)
LEFT JOIN product p ON p.product_id = pop.product_id
LEFT JOIN supplier m ON m.supplier_id = po.supplier_id
WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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

app.post('/getPurchaseOrderPriceByPdf', (req, res, next) => {
    db.query(`SELECT 
    p.product_id
    ,pop.item_title
    ,pop.qty as po_QTY
    ,pop.qty_delivered
    ,(pop.qty - pop.qty_delivered) AS qty_balance
    ,pop.status
    ,pop.cost_price
    ,(pop.qty*pop.cost_price) AS total_price
    ,po.purchase_order_date
    ,po.po_code
    ,po.purchase_order_id
    ,m.company_name AS supplier_name
    ,m.address_flat
    ,m.address_street
    ,m.address_town
    ,m.address_state
    ,m.address_country
FROM purchase_order po
LEFT JOIN po_product pop ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN product p ON p.product_id = pop.product_id
LEFT JOIN supplier m ON m.supplier_id = po.supplier_id
WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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

app.post('/getProjectMaterialUsedByPdf', (req, res, next) => {
    db.query(`SELECT p.project_code
    ,pm.material_used_date
    ,pm.part_no
    ,pm.title
    ,pm.remark
    ,pm.quantity
    ,pm.description
    ,pm.amount
    ,pm.unit
    ,c.company_name
    ,c.address_flat AS billing_address_flat
    ,c.address_street AS billing_address_street
    ,c.address_po_code AS billing_address_po_code
    ,gc.name AS billing_address_country
    ,c.company_id
    ,co.salutation
    ,co.first_name
    ,co.last_name
FROM project_materials pm
LEFT JOIN (project p) ON (pm.project_id = p.project_id)
LEFT JOIN (company c) ON (c.company_id = p.company_id)
LEFT JOIN (geo_country gc) ON (gc.country_code = c.address_country)
LEFT JOIN (contact co) ON (co.contact_id = p.contact_id)
WHERE p.project_id = ${db.escape(req.body.project_id)}
AND pm.status != 'Cancelled'
ORDER BY pm.project_materials_id ASC`,
          (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
      if (result.length == 0) {
        return res.status(200).send({
            data:[],
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
app.post('/getProjectMaterialPurchaseByPdf', (req, res, next) => {
    db.query(`SELECT DISTINCT pop.po_product_id
    ,pop.item_title
    ,pop.quantity
    ,pop.cost_price
    ,pop.qty
    ,pop.cost_price
    ,(pop.qty*pop.cost_price) AS total_price
    ,pop.description
    ,pop.unit
    ,pop.creation_date
    ,po.supplier_id
    ,po.delivery_terms
    ,c.company_name
    ,c.category
    ,c.address_flat
    ,c.address_state
    ,c.address_street
    ,c.address_country
    ,c.address_po_code
    ,c.company_id
    ,c.phone AS supplier_phone
    ,c.fax AS supplier_fax
    ,m.company_name AS supplier_name
    ,c.company_name 
    ,c.contact_person
    ,p.project_code
    ,p.title
    ,prod.item_code
    ,po.supplier_reference_no
    ,po.our_reference_no
    ,po.shipping_method
    ,po.payment_terms
    ,po.delivery_date
    ,po.po_date
    ,po.purchase_order_date
    ,po.po_code
    ,po.contact
    ,cont.first_name
    ,po.mobile
    ,po.project_id 
    ,po.payment
    ,po.delivery_to
    ,po.shipping_address_flat
    ,po.shipping_address_street
    ,po.shipping_address_country
    ,po.shipping_address_po_code
    ,gc.name AS country_name
FROM po_product pop
LEFT JOIN (purchase_order po) ON (pop.purchase_order_id = po.purchase_order_id)
LEFT JOIN (project p) ON (po.project_id = p.project_id)
LEFT JOIN (supplier m) ON (m.supplier_id = po.supplier_id)
LEFT JOIN (product prod) ON (prod.product_id = pop.product_id)   	 
LEFT JOIN (company c) ON (po.supplier_id = c.company_id)
LEFT JOIN (contact cont) ON (cont.company_id = c.company_id)
LEFT JOIN geo_country gc ON (c.address_country = gc.country_code)
WHERE po.project_id =${db.escape(req.body.project_id)}
ORDER BY pop.po_product_id ASC;;
`,
          (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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
  app.get("/getProjectReport", (req, res, next) => {
    db.query(
      `SELECT p.*
      ,p.title AS Project_name
      ,c.company_id
      ,c.company_name 
      ,o.price
      ,p.category
      ,CONCAT_WS(' ', cont.first_name, cont.last_name) AS contact_name
  FROM project p
  LEFT JOIN company c ON (c.company_id = p.company_id)
  LEFT JOIN (contact cont) ON (p.contact_id = cont.contact_id)
  LEFT JOIN (opportunity o) ON (p.opportunity_id = o.opportunity_id)
  WHERE p.project_id!=''`,
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
  app.post('/getProjectDeliveryOrderByPdf', (req, res, next) => {
    db.query(`SELECT doh.quantity
                ,doh.remarks
                ,p.title AS product_title
                ,do.date
                ,c.company_name
                ,c.address_flat AS billing_address_flat
                ,c.address_street AS billing_address_street
                ,c.address_po_code AS billing_address_po_code
                ,gc.name AS billing_address_country
          FROM delivery_order_history doh
          LEFT JOIN (delivery_order do) ON (do.delivery_order_id = doh.delivery_order_id)
          LEFT JOIN (company c) ON (c.company_id = do.company_id)
          LEFT JOIN (geo_country gc) ON (gc.country_code = c.address_country)
          LEFT JOIN (product p) ON (p.product_id = doh.product_id)
          WHERE do.delivery_order_id = ${db.escape(req.body.delivery_order_id)}
          ORDER BY doh.delivery_order_history_id ASC`,
          (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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
  
  app.post('/insertDeliveryOrder', (req, res, next) => {

    let data = {
      purchase_order_id:req.body.purchase_order_id
      ,date: new Date()
      , creation_date: new Date()
  
   };
   console.log(data)
    let sql = "INSERT INTO delivery_order SET ?";
    let query = db.query(sql, data,(err, result) => {
      if (err) {
        return res.status(400).send({
          data: err,
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

  

app.post('/insertDeliveryOrderHistory', (req, res, next) => {

  let data = {
    purchase_order_id:req.body.purchase_order_id
    ,delivery_order_id:req.body.delivery_order_id
    ,product_id:req.body.product_id
    , creation_date: new Date()

 };
 console.log(data)
  let sql = "INSERT INTO delivery_order_history SET ?";
  let query = db.query(sql, data,(err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
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
app.post('/getPurchaseWorkOrderByPdf', (req, res, next) => {
    db.query(` SELECT wo.work_order_date
    ,wo.sub_con_worker_code
    ,wo.quote_reference
    ,wo.quote_date
    ,wo.project_location
    ,wo.project_reference
    ,wo.condition
                ,woi.quantity
                ,woi.unit
                ,woi.description
                ,woi.unit_rate
                ,woi.amount
                ,woi.remarks
                ,p.project_id
                ,p.project_code
                ,p.company_id
                ,s.company_name
                ,s.phone
                ,s.email
                ,s.mobile
                ,s.address_flat
                ,s.address_street
                ,s.address_town
                ,s.address_state
                ,gc.name AS address_country
          FROM sub_con_work_order wo
          LEFT JOIN (work_order_line_items woi) ON (woi.sub_con_work_order_id = wo.sub_con_work_order_id)
          LEFT JOIN (project p) ON (p.project_id = wo.project_id)
          LEFT JOIN (sub_con s) ON (s.sub_con_id = wo.sub_con_id)
          LEFT JOIN (geo_country gc) ON (gc.country_code = s.address_country)
          WHERE wo.sub_con_work_order_id=${db.escape(req.body.sub_con_work_order_id)}
          ORDER BY woi.work_order_line_items_id ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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

app.get('/getPurchaseGstReport', (req, res, next) => {
    db.query(`select e.invoice_date,
    e.invoice_code,
    e.po_code,
    e.po_date,
    e.mode_of_payment,
    e.gst,
    e.gst_amount,
    e.description,
    e.supplier_name,
    e.payment_ref_no,
    e.payment_date,
    e.total_amount
    from expense e
    where e.expense_id!=''`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } 
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

  app.get('/getEmployeeSalaryReport', (req, res, next) => {
    db.query(`SELECT DISTINCT 
               e.employee_name
               ,j.designation
              ,j.department
              ,pm.basic_pay
              , first_name,date_of_birth, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), date_of_birth)), '%Y') + 0 AS age
              ,(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5+pm.allowance6) AS total_allowance
               ,pm.total_deductions
              ,pm.net_total
              ,e.nric_no
              ,e.position
              ,e.date_of_birth
              ,e.employee_id
              ,e.status
              FROM employee e
              LEFT JOIN (job_information j) ON (j.employee_id = e.employee_id)
              LEFT JOIN (payroll_management pm) ON (pm.employee_id = e.employee_id)
              WHERE e.status = 'Current' OR e.status='Archive' OR e.status='Cancel' AND e.employee_id!=''` ,
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


  app.post('/getEmployeeReports', (req, res, next) => {
    db.query(`SELECT ts.*
                ,t.title AS training_title
                ,e.employee_name
          FROM training_staff ts
          LEFT JOIN (training t) ON (ts.training_id = t.training_id)
          LEFT JOIN (employee e) ON (ts.employee_id = e.employee_id)
           WHERE e.status = 'Current'
   ORDER BY ts.from_date ASC, ts.to_date ASC  `,
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

  app.post('/getAgingReports', (req, res, next) => {
    db.query(`SELECT DISTINCT i.invoice_id,
    c.company_id, 
    c.company_name, 
    i.status, 
    i.invoice_date,
    o.cust_company_name,
     SUM(invHist.amount) AS total_amount,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) BETWEEN 31 AND 60 THEN invHist.amount ELSE 0 END) AS 'firstdays',
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) BETWEEN 61 AND 90 THEN invHist.amount ELSE 0 END) AS 'seconddays',
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) > 90 THEN invHist.amount ELSE 0 END) AS 'thirddays'
  FROM invoice i
    LEFT JOIN orders o ON (i.order_id = o.order_id) 
    LEFT JOIN company c ON (o.company_id = c.company_id) 
    LEFT JOIN invoice_receipt_history invHist ON (invHist.invoice_id = i.invoice_id)
    LEFT JOIN (receipt r) ON (invHist.receipt_id = r.receipt_id)
    WHERE c.company_id !='' 
    AND i.status != 'Cancelled' 
    AND i.status='Due'  OR i.status='Partial Payment'
     AND r.receipt_status = 'Paid'
    GROUP BY i.invoice_id,  o.cust_company_name`,
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

 
app.post("/getSalesReport", (req, res, next) => {
  db.query(
    `SELECT
    i.invoice_date,
    i.invoice_code,
    c.company_name,
    SUM(it.total_cost) AS invoiceAmount,
    SUM(i.invoice_amount - it.total_cost) AS gst,
    SUM(i.invoice_amount) AS total,
    SUM(ir.amount) AS received,
    SUM(i.invoice_amount - ir.amount) AS balance
FROM
    invoice i
LEFT JOIN
    invoice_receipt_history ir ON ir.invoice_id = i.invoice_id
LEFT JOIN
    project p ON p.project_id = i.project_id
LEFT JOIN
    invoice_item it ON it.invoice_id = i.invoice_id
LEFT JOIN
    company c ON c.company_id = p.company_id
WHERE 
    i.invoice_id !=''
GROUP BY
    i.invoice_date,
    i.invoice_code,
    c.company_name`,
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


app.get('/getInvoiveByMonth', (req, res, next) => {
  const { recordType } = req.query;
  const currentDate = new Date();
  const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate());

  db.query(`
    SELECT DATE_FORMAT(i.invoice_date, '%b %Y') AS invoice_month,
           (SUM(i.invoice_amount)) AS invoice_amount_monthly,
           o.record_type
    FROM invoice i
    LEFT JOIN orders o ON (o.order_id = i.order_id)
    WHERE o.record_type != ''
      AND i.status != 'Cancelled'
      AND i.invoice_date BETWEEN ? AND ?
      ${recordType ? 'AND o.record_type = ?' : ''}
    GROUP BY DATE_FORMAT(i.invoice_date, '%Y-%m')
  `, [monthDate, currentDate, recordType], (err, result) => {
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
  });
});


app.get("/getInvoiceByYearReport", (req, res, next) => {
  const { recordType } = req.query;
  db.query(
    ` SELECT DATE_FORMAT(i.invoice_date, '%Y') AS invoice_year
              ,(SUM(i.invoice_amount )) AS invoice_amount_yearly
              ,o.record_type
        FROM invoice i
        LEFT JOIN orders o   ON (o.order_id   = i.order_id) 
        where o.record_type!=''
 AND i.status != 'cancelled'
 ${recordType ? 'AND o.record_type = ?' : ''}
 GROUP BY DATE_FORMAT(i.invoice_date, '%Y'),o.record_type`
 , [recordType], (err, result) => {
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

app.post("/getAccountReport", (req, res, next) => {
  db.query(
    `SELECT i.invoice_id, i.invoice_code, i.invoice_date, i.invoice_amount, i.mode_of_payment, c.company_name, c.company_id,r.receipt_code,r.mode_of_payment,r.receipt_date,r.amount
            FROM invoice i
            LEFT JOIN orders o ON (i.order_id = o.order_id)
            LEFT JOIN receipt r ON (r.order_id = i.order_id)
            LEFT JOIN company c ON (o.company_id = c.company_id)
            
WHERE i.invoice_date >= ${db.escape(req.body.startDate)} AND  i.invoice_date <= COALESCE(${db.escape(req.body.endDate)}
, CURDATE())
 OR c.company_name = ${db.escape(req.body.companyName)} 
  AND o.order_id != ''
 AND i.status != 'Cancelled'
 ORDER BY i.invoice_date ASC`,
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

app.post('/getAgingReports', (req, res, next) => {
  db.query(`SELECT c.company_name,
c.company_id, 
i.invoice_id, 
i.status, 
i.invoice_date,
o.cust_company_name,
invHist.amount,
(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) BETWEEN 0 AND 15 THEN invHist.amount ELSE 0 END) AS 'firstdays', 
(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) BETWEEN 16 AND 30 THEN invHist.amount ELSE 0 END) AS 'seconddays', 
(CASE WHEN DATEDIFF(CURDATE(), i.invoice_date) BETWEEN 31 AND 45 THEN invHist.amount ELSE 0 END) AS 'thirddays' 
FROM invoice i 
LEFT JOIN orders o ON (i.order_id = o.order_id) 
LEFT JOIN company c ON (o.company_id = c.company_id) 
LEFT JOIN invoice_receipt_history invHist ON (invHist.invoice_id = i.invoice_id)
WHERE c.company_id !='' 
AND i.status != 'Cancelled' 
AND i.status='due' OR i.status='Partial Payment'  OR i.status='paid'`,
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

app.get('/getIr8aReport', (req, res, next) => {
  db.query(`
SELECT DISTINCT 
             e.employee_name
              ,e.citizen
               ,CONCAT_WS(' ', e.nric_no, e.fin_no) AS nric_fin
              ,e.work_permit
              ,e.date_of_birth AS dob
              ,e.status
              ,e.employee_id
              ,(SELECT GROUP_CONCAT(payroll_month)
         FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS pyrol_month
              ,(SELECT SUM(pm.basic_pay) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS gross_salary
              ,( SELECT SUM(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_allowance
               ,(SELECT AVG(gross_salary+total_allowance) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_income
              ,(SELECT SUM(pm.cpf_employee) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_cpf_employee
              
        FROM employee e
 ORDER BY e.employee_name ASC`,
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

app.post('/getIr8aReportPdf', (req, res, next) => {
  db.query(`
SELECT DISTINCT *
              ,CONCAT_WS(' ', e.first_name, e.last_name) AS employee_name
              ,e.citizen
               ,CONCAT_WS(' ', e.nric_no, e.fin_no) AS nric_fin
              ,e.work_permit
              ,e.date_of_birth AS dob
              ,e.status
               ,(SELECT GROUP_CONCAT(payroll_month)
         FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS pyrol_month
               ,(SELECT SUM(pm.director_fee) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS director_fees
              ,(SELECT SUM(pm.basic_pay) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS gross_salary
              ,( SELECT SUM(pm.allowance1+pm.allowance2+pm.allowance3+pm.allowance4+pm.allowance5) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_allowance
               ,(SELECT AVG(gross_salary+total_allowance) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_income
              ,(SELECT SUM(pm.cpf_employee) FROM payroll_management pm WHERE pm.employee_id = e.employee_id) AS total_cpf_employee
               ,j.designation
        FROM employee e
         LEFT JOIN job_information j ON j.employee_id = e.employee_id
        WHERE e.employee_id =${db.escape(req.body.employee_id)}
 ORDER BY e.first_name ASC`,
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


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app
