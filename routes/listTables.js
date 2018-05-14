var express = require('express');

var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

var table = "vagrant_tci_users";

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var param = {}
    dynamodb.listTables(param, function (err, data) {
        if (err)
            res.json(err) // an error occurred
        else
            res.json(data); // successful response
    });
});


router.get('/desc/:table', function (req, res, next) {
    console.log(req.params.table);
    var param = {
        TableName: req.params.table
    }
    dynamodb.describeTable(param, function (err, data) {
        if (err)
            res.json(err) // an error occurred
        else
            res.json(data); // successful response
    });
});


router.get('/:table', function (req, res, next) {

    console.log(req.params.table);

    var params = {
        TableName: req.params.table
        // Key:{
        //      "userName": username
        //     // "title": title
        // }
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });
});

module.exports = router;