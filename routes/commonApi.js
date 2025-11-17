const sgMail = require('@sendgrid/mail');
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
const randomstring = require('randomstring');
var cors = require("cors");
var app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
  })
);


app.post('/sendemail', (req, res, next) => {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  subject: req.body.subject,
  text: req.body.text,
  templateId:"d-04799568cd724c78b49fb8ec80ee9afc",
 dynamic_template_data:req.body.dynamic_template_data

};
sgMail
  .send(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
 
});

app.post('/sendUseremailForgetPassword', (req, res, next) => {
    const { to } = req.body;

  // Generate a random password reset token
  const resetToken = randomstring.generate(10);

  // Store the reset token in the database

  db.query(`SELECT pass_word FROM contact WHERE email = '${to}'`, (error, results) => {
    if (error) {
      console.error('Error updating reset token:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  templateId:"d-5a87cd59c04241e2b66540618a155377",
  dynamic_template_data: {
  subject:'Saif: Your Requested Password',
  password :req.body.password,
  }

};
 sgMail
  .sendMultiple(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
      return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
  res.json({ resetToken });
    }
  });
 
});


app.post('/sendgmail', (req, res, next) => {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  subject: req.body.subject,
  text: req.body.text,
  templateId:"d-bc3196c7de1f4dc3b7c25b9885867f82",
 dynamic_template_data:req.body.dynamic_template_data

};
sgMail
  .send(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
 
});



app.post('/sendregisteremail', (req, res, next) => {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  subject: req.body.subject,
  text: req.body.text,
 templateId:"d-28e19247dc1040b19d659bcfcef080d4",
 dynamic_template_data:req.body.dynamic_template_data

};
 sgMail
  .send(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
 
});

app.post('/resetVerification', (req, res) => {
    
  const { resetToken} = req.body;

  // Update the user's password with the new password
  const query = `UPDATE contact SET mail_verification = 1, mail_otp_no = NULL WHERE mail_otp_no='${resetToken}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error resetting verification:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Your Account is verified successfully' });
    }
  });
});

app.post('/sendUseremailApp', (req, res, next) => {
    const { to } = req.body;

  // Generate a random password reset token
  const resetToken = randomstring.generate(10);

  // Store the reset token in the database

  db.query(`SELECT mail_otp_no FROM contact WHERE email = '${to}'`, (error, results) => {
    if (error) {
      console.error('Error updating reset token:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  templateId:"d-48610ce07cee46658980d34a77d647f4",
  dynamic_template_data: {
  subject:'Order',
    phone :req.body.phone,
    names :req.body.names,
    address :req.body.address,
    city :req.body.city,
    state :req.body.state,
    Country :req.body.Country,
    TotalAmount :req.body.TotalAmount,
    code :req.body.code,
  }

};
 sgMail
  .sendMultiple(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
      return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
  res.json({ resetToken });
    }
  });
 
});




app.post('/sendUseremail', (req, res, next) => {
    const { to } = req.body;

  // Generate a random password reset token
  const resetToken = randomstring.generate(10);

  // Store the reset token in the database

  db.query(`SELECT mail_otp_no FROM contact WHERE email = '${to}'`, (error, results) => {
    if (error) {
      console.error('Error updating reset token:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
    
sgMail.setApiKey("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")

  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  templateId:"d-b5f8e0d15a64457488e7d35c64f36a32",
  dynamic_template_data: {
  subject: req.body.subject,
  url: `https://unitdecom.unitdtechnologies.com/mail-verification?token=${results[0]}`}

};
 sgMail
  .sendMultiple(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
  res.json({ resetToken });
    }
  });
 
});


