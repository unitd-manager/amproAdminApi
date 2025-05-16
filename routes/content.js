const express = require("express");
const db = require("../config/Database.js");
const fileUpload = require("express-fileupload");
const _ = require("lodash");
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/getBanners", (req, res, next) => {
  db.query(
    `select c.title, c.description ,m.file_name,m.display_title, c.content_id
    from content c 
    LEFT Join media m ON m.record_id=c.content_id 
    WHERE c.content_type= "Banner Image" AND m.room_name='Content'
    ORDER BY c.content_id DESC`,
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

app.get("/getContent", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=c.sub_category_id 
  WHERE c.content_id !='' ORDER BY c.sort_order ASC`,
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

app.get('/getAboutUs', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 23
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
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

app.get('/getShipping', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
            FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
        WHERE c.published = 1
 AND c.content_type = 'Shipping' 
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
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

app.get('/getAboutUsCompany', (req, res, next) => {
  db.query(
    `SELECT c.content_id,c.section_id,c.category_id
               ,c.sub_category_id
               ,c.author_id
               ,c.show_title
               ,c.type
               ,c.sort_order
               ,c.published
               ,c.member_only
               ,c.latest
               ,c.favourite
               ,c.creation_date
               ,c.modification_date
               ,c.content_date
               ,c.chi_title
               ,c.chi_description
               ,c.content_type
               ,c.external_link
               ,c.meta_title
               ,c.meta_keyword
               ,c.meta_description
               ,c.flag
               ,c.internal_link
               ,c.two_in_row
               ,c.three_in_row
                ,c.title AS title
                ,c.description_short AS description_short
                ,c.description AS description
                ,c.title1 AS title1
                ,c.description1 AS description1
                ,c.title2 AS title2
                ,c.description2 AS description2
                ,c.title3 AS title3
                ,c.description3 AS description3
              ,s.section_title
              ,s.section_type
              ,ca.category_title
              ,ca.category_type
              ,sc.sub_category_title
              ,sc.sub_category_type
        FROM content c
        LEFT JOIN (section s)      ON (c.section_id       = s.section_id)
        LEFT JOIN (category ca)    ON (c.category_id      = ca.category_id)
        LEFT JOIN (sub_category sc)ON (c.sub_category_id  = sc.sub_category_id)
         WHERE c.published = 1
 AND c.content_type = 'Record'
 AND c.section_id  = 25
 AND (c.sub_category_id IS NULL OR c.sub_category_id ='')
 ORDER BY c.sort_order ASC LIMIT 0, 50`,
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

app.get("/getValueList", (req, res, next) => {
  db.query(
    `SELECT 
       value,valuelist_id
       FROM valuelist WHERE key_text="Content Type"`,
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


app.get("/getFaqPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="FAQ Page"`,
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

app.get("/getStoreLocatorPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="StoreLocator"`,
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

app.get("/getSupportPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Support Policy"`,
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

app.get("/getReturnsPage", (req, res, next) => {
  db.query(
    `SELECT 
       title,description,content_id
       FROM content WHERE content_type="Returns Policy"`,
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

app.get("/getReturnsDescriptionPage", (req, res, next) => {
  db.query(
    `SELECT 
       description,content_id
       FROM content WHERE content_type="Returns Policy Description"`,
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





app.post("/getContentById", (req, res, next) => {
  db.query(
    `Select c.title
  , c.content_id
  ,s.section_id
  ,c.category_id
  ,c.sort_order
  ,c.sub_category_id
  ,c.content_type
  ,c.show_title
  ,c.published 
  ,c.content_date 
  ,c.description
  ,c.creation_date
  ,c.modification_date 
  ,s.section_title
  ,ca.category_title
  ,sc.sub_category_title
  ,c.creation_date
  ,c.modification_date
  ,c.created_by
  ,c.modified_by
  FROM content c
  LEFT JOIN section s ON s.section_id=c.section_id 
  LEFT JOIN category ca ON ca.category_id=c.category_id 
  LEFT JOIN sub_category sc ON sc.sub_category_id=sc.sub_category_id 
  WHERE c.content_id = ${db.escape(req.body.content_id)} `,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        });
      } else {
        return res.status(200).send({
          data: result[0],
          msg: "Success",
        });
      }
    }
  );
});

app.get("/getSortOrderbyId", (req, res, next) => {
  db.query(
    `Select sort_order
   FROM content 
   WHERE content_id !=''`,
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

app.post("/editSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content
            SET sort_order=${db.escape(req.body.sort_order)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/editContent", (req, res, next) => {
  db.query(
    `UPDATE content
            SET title=${db.escape(req.body.title)}
            ,section_id=${db.escape(req.body.section_id)}
            ,content_type=${db.escape(req.body.content_type)}
            ,category_id=${db.escape(req.body.category_id)}
            ,sub_category_id=${db.escape(req.body.sub_category_id)}
            ,show_title=${db.escape(req.body.show_title)}
            ,published=${db.escape(req.body.published)}
            ,content_date=${db.escape(req.body.content_date)}
            ,description=${db.escape(req.body.description)}
            ,modification_date=${db.escape(req.body.modification_date)}
            ,modified_by=${db.escape(req.body.modified_by)}
            ,content_type=${db.escape(req.body.content_type)}
            WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.post("/updateSortOrder", (req, res, next) => {
  db.query(
    `UPDATE content SET sort_order=${db.escape(
      req.body.sort_order
    )} WHERE content_id = ${db.escape(req.body.content_id)}`,
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

app.get("/getValueFromValueList", (req, res, next) => {
  db.query(
    `SELECT 
  value
  ,valuelist_id
  FROM valuelist WHERE key_text="Content Type"`,
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
app.post("/insertContent", (req, res, next) => {
  let data = {
    section_id: req.body.section_id,
    category_id: req.body.category_id,
    sub_category_id: req.body.sub_category_id,
    author_id: req.body.author_id,
    title: req.body.title,
    show_title: 1,
    type: req.body.type,
    description_short: req.body.description_short,
    description: req.body.description,
    sort_order: 0,
    published: 1,
    member_only: req.body.member_only,
    latest: req.body.latest,
    favourite: req.body.favourite,
    creation_date: req.body.creation_date,
    modification_date: req.body.modification_date,
    content_date: req.body.content_date,
    chi_title: req.body.chi_title,
    chi_description: req.body.chi_description,
    content_type: req.body.content_type,
    external_link: req.body.external_link,
    meta_title: req.body.meta_title,
    meta_keyword: req.body.meta_keyword,
    meta_description: req.body.meta_description,
    flag: req.body.flag,
   internal_link: req.body.internal_link,
  };
  let sql = "INSERT INTO content SET ?";
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

app.post("/deleteContent", (req, res, next) => {
  let data = { content_id: req.body.content_id };
  let sql = "DELETE FROM content  WHERE ?";
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

app.get("/getSection", (req, res, next) => {
  db.query(
    `SELECT section_id,section_title
  FROM section`,
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

app.get('/getCategory', (req, res, next) => {
  db.query(`SELECT
  category_title,category_id
   From category 
   WHERE category_id != ''`,
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


app.post("/getCategoryTitle", (req, res, next) => {
  db.query(
    `SELECT 
    section_id
    ,section_title
    ,category_id
     FROM category 
     where section_id = ${db.escape(req.body.section_id)}`,
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
    `SELECT sub_category_id, sub_category_title
  FROM sub_category`,
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send({
          data: err,
          msg: "failed",
        })
      } else {
        return res.status(200).send({
          data: result,
          msg: "Success",
        });
      }
    }
  );
});
module.exports = app;
