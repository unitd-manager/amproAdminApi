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
  po.* 
  ,CONCAT('Purchase from',' ',s.company_name ) AS title
  ,s.company_name AS supplier_name
  ,s.supplier_code
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
  ,po.gst_percentage
  ,po.po_code
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
            ,modified_by=${db.escape(req.body.modified_by)}
            ,supplier_id=${db.escape(req.body.supplier_id)}
            ,priority=${db.escape(req.body.priority)}
            ,delivery_to=${db.escape(req.body.delivery_to)}
            ,delivery_date=${db.escape(req.body.delivery_date)}
            ,yr_quote_date=${db.escape(req.body.yr_quote_date)}
            ,supplier_reference_no=${db.escape(req.body.supplier_reference_no)}
            ,contact=${db.escape(req.body.contact)}
            ,mobile=${db.escape(req.body.mobile)}
            ,payment=${db.escape(req.body.payment)}
            ,purchase_item=${db.escape(req.body.purchase_item)}
            ,currency=${db.escape(req.body.currency)}
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
  
  
app.post('/editPurchaseOrder', (req, res, next) => {
  db.query(`UPDATE purchase_order
             SET gst=${db.escape(req.body.gst)}
            ,po_code=${db.escape(req.body.po_code)}
            ,purchase_order_date=${db.escape(req.body.purchase_order_date)}
            ,modification_date=${db.escape(new Date())}
            ,contact_address1=${db.escape(req.body.contact_address1)}
            ,contact_address2=${db.escape(req.body.contact_address2)}
            ,contact_address3=${db.escape(req.body.contact_address3)}
             ,country=${db.escape(req.body.country)}
             ,supplier_id=${db.escape(req.body.supplier_id)}
              ,currency_id=${db.escape(req.body.currency_id)}
              ,currency_name=${db.escape(req.body.currency_name)}
              ,currency_rate=${db.escape(req.body.currency_rate)}
            ,postal_code=${db.escape(req.body.postal_code)}
            ,remarks=${db.escape(req.body.remarks)}
            ,req_delivery_date=${db.escape(req.body.req_delivery_date)}
            ,sub_total=${db.escape(req.body.sub_total)}
            ,tax_amount=${db.escape(req.body.tax_amount)}
            ,net_total=${db.escape(req.body.net_total)}
              ,bill_discount=${db.escape(req.body.bill_discount)}
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
  let data = {
    po_code: req.body.po_code,
    site_id: req.body.site_id,
    supplier_id: req.body.supplier_id,
    contact_id_supplier: req.body.contact_id_supplier,
    delivery_terms: req.body.delivery_terms,
    status: req.body.status,
    project_id: req.body.project_id,
    flag: req.body.flag,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    supplier_reference_no: req.body.supplier_reference_no,
    our_reference_no: req.body.our_reference_no,
    shipping_method: req.body.shipping_method,
    payment_terms: req.body.payment_terms,
    delivery_date: req.body.delivery_date,
    po_date: req.body.po_date,
    shipping_address_flat: req.body.shipping_address_flat,
    shipping_address_street: req.body.shipping_address_street,
    shipping_address_country: req.body.shipping_address_country,
    shipping_address_po_code: req.body.shipping_address_po_code,
    expense_id: req.body.expense_id,
    staff_id: req.body.staff_id,
    purchase_order_date: req.body.purchase_order_date,
    payment_status: req.body.payment_status || "Due",
    title: req.body.title,
    priority: req.body.priority,
    follow_up_date: req.body.follow_up_date,
    notes: req.body.notes,
    supplier_inv_code: req.body.supplier_inv_code,
    gst: req.body.gst,
    gst_percentage: req.body.gst_percentage,
    delivery_to: req.body.delivery_to,
    contact: req.body.contact,
    mobile: req.body.mobile,
    payment: req.body.payment,
    project: req.body.project,
    tran_no: req.body.tran_no,
    tran_date: req.body.tran_date,
    contact_address1: req.body.contact_address1,
    contact_address2: req.body.contact_address2,
    contact_address3: req.body.contact_address3,
    country: req.body.country,
    remarks: req.body.remarks,
    req_delivery_date: req.body.req_delivery_date,
    contact_person: req.body.contact_person,
    supplier_code: req.body.supplier_code,
    postal_code: req.body.postal_code,
    sub_total: req.body.sub_total,
    net_total: req.body.net_total,
    tax_amount: req.body.tax_amount,
    yr_quote_date: req.body.yr_quote_date,
    purchase_item: req.body.purchase_item,
    currency: req.body.currency,
    terms_purchase: req.body.terms_purchase,
    bill_discount: req.body.bill_discount,
    
  };

  let sql = "INSERT INTO purchase_order SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
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
  const purchaseOrderId = db.escape(req.body.purchase_order_id);
  const sql = `
    SELECT
      p.product_code,
      p.qty_in_stock,
      po.po_product_id,
      po.purchase_order_id,
      po.product_id,
      p.title AS product_name,
      po.item_title,
      po.description,
      po.amount,
      po.selling_price,
      po.cost_price,
      (po.qty - po.qty_delivered) AS qty_balance,
      po.gst,
      po.qty,
      (po.cost_price * po.qty_delivered) AS actual_value,
      po.price,
      po.status,
      po.damage_qty,
      po.qty_delivered,
      i.actual_stock AS stock,
      (po.cost_price * po.quantity) AS po_value,
      po.quantity,
      po.unit,
      po.creation_date,
      po.modification_date,
      po.created_by,
      po.modified_by,
      po.qty_updated,
      po.supplier_id,
      po.brand,
      po.qty_requested,
      po.carton_qty,
      po.loose_qty,
      po.carton_price,
      po.gross_total,
      po.discount,
      po.total,
      po.foc_qty,
      po.discount_percentage,
      po.discount_amount

    FROM po_product po
    LEFT JOIN product p ON po.product_id = p.product_id 
    LEFT JOIN inventory i ON i.inventory_id = p.product_id 
    WHERE po.purchase_order_id = ${purchaseOrderId}
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
});

app.post('/editTabPurchaseOrderLineItem', (req, res, next) => {
  const sql = `
    UPDATE po_product SET
      description = ${db.escape(req.body.description)},
      qty_updated = ${db.escape(req.body.qty)},
      amount = ${db.escape(req.body.amount)},
      item_title = ${db.escape(req.body.item_title)},
      selling_price = ${db.escape(req.body.selling_price)},
      cost_price = ${db.escape(req.body.cost_price)},
      gst = ${db.escape(req.body.gst)},
      product_id = ${db.escape(req.body.product_id)},
      unit = ${db.escape(req.body.unit)},
      qty = ${db.escape(req.body.qty)},
      damage_qty = ${db.escape(req.body.damage_qty)},
      qty_delivered = ${db.escape(req.body.qty_delivered)},
      status = ${db.escape(req.body.status)},
      
      -- Additional fields
      modification_date = ${db.escape(req.body.modification_date)},
      modified_by = ${db.escape(req.body.modified_by)},
      supplier_id = ${db.escape(req.body.supplier_id)},
      brand = ${db.escape(req.body.brand)},
      qty_requested = ${db.escape(req.body.qty_requested)},
      carton_qty = ${db.escape(req.body.carton_qty)},
      loose_qty = ${db.escape(req.body.loose_qty)},
      carton_price = ${db.escape(req.body.carton_price)},
      gross_total = ${db.escape(req.body.gross_total)},
      discount = ${db.escape(req.body.discount)},
      total = ${db.escape(req.body.total)}
      
    WHERE po_product_id = ${db.escape(req.body.po_product_id)}
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Success",
      });
    }
  });
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
        ,foc_qty: req.body.foc_qty
    , product_id: req.body.product_id
    , supplier_id: req.body.supplier_id
    , gst:req.body.gst
    , damage_qty: req.body.damage_qty
    , brand: req.body.brand
    , qty_requested: req.body.qty_requested
    , qty_delivered: req.body.qty_delivered
    , price: req.body.price??0,
     carton_qty: req.body.carton_qty ?? 0,
    loose_qty: req.body.loose_qty ?? 0,
    carton_price: req.body.carton_price ?? 0,
    gross_total: req.body.gross_total ?? 0,
    discount: req.body.discount ?? 0,
    total: req.body.total ?? 0,
    discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
    kilo_price: req.body.kilo_price ?? 0,
    standard_rate: req.body.standard_rate?? 0,
    uom: req.body.uom??'pcs',
    remarks: req.body.remarks??'',
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

app.post('/editDeliveryOrder', (req, res, next) => {
  db.query(`UPDATE delivery_order
            SET location=${db.escape(req.body.location)}
            ,scope_of_work=${db.escape(req.body. scope_of_work)}
            ,delivery_order_code=${db.escape(req.body.delivery_order_code)}
            WHERE delivery_order_id =${db.escape(req.body.delivery_order_id)}`,
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


      app.post('/editDelieryOrderHistory', (req, res, next) => {
        db.query(`UPDATE delivery_order_history
                  SET product_id=${db.escape(req.body.product_id)}
                  ,quantity=${db.escape(req.body.quantity)}
                  ,equipment_no=${db.escape(req.body.equipment_no)}
                  ,item=${db.escape(req.body.item)}
                  ,size=${db.escape(req.body.size)}
                  ,unit=${db.escape(req.body.unit)}
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
// app.post('/getDeliveryOrder', (req, res, next) => {
//   db.query(`SELECT do.date,do.delivery_order_id  FROM delivery_order do WHERE purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
//       (err, result) => {
         
//         if (err) {
//            return res.status(400).send({
//                 data: err,
//                 msg:'Failed'
//               });
//         } else {
//               return res.status(200).send({
//                 data: result,
//                 msg:'Delivery order data fetched successfully'
//               });
//         }
  
          
   
//       }
//     );
//   });
  app.post('/getDeliveryOrder', (req, res, next) => {
    db.query(`SELECT do.delivery_order_code,do.date,do.delivery_order_id,do.location,do.scope_of_work 
    ,po.po_code 
  ,po.purchase_order_date 
   FROM (delivery_order do) LEFT JOIN purchase_order po ON po.purchase_order_id = do.purchase_order_id  WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
        (err, result) => {
           
          if (err) {
             return res.status(400).send({
                  data: err,
                  msg:'Failed'
                });
          } else {
                return res.status(200).send({
                  data: result,
                  msg:'Tender has been removed successfully'
                });
          }
    
            
     
        }
      );
    });

    app.post('/getDeliveryOrder', (req, res, next) => {
    db.query(`SELECT do.delivery_order_code,do.date,do.delivery_order_id,do.location,do.scope_of_work 
    ,po.po_code 
  ,po.purchase_order_date 
   FROM (delivery_order do) LEFT JOIN purchase_order po ON po.purchase_order_id = do.purchase_order_id  WHERE po.purchase_order_id = ${db.escape(req.body.purchase_order_id)}`,
        (err, result) => {
           
          if (err) {
             return res.status(400).send({
                  data: err,
                  msg:'Failed'
                });
          } else {
                return res.status(200).send({
                  data: result,
                  msg:'Tender has been removed successfully'
                });
          }
    
            
     
        }
      );
    });

    app.post('/getDeliveryOrderPO', (req, res, next) => {
      db.query(`SELECT do.delivery_order_code,do.date,do.delivery_order_id,do.location,do.scope_of_work 
      ,po.po_code 
    ,po.purchase_order_date 
     FROM (delivery_order do) LEFT JOIN purchase_order po ON po.purchase_order_id = do.purchase_order_id  WHERE do.delivery_order_id = ${db.escape(req.body.delivery_order_id)}`,
          (err, result) => {
             
            if (err) {
               return res.status(400).send({
                    data: err,
                    msg:'Failed'
                  });
            } else {
                  return res.status(200).send({
                    data: result,
                    msg:'Tender has been removed successfully'
                  });
            }
      
              
       
          }
        );
      });


app.post('/getDeliveryOrderHistory', (req, res, next) => {
        
  db.query(`SELECT 
            p.title AS item_title,
              doh.product_id
              ,do.date
              ,doh.equipment_no
              ,doh.quantity
              ,doh.item
                  ,doh.size
                  ,doh.unit
              ,doh.delivery_order_id
        FROM delivery_order_history doh
        LEFT JOIN (delivery_order do) ON (do.delivery_order_id = doh.delivery_order_id)
        LEFT JOIN (product p) ON (p.product_id = doh.product_id)
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
WHERE pop.product_id = ${db.escape(req.body.product_id)}
AND pop.purchase_order_id != ${db.escape(req.body.purchase_order_id)} 
 AND po.supplier_id != ${db.escape(req.body.supplier_id)}
 ORDER BY pop.po_product_id DESC
 LIMIT 0, 10`,
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
WHERE pop.product_id = ${db.escape(req.body.product_id)} 
AND pop.purchase_order_id != ${db.escape(req.body.purchase_order_id)} 
AND po.supplier_id = ${db.escape(req.body.supplier_id)}
ORDER BY pop.po_product_id DESC
 LIMIT 0, 10`,
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
    ,po.gst_percentage
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
  
  app.post('/editPoProduct', (req, res) => {
  const data = {
    purchase_order_id: req.body.purchase_order_id,
    item_title: req.body.item_title,
    quantity: req.body.quantity,
    unit: req.body.unit,
    amount: req.body.amount,
    description: req.body.description ?? 'desc',
    modification_date: new Date(), // updated on edit
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    status: req.body.status,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
    qty_updated: req.body.qty_updated,
    qty: req.body.qty,
     foc_qty: req.body.foc_qty,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    gst: req.body.gst,
    damage_qty: req.body.damage_qty,
    brand: req.body.brand,
    qty_requested: req.body.qty_requested,
    qty_delivered: req.body.qty_delivered,
    price: req.body.price ?? 0,
    carton_qty: req.body.carton_qty,
    loose_qty: req.body.loose_qty,
    carton_price: req.body.carton_price,
    gross_total: req.body.gross_total,
    discount: req.body.discount,
    total: req.body.total,
      discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
  };

  const sql = "UPDATE po_product SET ? WHERE po_product_id = ?";
  const poProductId = req.body.po_product_id;

  db.query(sql, [data, poProductId], (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({
        data: result,
        msg: "Updated successfully"
      });
    }
  });
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
    ,pop.amount
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
    ,po.gst_percentage
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
ORDER BY pop.po_product_id ASC;
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
  app.post('/getMaterialPurchaseByPdf', (req, res, next) => {
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
  ,po.gst_percentage
  ,po.po_code
  ,po.payment
  ,po.contact
  ,po.delivery_to
  ,po.mobile
  ,po.project
  ,po.shipping_method
  ,po.delivery_to
  ,s.company_name AS supplier_name
  FROM purchase_order po 
  LEFT JOIN (supplier s) ON (po.supplier_id = s.supplier_id)
WHERE po.project_id =${db.escape(req.body.project_id)};
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
    //   if (result.length == 0) {
    //     return res.status(400).send({
    //       msg: 'No result found'
    //     });
    //   } 
      else {
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
    ,status:req.body.status
    ,quantity:req.body.qty_delivered
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
 // ✅ INSERT API (strict format, mapped fields only)
app.post('/insertGoodsReceipt', (req, res, next) => {
  let data = {
    purchase_order_id: req.body.purchase_order_id,
    po_code: req.body.po_code,
    site_id: req.body.site_id,
     currency_id: req.body.currency_id,
     currency_code: req.body.currency_code,
     currency_rate: req.body.currency_rate,
     currency_name: req.body.currency_name,
    supplier_id: req.body.supplier_id,
    contact_id_supplier: req.body.contact_id_supplier,
    delivery_terms: req.body.delivery_terms,
    status: req.body.status,
    project_id: req.body.project_id,
    flag: req.body.flag,
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    supplier_reference_no: req.body.supplier_reference_no,
    our_reference_no: req.body.our_reference_no,
    shipping_method: req.body.shipping_method,
    payment_terms: req.body.payment_terms,
    delivery_date: req.body.delivery_date,
    po_date: req.body.po_date,
    shipping_address_flat: req.body.shipping_address_flat,
    shipping_address_street: req.body.shipping_address_street,
    shipping_address_country: req.body.shipping_address_country,
    shipping_address_po_code: req.body.shipping_address_po_code,
    expense_id: req.body.expense_id,
    staff_id: req.body.staff_id,
    goods_receipt_date: req.body.goods_receipt_date,
    payment_status: req.body.payment_status,
    title: req.body.title,
    priority: req.body.priority,
    follow_up_date: req.body.follow_up_date,
    notes: req.body.notes,
    supplier_inv_code: req.body.supplier_inv_code,
    gst: req.body.gst,
    gst_percentage: req.body.gst_percentage,
    delivery_to: req.body.delivery_to,
    contact: req.body.contact,
    mobile: req.body.mobile,
    payment: req.body.payment,
    project: req.body.project,
    tran_no: req.body.tran_no,
    tran_date: req.body.tran_date,
    contact_address1: req.body.contact_address1,
    contact_address2: req.body.contact_address2,
    contact_address3: req.body.contact_address3,
    country: req.body.country,
    remarks: req.body.remarks,
    req_delivery_date: req.body.req_delivery_date,
    contact_person: req.body.contact_person,
    invoice_date: req.body.invoice_date,
    postal_code: req.body.postal_code,
    invoice_no: req.body.invoice_no,
    do_no: req.body.do_no,
    sub_total: req.body.sub_total,
    net_total: req.body.net_total,
    bill_discount: req.body.bill_discount,
  };

  db.query('INSERT INTO goods_receipt SET ?', data, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Inserted successfully" });
  });
});

// ✅ UPDATE API (strict format, mapped fields only)
app.post('/editGoodsReceipt', (req, res, next) => {
  db.query(`
    UPDATE goods_receipt
    SET purchase_order_id=${db.escape(req.body.purchase_order_id)},
        po_code=${db.escape(req.body.po_code)},
        site_id=${db.escape(req.body.site_id)},
        supplier_id=${db.escape(req.body.supplier_id)},
        contact_id_supplier=${db.escape(req.body.contact_id_supplier)},
        delivery_terms=${db.escape(req.body.delivery_terms)},
        status=${db.escape(req.body.status)},
        project_id=${db.escape(req.body.project_id)},
        flag=${db.escape(req.body.flag)},
        created_by=${db.escape(req.body.created_by)},
        modified_by=${db.escape(req.body.modified_by)},
        supplier_reference_no=${db.escape(req.body.supplier_reference_no)},
        our_reference_no=${db.escape(req.body.our_reference_no)},
        shipping_method=${db.escape(req.body.shipping_method)},
        payment_terms=${db.escape(req.body.payment_terms)},
        delivery_date=${db.escape(req.body.delivery_date)},
        po_date=${db.escape(req.body.po_date)},
        shipping_address_flat=${db.escape(req.body.shipping_address_flat)},
        shipping_address_street=${db.escape(req.body.shipping_address_street)},
        shipping_address_country=${db.escape(req.body.shipping_address_country)},
        shipping_address_po_code=${db.escape(req.body.shipping_address_po_code)},
        expense_id=${db.escape(req.body.expense_id)},
        staff_id=${db.escape(req.body.staff_id)},
        goods_receipt_date=${db.escape(req.body.goods_receipt_date)},
        payment_status=${db.escape(req.body.payment_status)},
        title=${db.escape(req.body.title)},
        priority=${db.escape(req.body.priority)},
        follow_up_date=${db.escape(req.body.follow_up_date)},
        notes=${db.escape(req.body.notes)},
        supplier_inv_code=${db.escape(req.body.supplier_inv_code)},
        gst=${db.escape(req.body.gst)},
        gst_percentage=${db.escape(req.body.gst_percentage)},
        delivery_to=${db.escape(req.body.delivery_to)},
        contact=${db.escape(req.body.contact)},
        mobile=${db.escape(req.body.mobile)},
        payment=${db.escape(req.body.payment)},
        project=${db.escape(req.body.project)},
        tran_no=${db.escape(req.body.tran_no)},
        tran_date=${db.escape(req.body.tran_date)},
        contact_address1=${db.escape(req.body.contact_address1)},
        contact_address2=${db.escape(req.body.contact_address2)},
        contact_address3=${db.escape(req.body.contact_address3)},
        country=${db.escape(req.body.country)},
        remarks=${db.escape(req.body.remarks)},
        req_delivery_date=${db.escape(req.body.req_delivery_date)},
        contact_person=${db.escape(req.body.contact_person)},
        invoice_date=${db.escape(req.body.invoice_date)},
        postal_code=${db.escape(req.body.postal_code)},
        invoice_no=${db.escape(req.body.invoice_no)},
        do_no=${db.escape(req.body.do_no)},
        sub_total=${db.escape(req.body.sub_total)},
        net_total=${db.escape(req.body.net_total)},
        modification_date=${db.escape(new Date().toISOString())}
    WHERE goods_receipt_id = ${db.escape(req.body.goods_receipt_id)}
  `,
  (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Updated successfully" });
  });
});

// ✅ GET ALL API
app.get('/getAllGoodsReceipts', (req, res, next) => {
  db.query('SELECT * FROM goods_receipt', (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: 'Fetched successfully' });
  });
});

// ✅ GET BY ID API
app.post('/getGoodsReceiptById', (req, res, next) => {
  db.query(
    `SELECT po.* 
     ,s.supplier_code 
  FROM goods_receipt po 
  LEFT JOIN supplier s ON po.supplier_id = s.supplier_id
    WHERE goods_receipt_id = ${db.escape(req.body.goods_receipt_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Fetched successfully' });
    }
  );
});

// ✅ DELETE API
app.post('/deleteGoodsReceipt', (req, res, next) => {
  db.query(
    `DELETE FROM goods_receipt WHERE goods_receipt_id = ${db.escape(req.body.goods_receipt_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Deleted successfully' });
    }
  );
});

 // ✅ INSERT API (strict format, mapped fields only)
app.post('/insertGoodsReturn', (req, res, next) => {
  let data = {
    purchase_order_id: req.body.purchase_order_id,
    po_code: req.body.po_code,
    site_id: req.body.site_id,
    supplier_id: req.body.supplier_id,
    contact_id_supplier: req.body.contact_id_supplier,
    delivery_terms: req.body.delivery_terms,
    status: req.body.status,
    project_id: req.body.project_id,
    flag: req.body.flag,
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    supplier_reference_no: req.body.supplier_reference_no,
    our_reference_no: req.body.our_reference_no,
    shipping_method: req.body.shipping_method,
    payment_terms: req.body.payment_terms,
    delivery_date: req.body.delivery_date,
    po_date: req.body.po_date,
    shipping_address_flat: req.body.shipping_address_flat,
    shipping_address_street: req.body.shipping_address_street,
    shipping_address_country: req.body.shipping_address_country,
    shipping_address_po_code: req.body.shipping_address_po_code,
    expense_id: req.body.expense_id,
    staff_id: req.body.staff_id,
    goods_receipt_date: req.body.goods_receipt_date,
    payment_status: req.body.payment_status,
    title: req.body.title,
    priority: req.body.priority,
    follow_up_date: req.body.follow_up_date,
    notes: req.body.notes,
    supplier_inv_code: req.body.supplier_inv_code,
    gst: req.body.gst,
    gst_percentage: req.body.gst_percentage,
    delivery_to: req.body.delivery_to,
    contact: req.body.contact,
    mobile: req.body.mobile,
    payment: req.body.payment,
    project: req.body.project,
    tran_no: req.body.tran_no,
    tran_date: req.body.tran_date,
    contact_address1: req.body.contact_address1,
    contact_address2: req.body.contact_address2,
    contact_address3: req.body.contact_address3,
    country: req.body.country,
    remarks: req.body.remarks,
    req_delivery_date: req.body.req_delivery_date,
    contact_person: req.body.contact_person,
    invoice_date: req.body.invoice_date,
    postal_code: req.body.postal_code,
    invoice_no: req.body.invoice_no,
    do_no: req.body.do_no,
    sub_total: req.body.sub_total,
    net_total: req.body.net_total,
      bill_discount: req.body.bill_discount,
  };

  db.query('INSERT INTO goods_return SET ?', data, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Inserted successfully" });
  });
});

// ✅ UPDATE API (strict format, mapped fields only)
app.post('/editGoodsReturn', (req, res, next) => {
  db.query(`
    UPDATE goods_return
    SET purchase_order_id=${db.escape(req.body.purchase_order_id)},
        po_code=${db.escape(req.body.po_code)},
        site_id=${db.escape(req.body.site_id)},
        supplier_id=${db.escape(req.body.supplier_id)},
        contact_id_supplier=${db.escape(req.body.contact_id_supplier)},
        delivery_terms=${db.escape(req.body.delivery_terms)},
        status=${db.escape(req.body.status)},
        project_id=${db.escape(req.body.project_id)},
        flag=${db.escape(req.body.flag)},
        created_by=${db.escape(req.body.created_by)},
        modified_by=${db.escape(req.body.modified_by)},
        supplier_reference_no=${db.escape(req.body.supplier_reference_no)},
        our_reference_no=${db.escape(req.body.our_reference_no)},
        shipping_method=${db.escape(req.body.shipping_method)},
        payment_terms=${db.escape(req.body.payment_terms)},
        delivery_date=${db.escape(req.body.delivery_date)},
        po_date=${db.escape(req.body.po_date)},
        shipping_address_flat=${db.escape(req.body.shipping_address_flat)},
        shipping_address_street=${db.escape(req.body.shipping_address_street)},
        shipping_address_country=${db.escape(req.body.shipping_address_country)},
        shipping_address_po_code=${db.escape(req.body.shipping_address_po_code)},
        expense_id=${db.escape(req.body.expense_id)},
        staff_id=${db.escape(req.body.staff_id)},
        goods_receipt_date=${db.escape(req.body.goods_receipt_date)},
        payment_status=${db.escape(req.body.payment_status)},
        title=${db.escape(req.body.title)},
        priority=${db.escape(req.body.priority)},
        follow_up_date=${db.escape(req.body.follow_up_date)},
        notes=${db.escape(req.body.notes)},
        supplier_inv_code=${db.escape(req.body.supplier_inv_code)},
        gst=${db.escape(req.body.gst)},
        gst_percentage=${db.escape(req.body.gst_percentage)},
        delivery_to=${db.escape(req.body.delivery_to)},
        contact=${db.escape(req.body.contact)},
        mobile=${db.escape(req.body.mobile)},
        payment=${db.escape(req.body.payment)},
        project=${db.escape(req.body.project)},
        tran_no=${db.escape(req.body.tran_no)},
        tran_date=${db.escape(req.body.tran_date)},
        contact_address1=${db.escape(req.body.contact_address1)},
        contact_address2=${db.escape(req.body.contact_address2)},
        contact_address3=${db.escape(req.body.contact_address3)},
        country=${db.escape(req.body.country)},
        remarks=${db.escape(req.body.remarks)},
        req_delivery_date=${db.escape(req.body.req_delivery_date)},
        contact_person=${db.escape(req.body.contact_person)},
        invoice_date=${db.escape(req.body.invoice_date)},
        postal_code=${db.escape(req.body.postal_code)},
        invoice_no=${db.escape(req.body.invoice_no)},
        do_no=${db.escape(req.body.do_no)},
        sub_total=${db.escape(req.body.sub_total)},
        net_total=${db.escape(req.body.net_total)},
        modification_date=${db.escape(new Date().toISOString())}
    WHERE goods_return_id = ${db.escape(req.body.goods_return_id)}
  `,
  (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Updated successfully" });
  });
});

// ✅ GET ALL API for goods_return
app.get('/getAllGoodsReturns', (req, res, next) => {
  db.query('SELECT * FROM goods_return', (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: 'Fetched successfully' });
  });
});

// ✅ GET BY ID API for goods_return
app.post('/getGoodsReturnById', (req, res, next) => {
  db.query(
    `SELECT po.*
     ,s.supplier_code 
  FROM goods_return po 
  LEFT JOIN supplier s ON po.supplier_id = s.supplier_id
    WHERE goods_return_id = ${db.escape(req.body.goods_return_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Fetched successfully' });
    }
  );
});

// ✅ DELETE API for goods_return
app.post('/deleteGoodsReturn', (req, res, next) => {
  db.query(
    `DELETE FROM goods_return WHERE goods_return_id = ${db.escape(req.body.goods_return_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Deleted successfully' });
    }
  );
});

   // ✅ INSERT API (strict format, mapped fields only)
app.post('/insertPurchaseInvoice', (req, res, next) => {
  let data = {
    purchase_order_id: req.body.purchase_order_id,
    po_code: req.body.po_code,
    site_id: req.body.site_id,
    supplier_id: req.body.supplier_id,
    contact_id_supplier: req.body.contact_id_supplier,
    delivery_terms: req.body.delivery_terms,
    status: req.body.status,
    project_id: req.body.project_id,
    flag: req.body.flag,
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    supplier_reference_no: req.body.supplier_reference_no,
    our_reference_no: req.body.our_reference_no,
    shipping_method: req.body.shipping_method,
    payment_terms: req.body.payment_terms,
    delivery_date: req.body.delivery_date,
    po_date: req.body.po_date,
    shipping_address_flat: req.body.shipping_address_flat,
    shipping_address_street: req.body.shipping_address_street,
    shipping_address_country: req.body.shipping_address_country,
    shipping_address_po_code: req.body.shipping_address_po_code,
    expense_id: req.body.expense_id,
    staff_id: req.body.staff_id,
    payment_status: req.body.payment_status,
    title: req.body.title,
    priority: req.body.priority,
    follow_up_date: req.body.follow_up_date,
    notes: req.body.notes,
    supplier_inv_code: req.body.supplier_inv_code,
    gst: req.body.gst,
    gst_percentage: req.body.gst_percentage,
    delivery_to: req.body.delivery_to,
    contact: req.body.contact,
    mobile: req.body.mobile,
    payment: req.body.payment,
    project: req.body.project,
    tran_no: req.body.tran_no,
    tran_date: req.body.tran_date,
    contact_address1: req.body.contact_address1,
    contact_address2: req.body.contact_address2,
    contact_address3: req.body.contact_address3,
    country: req.body.country,
    remarks: req.body.remarks,
    req_delivery_date: req.body.req_delivery_date,
    contact_person: req.body.contact_person,
    invoice_date: req.body.invoice_date,
    postal_code: req.body.postal_code,
    invoice_no: req.body.invoice_no,
    do_no: req.body.do_no,
    sub_total: req.body.sub_total,
    net_total: req.body.net_total
  };

  db.query('INSERT INTO purchase_invoice SET ?', data, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Inserted successfully" });
  });
});

// ✅ UPDATE API (strict format, mapped fields only)
app.post('/editPurchaseInvoice', (req, res, next) => {
  db.query(`
    UPDATE purchase_invoice
    SET purchase_order_id=${db.escape(req.body.purchase_order_id)},
        po_code=${db.escape(req.body.po_code)},
        site_id=${db.escape(req.body.site_id)},
        supplier_id=${db.escape(req.body.supplier_id)},
        contact_id_supplier=${db.escape(req.body.contact_id_supplier)},
        delivery_terms=${db.escape(req.body.delivery_terms)},
        status=${db.escape(req.body.status)},
        project_id=${db.escape(req.body.project_id)},
        flag=${db.escape(req.body.flag)},
        created_by=${db.escape(req.body.created_by)},
        modified_by=${db.escape(req.body.modified_by)},
        supplier_reference_no=${db.escape(req.body.supplier_reference_no)},
        our_reference_no=${db.escape(req.body.our_reference_no)},
        shipping_method=${db.escape(req.body.shipping_method)},
        payment_terms=${db.escape(req.body.payment_terms)},
        delivery_date=${db.escape(req.body.delivery_date)},
        po_date=${db.escape(req.body.po_date)},
        shipping_address_flat=${db.escape(req.body.shipping_address_flat)},
        shipping_address_street=${db.escape(req.body.shipping_address_street)},
        shipping_address_country=${db.escape(req.body.shipping_address_country)},
        shipping_address_po_code=${db.escape(req.body.shipping_address_po_code)},
        expense_id=${db.escape(req.body.expense_id)},
        staff_id=${db.escape(req.body.staff_id)},
        payment_status=${db.escape(req.body.payment_status)},
        title=${db.escape(req.body.title)},
        priority=${db.escape(req.body.priority)},
        follow_up_date=${db.escape(req.body.follow_up_date)},
        notes=${db.escape(req.body.notes)},
        supplier_inv_code=${db.escape(req.body.supplier_inv_code)},
        gst=${db.escape(req.body.gst)},
        gst_percentage=${db.escape(req.body.gst_percentage)},
        delivery_to=${db.escape(req.body.delivery_to)},
        contact=${db.escape(req.body.contact)},
        mobile=${db.escape(req.body.mobile)},
        payment=${db.escape(req.body.payment)},
        project=${db.escape(req.body.project)},
        tran_no=${db.escape(req.body.tran_no)},
        tran_date=${db.escape(req.body.tran_date)},
        contact_address1=${db.escape(req.body.contact_address1)},
        contact_address2=${db.escape(req.body.contact_address2)},
        contact_address3=${db.escape(req.body.contact_address3)},
        country=${db.escape(req.body.country)},
        remarks=${db.escape(req.body.remarks)},
        req_delivery_date=${db.escape(req.body.req_delivery_date)},
        contact_person=${db.escape(req.body.contact_person)},
        invoice_date=${db.escape(req.body.invoice_date)},
        postal_code=${db.escape(req.body.postal_code)},
        invoice_no=${db.escape(req.body.invoice_no)},
        do_no=${db.escape(req.body.do_no)},
        sub_total=${db.escape(req.body.sub_total)},
        net_total=${db.escape(req.body.net_total)},
        modification_date=${db.escape(new Date().toISOString())}
    WHERE purchase_invoice_id = ${db.escape(req.body.purchase_invoice_id)}
  `,
  (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Updated successfully" });
  });
});

// ✅ GET ALL API for goods_return
app.get('/getAllPurchaseInvoice', (req, res, next) => {
  db.query('SELECT * FROM purchase_invoice', (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: 'Fetched successfully' });
  });
});

// ✅ GET BY ID API for goods_return
app.post('/getPurchaseInvoiceById', (req, res, next) => {
  db.query(
    `SELECT po.*
     ,s.supplier_code 
  FROM purchase_invoice po 
  LEFT JOIN supplier s ON po.supplier_id = s.supplier_id
    WHERE purchase_invoice_id = ${db.escape(req.body.purchase_invoice_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Fetched successfully' });
    }
  );
});

// ✅ DELETE API for goods_return
app.post('/deletePurchaseInvoice', (req, res, next) => {
  db.query(
    `DELETE FROM purchase_invoice WHERE purchase_invoice_id = ${db.escape(req.body.purchase_invoice_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Deleted successfully' });
    }
  );
});


   // ✅ INSERT API (strict format, mapped fields only)
app.post('/insertPurchaseDebitNote', (req, res, next) => {
  let data = {
    purchase_order_id: req.body.purchase_order_id,
    po_code: req.body.po_code,
    site_id: req.body.site_id,
    supplier_id: req.body.supplier_id,
    contact_id_supplier: req.body.contact_id_supplier,
    delivery_terms: req.body.delivery_terms,
    status: req.body.status,
    project_id: req.body.project_id,
    flag: req.body.flag,
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    supplier_reference_no: req.body.supplier_reference_no,
    our_reference_no: req.body.our_reference_no,
    shipping_method: req.body.shipping_method,
    payment_terms: req.body.payment_terms,
    delivery_date: req.body.delivery_date,
    po_date: req.body.po_date,
    shipping_address_flat: req.body.shipping_address_flat,
    shipping_address_street: req.body.shipping_address_street,
    shipping_address_country: req.body.shipping_address_country,
    shipping_address_po_code: req.body.shipping_address_po_code,
    expense_id: req.body.expense_id,
    staff_id: req.body.staff_id,
    goods_receipt_date: req.body.goods_receipt_date,
    payment_status: req.body.payment_status,
    title: req.body.title,
    priority: req.body.priority,
    follow_up_date: req.body.follow_up_date,
    notes: req.body.notes,
    supplier_inv_code: req.body.supplier_inv_code,
    gst: req.body.gst,
    gst_percentage: req.body.gst_percentage,
    delivery_to: req.body.delivery_to,
    contact: req.body.contact,
    mobile: req.body.mobile,
    payment: req.body.payment,
    project: req.body.project,
    tran_no: req.body.tran_no,
    tran_date: req.body.tran_date,
    contact_address1: req.body.contact_address1,
    contact_address2: req.body.contact_address2,
    contact_address3: req.body.contact_address3,
    country: req.body.country,
    remarks: req.body.remarks,
    req_delivery_date: req.body.req_delivery_date,
    contact_person: req.body.contact_person,
    invoice_date: req.body.invoice_date,
    postal_code: req.body.postal_code,
    invoice_no: req.body.invoice_no,
    do_no: req.body.do_no,
    sub_total: req.body.sub_total,
    net_total: req.body.net_total
  };

  db.query('INSERT INTO purchase_debit_note SET ?', data, (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Inserted successfully" });
  });
});

// ✅ UPDATE API (strict format, mapped fields only)
app.post('/editPurchaseDebitNote', (req, res, next) => {
  db.query(`
    UPDATE purchase_debit_note
    SET purchase_order_id=${db.escape(req.body.purchase_order_id)},
        po_code=${db.escape(req.body.po_code)},
        site_id=${db.escape(req.body.site_id)},
        supplier_id=${db.escape(req.body.supplier_id)},
        contact_id_supplier=${db.escape(req.body.contact_id_supplier)},
        delivery_terms=${db.escape(req.body.delivery_terms)},
        status=${db.escape(req.body.status)},
        project_id=${db.escape(req.body.project_id)},
        flag=${db.escape(req.body.flag)},
        created_by=${db.escape(req.body.created_by)},
        modified_by=${db.escape(req.body.modified_by)},
        supplier_reference_no=${db.escape(req.body.supplier_reference_no)},
        our_reference_no=${db.escape(req.body.our_reference_no)},
        shipping_method=${db.escape(req.body.shipping_method)},
        payment_terms=${db.escape(req.body.payment_terms)},
        delivery_date=${db.escape(req.body.delivery_date)},
        po_date=${db.escape(req.body.po_date)},
        shipping_address_flat=${db.escape(req.body.shipping_address_flat)},
        shipping_address_street=${db.escape(req.body.shipping_address_street)},
        shipping_address_country=${db.escape(req.body.shipping_address_country)},
        shipping_address_po_code=${db.escape(req.body.shipping_address_po_code)},
        expense_id=${db.escape(req.body.expense_id)},
        staff_id=${db.escape(req.body.staff_id)},
        goods_receipt_date=${db.escape(req.body.goods_receipt_date)},
        payment_status=${db.escape(req.body.payment_status)},
        title=${db.escape(req.body.title)},
        priority=${db.escape(req.body.priority)},
        follow_up_date=${db.escape(req.body.follow_up_date)},
        notes=${db.escape(req.body.notes)},
        supplier_inv_code=${db.escape(req.body.supplier_inv_code)},
        gst=${db.escape(req.body.gst)},
        gst_percentage=${db.escape(req.body.gst_percentage)},
        delivery_to=${db.escape(req.body.delivery_to)},
        contact=${db.escape(req.body.contact)},
        mobile=${db.escape(req.body.mobile)},
        payment=${db.escape(req.body.payment)},
        project=${db.escape(req.body.project)},
        tran_no=${db.escape(req.body.tran_no)},
        tran_date=${db.escape(req.body.tran_date)},
        contact_address1=${db.escape(req.body.contact_address1)},
        contact_address2=${db.escape(req.body.contact_address2)},
        contact_address3=${db.escape(req.body.contact_address3)},
        country=${db.escape(req.body.country)},
        remarks=${db.escape(req.body.remarks)},
        req_delivery_date=${db.escape(req.body.req_delivery_date)},
        contact_person=${db.escape(req.body.contact_person)},
        invoice_date=${db.escape(req.body.invoice_date)},
        postal_code=${db.escape(req.body.postal_code)},
        invoice_no=${db.escape(req.body.invoice_no)},
        do_no=${db.escape(req.body.do_no)},
        sub_total=${db.escape(req.body.sub_total)},
        net_total=${db.escape(req.body.net_total)},
        modification_date=${db.escape(new Date().toISOString())}
    WHERE purchase_debit_note_id = ${db.escape(req.body.purchase_debit_note_id)}
  `,
  (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: "Updated successfully" });
  });
});

// ✅ GET ALL API for goods_return
app.get('/getAllPurchaseDebitNote', (req, res, next) => {
  db.query('SELECT * FROM purchase_debit_note', (err, result) => {
    if (err) return res.status(400).send({ data: err });
    return res.status(200).send({ data: result, msg: 'Fetched successfully' });
  });
});

// ✅ GET BY ID API for goods_return
app.post('/getPurchaseDebitNoteById', (req, res, next) => {
  db.query(
    `SELECT po.*
     ,s.supplier_code 
  FROM purchase_debit_note po 
  LEFT JOIN supplier s ON po.supplier_id = s.supplier_id
    WHERE purchase_debit_note_id = ${db.escape(req.body.purchase_debit_note_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Fetched successfully' });
    }
  );
});

// ✅ DELETE API for goods_return
app.post('/deletePurchaseDebitNote', (req, res, next) => {
  db.query(
    `DELETE FROM purchase_debit_note WHERE purchase_debit_note_id = ${db.escape(req.body.purchase_debit_note_id)}`,
    (err, result) => {
      if (err) return res.status(400).send({ data: err });
      return res.status(200).send({ data: result, msg: 'Deleted successfully' });
    }
  );
});
  
  
  app.post('/insertGrProduct', (req, res, next) => {
  let data = {
    goods_receipt_id: req.body.goods_receipt_id,
    purchase_order_id: req.body.purchase_order_id,
    item_title: req.body.item_title,
    quantity: req.body.quantity,
    unit: req.body.unit,
    amount: req.body.amount,
    description: req.body.description ?? '',
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    status: req.body.status,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
    qty_updated: req.body.qty_updated,
    qty: req.body.qty,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    gst: req.body.gst,
    damage_qty: req.body.damage_qty,
    brand: req.body.brand,
           foc_qty: req.body.foc_qty,
    qty_requested: req.body.qty_requested,
    qty_delivered: req.body.qty_delivered,
    price: req.body.price,
    carton_qty: req.body.carton_qty,
    loose_qty: req.body.loose_qty,
    carton_price: req.body.carton_price,
    gross_total: req.body.gross_total,
    discount: req.body.discount,
    total: req.body.total,
      discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
    kilo_price: req.body.kilo_price ?? 0,
    standard_rate: req.body.standard_rate?? 0,
    uom: req.body.uom??'pcs',
    remarks: req.body.remarks??'',
  };

  db.query('INSERT INTO gr_product SET ?', data, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/editGrProduct', (req, res, next) => {
  db.query(`
    UPDATE gr_product
    SET description=${db.escape(req.body.description)},
        qty_updated=${db.escape(req.body.qty_updated)},
        amount=${db.escape(req.body.amount)},
        item_title=${db.escape(req.body.item_title)},
        selling_price=${db.escape(req.body.selling_price)},
        cost_price=${db.escape(req.body.cost_price)},
        gst=${db.escape(req.body.gst)},
        product_id=${db.escape(req.body.product_id)},
        unit=${db.escape(req.body.unit)},
        qty=${db.escape(req.body.qty)},
        damage_qty=${db.escape(req.body.damage_qty)},
        qty_delivered=${db.escape(req.body.qty_delivered)},
        status=${db.escape(req.body.status)},
        qty_requested=${db.escape(req.body.qty_requested)},
        carton_qty=${db.escape(req.body.carton_qty)},
        loose_qty=${db.escape(req.body.loose_qty)},
        carton_price=${db.escape(req.body.carton_price)},
        gross_total=${db.escape(req.body.gross_total)},
        discount=${db.escape(req.body.discount)},
        total=${db.escape(req.body.total)},
        brand=${db.escape(req.body.brand)},
        modification_date=${db.escape(new Date().toISOString())},
        modified_by=${db.escape(req.body.modified_by)}
    WHERE gr_product_id = ${db.escape(req.body.gr_product_id)}
  `,
  (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.get('/getAllGrProducts', (req, res, next) => {
  db.query('SELECT * FROM gr_product', (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/getGrProductByGoodsReceiptId', (req, res, next) => {
  db.query(
    `SELECT 
      gr.*,
      p.title AS product_name,
      p.product_code
    FROM gr_product gr
    LEFT JOIN product p ON gr.product_id = p.product_id
    WHERE gr.goods_receipt_id = ${db.escape(req.body.goods_receipt_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Success' });
      }
    }
  );
});



app.post('/ConvertToPurchaseInvoice', (req, res, next) => {
  const ids = req.body.goods_receipt_ids; // Array of selected goods_receipt_ids
  const created_by = req.body.created_by;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).send({ msg: 'No records selected' });
  }

  let results = [];

  // Process each ID
  const processNext = (i) => {
    if (i >= ids.length) {
      return res.status(200).send({ data: results, msg: 'All converted successfully' });
    }

    const id = ids[i];
    db.query(`SELECT * FROM goods_receipt WHERE goods_receipt_id = ${db.escape(id)}`, (err, grResult) => {
      if (err || grResult.length === 0) {
        results.push({ id, status: 'failed', error: err || 'Not found' });
        return processNext(i + 1);
      }

      const gr = grResult[0];

      const invoiceData = {
        supplier_id: gr.supplier_id,
        goods_receipt_id: gr.goods_receipt_id,
        po_code: gr.po_code,
        tran_date: new Date().toISOString(),
        creation_date: new Date().toISOString(),
        created_by: created_by,
        sub_total: gr.sub_total,
        net_total: gr.net_total,
        gst: gr.gst,
        // Add additional fields if needed
      };

      db.query('INSERT INTO purchase_invoice SET ?', invoiceData, (err2, result2) => {
        if (err2) {
          results.push({ id, status: 'failed', error: err2 });
        } else {
          results.push({ id, status: 'success', insertId: result2.insertId });
        }
        processNext(i + 1);
      });
    });
  };

  processNext(0);
});

