var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var paypal = require('paypal-rest-sdk');
var axios = require('axios');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var COINS_FILE = path.join(__dirname, 'coin-data.json');
let coinsData = null;

app.use('/', express.static(__dirname));


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AeCK8dvXa-Q5waY1rIWtO9gq3IYxgNoo_tBglJilu5GUsELlNU977bDt7L9BKPFBtv-sqD98Lk9JSYsm',
  'client_secret': 'EFRjFyh4s5v6mLFZkBuJlPBeLB4FK-5kxn6VuZiLSJh-zc8G0VA54gQInY5X3Y8bzEKOU2zTSDUTt-uy'
});

// start payment process
app.post('/checkout' , (req , res) => {
    console.log(req.body);
    var execute_payment_json = {
      "payer_id": req.body.data.payerID,
    };
    const payment = {};
    payment.amount = req.body.data.amount;
    const paymentID = req.body.data.paymentID;
    paymentPaypal(paymentID, execute_payment_json, payment,(err, result) => {
        if(err) {
          res.statuts(400).json(JSON.stringify(err));
        } else {
          res.status(200).json(payment);
        }
    });
});

app.listen(3000 , () => {
    console.log(' backend listening on 3000 ');
})

// helper functions
var paymentPaypal = (paymentID, execute_payment_json, payment, cb) => {
    paypal.payment.execute(paymentID, execute_payment_json,(error, paymentLog) => {
        if (error)
        {
            return cb(error);
        }
        else
        {
            // the server logic after successful payment
            // here just print out the payment information to the console
            payment.email = paymentLog.payer.payer_info.email;
            payment.first_name = paymentLog.payer.payer_info.first_name;
            payment.last_name = paymentLog.payer.payer_info.last_name;
            console.log(payment);
            cb(null, JSON.stringify(payment));
       }
    });
}


// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//setInterval(() =>console.log("hola"),1000);

app.get('/api/coins', function(req, res) {
    fs.readFile(COINS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        coinsData = JSON.parse(data);
        res.json(coinsData);
    });
});

app.get('/api/coin/:id', function(req, res) {

    const coin = coinsData.find(coin => coin.id === req.params.id);
        if (coin) {
            res.json(coin);
        } else {
            res.status(404).json({ error: 'Coin not found' });
        }

});