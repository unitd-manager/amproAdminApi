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


app.post("/searchCustomers", (req, res) => {
  const { search } = req.body;
    
  if (!search) {
    return res.status(400).json({ 
      success: false, 
      message: "Search term is required" 
    });
  }

  // Query to search products by product code or name
  const query = `
    SELECT p.*
    FROM company p 
    WHERE p.customer_code LIKE ? OR p.company_name LIKE ?
  `;
    
  const searchTerm = `%${search}%`;
  
  db.query(query, [searchTerm, searchTerm], (err, result) => {
    if (err) {
      console.error('Error in searchProducts:', err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result || []
    });
  });
});


app.post("/searchProducts", (req, res) => {
  const { search } = req.body;
    
  if (!search) {
    return res.status(400).json({ 
      success: false, 
      message: "Search term is required" 
    });
  }

  // Query to search products by product code or name
  const query = `
    SELECT p.*
    FROM product p 
    WHERE p.product_code LIKE ? OR p.title LIKE ?
  `;
    
  const searchTerm = `%${search}%`;
  
  db.query(query, [searchTerm, searchTerm], (err, result) => {
    if (err) {
      console.error('Error in searchProducts:', err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result || []
    });
  });
});
// Get product by product code
app.post("/getCustomerByCode", (req, res) => {
    const { customerCode } = req.body;
    
    if (!customerCode) {
        return res.status(400).json({
            success: false,
            message: 'Product code is required'
        });
    }

    const query = `SELECT * FROM company WHERE customer_code = ?`;
    
    db.query(query, [customerCode], (err, result) => {
        if (err) {
            console.log('error: ', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch product details'
            });
        }

        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
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

app.get("/PopularProducts", (req, res, next) => {
  db.query(
    `SELECT 
    d.department_name AS department_name,
    c.category_title AS category_name,
    p.title AS product_name,
    SUM(oi.qty) AS sold_qty
FROM product p
LEFT JOIN department d ON p.department_id = d.department_id
LEFT JOIN category c ON p.category_id = c.category_id
LEFT JOIN order_item oi ON oi.product_id = p.product_id
GROUP BY d.department_name, c.category_title, p.title
ORDER BY sold_qty DESC
LIMIT 10`,
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
  ,p.alternative_product_name 
  ,p.purchase_unit_cost 	
  ,p.sub_category_id
  ,p.title
  ,p.description
  ,p.qty_in_stock
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
  ,p.ecommerce_price
  ,p.retail_price
  ,p.wholesale_price
  ,p.department_id
  ,p.unit
  ,p.part_number 
  ,p.carton_price
  ,p.carton_qty
  ,p.loose_qty
  ,p.department_id
  ,p.supplier_id
  ,d.department_name
  ,s.company_name
  ,i.inventory_id
   ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id) 
     LEFT JOIN inventory i ON p.product_id = i.product_id
     LEFT JOIN department_cli d ON d.department_cli_id = p.department_id
     LEFT JOIN supplier s  ON s.supplier_id = p.supplier_id
    where p.product_id != ''
     GROUP BY p.product_id DESC `,
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


app.post("/getByCompanyId", (req, res, next) => {
  db.query(
    `SELECT p.*, c.title AS product_name,c.product_code
    from product_company p
         LEFT JOIN product c ON p.product_id = c.product_id

    where p.company_id = ${db.escape(req.body.company_id)} 
    `,
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
    ,p.ecommerce_price
    ,p.retail_price
  ,p.wholesale_price
  ,p.department_id
  ,p.unit
  ,p.part_number 
  ,p.carton_price
  ,p.carton_qty
  ,p.department_id
  ,p.sub_category_id
  ,p.brand_id
  ,p.display_order
  ,p.purchase_uom
  ,p.sales_uom
  ,p.pcs_per_carton
  ,p.product_weight 
  ,p.purchase_unit_cost
  ,p.operation_cost
  ,p.min_retail_price
  ,p.min_wholesale_price
  ,p.min_carton_price
  ,p.style_fabric
  ,p.carton_weight
  ,p.m3_per_carton
  ,p.bin
  ,p.remarks
  ,p.show_on_purchase
  ,p.show_on_sales
  ,p.is_active
  ,p.eprocurement
  ,p.ecommerce
  ,p.show_on_pos
  ,p.tax_percentage
  ,p.model_no
  ,b.brand_name
  ,s.sub_category_title
  ,d.department_name
    ,p.created_by
    ,p.modified_by
     ,GROUP_CONCAT(m.file_name) AS images
    from product p
     LEFT JOIN media m ON (p.product_id = m.record_id)
     LEFT JOIN department_cli d ON (d.department_cli_id = p.department_id)
     LEFT JOIN brand_cli b ON (b.brand_cli_id = p.brand_id)
     LEFT JOIN sub_category s ON (s.sub_category_id = p.sub_category_id)
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
            ,brand_id=${db.escape(req.body.brand_id)}
           ,keyword_search=${db.escape(req.body.keyword_search)}
            ,gst=${db.escape(req.body.gst)}
            ,description_short=${db.escape(req.body.description_short)}
            ,description=${db.escape(req.body.description)}
            ,product_description=${db.escape(req.body.product_description)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,tag=${db.escape(req.body.tag)}
            ,operation_cost=${db.escape(req.body.operation_cost)}
            ,min_retail_price=${db.escape(req.body.min_retail_price)}
             ,min_wholesale_price=${db.escape(req.body.min_wholesale_price)}
              ,min_carton_price=${db.escape(req.body.min_carton_price)}
              ,style_fabric=${db.escape(req.body.style_fabric)}
              ,carton_weight=${db.escape(req.body.carton_weight)}
            ,m3_per_carton=${db.escape(req.body.m3_per_carton)}
            ,bin=${db.escape(req.body.bin)}
            ,remarks=${db.escape(req.body.remarks)}
            ,show_on_purchase=${db.escape(req.body.show_on_purchase)}
           ,show_on_sales=${db.escape(req.body.show_on_sales)}
            ,is_active=${db.escape(req.body.is_active)}
            ,eprocurement=${db.escape(req.body.eprocurement)}
            ,ecommerce=${db.escape(req.body.ecommerce)}
           ,show_on_pos=${db.escape(req.body.show_on_pos)}
            ,tax_percentage=${db.escape(req.body.tax_percentage)}
            ,carton_price=${db.escape(req.body.carton_price)}
            ,model_no=${db.escape(req.body.model_no)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,purchase_uom=${db.escape(req.body.purchase_uom)}
            ,sales_uom=${db.escape(req.body.sales_uom)}
            ,pcs_per_carton=${db.escape(req.body.pcs_per_carton)}
            ,purchase_unit_cost=${db.escape(req.body.purchase_unit_cost)}
            ,retail_price=${db.escape(req.body.retail_price)}
            ,wholesale_price=${db.escape(req.body.wholesale_price)}
            ,sub_category_id=${db.escape(req.body.sub_category_id)}
            ,department_id=${db.escape(req.body.department_cli_id)}
            ,supplier_id=${db.escape(req.body.supplier_id)}
            ,display_order=${db.escape(req.body.display_order)}
            ,pcs_per_carton=${db.escape(req.body.pcs_per_carton)}
            ,product_weight=${db.escape(req.body.product_weight)}
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
    , creation_date: req.body.creation_date
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
    , mrp: req.body.mrp
    , show_on_purchase: 0
    , show_on_sales : 0
    , is_active: 0
    , eprocurement : 0 
    , ecommerce: 0
    , show_on_pos: 0
  };
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

app.post('/insertProducts', (req, res) => {
  try {
    // Allowed fields (only what frontend sends)
    const allowed = [
      "product_code",
      "title",
      "department_id",
      "category_id",
      "sub_category_id",
      "brand_id",
      "supplier_id",
      "product_type",
      "purchase_uom",
      "sales_uom",

      "tax_percentage",
      "display_order",
      "pcs_per_carton",
      "product_weight",
      "purchase_unit_cost",
      "operation_cost",
      "retail_price",
      "min_retail_price",
      "wholesale_price",
      "min_wholesale_price",
      "carton_price",
      "min_carton_price",

      "style_fabric",
      "model_no",
      "bin",
      "remarks",

      "show_on_purchase",
      "show_on_sales",
      "is_active",
      "eprocurement",
      "ecommerce",
      "show_on_pos",

      "creation_date",
      "created_by"
    ];

    let data = {};

    allowed.forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        data[key] = req.body[key];
      } else {
        data[key] = null;
      }
    });

    // Convert booleans → 0/1
    const booleanFields = [
      "show_on_purchase",
      "show_on_sales",
      "is_active",
      "eprocurement",
      "ecommerce",
      "show_on_pos"
    ];

    booleanFields.forEach((b) => {
      data[b] = req.body[b] ? 1 : 0;
    });

    // Insert query
    let sql = "INSERT INTO product SET ?";
    db.query(sql, data, (err, result) => {
      if (err) {
        console.log("Insert error:", err.sqlMessage);
        return res.status(400).send({
          msg: "failed",
          error: err.sqlMessage,
        });
      }

      res.status(200).send({
        msg: "Success",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error });
  }
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

app.post("/deleteSUPProductComp", (req, res, next) => {
  let data = { sup_product_id: req.body.sup_product_id };
  let sql = "DELETE FROM sup_product WHERE ?";
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


app.post("/deleteCSProductComp", (req, res, next) => {
  let data = { cs_product_id: req.body.cs_product_id };
  let sql = "DELETE FROM cs_product WHERE ?";
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


app.post('/insertProductComp', (req, res, next) => {

  let data = {  product_id : req.body. product_id 
    , company_id: req.body.company_id
    , wholesale_price: req.body.wholesale_price
    , fixed_price: req.body.fixed_price
     , carton_price: req.body.carton_price
    , created_at: req.body.created_at
    , updated_at: req.body.updated_at
      
  };
  let sql = "INSERT INTO cs_product SET ?";
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

app.post('/insertProductSup', (req, res, next) => {

  let data = {  product_id : req.body. product_id 
    , supplier_id: req.body.supplier_id
    , wholesale_price: req.body.wholesale_price
    , fixed_price: req.body.fixed_price
     , carton_price: req.body.carton_price
    , created_at: req.body.created_at
    , updated_at: req.body.updated_at
      
  };
  let sql = "INSERT INTO sup_product SET ?";
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

app.get("/getSubCategory", (req, res, next) => {
  db.query(
    `SELECT sub_category_id
  ,sub_category_title
  FROM sub_category 
  WHERE sub_category_id !='' `,
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

app.get("/getBrand", (req, res, next) => {
  db.query(
    `SELECT brand_cli_id AS brand_id
  ,brand_name
  FROM brand_cli 
  WHERE brand_cli_id !='' `,
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

app.get("/getDepartment", (req, res, next) => {
  db.query(
    `SELECT department_id
  ,department_name
  FROM department 
  WHERE department_id !='' `,
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


app.get("/getDepartmentCli", (req, res, next) => {
  db.query(
    `SELECT department_cli_id
  ,department_name
  FROM department_cli 
  WHERE department_cli_id !='' `,
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


app.get("/getSupplier", (req, res, next) => {
  db.query(
    `SELECT supplier_id
  ,company_name
  FROM supplier 
  WHERE supplier_id !='' `,
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


app.post("/getSupProduct", (req, res, next) => {
  db.query(
    `SELECT cs.*, c.company_name AS supplier_name, c.supplier_code
  FROM sup_product cs 
  LEFT JOIN supplier c on c.supplier_id = cs.supplier_id
  WHERE cs.product_id = ${db.escape(req.body.product_id)}`,
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


app.post("/getCsProduct", (req, res, next) => {
  db.query(
    `SELECT cs.*, c.company_name, c.customer_code
  FROM cs_product cs 
  LEFT JOIN company c on c.company_id = cs.company_id
  WHERE cs.product_id = ${db.escape(req.body.product_id)}`,
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


// app.post("/getPurchasedProduct", (req, res, next) => {
//   db.query(
//     `SELECT 
// p.tran_no,
// p.tran_date,
// s.company_name,
// pp.qty,
// pp.quantity,
// pp.carton_qty,
// pp.carton_price,
// pp.total
// FROM purchase_order p
// LEFT JOIN po_product pp on p.purchase_order_id = pp.purchase_order_id
// LEFT JOIN supplier s on s.supplier_id = p.supplier_id
// WHERE pp.product_id = ${db.escape(req.body.product_id)}`,
//     (err, result) => {
//       if (err) {
//         console.log("error: ", err);
//         return res.status(400).send({
//           data: err,
//           msg: "failed",
//         });
//       } else {
//         return res.status(200).send({
//           data: result,
//           msg: "Success",
//         });
//       }
//     }
//   );
// });

app.post("/getPurchasedProduct", (req, res, next) => {
  const { product_id, fromDate, toDate } = req.body;

  let query = `
    SELECT 
      p.tran_no,
      p.tran_date,
      s.company_name,
      pp.qty,
      pp.quantity,
      pp.carton_qty,
      pp.carton_price,
      pp.total
    FROM purchase_order p
    LEFT JOIN po_product pp on p.purchase_order_id = pp.purchase_order_id
    LEFT JOIN supplier s on s.supplier_id = p.supplier_id
    WHERE pp.product_id = ${db.escape(product_id)}
  `;

  // Optional filtering for date range
  if (fromDate && toDate) {
    query += ` AND p.tran_date BETWEEN ${db.escape(fromDate)} AND ${db.escape(toDate)}`;
  } else if (fromDate) {
    query += ` AND p.tran_date >= ${db.escape(fromDate)}`;
  } else if (toDate) {
    query += ` AND p.tran_date <= ${db.escape(toDate)}`;
  }

  db.query(query, (err, result) => {
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

app.post("/getSoldProduct", (req, res) => {
  const { product_id, fromDate, toDate } = req.body;

  let query = `
    SELECT 
      s.tran_no,
      s.tran_date,
      s.company_id,
      si.carton_qty,
      si.carton_price,
      si.quantity AS qty,
      si.wholesale_price AS unit_price,
      si.discount_value,
      si.total,
      si.gross_total,
      c.company_name
    FROM sales_order s
    LEFT JOIN sales_order_item si ON si.sales_order_id = s.sales_order_id
    LEFT JOIN company c ON c.company_id = s.company_id
    WHERE si.product_id = ${db.escape(product_id)}
  `;

  // Optional date filters
  if (fromDate && toDate) {
    query += ` AND s.tran_date BETWEEN ${db.escape(fromDate)} AND ${db.escape(toDate)}`;
  } else if (fromDate) {
    query += ` AND s.tran_date >= ${db.escape(fromDate)}`;
  } else if (toDate) {
    query += ` AND s.tran_date <= ${db.escape(toDate)}`;
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log("SQL error in getSoldProduct:", err);
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


app.post('/insertEcommerceSettingDatas', (req, res, next) => {

  let data = {
      product_id: req.body.product_id
    ,  price : req.body. price 
    , stock_not_available: req.body.stock_not_available
    , check_available_stock: req.body.check_available_stock
    , description: req.body.description
    , available_qty: req.body.available_qty
    , product_label: req.body.product_label
    , creation_date: req.body.creation_date
    , created_by: req.body.created_by
    , meat_slug: req.body.meat_slug
    , meat_description: req.body.meat_description
    , meat_keywords: req.body.meat_keywords
  };
  let sql = "INSERT INTO ecommerce_setting SET ?";
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

app.post("/EcommerceDataByProductId", (req, res, next) => {
  db.query(
    `SELECT * FROM ecommerce_setting WHERE product_id=${db.escape(req.body.product_id)}`,
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


app.post("/editEcommerceData", (req, res, next) => {
  db.query(
    `UPDATE ecommerce_setting 
            SET 
            description=${db.escape(req.body.description)}
            ,price=${db.escape(req.body.price)}
            ,stock_not_available=${db.escape(req.body.stock_not_available)}
            ,check_available_stock=${db.escape(req.body.check_available_stock)}
            ,available_qty=${db.escape(req.body.available_qty)}
            ,product_label=${db.escape(req.body.product_label)}
            ,meat_slug=${db.escape(req.body.meat_slug)}
            ,meat_description=${db.escape(req.body.meat_description)}
            ,meat_keywords=${db.escape(req.body.meat_keywords)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,specification=${db.escape(req.body.specification)}
            WHERE ecommerce_setting_id  =  ${db.escape(req.body.ecommerce_setting_id )}`,
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

app.post("/EditCSProductLineItems", (req, res, next) => {
  db.query(
    `UPDATE cs_product 
            SET company_id=${db.escape(req.body.company_id)}
              ,wholesale_price=${db.escape(req.body.wholesale_price)}
              ,carton_price=${db.escape(req.body.carton_price)}
              ,fixed_price=${db.escape(req.body.fixed_price)}
            WHERE cs_product_id =  ${db.escape(req.body.cs_product_id)}`,
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

// app.post("/getCSSupplierProductByProductId", (req, res, next) => {
//   db.query(
//     `SELECT
//     * from cs_product
//     where product_id = ${db.escape(req.body.product_id)} AND supplier_id!=''`,
//     (err, result) => {
//       if (err) {
//         console.log("error: ", err);
//         return res.status(400).send({
//           data: err,
//           msg: "failed",
//         });
//       } else {
//         return res.status(200).send({
//           data: result,
//           msg: "Success",
//         });
//       }
//     }
//   );
// });


app.post("/EditSUPProductLineItems", (req, res, next) => {
  db.query(
    `UPDATE sup_product 
            SET supplier_id=${db.escape(req.body.supplier_id)}
              ,wholesale_price=${db.escape(req.body.wholesale_price)}
              ,carton_price=${db.escape(req.body.carton_price)}
              ,fixed_price=${db.escape(req.body.fixed_price)}
            WHERE sup_product_id =  ${db.escape(req.body.sup_product_id)}`,
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


app.post("/getCSCustomerProductByProductId", (req, res, next) => {
  db.query(
    `SELECT
    * from cs_product
    where product_id = ${db.escape(req.body.product_id)} AND contact_id !=''`,
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

app.post("/EditCSProductLineItemsBYSupplierID", (req, res, next) => {
  db.query(
    `UPDATE cs_product 
             SET wholesale_price=${db.escape(req.body.wholesale_price)}
             ,carton_price=${db.escape(req.body.carton_price)}
             ,fixed_price=${db.escape(req.body.fixed_price)}
             ,modification_date =${db.escape(req.body.modification_date)}
             ,modified_by =${db.escape(req.body.modified_by)}
           WHERE cs_product_id = ${db.escape(req.body.cs_product_id)}`, // Corrected WHERE clause
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
    `SELECT contact_id
  ,company_name
  ,customer_code
  FROM contact 
  WHERE contact_id !='' `,
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


app.post('/insertProdutStock', (req, res) => {
  const {
    product_id,
    location_code,
    carton_qty,
    loose_qty,
    qty,
    purchase_unit_cost,
    retail_price,
    wholesale_price,
    carton_price,
    operation_cost,
    minimum_qty,
    reorder_qty,
    open_po_qty,
    last_stock_take_date,
    created_by,
    creation_date
  } = req.body;

  const sql = `
    INSERT INTO product_stock (
      product_id, location_code, carton_qty, loose_qty, qty,
      purchase_unit_cost, retail_price, wholesale_price, carton_price,
      operation_cost, minimum_qty, reorder_qty, open_po_qty,
      last_stock_take_date, created_by, creation_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    product_id, location_code, carton_qty, loose_qty, qty,
    purchase_unit_cost, retail_price, wholesale_price, carton_price,
    operation_cost, minimum_qty, reorder_qty, open_po_qty,
    last_stock_take_date, created_by, creation_date
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log('Error inserting stock record:', err);
      return res.status(400).send({ msg: 'Insert Failed', data: err });
    } else {
      return res.status(200).send({ msg: 'Insert Success', data: result.insertId });
    }
  });
});


app.post('/getLatestByProductId', (req, res) => {
  const { product_id } = req.body;
  db.query(
    `SELECT * FROM product_stock WHERE product_id = ? ORDER BY product_stock_id DESC LIMIT 1`,
    [product_id],
    (err, result) => {
      if (err) {
        console.log("Error fetching latest stock record: ", err);
        return res.status(500).send({ msg: 'Error', data: err });
      } else {
        return res.status(200).send({ msg: 'Success', data: result[0] });
      }
    }
  );
});

app.post('/deleteCatalogue', (req, res, next) => {
  const data = { catalogue_id: req.body.catalogue_id };
  const sql = 'DELETE FROM catalogue WHERE ?';

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log('Error:', err);
      return res.status(400).send({
        data: err,
        msg: 'Failed to delete catalogue item',
      });
    } else {
      return res.status(200).send({
        data: result,
        msg: 'Catalogue item deleted successfully',
      });
    }
  });
});

app.post("/getCSProductByProductId", (req, res, next) => {
  db.query(
    `SELECT
      csp.cs_product_id,
      csp.product_id,
      csp.wholesale_price,
      csp.carton_price,
      csp.fixed_price,
      c.contact_id AS itemId,
      c.company_name AS title,
      c.customer_code AS code
    FROM cs_product csp
    LEFT JOIN customer_supplier_price cspr ON csp.customer_supplier_price_id = cspr.customer_supplier_price_id
    LEFT JOIN contact c ON cspr.contact_id = c.contact_id
    WHERE csp.product_id = ${db.escape(req.body.product_id)} AND cspr.customer = 1`, // Assuming 'customer' flag in customer_supplier_price
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        // Add unique IDs for frontend rendering
        const dataWithIds = result.map(item => ({
          ...item,
          id: item.cs_product_id ? item.cs_product_id.toString() : random.int(0, 9999).toString() // Ensure a unique ID for React keys
        }));
        return res.status(200).send({
          data: dataWithIds,
          msg: "Success",
        });
      }
    }
  );
});

app.post("/getCSSupplierProductByProductId", (req, res, next) => {
  db.query(
    `SELECT
      csp.cs_product_id,
      csp.product_id,
      csp.wholesale_price,
      csp.carton_price,
      csp.fixed_price,
      c.contact_id,
      c.company_name AS name,
      c.customer_code AS code
    FROM cs_product csp
    LEFT JOIN customer_supplier_price cspr ON csp.customer_supplier_price_id = cspr.customer_supplier_price_id
    LEFT JOIN contact c ON cspr.contact_id = c.contact_id
    WHERE csp.product_id = ${db.escape(req.body.product_id)} AND cspr.supplier = 1`, // Assuming 'supplier' flag in customer_supplier_price
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


app.post('/checkCSProductByCustomerAndProduct', (req, res) => {
  const { contact_id, product_id } = req.body;

  const query = `
    SELECT cs.customer_supplier_price_id, cp.cs_product_id
    FROM customer_supplier_price cs
    JOIN cs_product cp ON cp.customer_supplier_price_id = cs.customer_supplier_price_id
    WHERE cs.customer = 1
      AND cs.contact_id = ${db.escape(contact_id)}
      AND cp.product_id = ${db.escape(product_id)}
    LIMIT 1
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({ msg: 'failed', data: err });
    }

    if (result.length > 0) {
      return res.status(200).send({
        exists: true,
        data: result[0],
        msg: 'Found',
      });
    } else {
      return res.status(200).send({
        exists: false,
        data: null,
        msg: 'Not Found',
      });
    }
  });
});

app.post('/updateCSProductCustomerPrice', (req, res) => {
  const {
    cs_product_id, // ID of the cs_product entry to update
    wholesale_price,
    carton_price,
    fixed_price,
    updated_at,
    
  } = req.body;

  const sql = `
    UPDATE cs_product
    SET
      wholesale_price = ?,
      carton_price = ?,
      fixed_price = ?,
      updated_at = ?
       
    WHERE cs_product_id = ?
  `;

  const values = [
    wholesale_price,
    carton_price,
    fixed_price,
   updated_at,
    cs_product_id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log('Error updating cs_product customer price:', err);
      return res.status(500).send({ msg: 'Update failed', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: 'No record found to update' });
    }

    res.status(200).send({ msg: 'Customer product price updated successfully' });
  });
});

app.post('/addCustomerSupplierPrice', (req, res) => {
  const { contact_id, customer, supplier, created_at } = req.body;

  const sql = `
    INSERT INTO customer_supplier_price (contact_id, customer, supplier, created_at)
    VALUES (?, ?, ?, ?)
  `;

  const values = [contact_id, customer, supplier, created_at];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log('Error inserting customer_supplier_price:', err);
      return res.status(500).send({ msg: 'Insert failed', error: err });
    }

    res.status(200).send({
      msg: 'Insert success',
      customer_supplier_price_id: result.insertId
    });
  });
});

app.post('/addCSProductHistory', (req, res) => {
  const {
    customer_supplier_price_id,
    product_id,
    wholesale_price,
    carton_price,
    fixed_price,
    created_at // Added created_by for consistency
  } = req.body;

  const sql = `
    INSERT INTO cs_product (
      customer_supplier_price_id,
      product_id,
      wholesale_price,
      carton_price,
      fixed_price,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    customer_supplier_price_id,
    product_id,
    wholesale_price,
    carton_price,
    fixed_price,
    created_at
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log('Error inserting into cs_product:', err);
      return res.status(500).send({ msg: 'Insert failed', error: err });
    }

    res.status(200).send({
      msg: 'History added successfully',
      cs_product_id: result.insertId
    });
  });
});

app.post('/checkCustomerProductPrice', async (req, res) => {
  const { contact_id, customer, supplier, product_id } = req.body;

  try {
    const priceRows = await db.query(
      'SELECT customer_supplier_price_id FROM customer_supplier_price WHERE contact_id = ? AND customer = ? AND supplier = ?',
      [contact_id, customer, supplier]
    );

    let exists = false;
    let cs_product_exists = false;
    let customer_supplier_price_id = null;
    let cs_product_data = null; // New: to store cs_product details

    if (priceRows.length > 0) {
      exists = true;
      customer_supplier_price_id = priceRows[0].customer_supplier_price_id;

      const csRows = await db.query(
        'SELECT * FROM cs_product WHERE customer_supplier_price_id = ? AND product_id = ?', // Select all columns
        [customer_supplier_price_id, product_id]
      );

      if (csRows.length > 0) {
        cs_product_exists = true;
        cs_product_data = csRows[0]; // Store the full row
      }
    }

    res.json({
      exists,
      cs_product_exists,
      customer_supplier_price_id,
      cs_product_data, // Include cs_product_data
    });
  } catch (err) {
    console.error('🔥 checkCustomerProductPrice Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// app.post("/last30daysSalesReport", (req, res) => {
//   const sql = `SELECT
//   DATE_SUB(CURDATE(), INTERVAL n.n DAY) AS sale_date,
//   IFNULL(SUM(s.net_total), 0) AS total_sales
// FROM
//   (
//     SELECT a.n + b.n*10 AS n
//     FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
//           UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
//           UNION ALL SELECT 8 UNION ALL SELECT 9) a
//     CROSS JOIN (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2) b
//   ) n
// LEFT JOIN sales_order s
//   ON DATE(s.tran_date) = DATE_SUB(CURDATE(), INTERVAL n.n DAY)
//   AND s.status IN ('Closed','Approved')
// WHERE n.n BETWEEN 0 AND 29   -- last 30 days (0 = today, 29 = 29 days ago)
// GROUP BY sale_date
// ORDER BY sale_date ASC;
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("MySQL error:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

app.get("/last30daysSalesReport", (req, res) => {
  const sql = `
    SELECT 
      DATE_SUB(CURDATE(), INTERVAL n.n DAY) AS sale_date,
      DAYNAME(DATE_SUB(CURDATE(), INTERVAL n.n DAY)) AS day_name,
      IFNULL(SUM(s.net_total), 0) AS total_sales
    FROM (
      SELECT a.n + b.n*10 AS n
      FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
            UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
            UNION ALL SELECT 8 UNION ALL SELECT 9) a
      CROSS JOIN (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2) b
    ) n
    LEFT JOIN sales_order s
      ON DATE(s.tran_date) = DATE_SUB(CURDATE(), INTERVAL n.n DAY)
      AND s.status IN ('Closed','Approved')
    WHERE n.n BETWEEN 0 AND 29
    GROUP BY sale_date
    ORDER BY sale_date ASC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/last12MonthSalesReport", (req, res) => {
  const sql = `
    SELECT 
      DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n.n MONTH), '%Y-%m') AS sale_month,
      DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n.n MONTH), '%b %Y') AS month_label,
      IFNULL(SUM(s.net_total), 0) AS total_sales
    FROM (
      SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
      UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7
      UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
    ) n
    LEFT JOIN sales_order s
      ON DATE_FORMAT(s.tran_date, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n.n MONTH), '%Y-%m')
      AND s.status IN ('Closed','Approved')
    GROUP BY sale_month, month_label
    ORDER BY sale_month ASC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


app.get("/DepartmentwiseProductReport", (req, res) => {
  const sql = `
    SELECT 
    CONCAT(
        d.department_name, ' (',
        ROUND(
            (SUM(soi.gross_total) * 100.0) /
            (SELECT SUM(soi2.gross_total)
             FROM sales_order so2
             JOIN sales_order_item soi2 ON so2.sales_order_id = soi2.sales_order_id
             WHERE so2.status = 'Closed'),
        2),
    '%)'
    ) AS department_with_percentage,
    SUM(soi.gross_total) AS total_sales_value
FROM sales_order so
JOIN sales_order_item soi ON so.sales_order_id = soi.sales_order_id
JOIN product p ON soi.product_id = p.product_id
JOIN department d ON p.department_id = d.department_id
WHERE so.status = 'Closed'
GROUP BY d.department_name
ORDER BY total_sales_value DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



app.get("/CategorywiseProductReport", (req, res) => {
  const sql = `SELECT 
      CONCAT(
        c.category_title, ' (',
        ROUND(
          (SUM(soi.gross_total) * 100.0) /
          (SELECT SUM(soi2.gross_total)
           FROM sales_order so2
           JOIN sales_order_item soi2 ON so2.sales_order_id = soi2.sales_order_id
           WHERE so2.status = 'Closed'),
          2
        ),
        '%)'
      ) AS category_with_percentage,
      SUM(soi.gross_total) AS total_sales_value
    FROM sales_order so
    JOIN sales_order_item soi ON so.sales_order_id = soi.sales_order_id
    JOIN product p ON soi.product_id = p.product_id
    JOIN category c ON p.category_id = c.category_id
    WHERE so.status = 'Closed'
    GROUP BY c.category_title
    ORDER BY total_sales_value DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


app.post('/getFilteredProducts', (req, res) => {
  const { department, category, subcategory, brand, supplier, status } = req.body;

  let query = `
    SELECT 
      p.product_id,
      p.title,
      p.product_code
    FROM product p
    WHERE 1 = 1
  `;

  const params = [];

  // Apply filters only if provided
  if (department) {
    query += ' AND p.department_id = ?';
    params.push(department);
  }
  if (category) {
    query += ' AND p.category_id = ?';
    params.push(category);
  }
  if (subcategory) {
    query += ' AND p.sub_category_id = ?';
    params.push(subcategory);
  }
  if (brand) {
    query += ' AND p.brand_id = ?';
    params.push(brand);
  }
  if (supplier) {
    query += ' AND p.supplier_id = ?';
    params.push(supplier);
  }
  if (status !== undefined && status !== null && status !== '') {
    query += ' AND p.is_active = ?';
    params.push(status);
  }

  query += ' ORDER BY p.title ASC';

  // ✅ If no filters are passed, show all products
  if (params.length === 0) {
    console.log('No filters selected → showing all products');
  } else {
    console.log('Filters applied:', params);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching filtered products:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ data: results });
  });
});

app.get("/getUOMfromValuelist", (req, res, next) => {
  db.query(
    `SELECT 
       value
       FROM valuelist WHERE key_text="UOM"`,
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

app.get("/getProductTypefromValuelist", (req, res, next) => {
  db.query(
    `SELECT 
       value
       FROM valuelist WHERE key_text="Product Type"`,
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



app.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = app;