app.post('/RepeatGoodsReceipt', (req, res, next) => {
  const ids = req.body.goods_receipt_ids;
  const created_by = req.body.created_by;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).send({ msg: 'No records selected' });
  }

  let results = [];

  const repeatNext = (i) => {
    if (i >= ids.length) {
      return res.status(200).send({ data: results, msg: 'All repeated successfully' });
    }

    const id = ids[i];

    db.query(`SELECT * FROM goods_receipt WHERE goods_receipt_id = ${db.escape(id)}`, (err, grResult) => {
      if (err || grResult.length === 0) {
        results.push({ id, status: 'failed', error: err || 'Not found' });
        return repeatNext(i + 1);
      }

      const gr = grResult[0];
      delete gr.goods_receipt_id;

      gr.creation_date = new Date().toISOString();
      gr.modification_date = new Date().toISOString();
      gr.created_by = created_by;
      gr.modified_by = created_by;

      db.query('INSERT INTO goods_receipt SET ?', gr, (err2, result2) => {
        if (err2) {
          results.push({ id, status: 'failed', error: err2 });
        } else {
          results.push({ id, status: 'success', new_goods_receipt_id: result2.insertId });
        }
        repeatNext(i + 1);
      });
    });
  };

  repeatNext(0);
});


app.post('/deleteGrProduct', (req, res, next) => {
  db.query(
    `DELETE FROM gr_product WHERE gr_product_id = ${db.escape(req.body.gr_product_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Deleted Successfully' });
      }
    }
  );
});

  app.post('/insertGoodsReturnProduct', (req, res, next) => {
  let data = {
    goods_return_id: req.body.goods_return_id,
    purchase_order_id: req.body.purchase_order_id,
    item_title: req.body.item_title,
    quantity: req.body.quantity,
    unit: req.body.unit,
    amount: req.body.amount,
    description: req.body.description ?? '',
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    status: req.body.status,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
    qty_updated: req.body.qty_updated,
    qty: req.body.qty,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    gst: req.body.gst,
    damage_qty: req.body.damage_qty,
    brand: req.body.brand,
    qty_requested: req.body.qty_requested,
    qty_delivered: req.body.qty_delivered,
    price: req.body.price,
    carton_qty: req.body.carton_qty,
       foc_qty: req.body.foc_qty,
    loose_qty: req.body.loose_qty,
    carton_price: req.body.carton_price,
    gross_total: req.body.gross_total,
    discount: req.body.discount,
    total: req.body.total,
    discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
    kilo_price: req.body.kilo_price ?? 0,
    standard_rate: req.body.standard_rate?? 0,
    uom: req.body.uom??'pcs',
    remarks: req.body.remarks??'',
  };

  db.query('INSERT INTO goods_return_product SET ?', data, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/editGoodsReturnProduct', (req, res, next) => {
  db.query(`
    UPDATE goods_return_product
    SET description=${db.escape(req.body.description)},
        qty_updated=${db.escape(req.body.qty_updated)},
        amount=${db.escape(req.body.amount)},
        item_title=${db.escape(req.body.item_title)},
        selling_price=${db.escape(req.body.selling_price)},
        cost_price=${db.escape(req.body.cost_price)},
        gst=${db.escape(req.body.gst)},
        product_id=${db.escape(req.body.product_id)},
        unit=${db.escape(req.body.unit)},
        qty=${db.escape(req.body.qty)},
        damage_qty=${db.escape(req.body.damage_qty)},
        qty_delivered=${db.escape(req.body.qty_delivered)},
        status=${db.escape(req.body.status)},
        qty_requested=${db.escape(req.body.qty_requested)},
        carton_qty=${db.escape(req.body.carton_qty)},
        loose_qty=${db.escape(req.body.loose_qty)},
        carton_price=${db.escape(req.body.carton_price)},
        gross_total=${db.escape(req.body.gross_total)},
        discount=${db.escape(req.body.discount)},
        total=${db.escape(req.body.total)},
        brand=${db.escape(req.body.brand)},
        modification_date=${db.escape(new Date().toISOString())},
        modified_by=${db.escape(req.body.modified_by)}
    WHERE goods_return_product_id = ${db.escape(req.body.goods_return_product_id)}
  `,
  (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.get('/getAllGoodsReturnProducts', (req, res, next) => {
  db.query('SELECT * FROM goods_return_product', (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/getGoodsReturnProductByGoodsReturnId', (req, res, next) => {
  db.query(
    `SELECT 
      gr.*,
      p.title AS product_name,
      p.product_code
    FROM goods_return_product gr
    LEFT JOIN product p ON gr.product_id = p.product_id WHERE gr.goods_return_id = ${db.escape(req.body.goods_return_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Success' });
      }
    }
  );
});

