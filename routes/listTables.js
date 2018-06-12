var express = require('express');

var AWS = require("aws-sdk");


var dynamodb = null;
var docClient = null;

const REGION = "us-east-1";
const HOST = "http://10.245.1.2";
const PORT = "8000";
const USERNAME = "";
const PASSWORD = "";
const ACCESSKEY = "";

var currentData = {
        region: REGION,
        endpoint: HOST+":"+PORT,
        username: USERNAME,
        password: PASSWORD,
        accesskey: ACCESSKEY
};

(function initConfig() {
    AWS.config.update({
        region: REGION,
        endpoint: HOST+":"+PORT
    });
     dynamodb = new AWS.DynamoDB();
     docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        httpOptions:{
            connectTimeout:1000
        }
    },function(a){console.log(a)});
    console.log(' >> ');
    console.log('AWS server started with default config !!');
})();

var table = "vagrant_tci_users";

var router = express.Router();


router.get('/data/config',function(req, res, next){
    res.json(currentData);
});

/* GET home page. */
router.post('/data/config', function (req, res, next) {
    var configData = req.body;
    var _region = configData.region || REGION;
    var _host = configData.host || HOST;
    var _port = configData.port || PORT;
    var _username = configData.username || USERNAME;
    var _password = configData.password || PASSWORD;
    var _accessKey = configData.accesskey || ACCESSKEY
    
    var newData = {
        region: _region,
        endpoint: _host + ':' + _port,
        username: _username,
        password: _password,
        accesskey : _accessKey
    }
    console.log(newData);
    currentData = newData;
    AWS.config.update(newData);
    
    dynamodb = new AWS.DynamoDB();
    docClient = new AWS.DynamoDB.DocumentClient({
       apiVersion: '2012-08-10'
   });
   console.log('AWS server updated with new config !!');
   res.json({'msg':'done'});

});


/* GET home page. */
router.get('/', function (req, res, next) {
    var param = {}
    dynamodb.listTables(param, function (err, data) {
        if (err) {
            res.json(err) // an error occurred
        }
        else {
            console.log(data);
            res.json(data); // successful response
        }

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
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            console.log(data);
            res.json(data);
        }
    });
});

module.exports = router;