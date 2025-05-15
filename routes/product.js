const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/Database.js");
const userMiddleware = require("../middleware/UserModel.js");
var md5 = require("md5");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
const mime = require("mime-types");
var bodyParser = require("body-parser");
const fs=require('fs');
const xlsx = require('xlsx');
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);


app.post('/ExportProducttoExcel',(req,res,next)=>{
  db.query(`SELECT *
FROM product `,
    (err, result) => {
      if (err) {
        console.log('error: ', err)
        return res.status(400).send({
          data: err,
          msg: 'failed',
        })
      } else {
        
            let response=result;
            //create a new work book
            let workbook=xlsx.utils.book_new();
            //Converts json array to worksheet
            let worksheet=xlsx.utils.json_to_sheet(response);
            //append sheet to book
            xlsx.utils.book_append_sheet(workbook,worksheet,'Prod')
            //write file
            xlsx.writeFile(workbook,"/home/pc/Documents/Excelfiles/Product.xlsx")
            res.status(200).send({
              data: response,
              msg: 'Success',
                });
  
          }
    }
  );
});


app.get("/product/getAllPaginationProducts", (req, res) => {
  let { page = 1, limit = 20, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  // Search filter
  let searchQuery = "";
  if (search) {
    searchQuery = `AND title LIKE ?`;
  }

  // Count total products
  const countQuery = `SELECT COUNT(*) AS total FROM products WHERE 1 ${searchQuery}`;
  const countParams = search ? [`%${search}%`] : [];

  db.query(countQuery, countParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Fetch paginated products
    const query = `SELECT * FROM products WHERE 1 ${searchQuery} LIMIT ? OFFSET ?`;
    const queryParams = search ? [`%${search}%`, limit, offset] : [limit, offset];

    db.query(query, queryParams, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      res.json({
        data: results,
        totalRecords,
        totalPages,
        currentPage: page,
      });
    });
  });
});