app.post('/deleteGoodsReturnProduct', (req, res, next) => {
  db.query(
    `DELETE FROM goods_return_product WHERE goods_return_product_id = ${db.escape(req.body.goods_return_product_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Deleted Successfully' });
      }
    }
  );
});

app.post('/convertToDebitNote', async (req, res) => {
  const { goods_return_ids } = req.body;
  if (!goods_return_ids || !Array.isArray(goods_return_ids)) {
    return res.status(400).json({ message: "tran_nos must be an array" });
  }

  try {
    for (let goods_return_id of goods_return_ids) {
      // Fetch original data
      const [rows] = await db.query("SELECT * FROM goods_return WHERE goods_return_id = ?", [goods_return_id]);
      if (rows.length === 0) continue;

      const original = rows[0];

      // Insert into debit_note table
      await db.query(`
        INSERT INTO purchase_debit_note (tran_date, supplier_id, amount, created_by, reference)
        VALUES (?, ?, ?, ?, ?)`,
        [original.tran_date, original.supplier_id, original.amount, original.created_by, tran_no]
      );
    }

    res.json({ message: "Successfully converted to debit notes." });
  } catch (err) {
    console.error("Error converting:", err);
    res.status(500).json({ message: "Server error while converting." });
  }
});

app.post('/repeatGoodsReturn', async (req, res) => {
  const { tran_no } = req.body;
  if (!tran_no) {
    return res.status(400).json({ message: "tran_no is required" });
  }

  try {
    // Fetch original data
    const [rows] = await db.query("SELECT * FROM goods_return WHERE tran_no = ?", [tran_no]);
    if (rows.length === 0) return res.status(404).json({ message: "Goods return not found" });

    const original = rows[0];

    // Generate new tran_no (e.g., GR-newTimestamp)
    const newTranNo = `GR${Date.now()}`;

    // Insert new record
    await db.query(`
      INSERT INTO goods_return (tran_no, tran_date, supplier_id, amount, created_by)
      VALUES (?, ?, ?, ?, ?)`,
      [newTranNo, original.tran_date, original.supplier_id, original.amount, original.created_by]
    );

    res.json({ message: "Goods return repeated successfully.", new_tran_no: newTranNo });
  } catch (err) {
    console.error("Error repeating goods return:", err);
    res.status(500).json({ message: "Server error while repeating." });
  }
});

app.get('/getFilteredGoodsReceipt', (req, res) => {
  const {
    tran_no,
    from_date,
    to_date,
    status,
    supplier_id,
    invoice_no,
  } = req.query;

  let query = `
    SELECT gr.*, s.company_name 
    FROM goods_receipt gr 
    LEFT JOIN supplier s ON gr.supplier_id = s.supplier_id 
    WHERE 1=1
  `;
  const values = [];

  if (tran_no && tran_no.trim()) {
    query += ` AND gr.tran_no = ?`;
    values.push(tran_no.trim());
  }

  if (from_date && from_date.trim()) {
    query += ` AND gr.tran_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    query += ` AND gr.tran_date <= ?`;
    values.push(to_date.trim());
  }

  if (status && status.trim()) {
    query += ` AND gr.status = ?`;
    values.push(status.trim());
  }

  if (supplier_id && supplier_id.trim()) {
    query += ` AND gr.supplier_id = ?`;
    values.push(supplier_id.trim());
  }

  if (invoice_no && invoice_no.trim()) {
    query += ` AND gr.invoice_no LIKE ?`;
    values.push(`%${invoice_no.trim()}%`);
  }

  console.log('SQL Query:', query, 'Values:', values); // For debugging

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});


