var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
// const client = new MongoClient(uri);
// const {MongoClient} = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');

var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
    if(err){
        console.log(err);
    }
    else {
        console.log('Connected to ' + db, ' + ', response);
    }
});

var app = express()
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type,Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ShopBridge");
//   dbo.getMongo().setReadPref('primary');

app.get("/api/getItems/", async function(req,res){
            dbo.collection("ecommerce_sample").find({}, {projection: {pid:1, product_name:1, retail_price:1, discounted_price:1, in_stock: 1, requested:1, _id:0}}).limit(1000).toArray(function(err,data){
            if(err){
                res.send(err);
                console.log('error logged: ', err)
            }
            else {
                res.send(data);
                console.log('data received: ', data)
            }
});
})

app.get("/api/getTotalItems/", async function(req,res){
    dbo.collection('ecommerce_sample').count({}, function(error, numOfDocs){
        if(error) return callback(error);

        // db.close();
        callback(null, numOfDocs);
    });
})

app.get("/api/getItemDetails/:itemID", async function(req,res){
                var itemID = req.params.itemID;
                dbo.collection("ecommerce_sample").find({pid: itemID}).toArray(function(err,data){
                if(err){
                    res.send(err);
                    console.log('error logged: ', err)
                }
                else {
                    res.send(data);
                    console.log('data received: ', data)
                }
    });
    })

    app.get("/api/getProductId/", async function(req,res){
        dbo.collection("ecommerce_sample").find({}, {projection: {pid: 1, _id: 0}}).limit(2).toArray(function(err,data){
        if(err){
            res.send(err);
            console.log('error logged: ', err)
        }
        else {
            res.send(data);
            console.log('data received: ', data)
        }
});
})

app.delete("/api/deleteItem/:itemID", async function(req,res){
                var query = {pid: req.params.itemID}
                dbo.collection("ecommerce_sample").deleteOne(query, function(err,data){
                if(err){
                    res.send(err);
                    console.log('error logged: ', err)
                }
                else {
                    res.send(data);
                    console.log('data received: ', data)
                }
    });
    })

app.post("/api/modifyData/:itemID", async function (req, res) {
        var itemID = parseInt(req.params.itemID);
        var updatedData =  {$set: {"brand": req.body.brand, "product_name": req.body.product_name, "retail_price": req.body.retail_price, "pid": req.body.pid,
            "discounted_price": req.body.discounted_price, "in_stock": req.body.in_stock, "requested": req.body.requested, "description": req.body.description}};
        dbo.collection("ecommerce_sample").findOneAndUpdate({"pid": itemID}, updatedData, {upsert: true, new: true}, function(err, data) {
            if (err) {
                res.send(err);
                console.log('error logged: ', err)
            }
            else {
                res.send(data);
                console.log('fav logged: ', req.body);
            }
        })
    })

app.post("/api/addData/", async function (req, res) {
    var newItem = {brand: req.body.brand, product_name: req.body.product_name, retail_price: req.body.retail_price, pid: req.body.itemID,
        discounted_price: req.body.discounted_price, in_stock: req.body.in_stock, requested: req.body.requested, description: req.body.description};     
    dbo.collection("ecommerce_sample").insertOne(newItem, function(err, data) {
        if (err) {
            res.send(err);
            console.log('error logged: ', err)
        }
        else {
            res.send(data);
            console.log('fav logged: ', req.body);
        }
    })
})
})


app.listen(8080, function() {
    console.log('This app listening on port 8080')
});