app.post('/checkEmailAvailability', (req, res, next) => {
  db.query(`SELECT COUNT(*) AS email_count
FROM contact
WHERE email = ${db.escape(req.body.to)}`,
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

app.post('/sendresetPasswordlinkemail', (req, res, next) => {
    
sgMail.setApiKey("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")
 
  let data = {
  to: req.body.to,
  from: 'notification@unitdtechnologies.com',
  subject: req.body.subject,
    text: req.body.text,
    
   dynamictemplatedata: {
    name: "meera",
    message: "message",
    email:"email.com",
    
  }, 
    
};
 sgMail
  .sendMultiple(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
 
});

app.post('/addEnquiry', (req, res, next) => {

    db.query(
      `INSERT INTO enquiry (first_name,last_name,email,comments) VALUES (
      ${db.escape(req.body.first_name)},
      ${db.escape(req.body.last_name)},
      ${db.escape(req.body.email)},
      ${db.escape(req.body.comments)}
      )`,
      (err, result) => {
          
          
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
         return res.status(200).send({
         
          msg: 'enquiry Added!'
        });
      } 
    );
}); 
  
app.post("/deleteRecord", (req, res, next) => {
  
  let sql = `DELETE FROM ${req.body.tablename} WHERE ${req.body.columnname}=${db.escape(req.body.idvalue)}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
      });
    }
  });
});
app.post("/updatePublish", (req, res, next) => {
  
  let sql = `UPDATE ${req.body.tablename} SET published=${db.escape(req.body.value)} WHERE ${req.body.idColumn}=${db.escape(req.body.idValue)}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg:sql
      });
    }
  });
});
app.post("/updateSortOrder", (req, res, next) => {
  
  let sql = `UPDATE ${req.body.tablename} SET sort_order=${db.escape(req.body.value)} WHERE ${req.body.idColumn}=${db.escape(req.body.idValue)}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send({
        data: err,
        msg: "failed",
      });
    } else {
      return res.status(200).send({
        data: result,
        msg:sql
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
  }else if(type == 'product'){
      key_text = 'nextProductCode';
      sql = "SELECT * FROM setting WHERE key_text='productCodePrefix' OR key_text='nextProductCode'";
  }else if(type == 'inventory'){
      key_text = 'nextInventoryCode';
      sql = "SELECT * FROM setting WHERE key_text='inventoryCodePrefix' OR key_text='nextInventoryCode'";
  }  else if(type == 'lead'){
      key_text = 'nextLeadsCode';
      sql = "SELECT * FROM setting WHERE key_text='leadsPrefix' OR key_text='nextLeadsCode'";  
  }else if(type == 'invoice'){
      key_text = 'nextInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='invoiceCodePrefixes' OR key_text='nextInvoiceCode'";  
  }else if(type == 'delivery'){
      key_text = 'nextDeliveryCode';
    sql = "SELECT * FROM setting WHERE key_text='deliveryCodePrefix' OR key_text='nextDeliveryCode'";  
  }else if(type == 'subConworkOrder'){
      key_text = 'nextSubconCode';
    sql = "SELECT * FROM setting WHERE key_text='subconCodePrefix' OR key_text='nextSubconCode'";  
  }
  else if(type == 'project'){
      key_text = 'nextProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='projectCodePrefix' OR key_text='nextProjectCode'";  
  }
  else if(type == 'customer'){
      key_text = 'nextCustomerCode';
      sql = "SELECT * FROM setting WHERE key_text='customerCodePrefix' OR key_text='nextCustomerCode'";  
     
  }else if(type == 'quote'){
      key_text = 'nextQuoteCode';
      sql = "SELECT * FROM setting WHERE key_text='quoteCodePrefix' OR key_text='nextQuoteCode'";  
  }
  else if(type == 'creditNote'){
      key_text = 'nextCreditNoteCode';
      sql = "SELECT * FROM setting WHERE key_text='creditNotePrefix' OR key_text='nextCreditNoteCode'";  
  }else if(type == 'employee'){
      withprefix = false;
      key_text = 'nextEmployeeCode';
    sql = "SELECT * FROM setting WHERE  key_text='nextEmployeeCode'";  
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
  else if(type == 'SupplierCode'){
    withprefix = false;
    key_text = 'nextSupplierCode';
    sql = "SELECT * FROM setting WHERE key_text='SupplierCodePrefix' OR key_text='nextSupplierCode'";  
}
  else if(type == 'wocode'){
      key_text = 'nextWOCode';
      sql = "SELECT * FROM setting WHERE key_text='wOCodePrefix' OR key_text='nextWOCode'";  
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
            finalText = result[1].value + result[0].value;
            newvalue = parseInt(result[0].value) + 1
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

app.post("/getCodeValues", (req, res, next) => {
  var type = req.body.type;
  let sql = '';
  let key_text = '';
  let withprefix = true;
  if(type == 'opportunity'){
      key_text = 'nextOpportunityCode';
      sql = "SELECT * FROM setting WHERE key_text='opportunityCodePrefix' OR key_text='nextOpportunityCode'";
  }else if(type == 'product'){
      key_text = 'nextProductCode';
      sql = "SELECT * FROM setting WHERE key_text='productCodePrefix' OR key_text='nextProductCode'";
  }else if(type == 'receipt'){
      key_text = 'nextReceiptCode';
      sql = "SELECT * FROM setting WHERE key_text='receiptCodePrefix' OR key_text='nextReceiptCode'";
  }else if(type == 'inventory'){
    key_text = 'nextInventoryCode';
    sql = "SELECT * FROM setting WHERE key_text='inventoryCodePrefix' OR key_text='nextInventoryCode'";
}  else if(type == 'subscription'){
    key_text = 'nextSubscriptionCode';
    sql = "SELECT * FROM setting WHERE key_text='subscriptionCodePrefix' OR key_text='nextSubscriptionCode'";
}else if(type == 'sponsorship'){
  key_text = 'nextSponsorshipCode';
  sql = "SELECT * FROM setting WHERE key_text='sponsorshipCodePrefix' OR key_text='nextSponsorshipCode'";
}
else if(type == 'lead'){
      key_text = 'nextLeadsCode';
      sql = "SELECT * FROM setting WHERE key_text='leadsPrefix' OR key_text='nextLeadsCode'";  
  }else if(type == 'invoice'){
      key_text = 'nextInvoiceCode';
    sql = "SELECT * FROM setting WHERE key_text='invoiceCodePrefix' OR key_text='nextInvoiceCode'";  
  }else if(type == 'salesreturn'){
      key_text = 'nextSalesReturnCode';
    sql = "SELECT * FROM setting WHERE key_text='salesreturnCodePrefix' OR key_text='nextSalesReturnCode'";  
  }else if(type == 'delivery'){
      key_text = 'nextDeliveryCode';
    sql = "SELECT * FROM setting WHERE key_text='deliveryCodePrefix' OR key_text='nextDeliveryCode'";  
  }
  else if(type == 'salesorder'){
      key_text = 'nextSalesOrderCode';
    sql = "SELECT * FROM setting WHERE key_text='salesorderCodePrefix' OR key_text='nextSalesOrderCode'";  
  }
  else if(type == 'stockrequest'){
    key_text = 'nextStockRequestCode';
    sql = "SELECT * FROM setting WHERE key_text='stockRequestCodePrefix' OR key_text='nextStockRequestCode'";  
  }else if(type == 'subConworkOrder'){
      key_text = 'nextSubconCode';
    sql = "SELECT * FROM setting WHERE key_text='subconCodePrefix' OR key_text='nextSubconCode'";  
  }
  else if(type == 'project'){
      key_text = 'nextProjectCode';
      sql = "SELECT * FROM setting WHERE key_text='projectCodePrefix' OR key_text='nextProjectCode'";  
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
  else if(type == 'purchaseOrder'){
     
      key_text = 'nextPurchaseOrderCode';
         sql = "SELECT * FROM setting WHERE key_text='purchaseOrderCodePrefix' OR key_text='nextPurchaseOrderCode'";  
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
  else if(type == 'wocode'){
      key_text = 'nextWOCode';
      sql = "SELECT * FROM setting WHERE key_text='wOCodePrefix' OR key_text='nextWOCode'";  
  }
   else if(type == 'booking'){
      key_text = 'nextBookingCode';
      sql = "SELECT * FROM setting WHERE key_text='bookingOrderCodePrefix' OR key_text='nextBookingCode'";  
  }
 else if(type == 'SupplierCode'){
     
      key_text = 'nextSupplierCode';
         sql = "SELECT * FROM setting WHERE key_text='SupplierCodePrefix' OR key_text='nextSupplierCode'";  
  }
  else if(type == 'Catalogue'){
     
      key_text = 'nextCatalogueCode';
         sql = "SELECT * FROM setting WHERE key_text='CatalogueCodePrefix' OR key_text='nextCatalogueCode'";  

  }
  else if(type == 'invoices'){
     
      key_text = 'nextPurchaseOrderCode';
         sql = "SELECT * FROM setting WHERE key_text='invoicePrefix' OR key_text='nextInvoice'";  

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

app.post('/sendemail1', (req, res, next) => {
    
sgMail.setApiKey("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")
  let data = {
  to: "muthumari@unitdtechnologies.com",
  from: 'notification@unitdtechnologies.com',
  templateId:"d-6a4a5194199c4185ba3c06b23329f801",
 dynamic_template_data:req.body.dynamic_template_data

};
 sgMail
  .send(data)
  .then((response) => {
     return res.status(200).send({
        data: response,
        msg: 'Success',
      })
  })
  .catch((error) => {
       return res.status(400).send({
        data: error,
        msg: 'failed',
      })
  })
 
});


module.exports = app;