app.get('/getFilteredPurchaseOrder', (req, res) => {
  const {
    tran_no,
    from_date,
    to_date,
    status,
    supplier_id,
    page,
    limit 
  } = req.query;

  const offset = (page - 1) * limit;

  let baseQuery = `
    FROM purchase_order gr
    LEFT JOIN supplier s ON gr.supplier_id = s.supplier_id
    WHERE 1=1
  `;
  const values = [];

  if (tran_no && tran_no.trim()) {
    baseQuery += ` AND gr.tran_no = ?`;
    values.push(tran_no.trim());
  }

  if (from_date && from_date.trim()) {
    baseQuery += ` AND gr.tran_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    baseQuery += ` AND gr.tran_date <= ?`;
    values.push(to_date.trim());
  }

  if (status && status.trim()) {
    baseQuery += ` AND gr.status = ?`;
    values.push(status.trim());
  }

  if (supplier_id && supplier_id.trim()) {
    baseQuery += ` AND gr.supplier_id = ?`;
    values.push(supplier_id.trim());
  }

  // Query for total count
  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;

  // Query for paginated data
  const dataQuery = `
    SELECT gr.*, s.company_name 
    ${baseQuery}
    ORDER BY gr.tran_date DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countQuery, values, (err, countResult) => {
    if (err) {
      console.error('Count Query Error:', err);
      return res.status(500).json({ msg: 'DB Error (count)', error: err });
    }

    const total = countResult[0]?.total || 0;

    // Add limit and offset to values array
    const dataValues = [...values, parseInt(limit), parseInt(offset)];

    db.query(dataQuery, dataValues, (err, dataResult) => {
      if (err) {
        console.error('Data Query Error:', err);
        return res.status(500).json({ msg: 'DB Error (data)', error: err });
      }

      res.status(200).json({
        msg: 'Success',
        data: dataResult,
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
      });
    });
  });
});


app.get('/getFilteredGoodsReturn', (req, res) => {
  const {
    tran_no,
    from_date,
    to_date,
    status,
    supplier_id,
    invoice_no,
  } = req.query;

  let query = `
    SELECT gr.*, s.company_name 
    FROM goods_return gr 
    LEFT JOIN supplier s ON gr.supplier_id = s.supplier_id 
    WHERE 1=1
  `;
  const values = [];

  if (tran_no && tran_no.trim()) {
    query += ` AND gr.tran_no = ?`;
    values.push(tran_no.trim());
  }

  if (from_date && from_date.trim()) {
    query += ` AND gr.tran_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    query += ` AND gr.tran_date <= ?`;
    values.push(to_date.trim());
  }

  if (status && status.trim()) {
    query += ` AND gr.status = ?`;
    values.push(status.trim());
  }

  if (supplier_id && supplier_id.trim()) {
    query += ` AND gr.supplier_id = ?`;
    values.push(supplier_id.trim());
  }

  if (invoice_no && invoice_no.trim()) {
    query += ` AND gr.invoice_no LIKE ?`;
    values.push(`%${invoice_no.trim()}%`);
  }

  console.log('SQL Query:', query, 'Values:', values); // For debugging

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});


app.get('/getFilteredPurchaseInvoice', (req, res) => {
  const {
    tran_no,
    from_date,
    to_date,
    status,
    supplier_id
  } = req.query;

  let query = `
    SELECT gr.*, s.company_name 
    FROM purchase_invoice gr 
    LEFT JOIN supplier s ON gr.supplier_id = s.supplier_id 
    WHERE 1=1
  `;
  const values = [];

  if (tran_no && tran_no.trim()) {
    query += ` AND gr.tran_no = ?`;
    values.push(tran_no.trim());
  }

  if (from_date && from_date.trim()) {
    query += ` AND gr.tran_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    query += ` AND gr.tran_date <= ?`;
    values.push(to_date.trim());
  }

  if (status && status.trim()) {
    query += ` AND gr.status = ?`;
    values.push(status.trim());
  }

  if (supplier_id && supplier_id.trim()) {
    query += ` AND gr.supplier_id = ?`;
    values.push(supplier_id.trim());
  }


  console.log('SQL Query:', query, 'Values:', values); // For debugging

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});


