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
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/getCategory", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,p.section_title
    ,c.seo_title
    FROM category c
    LEFT JOIN section p  ON (p.section_id = c.section_id)
    WHERE c.category_id!=''
  ORDER By c.sort_order ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});

app.get("/getBlogCategory", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.sort_order
    FROM category c
    LEFT JOIN section p  ON (p.section_id = c.section_id)
    WHERE c.category_id!='' AND c.category_type = 'Blog Category'
  ORDER By c.sort_order ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});
app.get("/getCategories", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,p.section_title
    ,c.seo_title
    FROM category c
    LEFT JOIN section p  ON (p.section_id = c.section_id)
    WHERE c.category_id!=''
  ORDER By c.sort_order ASC`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return;
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});


app.post("/getBlogsbySearch", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.published
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,c.seo_title
    ,COUNT(b.category_id) AS NumberOfBlogs
    FROM category c
     LEFT JOIN blog b ON b.category_id = c.category_id
     LEFT JOIN media m ON (b.blog_id = m.record_id) AND (m.room_name='Blog')
    where b.title LIKE CONCAT('%', ${db.escape(req.body.keyword)}, '%') 
     GROUP BY b.blog_id`,
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

app.get("/getAllCategory", (req, res, next) => {
  db.query(
    `SELECT 
    c.category_title,
    c.category_id,
    c.section_id,
    c.description,
    c.sort_order,
    c.published,
    c.creation_date,
    c.modification_date,
    c.chi_title,
    c.chi_description,
    c.display_type,
    c.template,
    c.category_type,
    c.show_navigation_panel,
    c.external_link,
    c.meta_title,
    c.meta_keyword,
    c.meta_description,
    c.category_filter,
    c.description_short,
    c.member_only,
    c.internal_link,
    c.show_in_nav,
    c.seo_title,
    m.file_name AS images
FROM 
    category c
LEFT JOIN 
    media m ON m.record_id = c.category_id AND m.room_name ='Category'
WHERE 
    c.category_id != '' AND c.published = 1
GROUP BY 
    c.category_id;

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


app.get("/getAllBlogCategory", (req, res, next) => {
  db.query(
    `SELECT category_title
    , category_id
    ,section_id
    ,description
    ,sort_order
    ,published
    ,creation_date
    ,modification_date
    ,chi_title
    ,chi_description
    ,display_type
    ,template
    ,category_type
    ,show_navigation_panel
    ,external_link
    ,meta_title
    ,meta_keyword
    ,meta_description
    ,category_filter
    ,description_short
    ,member_only
    ,internal_link
    ,show_in_nav
    ,seo_title
    FROM category
    WHERE section_id = 33`,
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



app.get("/getOffersCategory", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,c.section_id
    ,c.description
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,c.seo_title
from category c
Left Join product p on p.category_id = c.category_id
where p.discount_percentage!='' AND published=1`,
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


app.post("/getProductByCategory", (req, res, next) => {
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
    ,c.category_id
    ,c.category_title 
     ,GROUP_CONCAT(m.file_name) AS images
     from category c
     LEFT JOIN product p  ON (p.category_id = c.category_id)
     LEFT JOIN media m ON (p.product_id = m.record_id)
    where c.category_id= ${db.escape(req.body.category_id)}
   GROUP BY p.product_id`,
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


app.post("/getOfferProductByCategory", (req, res, next) => {
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
    ,c.category_id
    ,c.category_title 
     ,GROUP_CONCAT(m.file_name) AS images
     from category c
     LEFT JOIN product p  ON (p.category_id = c.category_id)
     LEFT JOIN media m ON (p.product_id = m.record_id) 
    where c.category_id= ${db.escape(req.body.category_id)} AND p.discount_percentage!=''
   GROUP BY p.product_id`,
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




app.post("/getBlogByCategory", (req, res, next) => {
  db.query(
    `SELECT c.category_title
    ,c.category_id
    ,b.blog_id
    ,b.title
    ,c.section_id
    ,c.description
    ,c.sort_order
    ,c.published
    ,c.creation_date
    ,c.modification_date
    ,c.chi_title
    ,c.chi_description
    ,c.display_type
    ,c.template
    ,c.category_type
    ,c.show_navigation_panel
    ,c.external_link
    ,c.meta_title
    ,c.meta_keyword
    ,c.meta_description
    ,c.category_filter
    ,c.description_short
    ,c.member_only
    ,c.internal_link
    ,c.show_in_nav
    ,p.section_title
    ,c.seo_title
     ,m.record_id
    ,m.file_name
    ,COUNT(b.category_id) AS NumberOfBlogs
    FROM category c
    LEFT JOIN section p  ON (p.section_id = c.section_id)
    LEFT JOIN blog b ON b.category_id = c.category_id
    INNER JOIN media m ON m.record_id=b.blog_id
    AND m.room_name="Blog"
    WHERE c.category_id = ${db.escape(req.body.category_id)} 
    GROUP BY b.blog_id
  ORDER By c.sort_order ASC`,
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

app.get("/getOffers", (req, res, next) => {
  db.query(
    `SELECT *
    FROM product
    WHERE DATE(discount_from_date) = DATE(CURRENT_DATE())
    AND DATE(discount_to_date) = DATE(CURRENT_DATE())
    OR MONTH(discount_from_date) = MONTH(CURRENT_DATE())
    AND YEAR(discount_from_date) = YEAR(CURRENT_DATE())`,
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


app.post("/getCategoryById", (req, res, next) => {
  db.query(
    `SELECT 
  c.category_title,
  m.media_id,
  m.room_name,
  m.file_name,
  c.sort_order,
  c.category_id,
  s.section_title,
  c.published,
  c.section_id,
  c.category_type,
  c.internal_link,
  c.published,
  c.meta_title,
  c.meta_description,
  c.meta_keyword,
  c.creation_date,
  c.modification_date,
  c.created_by,
  c.modified_by
  ,c.seo_title
  FROM category c 
  LEFT JOIN (section s) ON (s.section_id=c.section_id )
  INNER JOIN (media m) ON (m.record_id=c.category_id )
    WHERE c.category_id = ${db.escape(req.body.category_id)}`,
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

app.post("/editCategory", (req, res, next) => {
  db.query(
    `UPDATE category 
            SET 
            category_title=${db.escape(req.body.category_title)}
            ,section_id=${db.escape(req.body.section_id)}
            ,description=${db.escape(req.body.description)}
            ,sort_order=${db.escape(req.body.sort_order)}
            ,published=${db.escape(req.body.published)}
            ,creation_date=${db.escape(req.body.creation_date)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,chi_title=${db.escape(req.body.chi_title)}
            ,chi_description=${db.escape(req.body.chi_description)}
            ,display_type=${db.escape(req.body.display_type)}
            ,template=${db.escape(req.body.template)}
            ,category_type=${db.escape(req.body.category_type)}
            ,show_navigation_panel=${db.escape(req.body.show_navigation_panel)}
            ,external_link=${db.escape(req.body.external_link)}
            ,meta_title=${db.escape(req.body.meta_title)}
            ,meta_keyword=${db.escape(req.body.meta_keyword)}
            ,meta_description=${db.escape(req.body.meta_description)}
            ,category_filter=${db.escape(req.body.category_filter)}
            ,description_short=${db.escape(req.body.description_short)}
            ,member_only=${db.escape(req.body.member_only)}
            ,internal_link=${db.escape(req.body.internal_link)}
            ,show_in_nav=${db.escape(req.body.show_in_nav)}
            ,seo_title=${db.escape(req.body.seo_title)}
            WHERE category_id =  ${db.escape(req.body.category_id)}`,
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

app.post("/insertCategory", (req, res, next) => {
  let data = {
    category_id: req.body.category_id,
    category_title: req.body.category_title,
    section_id: req.body.section_id,
    description: req.body.description,
    sort_order: req.body.sort_order,
    published: 1,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    chi_title: req.body.chi_title,
    chi_description: req.body.chi_description,
    display_type: req.body.display_type,
    template: req.body.template,
    category_type: req.body.category_type,
    show_navigation_panel: req.body.show_navigation_panel,
    external_link: req.body.external_link,
    meta_title: req.body.meta_title,
    meta_keyword: req.body.meta_keyword,
    meta_description: req.body.meta_description,
    category_filter: req.body.category_filter,
    description_short : req.body. description_short ,
    member_only: req.body.member_only,
    internal_link: req.body.internal_link,
    show_in_nav: req.body.show_in_nav,
    creation_date: req.body.creation_date,
    created_by: req.body.created_by,
    seo_title: req.body.seo_title,
  };
  let sql = "INSERT INTO category SET ?";
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

app.post("/deleteCategory", (req, res, next) => {
  let data = { category_id: req.body.category_id };
  let sql = "DELETE FROM category WHERE ?";
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

app.get("/getSectionTitle", (req, res, next) => {
  db.query(`SELECT  section_title,section_id FROM section  `, (err, result) => {
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

app.get("/get-ValueList", (req, res, next) => {
  db.query(
    `SELECT 
       value,valuelist_id
       FROM valuelist WHERE key_text="Category Type"`,
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



app.post("/updateSortOrder", (req, res, next) => {
  db.query(
    `UPDATE category 
              SET 
              sort_order=${db.escape(req.body.sort_order)}
              WHERE category_id= ${db.escape(req.body.category_id)}`,
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
