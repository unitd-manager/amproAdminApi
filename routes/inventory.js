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

app.get('/getinventoryMain', (req, res, next) => {
  db.query(`SELECT i.inventory_code,
  i.inventory_id
  ,i.minimum_order_level
  ,p.product_id AS productId
  ,p.product_type
  ,c.company_name
  ,p.title AS product_name
  ,p.product_code
  ,p.unit
  ,i.notes
  ,i.creation_date
  ,i.modification_date
  ,i.created_by
  ,i.modified_by
  ,p.product_code
  ,i.actual_stock As stock
FROM inventory i
LEFT JOIN (product p) ON (p.product_id = i.product_id)
LEFT JOIN (product_company pc) ON (pc.product_id = p.product_id)
LEFT JOIN (supplier c) ON (c.supplier_id = pc.company_id)
WHERE i.inventory_id != ''
ORDER BY i.inventory_id DESC`,
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

app.post('/import/excel', ( req, res ) => {
  const { data } = req.body;
  const parsed_data = JSON.parse(data);

  const limit = parsed_data.length;
  const count = [];
  const connection = db;
  
  connection.beginTransaction(
      ( err ) => {
          if ( err )
          {
              connection.rollback(() => {console.log(err);});
          }else
          {
              insertRows(connection);
          }
      }
  )
  function insertRows(connection) {
      connection.query(
          "INSERT INTO product (title, product_code, qty_in_stock, product_type,price,unit,description) VALUES (?,?,?,?,?,?,?);",
          [parsed_data[count.length].ProductName, parsed_data[count.length].ProductCode, parsed_data[count.length].Stock, parsed_data[count.length].Category,parsed_data[count.length].Price, parsed_data[count.length].Unit, parsed_data[count.length].Description],
          ( err, rslt ) => {
              if( err ){
                  connection.rollback(() => {console.log(err);});
                  res.send(err);
                  res.end();
              }else 
              {
                  connection.query(
                      "INSERT INTO inventory (product_id,actual_stock) VALUES (?,?);",
                      [rslt.insertId,parsed_data[count.length].Stock],
                      ( err ) => {
                          if( err ){
                              connection.rollback(() => {console.log(err);});
                              res.send(err);
                              res.end();
                          }else 
                          {
                              next(connection, parsed_data[count.length].title);
                          }
                      }
                  );
              }
          }
      );
  };

  function next(connection, title) {
      if ( ( count.length + 1 ) === limit )
      {
          connection.commit((err) => {
              if ( err ) {
                  connection.rollback(() => {console.log(err);});
                  res.send('err');
                  res.end();
              }else
              {
                  console.log("RECORDS INSERTED!!!");
                  res.send('SUCCESS');
                  res.end();
              }
          });
      }else {
          count.push(1);
          insertRows(connection);
   }
 }
});

app.post('/getinventoryById', (req, res, next) => {
  db.query(`SELECT i.inventory_code
  ,i.inventory_id
  ,i.minimum_order_level
  ,p.product_id AS productId
  ,p.product_type
  ,c.company_name
  ,p.title AS product_name
  ,p.product_code
  ,p.unit
  ,i.notes
  ,i.creation_date
  ,i.created_by
  ,i.modified_by
  ,i.modification_date
  ,p.product_code
  ,i.actual_stock AS stock
FROM inventory i
LEFT JOIN (product p) ON (p.product_id = i.product_id)
LEFT JOIN (product_company pc) ON (pc.product_id = p.product_id)
LEFT JOIN (supplier c) ON (c.supplier_id = pc.company_id)
WHERE i.inventory_id = ${db.escape(req.body.inventory_id)}`,
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

app.post('/getstockById', (req, res, next) => {
  db.query(`SELECT p.*
  ,i.actual_stock
FROM inventory i
LEFT JOIN (product p) ON (p.product_id = i.product_id)
WHERE p.product_id = ${db.escape(req.body.product_id)}`,
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

app.get('/getinventory', (req, res, next) => {
  db.query(`SELECT
  i.inventory_code,
  i.inventory_id,
  i.minimum_order_level,
  p.product_id AS productId,
  p.product_type,
  c.company_name,
  p.title AS product_name,
  p.item_code,
  p.unit,
  i.notes,
  i.creation_date,
  i.modification_date,
  p.product_code,
  ((SELECT SUM(po.qty) FROM po_product po WHERE po.product_id = p.product_id) - (SELECT SUM(pm.quantity) FROM project_materials pm WHERE pm.product_id = p.product_id)) AS stock,
  orderSummary.materials_used,
  paidSummary.materials_purchased,
  (paidSummary.materials_purchased -orderSummary.materials_used ) AS actual_stock,
  i.actual_stock AS name
FROM inventory i
LEFT JOIN product p ON p.product_id = i.product_id
LEFT JOIN product_company pc ON pc.product_id = p.product_id
LEFT JOIN supplier c ON c.supplier_id = pc.company_id
LEFT JOIN (
  SELECT SUM(pm.quantity) AS materials_used, pm.product_id
  FROM project_materials pm
  GROUP BY pm.product_id
) AS orderSummary ON orderSummary.product_id = p.product_id
LEFT JOIN (
  SELECT SUM(po.qty) AS materials_purchased, po.product_id
  FROM po_product po
  GROUP BY po.product_id
) AS paidSummary ON paidSummary.product_id = p.product_id
WHERE i.inventory_id != '';
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
            });
      }
 
    }
  );
});

app.post('/editinventoryMain', (req, res, next) => {
  db.query(`UPDATE inventory  
            SET minimum_order_level =${db.escape(req.body.minimum_order_level)}
                ,notes=${db.escape(req.body.notes)}
                ,modification_date=${db.escape(req.body.modification_date)}
                ,modified_by=${db.escape(req.body.modified_by)}
                ,current_stock=${db.escape(req.body.current_stock)}
             WHERE product_id =  ${db.escape(req.body.productId)}`,
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

app.post('/editInventoryStock11', (req, res, next) => {
  db.query(
    `UPDATE inventory  
     SET actual_stock = ${db.escape(req.body.qty_in_stock)},
     modification_date = NOW()
     WHERE product_id = ${db.escape(req.body.product_id)}`,
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


app.post('/editInventoryStock', (req, res) => {
  const poProductId = req.body.po_product_id;
  const poProductqty = req.body.qty;
  const poProductupdate = req.body.qty;

  // Fetching data from po_product table
  const SQLPoProdPrev = `
    SELECT product_id, qty, damage_qty, purchase_order_id, po_product_id, qty_updated
    FROM po_product
    WHERE po_product_id = '${poProductId}'
  `;

  db.query(SQLPoProdPrev, (err, resultPoProdPrev) => {
    if (err) {
      console.log('error: ', err);
      return res.status(400).send({
        data: err,
        msg: 'failed',
      });
    }

    const poProdPrev = resultPoProdPrev[0];

    // Update po_product table
    const SQLPOProduct = `
      UPDATE po_product
      SET qty = '${poProductqty}', qty_updated = '${poProductupdate}', status = 'closed'
      WHERE po_product_id = '${poProductId}'
    `;

    db.query(SQLPOProduct, (err) => {
      if (err) {
        console.log('error: ', err);
        return res.status(400).send({
          data: err,
          msg: 'failed',
        });
      }

      // Fetching data from po_product table again
      const SQLPoProd = `
        SELECT product_id, qty, damage_qty, purchase_order_id, po_product_id, qty_updated
        FROM po_product
        WHERE po_product_id = '${poProductId}'
      `;

      db.query(SQLPoProd, (err, resultPoProd) => {
        if (err) {
          console.log('error: ', err);
          return res.status(400).send({
            data: err,
            msg: 'failed',
          });
        }

        const poProd = resultPoProd[0];

        // Fetching data from inventory table
        const SQLInventory = `
          SELECT product_id, actual_stock
          FROM inventory
          WHERE product_id = '${poProd.product_id}'
        `;

        db.query(SQLInventory, (err, resultInventory) => {
          if (err) {
            console.log('error: ', err);
            return res.status(400).send({
              data: err,
              msg: 'failed',
            });
          }

          const rowInventory = resultInventory[0];
          const qtyBatchwise = poProd.qty - poProdPrev.qty_updated;
          const stockCalc = rowInventory.actual_stock + qtyBatchwise;

          // Update product table
          const SQLUpdateProduct = `
            UPDATE product
            SET qty_in_stock = ${stockCalc}
            WHERE product_id = '${poProd.product_id}'
          `;

          db.query(SQLUpdateProduct, (err) => {
            if (err) {
              console.log('error: ', err);
              return res.status(400).send({
                data: err,
                msg: 'failed',
              });
            }

            // Update inventory table
            const SQLUpdateInventory = `
              UPDATE inventory
              SET actual_stock = ${stockCalc}
              WHERE product_id = '${poProd.product_id}'
            `;

            db.query(SQLUpdateInventory, (err) => {
              if (err) {
                console.log('error: ', err);
                return res.status(400).send({
                  data: err,
                  msg: 'failed',
                });
              }

              return res.status(200).send({
                data: { stockCalc },
                msg: 'Success',
              });
            });
          });
        });
      });
    });
  });
});


app.post('/updateInventoryStock', (req, res, next) => {
  db.query(`UPDATE inventory SET actual_stock = ${db.escape(req.body.stock)}
            ,modification_date=${db.escape(new Date())}
             WHERE inventory_id =  ${db.escape(req.body.inventory_id)}`,
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

app.post('/insertinventory', (req, res, next) => {

  let data = {creation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
              product_id:req.body.product_id,
              modification_date: req.body.modification_date,
              flag: req.body.flag,
              minimum_order_level: req.body.minimum_order_level,
              site_id: req.body.site_id,
              actual_stock: req.body.actual_stock,
              inventory_code: req.body.inventory_code,
              color: req.body.color,
              size: req.body.size,
              code: req.body.code,
              model: req.body.model,
              changed_stock: req.body.changed_stock,
              notes: req.body.notes,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
          };

  let sql = "INSERT INTO  inventory SET ?";
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

app.delete('/deleteInventory', (req, res, next) => {

  let data = {inventory_id  : req.body.inventory_id  };
  let sql = "DELETE FROM inventory WHERE ?";
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

app.post('/insertsite', (req, res, next) => {

  let data = {site_id: req.body.site_id,
              title: req.body.title,
              admin_email: req.body.admin_email,
              creation_date: req.body.creation_date,
              modification_date: req.body.modification_date,
              default_language: req.body.default_language,
              published: req.body.published,
              flag: req.body.flag,
              site_url: req.body.site_url,
              google_analytics_id: req.body.google_analytics_id,
              tag_line: req.body.tag_line,
              tag_line2: req.body.tag_line2,
              theme: req.body.theme,
              skin: req.body.skin,
              created_by: req.body.created_by,
              modified_by: req.body.modified_by,
              ad_ops_site_name: req.body.ad_ops_site_name,
              additional_meta_tags: req.body.additional_meta_tags,
              additional_analytics_script: req.body.additional_analytics_script,
          };

  let sql = "INSERT INTO site SET ?";
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


app.delete('/deleteSite', (req, res, next) => {

  let data = {site_id  : req.body.site_id };
  let sql = "DELETE FROM site WHERE ?";
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


app.get('/gettabPurchaseOrderLinked', (req, res, next) => {
  db.query(`SELECT pop.cost_price
  ,pop.qty
  ,com.company_name AS supplier_name
  ,po.po_code
  ,po.purchase_order_date
  ,po.purchase_order_id
  ,po.creation_date
  ,p.title
  ,c.company_name
  ,st.title as site_title
FROM po_product pop
LEFT JOIN purchase_order po ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN project p ON p.project_id = po.project_id
LEFT JOIN company c ON c.company_id = p.company_id
LEFT JOIN supplier com ON pop.supplier_id = com.supplier_id
LEFT JOIN site st ON st.site_id = po.site_id
WHERE pop.product_id != ''`,
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

// app.post('/gettabPurchaseOrderLinkedById', (req, res, next) => {
//   db.query(`SELECT pop.cost_price
//   ,pop.qty
//   ,com.company_name AS supplier_name
//   ,po.po_code
//   ,po.purchase_order_date
//   ,po.purchase_order_id
//   ,po.creation_date
//   ,p.title
//   ,c.company_name
//   ,st.title as site_title
// FROM po_product pop
// LEFT JOIN purchase_order po ON po.purchase_order_id = pop.purchase_order_id
// LEFT JOIN project p ON p.project_id = po.project_id
// LEFT JOIN company c ON c.company_id = p.company_id
// LEFT JOIN supplier com ON pop.supplier_id = com.supplier_id
// LEFT JOIN site st ON st.site_id = po.site_id
// WHERE pop.product_id = ${db.escape(req.body.product_id)}`,
//     (err, result) => {
       
//       if (err) {
//         console.log('error: ', err)
//         return res.status(400).send({
//           data: err,
//           msg: 'failed',
//         })
//       } else {
//         return res.status(200).send({
//           data: result,
//           msg: 'Success',
//             });
//       }
 
//     }
//   );
// });

app.post('/gettabPurchaseOrderLinkedById', (req, res, next) => {
  db.query(`SELECT pop.gross_total
  ,pop.qty
  ,po.tran_no
  ,po.tran_date
  ,po.purchase_order_id
  ,po.creation_date
  ,po.supplier_id
  ,po.title
  ,com.company_name
FROM po_product pop
LEFT JOIN purchase_order po ON po.purchase_order_id = pop.purchase_order_id
LEFT JOIN supplier com ON po.supplier_id = com.supplier_id
WHERE pop.product_id = ${db.escape(req.body.product_id)}`,
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


app.get('/getTabProjectLinked', (req, res, next) => {
  db.query(`SELECT DISTINCT p.project_id
           ,pm.material_used_date
           ,p.title
           ,com.company_name
           ,pm.quantity
           FROM project_materials pm
           LEFT JOIN project p ON (p.project_id = pm.project_id)
           LEFT JOIN company com ON (com.company_id = p.company_id)
           WHERE pm.product_id != ''`,
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

app.post('/getTabProjectLinkedById', (req, res, next) => {
  db.query(`SELECT DISTINCT
           pm.product_id
           ,p.invoice_date
           ,com.company_name
           ,pm.quantity
           FROM invoice_item pm
           LEFT JOIN invoice p ON (p.invoice_id = pm.invoice_id)
           LEFT JOIN company com ON (com.company_id = p.company_id)
           WHERE pm.product_id = ${db.escape(req.body.product_id)}`,
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

app.post('/getAdjustStock', (req, res, next) => {
  db.query(`SELECT al.adjust_stock_log_id,
           al.adjust_stock,
           al.current_stock,
           al.created_by,
           al.creation_date
           FROM adjust_stock_log al
           WHERE al.inventory_id = ${db.escape(
        req.body.inventory_id,
      )} ORDER BY al.adjust_stock_log_id DESC `,
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

app.get('/getAdjustStockMain', (req, res, next) => {
  db.query(`SELECT adjust_stock_log_id
           adjust_stock,
           materials_used,
           current_stock,
           created_by
           FROM adjust_stock_log
           WHERE inventory_id != ""`,
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

app.post('/insertadjust_stock_log', (req, res, next) => {

  let data = {adjust_stock_log_id: req.body.adjust_stock_log_id,
              inventory_id: req.body.inventory_id,
              product_id: req.body.product_id,
              adjust_stock: req.body.adjust_stock,
              creation_date: new Date(),
              modification_date: req.body.modification_date,
              modified_by: req.user,
              created_by: req.body.created_by,
              current_stock: req.body.current_stock,
          };

  let sql = "INSERT INTO adjust_stock_log SET ?";
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

app.post('/getProductQuantityOld', (req, res, next) => {
  db.query(`select i.actual_stock,
  (SELECT(sum(po.qty)) FROM po_product po Where po.product_id= ${db.escape(req.body.product_id)} ) as materials_purchased , 
  (select (sum(pm.quantity)) FROM project_materials pm Where pm.product_id=${db.escape(req.body.product_id)}) as materials_used 
  from po_product po 
  LEFT JOIN project_materials pm ON pm.product_id = po.product_id 
  LEFT JOIN product p ON p.product_id = pm.product_id 
  LEFT JOIN inventory i ON i.product_id = po.product_id
  where p.product_id=${db.escape(req.body.product_id)} `,
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

app.post('/getProductQuantity', (req, res, next) => {
  db.query(`SELECT
  i.actual_stock,
  (SELECT SUM(po.qty) 
   FROM po_product po 
   WHERE po.product_id = ${db.escape(req.body.product_id)}) AS materials_purchased,

  (SELECT SUM(ii.quantity) 
   FROM invoice_item ii 
   WHERE ii.product_id = ${db.escape(req.body.product_id)}) AS materials_sold

FROM po_product po
LEFT JOIN product p ON p.product_id = po.product_id
LEFT JOIN inventory i ON i.product_id = po.product_id
WHERE p.product_id = ${db.escape(req.body.product_id)}
LIMIT 1; `,
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

app.post('/getPurchasedMaterials', (req, res, next) => {
  db.query(`SELECT
    SUM(pm.quantity) AS purchased_material
FROM
    project_materials pm
WHERE
    pm.product_id =${db.escape(req.body.product_id)} `,
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

app.post('/getUsedMaterials', (req, res, next) => {
  db.query(`SELECT
    (SUM(po.qty)) AS material_used
FROM
    po_product po
WHERE
    po.product_id= ${db.escape(req.body.product_id)} `,
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