app.get('/getFilteredPurchaseDebitNote', (req, res) => {
  const {
    tran_no,
    from_date,
    to_date,
    status,
    supplier_id,
    invoice_no,
  } = req.query;

  let query = `
    SELECT gr.*, s.company_name 
    FROM purchase_debit_note gr 
    LEFT JOIN supplier s ON gr.supplier_id = s.supplier_id 
    WHERE 1=1
  `;
  const values = [];

  if (tran_no && tran_no.trim()) {
    query += ` AND gr.tran_no = ?`;
    values.push(tran_no.trim());
  }

  if (from_date && from_date.trim()) {
    query += ` AND gr.tran_date >= ?`;
    values.push(from_date.trim());
  }

  if (to_date && to_date.trim()) {
    query += ` AND gr.tran_date <= ?`;
    values.push(to_date.trim());
  }

  if (status && status.trim()) {
    query += ` AND gr.status = ?`;
    values.push(status.trim());
  }

  if (supplier_id && supplier_id.trim()) {
    query += ` AND gr.supplier_id = ?`;
    values.push(supplier_id.trim());
  }

  if (invoice_no && invoice_no.trim()) {
    query += ` AND gr.invoice_no LIKE ?`;
    values.push(`%${invoice_no.trim()}%`);
  }

  console.log('SQL Query:', query, 'Values:', values); // For debugging

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'DB Error', error: err });
    }
    res.status(200).json({ msg: 'Success', data: result, total: result.length });
  });
});


  app.post('/insertPiProduct', (req, res, next) => {
  let data = {
    purchase_invoice_id: req.body.purchase_invoice_id,
    purchase_order_id: req.body.purchase_order_id,
    item_title: req.body.product_name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    amount: req.body.amount,
    description: req.body.description ?? '',
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    status: req.body.status,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
    qty_updated: req.body.qty_updated,
    qty: req.body.qty,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    gst: req.body.gst,
    damage_qty: req.body.damage_qty,
    brand: req.body.brand,
    qty_requested: req.body.qty_requested,
    qty_delivered: req.body.qty_delivered,
    price: req.body.price,
    uom: req.body.uom,
    kilo_price: req.body.kilo_price,
    standard_rate: req.body.standard_rate,
    foc_qty: req.body.foc_qty,
    carton_qty: req.body.carton_qty,
    loose_qty: req.body.loose_qty,
    carton_price: req.body.carton_price,
    gross_total: req.body.gross_total,
    discount: req.body.discount,
    total: req.body.total,
    discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
    remarks: req.body.remarks??'',
  };

  db.query('INSERT INTO pi_product SET ?', data, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/editPiProduct', (req, res, next) => {
  db.query(`
    UPDATE pi_product
    SET description=${db.escape(req.body.description)},
        qty_updated=${db.escape(req.body.qty_updated)},
        amount=${db.escape(req.body.amount)},
        item_title=${db.escape(req.body.item_title)},
        selling_price=${db.escape(req.body.selling_price)},
        cost_price=${db.escape(req.body.cost_price)},
        gst=${db.escape(req.body.gst)},
        product_id=${db.escape(req.body.product_id)},
        unit=${db.escape(req.body.unit)},
        qty=${db.escape(req.body.qty)},
        damage_qty=${db.escape(req.body.damage_qty)},
        qty_delivered=${db.escape(req.body.qty_delivered)},
        status=${db.escape(req.body.status)},
        qty_requested=${db.escape(req.body.qty_requested)},
        carton_qty=${db.escape(req.body.carton_qty)},
        loose_qty=${db.escape(req.body.loose_qty)},
        carton_price=${db.escape(req.body.carton_price)},
        gross_total=${db.escape(req.body.gross_total)},
        discount=${db.escape(req.body.discount)},
        total=${db.escape(req.body.total)},
        brand=${db.escape(req.body.brand)},
        uom=${db.escape(req.body.uom)},
        kilo_price=${db.escape(req.body.kilo_price)},
        standard_rate=${db.escape(req.body.standard_rate)},
        foc_qty=${db.escape(req.body.foc_qty)},
        modification_date=${db.escape(new Date().toISOString())},
        modified_by=${db.escape(req.body.modified_by)},
          discount_percentage=${db.escape(req.body.discount_percentage)},
          discount_amount=${db.escape(req.body.discount_amount)},
          remarks=${db.escape(req.body.remarks)}
    WHERE pi_product_id = ${db.escape(req.body.pi_product_id)}
  `,
  (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.get('/getAllPiProducts', (req, res, next) => {
  db.query('SELECT * FROM pi_product', (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/getPiProductByPurchaseInvoiceId', (req, res, next) => {
  db.query(
    `SELECT 
      gr.*,
      p.title AS product_name,
      p.product_code
    FROM pi_product gr
    LEFT JOIN product p ON gr.product_id = p.product_id WHERE gr.purchase_invoice_id = ${db.escape(req.body.purchase_invoice_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Success' });
      }
    }
  );
});

app.post('/deletePiProduct', (req, res, next) => {
  db.query(
    `DELETE FROM pi_product WHERE pi_product_id = ${db.escape(req.body.pi_product_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Deleted Successfully' });
      }
    }
  );
});


  app.post('/insertPdProduct', (req, res, next) => {
  let data = {
    purchase_debit_note_id: req.body.purchase_debit_note_id,
    purchase_order_id: req.body.purchase_order_id,
    item_title: req.body.item_title,
    quantity: req.body.quantity,
    unit: req.body.unit,
    amount: req.body.amount,
    description: req.body.description ?? '',
    creation_date: new Date().toISOString(),
    modification_date: new Date().toISOString(),
    created_by: req.body.created_by,
    modified_by: req.body.modified_by,
    status: req.body.status,
    cost_price: req.body.cost_price,
    selling_price: req.body.selling_price,
    qty_updated: req.body.qty_updated,
    qty: req.body.qty,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    gst: req.body.gst,
    damage_qty: req.body.damage_qty,
    brand: req.body.brand,
    qty_requested: req.body.qty_requested,
    qty_delivered: req.body.qty_delivered,
    price: req.body.price,
    carton_qty: req.body.carton_qty,
    loose_qty: req.body.loose_qty,
    carton_price: req.body.carton_price,
    gross_total: req.body.gross_total,
    discount: req.body.discount,
    total: req.body.total,
    discount_percentage: req.body.discount_percentage ?? 0,
    discount_amount: req.body.discount_amount ?? 0,
    kilo_price: req.body.kilo_price ?? 0,
    standard_rate: req.body.standard_rate?? 0,
    uom: req.body.uom??'pcs',
    remarks: req.body.remarks??'',
  };

  db.query('INSERT INTO pd_product SET ?', data, (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/editPdProduct', (req, res, next) => {
  db.query(`
    UPDATE pd_product
    SET description=${db.escape(req.body.description)},
        qty_updated=${db.escape(req.body.qty_updated)},
        amount=${db.escape(req.body.amount)},
        item_title=${db.escape(req.body.item_title)},
        selling_price=${db.escape(req.body.selling_price)},
        cost_price=${db.escape(req.body.cost_price)},
        gst=${db.escape(req.body.gst)},
        product_id=${db.escape(req.body.product_id)},
        unit=${db.escape(req.body.unit)},
        qty=${db.escape(req.body.qty)},
        damage_qty=${db.escape(req.body.damage_qty)},
        qty_delivered=${db.escape(req.body.qty_delivered)},
        status=${db.escape(req.body.status)},
        qty_requested=${db.escape(req.body.qty_requested)},
        carton_qty=${db.escape(req.body.carton_qty)},
        loose_qty=${db.escape(req.body.loose_qty)},
        carton_price=${db.escape(req.body.carton_price)},
        gross_total=${db.escape(req.body.gross_total)},
        discount=${db.escape(req.body.discount)},
        total=${db.escape(req.body.total)},
        brand=${db.escape(req.body.brand)},
        uom=${db.escape(req.body.uom)},
        kilo_price=${db.escape(req.body.kilo_price)},
        standard_rate=${db.escape(req.body.standard_rate)},
        remarks=${db.escape(req.body.remarks)},
        discount_percentage=${db.escape(req.body.discount_percentage)},
        discount_amount=${db.escape(req.body.discount_amount)},
        foc_qty=${db.escape(req.body.foc_qty)},
        modification_date=${db.escape(new Date().toISOString())},
        modified_by=${db.escape(req.body.modified_by)}
    WHERE pd_product_id = ${db.escape(req.body.pd_product_id)}
  `,
  (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.get('/getAllPdProducts', (req, res, next) => {
  db.query('SELECT * FROM pd_product', (err, result) => {
    if (err) {
      return res.status(400).send({ data: err });
    } else {
      return res.status(200).send({ data: result, msg: 'Success' });
    }
  });
});

app.post('/getPdProductByPurchaseDebitNoteId', (req, res, next) => {
  db.query(
    `SELECT 
      gr.*,
      p.title AS product_name,
      p.product_code
    FROM pd_product gr
    LEFT JOIN product p ON gr.product_id = p.product_id WHERE gr.purchase_debit_note_id = ${db.escape(req.body.purchase_debit_note_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Success' });
      }
    }
  );
});

app.post('/deletePdProduct', (req, res, next) => {
  db.query(
    `DELETE FROM pd_product WHERE pd_product_id = ${db.escape(req.body.pd_product_id)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ data: err });
      } else {
        return res.status(200).send({ data: result, msg: 'Deleted Successfully' });
      }
    }
  );
});

app.post('/getPurchaseOrdersByProductId', (req, res) => {
    const { product_id, from_date, to_date } = req.body;

    if (!product_id) {
        return res.status(400).send({ msg: 'product_id is required' });
    }

    let query = `
        SELECT
            po.purchase_order_id,
            po.title,
            po.po_code,
            po.po_date,
            po.supplier_id,
            s.company_name,
            pop.product_id,
            p.title AS product_name,
            p.product_code,
            pop.qty,
            pop.uom,
            pop.total
        FROM
            purchase_order po
        INNER JOIN
            po_product pop ON po.purchase_order_id = pop.purchase_order_id
        INNER JOIN
            product p ON pop.product_id = p.product_id
        LEFT JOIN
            supplier s ON po.supplier_id = s.supplier_id
        WHERE
            pop.product_id = ${db.escape(product_id)}
    `;

    // If date filters provided, add them (using the 'po_date' column)
    if (from_date && to_date) {
        query += ` AND po.po_date BETWEEN ${db.escape(from_date)} AND ${db.escape(to_date)}`;
    } else if (from_date) {
        query += ` AND po.po_date >= ${db.escape(from_date)}`;
    } else if (to_date) {
        query += ` AND po.po_date <= ${db.escape(to_date)}`;
    }

    query += ` ORDER BY po.po_date DESC`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching purchase orders by product:", err);
            return res.status(500).send({ msg: 'Database error', error: err });
        }
        return res.status(200).send({ data: result, msg: 'Success' });
    });
});

app.post('/getPurchaseInvoicesByProductId', (req, res) => {
  const { product_id, from_date, to_date } = req.body;

  if (!product_id) {
    return res.status(400).send({ msg: 'product_id is required' });
  }

  let query = `
    SELECT 
      pi.purchase_invoice_id,
       pi.title,
      pi.invoice_no,
      pi.invoice_date,
      pi.supplier_id,
      s.company_name,
      pip.product_id,
      p.title AS product_name,
      p.product_code,
      pip.qty,
      pip.uom,
      pip.total
    FROM purchase_invoice pi
    INNER JOIN pi_product pip ON pi.purchase_invoice_id = pip.purchase_invoice_id
    INNER JOIN product p ON pip.product_id = p.product_id
    LEFT JOIN supplier s ON pi.supplier_id = s.supplier_id
    WHERE pip.product_id = ${db.escape(product_id)}
  `;

  // If date filters provided, add them
  if (from_date && to_date) {
    query += ` AND pi.invoice_date BETWEEN ${db.escape(from_date)} AND ${db.escape(to_date)}`;
  } else if (from_date) {
    query += ` AND pi.invoice_date >= ${db.escape(from_date)}`;
  } else if (to_date) {
    query += ` AND pi.invoice_date <= ${db.escape(to_date)}`;
  }

  query += ` ORDER BY pi.invoice_date DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching purchase invoices by product:", err);
      return res.status(500).send({ msg: 'Database error', error: err });
    }
    return res.status(200).send({ data: result, msg: 'Success' });
  });
});

app.post('/getPurchaseDebitNotesByProductId', (req, res) => {
  const { product_id, from_date, to_date } = req.body;

  if (!product_id) {
    return res.status(400).send({ msg: 'product_id is required' });
  }

  let query = `
    SELECT 
      pi.purchase_debit_note_id,
       pi.title,
      pi.invoice_no,
      pi.invoice_date,
      pi.supplier_id,
      s.company_name,
      pip.product_id,
      p.title AS product_name,
      p.product_code,
      pip.qty,
      pip.uom,
      pip.total
    FROM purchase_debit_note pi
    INNER JOIN pd_product pip ON pi.purchase_debit_note_id = pip.purchase_debit_note_id
    INNER JOIN product p ON pip.product_id = p.product_id
    LEFT JOIN supplier s ON pi.supplier_id = s.supplier_id
    WHERE pip.product_id = ${db.escape(product_id)}
  `;

  // If date filters provided, add them
  if (from_date && to_date) {
    query += ` AND pi.invoice_date BETWEEN ${db.escape(from_date)} AND ${db.escape(to_date)}`;
  } else if (from_date) {
    query += ` AND pi.invoice_date >= ${db.escape(from_date)}`;
  } else if (to_date) {
    query += ` AND pi.invoice_date <= ${db.escape(to_date)}`;
  }

  query += ` ORDER BY pi.invoice_date DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching purchase invoices by product:", err);
      return res.status(500).send({ msg: 'Database error', error: err });
    }
    return res.status(200).send({ data: result, msg: 'Success' });
  });
});


app.post('/getGoodsReceiptsByProductId', (req, res) => {
  const { product_id, from_date, to_date } = req.body;

  if (!product_id) {
    return res.status(400).send({ msg: 'product_id is required' });
  }

  let query = `
    SELECT 
      pi.goods_receipt_id,
       pi.title,
      pi.invoice_no,
      pi.invoice_date,
      pi.supplier_id,
      s.company_name,
      pip.product_id,
      p.title AS product_name,
      p.product_code,
      pip.qty,
      pip.uom,
      pip.total
    FROM goods_receipt pi
    INNER JOIN gr_product pip ON pi.goods_receipt_id = pip.goods_receipt_id
    INNER JOIN product p ON pip.product_id = p.product_id
    LEFT JOIN supplier s ON pi.supplier_id = s.supplier_id
    WHERE pip.product_id = ${db.escape(product_id)}
  `;

  // If date filters provided, add them
  if (from_date && to_date) {
    query += ` AND pi.invoice_date BETWEEN ${db.escape(from_date)} AND ${db.escape(to_date)}`;
  } else if (from_date) {
    query += ` AND pi.invoice_date >= ${db.escape(from_date)}`;
  } else if (to_date) {
    query += ` AND pi.invoice_date <= ${db.escape(to_date)}`;
  }

  query += ` ORDER BY pi.invoice_date DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching purchase invoices by product:", err);
      return res.status(500).send({ msg: 'Database error', error: err });
    }
    return res.status(200).send({ data: result, msg: 'Success' });
  });
});


app.post('/getGoodsReturnsByProductId', (req, res) => {
  const { product_id, from_date, to_date } = req.body;

  if (!product_id) {
    return res.status(400).send({ msg: 'product_id is required' });
  }

  let query = `
    SELECT 
      pi.goods_return_id,
       pi.title,
      pi.invoice_no,
      pi.invoice_date,
      pi.supplier_id,
      s.company_name,
      pip.product_id,
      p.title AS product_name,
      p.product_code,
      pip.qty,
      pip.uom,
      pip.total
    FROM goods_return pi
    INNER JOIN goods_return_product pip ON pi.goods_return_id = pip.goods_return_id
    INNER JOIN product p ON pip.product_id = p.product_id
    LEFT JOIN supplier s ON pi.supplier_id = s.supplier_id
    WHERE pip.product_id = ${db.escape(product_id)}
  `;

  // If date filters provided, add them
  if (from_date && to_date) {
    query += ` AND pi.invoice_date BETWEEN ${db.escape(from_date)} AND ${db.escape(to_date)}`;
  } else if (from_date) {
    query += ` AND pi.invoice_date >= ${db.escape(from_date)}`;
  } else if (to_date) {
    query += ` AND pi.invoice_date <= ${db.escape(to_date)}`;
  }

  query += ` ORDER BY pi.invoice_date DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching goods returns by product:", err);
      return res.status(500).send({ msg: 'Database error', error: err });
    }
    return res.status(200).send({ data: result, msg: 'Success' });
  });
});




app.post('/getPurchaseInvoicesByIds', (req, res) => {
  const { purchase_invoice_ids } = req.body;

  if (!purchase_invoice_ids || !Array.isArray(purchase_invoice_ids)) {
    return res.status(400).send({ msg: 'purchase_invoice_ids must be an array' });
  }

  const ids = purchase_invoice_ids.map(id => db.escape(id)).join(',');

  //  Get invoices with supplier info
  const invoiceQuery = `
    SELECT 
      pi.purchase_invoice_id,
      pi.tran_no,
      pi.tran_date,
      pi.sub_total,
      pi.gst,
      pi.net_total,
      pi.paid_amount,
      pi.balance_amount,
      pi.created_by,
      s.supplier_id,
      s.company_name,
      s.address_flat,
      s.address_street, 
      s.address_town,
      s.address_state, 
       s.address_country,
      s.address_po_code  
    FROM purchase_invoice pi
    LEFT JOIN supplier s ON pi.supplier_id = s.supplier_id
    WHERE pi.purchase_invoice_id IN (${ids})
  `;

  db.query(invoiceQuery, (err, invoices) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ data: err });
    }

    if (!invoices.length) {
      return res.status(404).send({ msg: 'No invoices found' });
    }

    //  Get all line items for these invoices
    const lineItemsQuery = `
      SELECT 
        pi_product.purchase_invoice_id,
        p.product_id,
        p.title AS product_name,
        pi_product.uom,
        pi_product.total
      FROM pi_product
      LEFT JOIN product p ON pi_product.product_id = p.product_id
      WHERE pi_product.purchase_invoice_id IN (${ids})
    `;

    db.query(lineItemsQuery, (err2, lineItems) => {
      if (err2) {
        console.error(err2);
        return res.status(400).send({ data: err2 });
      }

      //  Group line items under each invoice
      const result = invoices.map(inv => ({
        purchase_invoice_id: inv.purchase_invoice_id,
        tran_no: inv.tran_no,
        tran_date: inv.tran_date,
        sub_total: inv.sub_total,
        gst: inv.gst,
        net_total: inv.net_total,
        paid_amount: inv.paid_amount,
        balance_amount: inv.balance_amount,
        created_by: inv.created_by,
        supplier: {
          supplier_id: inv.supplier_id,
          company_name: inv.company_name,
          address: inv.address_flat,
          phone: inv.address_street
        },
        lineItems: lineItems.filter(li => li.purchase_invoice_id === inv.purchase_invoice_id)
      }));

      return res.status(200).send({ data: result, msg: 'Success' });
    });
  });
});