app.post("/getProductsPagination", (req, res, next) => {

  var limit = req.body.length;
  var start = req.body.start;
  var where = "";
  var sqlTot = "";


  // check search value exist
  if (req.body.search.value) {
    var serVal = req.body.search.value;
    where += " WHERE ";
    where += "  p.title LIKE '%" + serVal + "%' ";
    where += " OR p.item_code LIKE '%" + serVal + "%' ";
    // where += " OR ur.user_status LIKE '%" + serVal + "%' ";
  }
  // getting total number records without any search
  var sql = `SELECT DISTINCT p.*
  ,c.category_title
  FROM product p LEFT JOIN (category c) ON (p.category_id = c.category_id)`;
  
  sqlTot = sql;

  //concatenate search sql if value exist
  if (where && where !== "") {
   
      sqlTot = `SELECT DISTINCT p.*
  ,c.category_title
  FROM product p LEFT JOIN (category c) ON (p.category_id = c.category_id) ${where}`;
   
    sql =  `SELECT DISTINCT p.*
  ,c.category_title
  FROM product_pagination p LEFT JOIN (category c) ON (p.category_id = c.category_id) ${where} LIMIT ${start} ,${limit}`;  
    
  }
    sql =  `SELECT DISTINCT p.*
  ,c.category_title
  FROM product p LEFT JOIN (category c) ON (p.category_id = c.category_id) LIMIT ${start} ,${limit}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
        let finalData = result
      db.query(sqlTot, (err, result) => {
        if (err) {
          return res.status(400).send({
            data: err,
            msg: "failed",
          });
        } else {
          return res.status(200).send({
            msg: "Success",
            draw: req.body.draw,
            recordsTotal: 20,
            recordsFiltered: result.length,
            data: finalData
          });
        }
      });
    }
  });
});

app.post("/getCodeValue", (req, res, next) => {
  var type = req.body.type;
  let sql = '';
  let key_text = '';
  let withprefix = true;
  if(type == 'opportunity'){
      key_text = 'nextOpportunityCode';
      sql = "SELECT * FROM setting WHERE key_text='opportunityCodePrefix' OR key_text='nextOpportunityCode'";
  }else if(type == 'receipt'){
      key_text = 'nextReceiptCode';
      sql = "SELECT * FROM setting WHERE key_text='receiptCodePrefix' OR key_text='nextReceiptCode'";
  }else if(type == 'lead'){
      key_text = 'nextLeadsCode';
      sql = "SELECT * FROM setting WHERE key_text='leadsPrefix' OR key_text='nextLeadsCode'";  
  }else if(type == 'invoice'){
      key_text = 'nextInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='invoiceCodePrefix' OR key_text='nextInvoiceCode'";  
  }else if(type == 'subConworkOrder'){
      key_text = 'nextSubconCode';
    sql = "SELECT * FROM setting WHERE key_text='subconCodePrefix' OR key_text='nextSubconCode'";  
  }
  else if(type == 'project'){
      key_text = 'nextProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='projectCodePrefix' OR key_text='nextProjectCode'";  
  }else if(type == 'opportunityproject'){
      key_text = 'nextOpportunityProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='opportunityprojectCodePrefix' OR key_text='nextOpportunityProjectCode'";  
  }else if(type == 'quote'){
      key_text = 'nextQuoteCode';
      sql = "SELECT * FROM setting WHERE key_text='quoteCodePrefix' OR key_text='nextQuoteCode'";  
  }
  else if(type == 'creditNote'){
      key_text = 'nextCreditNoteCode';
      sql = "SELECT * FROM setting WHERE key_text='creditNotePrefix' OR key_text='nextCreditNoteCode'";  
  }else if(type == 'employee'){
    //   withprefix = false;
      key_text = 'nextEmployeeCode';
    sql = "SELECT * FROM setting WHERE key_text='employeeCodePrefix' OR key_text='nextEmployeeCode'";  
  }
  else if(type == 'claim'){
      withprefix = false;
      key_text = 'nextClaimCode';
      sql = "SELECT * FROM setting WHERE  key_text='nextClaimCode'";  
  }
  else if(type == 'QuoteCodeOpp'){
      withprefix = false;
      key_text = 'nextQuoteCodeOpp';
      sql = "SELECT * FROM setting WHERE  key_text='nextQuoteCodeOpp'";  
  }
  else if(type == 'wocode'){
      key_text = 'nextWOCode';
      sql = "SELECT * FROM setting WHERE key_text='wOCodePrefix' OR key_text='nextWOCode'";  
  }
  else if(type == 'ProductCode'){
      key_text = 'nextProductCode';
      sql = "SELECT * FROM setting WHERE key_text='nextProductCodePrefix' OR key_text='nextProductCode'";  
  }
  else if(type == 'InventoryCode'){
      key_text = 'nextInventoryCode';
      sql = "SELECT * FROM setting WHERE key_text='inventoryCodePrefix' OR key_text='nextInventoryCode'";  
  }
  else if(type == 'ItemCode'){
      withprefix = false;
      key_text = 'nextItemCode';
      sql = "SELECT * FROM setting WHERE key_text='nextItemCode'"; 
  }
  let query = db.query(sql, (err, result) => {
      let old = result
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
       
        var finalText = '';
        var newvalue = 0
        if(withprefix == true){
            var codeObject = result.filter(obj => obj.key_text === key_text);
            
             var prefixObject = result.filter(obj => obj.key_text != key_text);
            finalText = prefixObject[0].value + codeObject[0].value;
            newvalue = parseInt(codeObject[0].value) + 1
        }else{
            finalText = result[0].value
            newvalue = parseInt(result[0].value) + 1
        }
        newvalue = newvalue.toString()
         let query = db.query(`UPDATE setting SET value=${db.escape(newvalue)} WHERE key_text = ${db.escape(key_text)}`, (err, result) => {
            if (err) {
              return res.status(400).send({
                data: err,
                msg: "failed",
              });
            } else {
              return res.status(200).send({
                data: finalText,
                result:old
              });
            }
        });
    }
  });
});

app.get("/getColorValueList", (req, res, next) => {
  db.query(
    `SELECT 
       value as colors,valuelist_id
       FROM valuelist WHERE key_text="Product Color"`,
    (err, result) => {
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
    }
  );
});

app.get('/getUnitFromValueList', (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text='UoM'`,
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

app.get("/getSizeValueList", (req, res, next) => {
  db.query(
    `SELECT 
       value,valuelist_id
       FROM valuelist WHERE key_text="Product Size"`,
    (err, result) => {
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
    }
  );
});

app.get("/getAllProducts", (req, res, next) => {
  db.query(
    `select  p.title
     ,p.category_id
      ,p.product_code
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
    ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
     where p.product_id !=''
   GROUP BY p.product_id `,
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

app.post("/getProductUOM", (req, res) => {
  const { product_id } = req.body;
  db.query(
    `SELECT uom_id, product_id, barcode, description, pcs_per_carton, retail_price, carton_price 
     FROM product_uom 
     WHERE product_id = ?`,
    [product_id],
    (err, result) => {
      if (err) {
        console.log("Error fetching UOMs: ", err);
        return res.status(400).send({ msg: "Failed", data: err });
      } else {
        return res.status(200).send({ msg: "Success", data: result });
      }
    }
  );
});

app.post("/addProductUOM", (req, res) => {
  const {
    product_id,
    barcode,
    description,
    pcs_per_carton,
    retail_price,
    carton_price,
  } = req.body;

  db.query(
    `INSERT INTO product_uom 
     (product_id, barcode, description, pcs_per_carton, retail_price, carton_price) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [product_id, barcode, description, pcs_per_carton, retail_price, carton_price],
    (err, result) => {
      if (err) {
        console.log("Error inserting UOM: ", err);
        return res.status(400).send({ msg: "Insert failed", data: err });
      } else {
        return res.status(200).send({ msg: "Insert successful", data: result });
      }
    }
  );
});
 
 app.post("/deleteProductUOM", (req, res) => {
  const { uom_id } = req.body;

  db.query(
    `DELETE FROM product_uom WHERE uom_id = ?`,
    [uom_id],
    (err, result) => {
      if (err) {
        console.log("Error deleting UOM: ", err);
        return res.status(400).send({ msg: "Delete failed", data: err });
      } else {
        return res.status(200).send({ msg: "Delete successful", data: result });
      }
    }
  );
});

app.post('/updateProductUOM', (req, res) => {
  const { uom_id, barcode, description, pcs_per_carton, retail_price, carton_price } = req.body;

  const query = `
    UPDATE product_uom
    SET barcode = ?, description = ?, pcs_per_carton = ?, retail_price = ?, carton_price = ?
    WHERE uom_id = ?
  `;

  db.query(query, [barcode, description, pcs_per_carton, retail_price, carton_price, uom_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating UOM' });
    res.json({ message: 'UOM updated successfully' });
  });
});  

app.post('/getProductVariations', (req, res) => {
  const { product_id } = req.body;
  const query = `SELECT * FROM product_variation WHERE product_id = ?`;

  db.query(query, [product_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching variations' });
    res.json({ data: results });
  });
});

app.post('/addProductVariation', (req, res) => {
  const {
    product_id,
    child_product_code,
    child_product_name,
    variation_name,
    qty,
    variation_price,
  } = req.body;

  const query = `
    INSERT INTO product_variation
    (product_id, child_product_code, child_product_name, variation_name, qty, variation_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [product_id, child_product_code, child_product_name, variation_name, qty, variation_price],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding variation' });
      res.json({ message: 'Variation added successfully' });
    }
  );
});

app.post('/updateProductVariation', (req, res) => {
  const {
    variation_id,
    child_product_code,
    child_product_name,
    variation_name,
    qty,
    variation_price,
  } = req.body;

  const query = `
    UPDATE product_variation
    SET child_product_code = ?, child_product_name = ?, variation_name = ?, qty = ?, variation_price = ?
    WHERE variation_id = ?
  `;

  db.query(
    query,
    [child_product_code, child_product_name, variation_name, qty, variation_price, variation_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating variation' });
      res.json({ message: 'Variation updated successfully' });
    }
  );
});

app.post('/deleteProductVariation', (req, res) => {
  const { variation_id } = req.body;
  const query = 'DELETE FROM product_variation WHERE variation_id = ?';

  db.query(query, [variation_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting variation' });
    res.json({ message: 'Variation deleted successfully' });
  });
});


app.get("/getOfferProducts", (req, res, next) => {
  db.query(
    `select  p.title
     ,p.category_id
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
     where p.discount_percentage !=''
   GROUP BY p.product_id `,
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


app.get("/getTopOfferProducts", (req, res, next) => {
  db.query(
    `select  p.title
     ,p.category_id
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
     where p.discount_percentage !=''
   GROUP BY p.product_id 
   ORDER BY p.discount_percentage DESC`,
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



app.get("/getLTHProducts", (req, res, next) => {
  db.query(
    `SELECT * 
    ,GROUP_CONCAT(m.file_name) AS images
    FROM product p 
    LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.product_id !=''
   GROUP BY p.product_id
   ORDER BY p.price ASC LIMIT 3`,
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


app.post("/getProductBySubcategory", (req, res, next) => {
  db.query(
    `select p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,sc.sub_category_id
    ,sc.title
    from product p
     LEFT JOIN sub_category sc ON (c.sub_category_id = p.sub_category_id)
     where p.sub_category_id= ${db.escape(req.body.sub_category_id)}`,
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

app.post("/getProductbyproductId", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.product_id= ${db.escape(req.body.product_id)} 
     GROUP BY p.product_id`,
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


app.post("/getProductbyCategoryId", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id) 
    where p.category_id= ${db.escape(req.body.category_id)}
     GROUP BY p.product_id`,
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


app.post("/getProductsbyTag", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.tag = ${db.escape(req.body.tag)}
     GROUP BY p.product_id`,
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


app.get("/getMostPopularProducts", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.most_popular !=''
     GROUP BY p.product_id`,
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


app.get("/getBestSellingProducts", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.top_seller !=''
     GROUP BY p.product_id`,
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


app.get("/getNewProducts", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.latest != ''
     GROUP BY p.product_id`,
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


app.post("/getProductsbySearch", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.title LIKE CONCAT('%', ${db.escape(req.body.keyword)}, '%') 
     GROUP BY p.product_id`,
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


app.post("/getOffersProductsbySearch", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id) 
    where p.discount_percentage !='' AND p.title LIKE CONCAT('%', ${db.escape(req.body.keyword)}, '%') 
     GROUP BY p.product_id`,
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


app.get("/getProducts", (req, res, next) => {
  db.query(
    `SELECT DISTINCT p.product_id
  ,p.category_id
  ,p.sub_category_id
  ,p.title AS product_name
  ,p.description,
  p.qty_in_stock
  ,p.price
  ,p.published
  ,p.creation_date
  ,p.modification_date
  ,p.description_short
  ,p.general_quotation
  ,p.unit
  ,p.wholesale_price
  ,p.carton_price
  ,p.pcs_per_carton
  ,p.product_group_id
  ,p.item_code
  ,p.modified_by
  ,p.created_by
  ,p.part_number
  ,p.price_from_supplier
  ,p.latest
  ,p.section_id
  ,p.hsn
  ,p.gst
  ,p.mrp
  ,p.tag_no
  ,p.product_type
  ,p.bar_code
  ,p.product_code
  ,p.discount_type
  ,p.discount_percentage
  ,p.discount_amount
  ,p.discount_from_date
  ,p.discount_to_date
  ,p.tag
   ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.product_id != ''
     GROUP BY p.product_id `,
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

app.get("/getProductAdmin", (req, res, next) => {
  db.query(
    `SELECT DISTINCT p.product_id
  ,p.category_id
  ,p.sub_category_id
  ,p.title
  ,p.description,
  p.qty_in_stock
  ,p.price
  ,p.published
  ,p.creation_date
  ,p.modification_date
  ,p.description_short
  ,p.general_quotation
  ,p.unit
  ,p.product_group_id
  ,p.item_code
  ,p.modified_by
  ,p.created_by
  ,p.part_number
  ,p.price_from_supplier
  ,p.latest
  ,p.section_id
  ,p.hsn
  ,p.gst
  ,p.mrp
  ,p.tag_no
  ,p.product_type
  ,p.bar_code
  ,p.product_code
  ,p.discount_type
  ,p.discount_percentage
  ,p.discount_amount
  ,p.discount_from_date
  ,p.discount_to_date
  ,p.tag
  ,i.inventory_id
   ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id) 
     LEFT JOIN inventory i ON p.product_id = i.product_id
    where p.product_id != ''
     GROUP BY p.product_id `,
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


app.post("/getProductCategoryTitle", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.category_id
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
    ,c.category_title
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN category c ON p.category_id = c.category_id
     LEFT JOIN media m ON (p.product_id = m.record_id) 
    where c.category_id = ${db.escape(req.body.category_id)} 
     GROUP BY p.product_id`,
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
})

app.post("/getProduct", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.category_id
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.alternative_product_name
    ,p.brand
    ,p.keyword_search
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    ,p.tag
    ,p.created_by
    ,p.modified_by
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where p.product_id = ${db.escape(req.body.product_id)}
     GROUP BY p.product_id`,
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
})

app.post("/getPoProduct", (req, res, next) => {
  db.query(
    `SELECT p.title
    ,p.product_id
    ,p.sub_category_id
    ,p.product_code
    ,p.description
    ,p.qty_in_stock
    ,p.price
    ,p.published
    ,p.member_only
    ,p.creation_date
    ,p.modification_date
    ,p.chi_title
    ,p.product_description
    ,p.sort_order
    ,p.meta_title
    ,p.meta_description
    ,p.meta_keyword
    ,p.latest
    ,p.description_short
    ,p.chi_description_short
    ,p.general_quotation
    ,p.unit
    ,p.product_group_id
    ,p.department_id
    ,p.item_code
    ,p.modified_by
    ,p.created_by
    ,p.part_number
    ,p.price_from_supplier
    ,p.model
    ,p.carton_no
    ,p.batch_no
    ,p.vat
    ,p.fc_price_code
    ,p.batch_import
    ,p.commodity_code
    ,p.show_in_website
    ,p.most_selling_product
    ,p.site_id
    ,p.damaged_qty
    ,p.item_code_backup
    ,p.hsn_sac
    ,p.deals_of_week
    ,p.top_seller
    ,p.hot_deal
    ,p.most_popular
    ,p.top_rating
    ,p.section_id
    ,p.discount_type
    ,p.discount_percentage
    ,p.discount_amount
    ,p.hsn
    ,p.gst
    ,p.product_weight
    ,p.supplier_id
    ,p.product_type
    ,p.bar_code
    ,p.tag_no
    ,p.pack_size
    ,p.discount_from_date
    ,p.discount_to_date
    ,p.mrp
    ,p.raw_material
    ,p.sales_part_number
    ,p.igst
    FROM product p where p.product_id = ${db.escape(req.body.product_id)} `,
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
  )
});




app.post("/getProductColor", (req, res, next) => {
  db.query(
    `SELECT p.product_id
    ,p.product_color
    ,p.stock_quantity
    ,p.creation_date
    ,p.modification_date
    ,p.product_color_id
    FROM product_color p where p.product_id = ${db.escape(req.body.product_id)} `,
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
  )
});


app.post("/edit-Product", (req, res, next) => {
  db.query(
    `UPDATE product 
            SET title=${db.escape(req.body.title)}
            ,published=${db.escape(req.body.published)}
             ,most_popular=${db.escape(req.body.most_popular)}
              ,discount_percentage=${db.escape(req.body.discount_percentage)}
              ,top_seller=${db.escape(req.body.top_seller)}
              ,latest=${db.escape(req.body.latest)}
            ,category_id=${db.escape(req.body.category_id)}
            ,product_type=${db.escape(req.body.product_type)}
            ,price=${db.escape(req.body.price)}
            ,qty_in_stock=${db.escape(req.body.qty_in_stock)}
           ,unit=${db.escape(req.body.unit)}
            ,alternative_product_name=${db.escape(req.body.alternative_product_name)}
            ,brand=${db.escape(req.body.brand)}
           ,keyword_search=${db.escape(req.body.keyword_search)}
            ,gst=${db.escape(req.body.gst)}
            ,description_short=${db.escape(req.body.description_short)}
            ,description=${db.escape(req.body.description)}
            ,product_description=${db.escape(req.body.product_description)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,tag=${db.escape(req.body.tag)}
            WHERE product_id =  ${db.escape(req.body.product_id)}`,
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

app.post("/editInventoryProduct", (req, res, next) => {
  db.query(
    `UPDATE product 
            SET qty_in_stock=${db.escape(req.body.qty_in_stock)}
            WHERE product_id =  ${db.escape(req.body.product_id)}`,
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

app.post("/edit-ProductQty", (req, res, next) => {
  db.query(
    `UPDATE product 
            SET qty_in_stock=${db.escape(req.body.qty_in_stock)}
            ,modification_date=${db.escape(new Date())}
            ,modified_by=${db.escape(req.user)}
            WHERE product_id =  ${db.escape(req.body.product_id)}`,
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

app.post("/editProductColor", (req, res, next) => {
  db.query(
    `UPDATE product_color 
            SET product_id=${db.escape(req.body.product_id)}
            ,product_color=${db.escape(req.body.product_color)}
            ,stock_quantity=${db.escape(req.body.stock_quantity)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            WHERE product_color_id =  ${db.escape(req.body.product_color_id)}`,
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

app.post("/editProductSize", (req, res, next) => {
  db.query(
    `UPDATE product_size
            SET product_id=${db.escape(req.body.product_id)}
            ,product_size=${db.escape(req.body.product_size)}
            ,stock_quantity=${db.escape(req.body.stock_quantity)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            WHERE product_size_id =  ${db.escape(req.body.product_size_id)}`,
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

app.post('/update-Publish', (req, res, next) => {
  db.query(`UPDATE product 
            SET published=${db.escape(req.body.published)}
            WHERE product_id =  ${db.escape(req.body.product_id)}`,
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


app.post('/insertProduct', (req, res, next) => {

  let data = {category_id: req.body.category_id
    ,  sub_category_id : req.body. sub_category_id 
    , title: req.body.title
    , product_code: req.body.product_code
    , description: req.body.description
    , qty_in_stock: req.body.qty_in_stock
    , price: req.body.price
    , published:1
    , member_only: req.body.member_only
    , creation_date: new Date()
    , modification_date: req.body.modification_date
    , chi_title: req.body.chi_title
    , product_description: req.body.product_description
    , sort_order: req.body.sort_order
    , meta_title: req.body.meta_title
    , meta_description: req.body.meta_description
    , meta_keyword: req.body.meta_keyword
    , latest : req.body. latest 
    , description_short: req.body.description_short
    , general_quotation: req.body.general_quotation
    , unit: req.body.unit
    , product_group_id: req.body.product_group_id
    , department_id: req.body.department_id
    , item_code: req.body.item_code
    , modified_by: req.body.modified_by
    , created_by: req.body.created_by
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
    , supplier_id: req.body.supplier_id
    , product_type: req.body.product_type
    , bar_code: req.body.bar_code
    , tag_no: req.body.tag_no
    , pack_size : req.body. pack_size 
    , discount_from_date: req.body.discount_from_date
    , tag : req.body. tag 
    , discount_to_date: req.body.discount_to_date
    , mrp: req.body.mrp};
  let sql = "INSERT INTO product SET ?";
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

app.post("/deleteProduct", (req, res, next) => {
  let data = { product_id: req.body.product_id };
  let sql = "DELETE FROM product WHERE ?";
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

app.post('/insertProductColor', (req, res, next) => {

  let data = {product_color_id : req.body.product_color_id 
    ,  product_id : req.body. product_id 
    , product_color: req.body.product_color
    , stock_quantity: req.body.stock_quantity
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
      
  };
  let sql = "INSERT INTO product_color SET ?";
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

app.post("/deleteProductColor", (req, res, next) => {
  let data = { product_color_id: req.body.product_color_id };
  let sql = "DELETE FROM product_color WHERE ?";
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


app.post('/insertProductSize', (req, res, next) => {

  let data = {product_size_id : req.body.product_size_id 
    ,  product_id : req.body. product_id 
    , product_size: req.body.product_size
    , stock_quantity: req.body.stock_quantity
    , creation_date: req.body.creation_date
    , modification_date: req.body.modification_date
  };
  let sql = "INSERT INTO product_size SET ?";
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

app.post("/deleteProductSize", (req, res, next) => {
  let data = { product_size_id: req.body.product_size_id };
  let sql = "DELETE FROM product_size WHERE ?";
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

app.get("/getCategory", (req, res, next) => {
  db.query(
    `SELECT category_id
  ,category_title
  FROM category 
  WHERE category_id !='' `,
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






app.get("/getMaxItemCode", (req, res, next) => {
  db.query(
    `SELECT MAX (item_code) As itemc
  FROM product
  WHERE product_id !=''`,
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

app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;
