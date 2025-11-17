require('dotenv').config();

var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
const fileUpload = require('express-fileupload');
var flash = require('connect-flash')
const session = require('express-session');

global.__basedir = __dirname;

var privateKey  = fs.readFileSync('sslcrt/server.key', 'utf8');
var certificate = fs.readFileSync('sslcrt/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
let port = 2001;
let secureport = 2002;
httpServer.listen(port, () => {
    console.log(`Server Running in port:${port}`);
  });
httpsServer.listen(secureport, () => {
    console.log(`Server Running in secure port:${secureport}`);
  });
    
var bodyParser = require('body-parser');
var cors = require('cors');
const _ = require('lodash');
const mime = require('mime-types')

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
	secret: 'my_secret',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash());

const axios = require('axios');

app.get('/image-proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Missing url parameter');
  }
  try {
    const agent = new https.Agent({ rejectUnauthorized: false }); // <--- Add this line
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      httpsAgent: agent, // <--- Use the agent here
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.set('Content-Type', response.headers['content-type']);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (err) {
    console.error('Image fetch failed:', err.message, err.response && err.response.status);
    res.status(500).send('Image fetch failed');
  }
});


const attendance = require('./routes/attendance.js');
const product = require('./routes/product.js');
const comment = require('./routes/comment.js');
const company = require('./routes/company.js');
const orders = require('./routes/orders.js');
const content = require('./routes/content.js');
const setting = require('./routes/setting.js');
const valuelist = require('./routes/valuelist.js');
const subcategory = require('./routes/subcategory.js');
const category = require('./routes/category.js');
const media = require('./routes/media.js');
const section = require('./routes/section.js');
const contact = require('./routes/contact.js');
const support = require('./routes/support.js');
const Auth = require('./routes/auth.js');
const blog = require('./routes/blog.js');
const commonApi = require('./routes/commonApi.js');
const enquiry = require('./routes/enquiry.js');
const staff = require('./routes/staff.js');
const usergroup = require('./routes/usergroup.js');
const purchaseorder = require('./routes/purchaseorder.js');  
const note = require('./routes/note.js');   
const supplier = require('./routes/supplier.js');
const geocountry = require('./routes/geocountry.js');
const inventory = require('./routes/inventory.js');
const clients = require('./routes/clients.js');
const employeeModule = require('./routes/employeeModule.js');
const payrollmanagement = require('./routes/payrollmanagement.js');
const jobinformation = require('./routes/jobinformation.js');
const loan = require('./routes/loan.js');
const bank = require('./routes/bank.js');
const leave = require('./routes/leave.js');
const employee = require('./routes/employee.js');
const training = require('./routes/training.js');
const reports = require('./routes/reports.js');
const salesOrder = require('./routes/salesOrder.js');
const salesItem = require('./routes/salesItem.js');
const currency = require('./routes/currency.js');
const invoice = require('./routes/invoice.js');
const reordercli = require('./routes/reordercli.js');
const catalogue = require('./routes/catalogue.js');
const transaction = require('./routes/Transaction.js');
const membertype = require('./routes/membertype.js');
const paymode = require('./routes/paymode.js');
const pricegroup = require('./routes/pricegroup.js');
const salesreturn = require('./routes/salesreturn.js');
const stockRequest = require('./routes/stockRequest.js');
const payments = require('./routes/payments.js');
const receipt = require('./routes/receipt.js');



app.use('/payments', payments);
app.use('/salesreturn', salesreturn);
app.use('/Transaction', transaction);
app.use('/reordercli', reordercli);
app.use('/reports', reports);
app.use('/attendance', attendance);
app.use('/product', product);
app.use('/comment', comment);
app.use('/company', company);
app.use('/orders', orders);
app.use('/category', category);
app.use('/setting', setting);
app.use('/valuelist', valuelist);
app.use('/subcategory', subcategory);
app.use('/content', content);
app.use('/media', media);
app.use('/section', section);
app.use('/contact', contact);
app.use('/support', support);
app.use('/api', Auth);
app.use('/blog', blog);
app.use('/commonApi', commonApi);
app.use('/enquiry', enquiry);
app.use('/staff', staff);
app.use('/usergroup', usergroup);
app.use('/purchaseorder', purchaseorder);
app.use('/note', note);
app.use('/supplier', supplier);
app.use('/geocountry', geocountry);
app.use('/inventory', inventory);
app.use('/clients', clients);
app.use('/jobinformation', jobinformation);
app.use('/payrollmanagement', payrollmanagement);
app.use('/employeeModule',employeeModule);
app.use('/training', training);
app.use('/employee', employee);
app.use('/leave', leave);
app.use('/loan', loan);
app.use('/bank', bank);
app.use('/salesOrder', salesOrder);
app.use('/salesItem', salesItem);
app.use('/currency', currency);
app.use('/invoice', invoice);
app.use('/catalogue', catalogue);
app.use('/membertype', membertype);
app.use('/paymode', paymode);
app.use('/pricegroup', pricegroup);
app.use('/stockRequest', stockRequest);
app.use('/receipt', receipt);



const indexRouter = require('./routes/fileUpload'); 
app.use('/file', indexRouter);

app.use(fileUpload({
    createParentPath: true
}));
module.exports = app;