app.post('/deletePurchaseInvoices', (req, res, next) => {
  const { purchase_invoice_ids } = req.body;

  if (!purchase_invoice_ids || !Array.isArray(purchase_invoice_ids) || purchase_invoice_ids.length === 0) {
    return res.status(400).send({ msg: 'purchase_invoice_ids must be a non-empty array' });
  }

  // Escape each ID and join them
  const ids = purchase_invoice_ids.map(id => db.escape(id)).join(',');

  const sql = `DELETE FROM purchase_invoice WHERE purchase_invoice_id IN (${ids})`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ data: err });
    }

    return res.status(200).send({ data: result, msg: 'Deleted successfully' });
  });
});

app.post('/repeatGoodsReceipt', (req, res,next) => {
  const { goods_receipt_ids, created_by } = req.body;

  if (!goods_receipt_ids || !Array.isArray(goods_receipt_ids)) {
    return res.status(400).send({ msg: 'goods_receipt_ids must be an array' });
  }

  const ids = goods_receipt_ids.map(id => db.escape(id)).join(',');

  // 1️⃣ Fetch all selected Goods Receipts
  const grQuery = `SELECT * FROM goods_receipt WHERE goods_receipt_id IN (${ids})`;

  db.query(grQuery, (err, grs) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ data: err });
    }

    if (!grs.length) {
      return res.status(404).send({ msg: 'No Goods Receipts found' });
    }

    // For each GR, create a new GR and copy its products
    const repeatedGrs = [];

    let pending = grs.length;
    grs.forEach(gr => {
      const insertHeaderQuery = `
        INSERT INTO goods_receipt 
          (purchase_order_id, po_code, site_id, supplier_id, contact_id_supplier, 
           delivery_terms, status, project_id, flag, creation_date, modification_date, 
           created_by, modified_by, supplier_reference_no, our_reference_no, shipping_method, 
           payment_terms, delivery_date, po_date, shipping_address_flat, shipping_address_street, 
           shipping_address_country, shipping_address_po_code, expense_id, staff_id, goods_receipt_date, 
           payment_status, title, priority, follow_up_date, notes, supplier_inv_code, gst, 
           gst_percentage, delivery_to, contact, mobile, payment, project, tran_no, tran_date, 
           contact_address1, contact_address2, contact_address3, country, remarks, req_delivery_date, 
           contact_person, invoice_date, postal_code, invoice_no, do_no, sub_total, net_total)
        VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const headerValues = [
        gr.purchase_order_id, gr.po_code, gr.site_id, gr.supplier_id, gr.contact_id_supplier,
        gr.delivery_terms, 'Repeated', gr.project_id, gr.flag,
        created_by, created_by, gr.supplier_reference_no, gr.our_reference_no, gr.shipping_method,
        gr.payment_terms, gr.delivery_date, gr.po_date, gr.shipping_address_flat, gr.shipping_address_street,
        gr.shipping_address_country, gr.shipping_address_po_code, gr.expense_id, gr.staff_id, new Date(),
        gr.payment_status, gr.title, gr.priority, gr.follow_up_date, gr.notes, gr.supplier_inv_code,
        gr.gst, gr.gst_percentage, gr.delivery_to, gr.contact, gr.mobile, gr.payment, gr.project, gr.tran_no, gr.tran_date,
        gr.contact_address1, gr.contact_address2, gr.contact_address3, gr.country, gr.remarks, gr.req_delivery_date,
        gr.contact_person, gr.invoice_date, gr.postal_code, gr.invoice_no, gr.do_no, gr.sub_total, gr.net_total
      ];

      db.query(insertHeaderQuery, headerValues, (err2, newGrResult) => {
        if (err2) {
          console.error(err2);
          return res.status(400).send({ data: err2 });
        }

        const newGrId = newGrResult.insertId;

        // 2️⃣ Copy products for this GR
        const productQuery = `SELECT * FROM gr_product WHERE goods_receipt_id = ?`;

        db.query(productQuery, [gr.goods_receipt_id], (err3, products) => {
          if (err3) {
            console.error(err3);
            return res.status(400).send({ data: err3 });
          }

          if (products.length) {
            let productPending = products.length;

            products.forEach(p => {
              const insertProductQuery = `
                INSERT INTO gr_product 
                  (goods_receipt_id, purchase_order_id, item_title, quantity, unit, amount, description, 
                   creation_date, modification_date, created_by, modified_by, status, cost_price, 
                   selling_price, qty_updated, qty, product_id, supplier_id, gst, damage_qty, brand, 
                   qty_requested, qty_delivered, price, carton_qty, loose_qty, carton_price, gross_total, 
                   discount, total)
                VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `;

              const productValues = [
                newGrId, p.purchase_order_id, p.item_title, p.quantity, p.unit, p.amount, p.description,
                created_by, created_by, p.status, p.cost_price,
                p.selling_price, p.qty_updated, p.qty, p.product_id, p.supplier_id, p.gst, p.damage_qty, p.brand,
                p.qty_requested, p.qty_delivered, p.price, p.carton_qty, p.loose_qty, p.carton_price, p.gross_total,
                p.discount, p.total
              ];

              db.query(insertProductQuery, productValues, err4 => {
                if (err4) {
                  console.error(err4);
                  return res.status(400).send({ data: err4 });
                }

                productPending--;
                if (productPending === 0) {
                  repeatedGrs.push({ old_gr_id: gr.goods_receipt_id, new_gr_id: newGrId });
                  pending--;
                  if (pending === 0) {
                    return res.status(200).send({
                      data: repeatedGrs,
                      msg: 'Goods Receipts repeated successfully'
                    });
                  }
                }
              });
            });
          } else {
            // No products, just push header
            repeatedGrs.push({ old_gr_id: gr.goods_receipt_id, new_gr_id: newGrId });
            pending--;
            if (pending === 0) {
              return res.status(200).send({
                data: repeatedGrs,
                msg: 'Goods Receipts repeated successfully'
              });
            }
          }
        });
      });
    });
  });
});


app.post('/ConvertToPurchaseInvoice', (req, res, next) => {
  const { goods_receipt_ids, created_by } = req.body;

  if (!goods_receipt_ids || !Array.isArray(goods_receipt_ids)) {
    return res.status(400).send({ msg: 'goods_receipt_ids must be an array' });
  }

  const ids = goods_receipt_ids.map(id => db.escape(id)).join(',');

  //  Fetch all selected Goods Receipts
  const grQuery = `SELECT * FROM goods_receipt WHERE goods_receipt_id IN (${ids})`;

  db.query(grQuery, (err, grs) => {
    if (err) {
      console.error(err);
      return res.status(400).send({ data: err });
    }

    if (!grs.length) {
      return res.status(404).send({ msg: 'No Goods Receipts found' });
    }

    const convertedInvoices = [];
    let pending = grs.length;

    grs.forEach(gr => {
      const insertHeaderQuery = `
        INSERT INTO purchase_invoice 
          (purchase_order_id, po_code, site_id, supplier_id, contact_id_supplier,
           delivery_terms, status, project_id, flag, creation_date, modification_date, 
           created_by, modified_by, supplier_reference_no, our_reference_no, 
           shipping_method, payment_terms, delivery_date, po_date, 
           shipping_address_flat, shipping_address_street, shipping_address_country, shipping_address_po_code, 
           expense_id, staff_id, purchase_invoice_date, payment_status, title, priority, 
           follow_up_date, notes, supplier_inv_code, gst, gst_percentage, delivery_to, 
           contact, mobile, payment, project, tran_no, tran_date, contact_address1, 
           contact_address2, contact_address3, country, remarks, req_delivery_date, 
           contact_person, invoice_date, postal_code, invoice_no, do_no, sub_total, 
           net_total, paid_amount, balance_amount)
        VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const headerValues = [
        gr.purchase_order_id, gr.po_code, gr.site_id, gr.supplier_id, gr.contact_id_supplier,
        gr.delivery_terms, 'Converted', gr.project_id, gr.flag,
        created_by, created_by, gr.supplier_reference_no, gr.our_reference_no,
        gr.shipping_method, gr.payment_terms, gr.delivery_date, gr.po_date,
        gr.shipping_address_flat, gr.shipping_address_street, gr.shipping_address_country, gr.shipping_address_po_code,
        gr.expense_id, gr.staff_id, new Date(), gr.payment_status, gr.title, gr.priority,
        gr.follow_up_date, gr.notes, gr.supplier_inv_code, gr.gst, gr.gst_percentage, gr.delivery_to,
        gr.contact, gr.mobile, gr.payment, gr.project, gr.tran_no, gr.tran_date, gr.contact_address1,
        gr.contact_address2, gr.contact_address3, gr.country, gr.remarks, gr.req_delivery_date,
        gr.contact_person, gr.invoice_date, gr.postal_code, gr.invoice_no, gr.do_no, gr.sub_total,
        gr.net_total, 0, gr.net_total // paid_amount = 0, balance_amount = net_total
      ];

      db.query(insertHeaderQuery, headerValues, (err2, newPiResult) => {
        if (err2) {
          console.error(err2);
          return res.status(400).send({ data: err2 });
        }

        const newPiId = newPiResult.insertId;

        // Copy products from GR → PI
        const productQuery = `SELECT * FROM gr_product WHERE goods_receipt_id = ?`;

        db.query(productQuery, [gr.goods_receipt_id], (err3, products) => {
          if (err3) {
            console.error(err3);
            return res.status(400).send({ data: err3 });
          }

          if (products.length) {
            let productPending = products.length;

            products.forEach(p => {
              const insertProductQuery = `
                INSERT INTO pi_product 
                  (purchase_invoice_id, purchase_order_id, item_title, quantity, unit, amount, description, 
                   creation_date, modification_date, created_by, modified_by, status, cost_price, 
                   selling_price, qty_updated, qty, product_id, supplier_id, gst, damage_qty, brand, 
                   qty_requested, qty_delivered, price, carton_qty, loose_qty, carton_price, gross_total, 
                   discount, total, uom, foc_qty, kilo_price, standard_rate, remarks)
                VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `;

              const productValues = [
                newPiId, p.purchase_order_id, p.item_title, p.quantity, p.unit, p.amount, p.description,
                created_by, created_by, p.status, p.cost_price,
                p.selling_price, p.qty_updated, p.qty, p.product_id, p.supplier_id, p.gst, p.damage_qty, p.brand,
                p.qty_requested, p.qty_delivered, p.price, p.carton_qty, p.loose_qty, p.carton_price, p.gross_total,
                p.discount, p.total, p.uom, p.foc_qty, p.kilo_price, p.standard_rate, p.remarks
              ];

              db.query(insertProductQuery, productValues, err4 => {
                if (err4) {
                  console.error(err4);
                  return res.status(400).send({ data: err4 });
                }

                productPending--;
                if (productPending === 0) {
                  convertedInvoices.push({ old_gr_id: gr.goods_receipt_id, new_pi_id: newPiId });
                  pending--;
                  if (pending === 0) {
                    return res.status(200).send({
                      data: convertedInvoices,
                      msg: 'Goods Receipts converted to Purchase Invoices successfully'
                    });
                  }
                }
              });
            });
          } else {
            // No products in GR → Just insert PI header
            convertedInvoices.push({ old_gr_id: gr.goods_receipt_id, new_pi_id: newPiId });
            pending--;
            if (pending === 0) {
              return res.status(200).send({
                data: convertedInvoices,
                msg: 'Goods Receipts converted to Purchase Invoices successfully'
              });
            }
          }
        });
      });
    });
  });
});

app.post('/repeatGoodsReturn', (req, res) => {
  const { goods_return_ids, created_by } = req.body;

  if (!goods_return_ids || !Array.isArray(goods_return_ids)) {
    return res.status(400).send({ msg: 'goods_return_ids must be an array' });
  }

  const ids = goods_return_ids.map(id => db.escape(id)).join(',');

  // 1️⃣ Fetch all selected Goods Returns
  const grQuery = `SELECT * FROM goods_return WHERE goods_return_id IN (${ids})`;

  db.query(grQuery, (err, grs) => {
    if (err) return res.status(400).send({ data: err });

    if (!grs.length) {
      return res.status(404).send({ msg: 'No Goods Returns found' });
    }

    const repeatedGRs = [];
    let pending = grs.length;

    grs.forEach(gr => {
      const insertHeaderQuery = `
        INSERT INTO goods_return
          (po_code, site_id, supplier_id, contact_id_supplier, delivery_terms, status, project_id, flag,
           creation_date, modification_date, created_by, modified_by, supplier_reference_no, our_reference_no, 
           shipping_method, payment_terms, delivery_date, po_date, shipping_address_flat, shipping_address_street, 
           shipping_address_country, shipping_address_po_code, expense_id, staff_id, goods_receipt_date, 
           payment_status, title, priority, follow_up_date, notes, supplier_inv_code, gst, gst_percentage, delivery_to, 
           contact, mobile, payment, project, tran_no, tran_date, contact_address1, contact_address2, contact_address3, 
           country, remarks, req_delivery_date, contact_person, purchase_order_id, invoice_date, invoice_no, 
           postal_code, do_no, sub_total, net_total)
        VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const headerValues = [
        gr.po_code, gr.site_id, gr.supplier_id, gr.contact_id_supplier, gr.delivery_terms, "Repeated", gr.project_id, gr.flag,
        created_by, created_by, gr.supplier_reference_no, gr.our_reference_no, gr.shipping_method, gr.payment_terms, 
        gr.delivery_date, gr.po_date, gr.shipping_address_flat, gr.shipping_address_street, gr.shipping_address_country, 
        gr.shipping_address_po_code, gr.expense_id, gr.staff_id, gr.goods_receipt_date, gr.payment_status, gr.title, gr.priority,
        gr.follow_up_date, gr.notes, gr.supplier_inv_code, gr.gst, gr.gst_percentage, gr.delivery_to, gr.contact, gr.mobile,
        gr.payment, gr.project, gr.tran_no, gr.tran_date, gr.contact_address1, gr.contact_address2, gr.contact_address3,
        gr.country, gr.remarks, gr.req_delivery_date, gr.contact_person, gr.purchase_order_id, gr.invoice_date,
        gr.invoice_no, gr.postal_code, gr.do_no, gr.sub_total, gr.net_total
      ];

      db.query(insertHeaderQuery, headerValues, (err2, newGR) => {
        if (err2) return res.status(400).send({ data: err2 });

        const newGrId = newGR.insertId;

        // 2️⃣ Copy products
        db.query(`SELECT * FROM goods_return_product WHERE goods_return_id=?`, [gr.goods_return_id], (err3, products) => {
          if (err3) return res.status(400).send({ data: err3 });

          if (products.length) {
            let productPending = products.length;

            products.forEach(p => {
              const insertProductQuery = `
                INSERT INTO goods_return_product
                  (goods_return_id, purchase_order_id, item_title, quantity, unit, amount, description,
                   creation_date, modification_date, created_by, modified_by, status, cost_price, selling_price,
                   qty_updated, qty, product_id, supplier_id, gst, damage_qty, brand, qty_requested, qty_delivered,
                   price, carton_qty, loose_qty, carton_price, gross_total, discount, total)
                VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `;
              const productValues = [
                newGrId, p.purchase_order_id, p.item_title, p.quantity, p.unit, p.amount, p.description,
                created_by, created_by, p.status, p.cost_price, p.selling_price, p.qty_updated, p.qty, p.product_id,
                p.supplier_id, p.gst, p.damage_qty, p.brand, p.qty_requested, p.qty_delivered, p.price,
                p.carton_qty, p.loose_qty, p.carton_price, p.gross_total, p.discount, p.total
              ];

              db.query(insertProductQuery, productValues, err4 => {
                if (err4) return res.status(400).send({ data: err4 });

                productPending--;
                if (productPending === 0) {
                  repeatedGRs.push({ old_gr_id: gr.goods_return_id, new_gr_id: newGrId });
                  pending--;
                  if (pending === 0) {
                    return res.status(200).send({ msg: "Goods Returns repeated successfully", data: repeatedGRs });
                  }
                }
              });
            });
          } else {
            repeatedGRs.push({ old_gr_id: gr.goods_return_id, new_gr_id: newGrId });
            pending--;
            if (pending === 0) {
              return res.status(200).send({ msg: "Goods Returns repeated successfully", data: repeatedGRs });
            }
          }
        });
      });
    });
  });
});

app.post('/convertToPurchaseDebitNote', (req, res) => {
  const { goods_return_ids, created_by } = req.body;

  if (!goods_return_ids || !Array.isArray(goods_return_ids)) {
    return res.status(400).send({ msg: 'goods_return_ids must be an array' });
  }

  const ids = goods_return_ids.map(id => db.escape(id)).join(',');

  // Fetch Goods Returns
  const grQuery = `SELECT * FROM goods_return WHERE goods_return_id IN (${ids})`;

  db.query(grQuery, (err, grs) => {
    if (err) return res.status(400).send({ data: err });
    if (!grs.length) return res.status(404).send({ msg: 'No Goods Returns found' });

    const createdPDNs = [];
    let pending = grs.length;

    grs.forEach(gr => {
      const insertPDNQuery = `
        INSERT INTO purchase_debit_note
          (purchase_order_id, po_code, site_id, supplier_id, contact_id_supplier, delivery_terms, status, project_id, flag,
           creation_date, modification_date, created_by, modified_by, supplier_reference_no, our_reference_no, 
           shipping_method, payment_terms, delivery_date, po_date, shipping_address_flat, shipping_address_street,
           shipping_address_country, shipping_address_po_code, expense_id, staff_id, purchase_debit_note_date,
           payment_status, title, priority, follow_up_date, notes, supplier_inv_code, gst, gst_percentage, delivery_to,
           contact, mobile, payment, project, tran_no, tran_date, contact_address1, contact_address2, contact_address3,
           country, remarks, req_delivery_date, contact_person, invoice_date, invoice_no, postal_code, do_no, sub_total, net_total)
        VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      const headerValues = [
        gr.purchase_order_id, gr.po_code, gr.site_id, gr.supplier_id, gr.contact_id_supplier, gr.delivery_terms, "Converted", gr.project_id, gr.flag,
        created_by, created_by, gr.supplier_reference_no, gr.our_reference_no, gr.shipping_method, gr.payment_terms,
        gr.delivery_date, gr.po_date, gr.shipping_address_flat, gr.shipping_address_street, gr.shipping_address_country,
        gr.shipping_address_po_code, gr.expense_id, gr.staff_id, new Date(), gr.payment_status, gr.title, gr.priority,
        gr.follow_up_date, gr.notes, gr.supplier_inv_code, gr.gst, gr.gst_percentage, gr.delivery_to, gr.contact, gr.mobile,
        gr.payment, gr.project, gr.tran_no, gr.tran_date, gr.contact_address1, gr.contact_address2, gr.contact_address3,
        gr.country, gr.remarks, gr.req_delivery_date, gr.contact_person, gr.invoice_date, gr.invoice_no, gr.postal_code,
        gr.do_no, gr.sub_total, gr.net_total
      ];

      db.query(insertPDNQuery, headerValues, (err2, newPDN) => {
        if (err2) return res.status(400).send({ data: err2 });

        const newPDNId = newPDN.insertId;

        db.query(`SELECT * FROM goods_return_product WHERE goods_return_id=?`, [gr.goods_return_id], (err3, products) => {
          if (err3) return res.status(400).send({ data: err3 });

          if (products.length) {
            let productPending = products.length;

            products.forEach(p => {
              const insertProductQuery = `
                INSERT INTO pd_product
                  (purchase_debit_note_id, purchase_order_id, item_title, quantity, unit, amount, description,
                   creation_date, modification_date, created_by, modified_by, status, cost_price, selling_price,
                   qty_updated, qty, product_id, supplier_id, gst, damage_qty, brand, qty_requested, qty_delivered,
                   price, carton_qty, loose_qty, carton_price, gross_total, discount, total)
                VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              `;
              const productValues = [
                newPDNId, p.purchase_order_id, p.item_title, p.quantity, p.unit, p.amount, p.description,
                created_by, created_by, p.status, p.cost_price, p.selling_price, p.qty_updated, p.qty, p.product_id,
                p.supplier_id, p.gst, p.damage_qty, p.brand, p.qty_requested, p.qty_delivered, p.price,
                p.carton_qty, p.loose_qty, p.carton_price, p.gross_total, p.discount, p.total
              ];

              db.query(insertProductQuery, productValues, err4 => {
                if (err4) return res.status(400).send({ data: err4 });

                productPending--;
                if (productPending === 0) {
                  createdPDNs.push({ old_gr_id: gr.goods_return_id, new_pdn_id: newPDNId });
                  pending--;
                  if (pending === 0) {
                    return res.status(200).send({ msg: "Converted to Purchase Debit Notes successfully", data: createdPDNs });
                  }
                }
              });
            });
          } else {
            createdPDNs.push({ old_gr_id: gr.goods_return_id, new_pdn_id: newPDNId });
            pending--;
            if (pending === 0) {
              return res.status(200).send({ msg: "Converted to Purchase Debit Notes successfully", data: createdPDNs });
            }
          }
        });
      });
    });
  });
});

app.post('/repeatPurchaseOrder', (req, res, next) => {
    const { purchase_order_ids, created_by } = req.body;

    if (!purchase_order_ids || !Array.isArray(purchase_order_ids)) {
        return res.status(400).send({ msg: 'purchase_order_ids must be an array' });
    }

    // Escape and join IDs for the WHERE IN clause
    const ids = purchase_order_ids.map(id => db.escape(id)).join(',');

    // 1️⃣ Fetch all selected Purchase Orders for product line copying
    // and to get the required data (like the old ID) for the response
    const poQuery = `SELECT * FROM purchase_order WHERE purchase_order_id IN (${ids})`;

    db.query(poQuery, (err, pos) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ data: err });
        }

        if (!pos.length) {
            return res.status(404).send({ msg: 'No Purchase Orders found' });
        }

        const repeatedPos = [];
        let pending = pos.length;

        // Start a transaction or use a loop to handle multiple POs
        pos.forEach(po => {
            // 2️⃣ Use INSERT INTO SELECT to efficiently copy the PO header data
            // purchase_order_id (AUTO_INCREMENT) is excluded from the column list
            const insertHeaderQuery = `
                INSERT INTO purchase_order (
                    po_code, site_id, supplier_id, contact_id_supplier, delivery_terms, status, project_id,
                    flag, creation_date, modification_date, created_by, modified_by, supplier_reference_no, 
                    our_reference_no, shipping_method, payment_terms, delivery_date, po_date, 
                    shipping_address_flat, shipping_address_street, shipping_address_country, 
                    shipping_address_po_code, expense_id, staff_id, purchase_order_date, payment_status, 
                    title, priority, follow_up_date, notes, supplier_inv_code, gst, gst_percentage, 
                    delivery_to, contact, mobile, payment, project, tran_no, tran_date, contact_address1, 
                    contact_address2, contact_address3, country, remarks, req_delivery_date, 
                    contact_person, supplier_code, postal_code, sub_total, net_total, 
                    yr_quote_date, purchase_item, currency, terms_purchase,bill_discount,tax_amount
                )
                SELECT 
                    po_code, site_id, supplier_id, contact_id_supplier, delivery_terms, 'Repeated' AS status, project_id,
                    flag, NOW() AS creation_date, NOW() AS modification_date, ? AS created_by, ? AS modified_by, supplier_reference_no, 
                    our_reference_no, shipping_method, payment_terms, delivery_date, po_date, 
                    shipping_address_flat, shipping_address_street, shipping_address_country, 
                    shipping_address_po_code, expense_id, staff_id, NOW() AS purchase_order_date, payment_status, 
                    title, priority, follow_up_date, notes, supplier_inv_code, gst, gst_percentage, 
                    delivery_to, contact, mobile, payment, project, tran_no, tran_date, contact_address1, 
                    contact_address2, contact_address3, country, remarks, req_delivery_date, 
                    contact_person, supplier_code, postal_code, sub_total, net_total, 
                    yr_quote_date, purchase_item, currency, terms_purchase,bill_discount,tax_amount
                FROM purchase_order
                WHERE purchase_order_id = ?
            `;
            
            // Note: The status is hardcoded to 'Repeated' and dates are set to NOW()
            const headerValues = [created_by, created_by, po.purchase_order_id];

            db.query(insertHeaderQuery, headerValues, (err2, newPoResult) => {
                if (err2) {
                    console.error(err2);
                    // Handle error and stop the loop/transaction properly in a real app
                    return res.status(400).send({ data: err2 });
                }

                const newPoId = newPoResult.insertId;

                // 3️⃣ Copy products for this new PO (assuming products are in 'po_product')
                // This logic remains the same as it needs the newPoId
                const productQuery = `SELECT * FROM po_product WHERE purchase_order_id = ?`;

                db.query(productQuery, [po.purchase_order_id], (err3, products) => {
                    if (err3) {
                        console.error(err3);
                        return res.status(400).send({ data: err3 });
                    }

                    if (products.length) {
                        let productPending = products.length;

                        products.forEach(p => {
                            // You would replace this with the actual columns in your po_product table
                            const insertProductQuery = `
                                INSERT INTO po_product
                                  (purchase_order_id, item_title, quantity, unit, amount, description,
                                   creation_date, modification_date, created_by, modified_by, status,
                                   cost_price, selling_price, qty_updated, qty, product_id, supplier_id,
                                   gst, damage_qty, brand, qty_requested, qty_delivered, price,discount_amount,discount_percentage,foc_qty,
                                   carton_qty, loose_qty, carton_price, gross_total, discount, total)
                                VALUES (?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                            `;

                            const productValues = [
                                newPoId, p.item_title, p.quantity, p.unit, p.amount, p.description,
                                created_by, created_by, p.status, p.cost_price,
                                p.selling_price, p.qty_updated, p.qty, p.product_id, p.supplier_id,
                                p.gst, p.damage_qty, p.brand, p.qty_requested, p.qty_delivered, p.price,
                                p.carton_qty, p.loose_qty, p.carton_price, p.gross_total, p.discount, p.total
                            ];

                            db.query(insertProductQuery, productValues, err4 => {
                                if (err4) {
                                    console.error(err4);
                                    return res.status(400).send({ data: err4 });
                                }

                                productPending--;
                                if (productPending === 0) {
                                    repeatedPos.push({ old_po_id: po.purchase_order_id, new_po_id: newPoId });
                                    pending--;
                                    if (pending === 0) {
                                        return res.status(200).send({
                                            data: repeatedPos,
                                            msg: 'Purchase Orders repeated successfully'
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        // No products, just push header
                        repeatedPos.push({ old_po_id: po.purchase_order_id, new_po_id: newPoId });
                        pending--;
                        if (pending === 0) {
                            return res.status(200).send({
                                data: repeatedPos,
                                msg: 'Purchase Orders repeated successfully'
                            });
                        }
                    }
                });
            });
        });
    });
});

// NOTE: Assuming 'db' (MySQL connection) and 'app' (Express app) are defined.

app.post('/ConvertToGra', (req, res, next) => {
    
    const { purchase_order_ids, created_by } = req.body;

    if (!purchase_order_ids || !Array.isArray(purchase_order_ids)) {
        return res.status(400).send({ msg: 'purchase_order_ids must be an array' });
    }

    const ids = purchase_order_ids.map(id => db.escape(id)).join(',');

    // 1️⃣ Fetch all selected Purchase Orders (PO) to get data for copying line items
    // and to iterate through the process.
    const poQuery = `SELECT * FROM purchase_order WHERE purchase_order_id IN (${ids})`;

    db.query(poQuery, (err, pos) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ data: err });
        }

        if (!pos.length) {
            return res.status(404).send({ msg: 'No Purchase Orders found' });
        }

        const convertedReturns = [];
        let pending = pos.length;

        pos.forEach(po => {
            // --- TRANSACTION START (Optional but recommended for data integrity) ---

            // 2️⃣ Use INSERT INTO SELECT for efficient header creation in goodsreturn
            const insertHeaderQuery = `
                INSERT INTO goods_return (
                    purchase_order_id, po_code, site_id, supplier_id, contact_id_supplier,
                    delivery_terms, status, project_id, flag, creation_date, modification_date, 
                    created_by, modified_by, supplier_reference_no, our_reference_no, 
                    shipping_method, payment_terms, delivery_date, po_date, 
                    shipping_address_flat, shipping_address_street, shipping_address_country, 
                    shipping_address_po_code, expense_id, staff_id, goods_receipt_date, 
                    payment_status, title, priority, follow_up_date, notes, 
                    supplier_inv_code, gst, gst_percentage, delivery_to, contact, mobile, 
                    payment, project, tran_no, tran_date, contact_address1, 
                    contact_address2, contact_address3, country, remarks, req_delivery_date, 
                    contact_person, postal_code, sub_total, net_total,bill_discount
                )
                SELECT
                    purchase_order_id, po_code, site_id, supplier_id, contact_id_supplier,
                    delivery_terms, 'Returned' AS status, project_id, flag, NOW() AS creation_date, NOW() AS modification_date,
                    ? AS created_by, ? AS modified_by, supplier_reference_no, our_reference_no,
                    shipping_method, payment_terms, delivery_date, po_date,
                    shipping_address_flat, shipping_address_street, shipping_address_country,
                    shipping_address_po_code, expense_id, staff_id, NOW() AS goods_receipt_date, 
                    payment_status, title, priority, follow_up_date, notes,
                    supplier_inv_code, gst, gst_percentage, delivery_to, contact, mobile,
                    payment, project, tran_no, tran_date, contact_address1,
                    contact_address2, contact_address3, country, remarks, req_delivery_date,
                    contact_person, postal_code, sub_total, net_total,bill_discount
                FROM purchase_order
                WHERE purchase_order_id = ?
            `;

            const headerValues = [created_by, created_by, po.purchase_order_id];

            db.query(insertHeaderQuery, headerValues, (err2, newGrnResult) => {
                if (err2) {
                    console.error(err2);
                    // --- TRANSACTION ROLLBACK ---
                    return res.status(400).send({ data: err2 });
                }

                const newGrnId = newGrnResult.insertId;

                // 3️⃣ Copy products from PO → Goods Return Product Table (goodsreturn_product)
                const productQuery = `SELECT * FROM po_product WHERE purchase_order_id = ?`;

                db.query(productQuery, [po.purchase_order_id], (err3, products) => {
                    if (err3) {
                        console.error(err3);
                        // --- TRANSACTION ROLLBACK ---
                        return res.status(400).send({ data: err3 });
                    }

                    if (products.length) {
                        let productPending = products.length;
                        let productInsertError = false;

                        products.forEach(p => {
                            // You must ensure 'goodsreturn_product' has these columns
                            const insertProductQuery = `
                                INSERT INTO goods_return_product
                                  (goods_return_id, purchase_order_id, item_title, quantity, unit, amount, description,
                                   creation_date, modification_date, status, cost_price,
                                   selling_price, qty_updated, qty, product_id, supplier_id, gst, damage_qty, brand,
                                   qty_requested, qty_delivered, price, carton_qty, loose_qty, carton_price, gross_total,
                                   discount, total,foc_qty,discount_percentage,discount_amount)
                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                            `;

                            const productValues = [
                                newGrnId, p.purchase_order_id, p.item_title, p.quantity, p.unit, p.amount, p.description,
                                p.creation_date,p.modification_date, p.status, p.cost_price,
                                p.selling_price, p.qty_updated, p.qty, p.product_id, p.supplier_id,
                                p.gst, p.damage_qty, p.brand, p.qty_requested, p.qty_delivered, p.price,
                                p.carton_qty, p.loose_qty, p.carton_price, p.gross_total, p.discount, p.total
                            ];

                            db.query(insertProductQuery, productValues, err4 => {
                                if (err4) {
                                    console.error(err4);
                                    productInsertError = true;
                                    // --- TRANSACTION ROLLBACK ---
                                    if (pending > 0) { // Prevent multiple responses if error occurs
                                        res.status(400).send({ data: err4 });
                                        pending = 0; // Mark as done to prevent final success
                                    }
                                    return;
                                }

                                productPending--;
                                if (productPending === 0 && !productInsertError) {
                                    convertedReturns.push({ old_po_id: po.purchase_order_id, new_grn_id: newGrnId });
                                    pending--;
                                    if (pending === 0) {
                                        // --- TRANSACTION COMMIT ---
                                        return res.status(200).send({
                                            data: convertedReturns,
                                            msg: 'Purchase Orders converted to Goods Returns successfully'
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        // No products in PO → Just insert GRN header
                        convertedReturns.push({ old_po_id: po.purchase_order_id, new_grn_id: newGrnId });
                        pending--;
                        if (pending === 0) {
                            // --- TRANSACTION COMMIT ---
                            return res.status(200).send({
                                data: convertedReturns,
                                msg: 'Purchase Orders converted to Goods Returns successfully'
                            });
                        }
                    }
                });
            });
        });
    });
});

app.post('/changeStatus', (req, res) => {
  const { purchase_order_ids, status } = req.body;

  if (!purchase_order_ids || !status) {
    return res.status(400).json({ 
      error: 'purchase_order_ids and status are required' 
    });
  }

  const ids = Array.isArray(purchase_order_ids) 
    ? purchase_order_ids 
    : [purchase_order_ids];

  const placeholders = ids.map(() => '?').join(',');

  const query = `
    UPDATE purchase_order
    SET status = ?
    WHERE purchase_order_id IN (${placeholders})
  `;

  db.query(query, [status, ...ids], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(200).json({
      message: 'Status updated successfully',
      affectedRows: result.affectedRows
    });
  });
});

app.get("/recapPurchaseInvoice", async (req, res) => {
  const { from, to } = req.query;

  let query = `
    SELECT 
      s.company_name,
      COUNT(p.purchase_invoice_id) AS total_invoices,
      SUM(p.net_total) AS total_amount,
      SUM(p.paid_amount) AS total_paid,
      SUM(p.balance_amount) AS total_balance
    FROM purchase_invoices p
    LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
    WHERE 1=1
  `;

  const params = [];

  // ✅ Optional date filter
  if (from && to) {
    query += ` AND DATE(p.purchase_invoice_date) BETWEEN ? AND ?`;
    params.push(from, to);
  }

  query += ` GROUP BY p.supplier_id ORDER BY total_amount DESC`;

  try {
    const [rows] = await db.query(query, params);
    res.json({
      success: true,
      message: "Recap data fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recap data" });
  }
});

router.get('/recapPurchaseDebitNote', async (req, res) => {
  try {
    const sql = `
      SELECT 
        s.supplier_id,
        s.company_name,
        COUNT(pdn.purchase_debit_note_id) AS total_notes,
        SUM(pdn.net_total) AS total_amount,
        SUM(CASE WHEN pdn.payment_status = 'Paid' THEN pdn.net_total ELSE 0 END) AS paid_amount,
        SUM(CASE WHEN pdn.payment_status != 'Paid' THEN pdn.net_total ELSE 0 END) AS balance_amount,
        MAX(pdn.purchase_debit_note_date) AS last_note_date
      FROM purchase_debit_note pdn
      LEFT JOIN supplier s ON s.supplier_id = pdn.supplier_id
      WHERE pdn.flag = 1
      GROUP BY s.supplier_id, s.company_name
      ORDER BY last_note_date DESC
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching Purchase Debit Note Recap:', err);
        return res.status(500).json({ message: 'Database Error', error: err });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.post('/addCostPurchaseInvoice', async (req, res) => {
  const { purchase_invoice_id, operation_cost } = req.body;

  if (!purchase_invoice_id || !operation_cost) {
    return res.status(400).json({ error: 'Invoice ID and operation cost required' });
  }

  try {
    // Update net_total by adding operation cost
    const query = `
      UPDATE purchase_invoice
      SET net_total = net_total + ?, 
          balance_amount = balance_amount + ? 
      WHERE purchase_invoice_id = ?
    `;
    const [result] = await db.execute(query, [operation_cost, operation_cost, purchase_invoice_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ message: 'Operation cost added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/makePaymentPurchaseInvoice', async (req, res) => {
  const { purchase_invoice_id, payment_amount } = req.body;

  if (!purchase_invoice_id || !payment_amount) {
    return res.status(400).json({ error: 'Invoice ID and payment amount required' });
  }

  try {
    const [invoiceRows] = await db.execute(
      `SELECT net_total, paid_amount, balance_amount FROM purchase_invoice WHERE purchase_invoice_id = ?`,
      [purchase_invoice_id]
    );

    if (invoiceRows.length === 0) return res.status(404).json({ error: 'Invoice not found' });

    const invoice = invoiceRows[0];
    const newPaidAmount = parseFloat(invoice.paid_amount) + parseFloat(payment_amount);
    const newBalance = parseFloat(invoice.net_total) - newPaidAmount;
    const paymentStatus = newBalance <= 0 ? 'Paid' : 'Partial';

    await db.execute(
      `UPDATE purchase_invoice
       SET paid_amount = ?, balance_amount = ?, payment_status = ?
       WHERE purchase_invoice_id = ?`,
      [newPaidAmount, newBalance, paymentStatus, purchase_invoice_id]
    );

    res.status(200).json({ message: 'Payment recorded successfully', paid_amount: newPaidAmount, balance_amount: newBalance, payment_status: paymentStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});
      
module.exports = app
