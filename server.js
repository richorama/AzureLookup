var ips = require('./ip-ranges');
var dns = require('dns');
var fs = require('fs');
var ipcheck = require('./check-ip');
var http = require('http');
var uuid = require('uuid');
var azure = require('azure');
var tableClient;
if (process.env.storage_account && process.env.storage_key){
	tableClient = azure.createTableService(process.env.storage_account, process.env.storage_key);	
	tableService.createTableIfNotExists('azurelookup', function(error){
	    if(error) console.log(error);
	});
}


http.createServer(function(req, res){
	if (req.url === "/"){
		res.setHeader('content-type', 'text/html');
		fs.createReadStream("_index.html").pipe(res);
	} else {
		var address = req.url.split("/")[1];
		check(address, function(err, result){
			res.setHeader('content-type', 'text/plain');
			if (!result) return res.end("none");
			res.end(result);
		});
	}

}).listen(process.env.PORT || 8080);


function checkIp(ip, address){
	for (var range in ips){
		if (ipcheck(range)(ip)) {
			save(address, ip, ips[range])
			return ips[range];
		}
	}
	return false;
}

function checkDns(address, cb){
	dns.resolve(address, function(err, addresses){
		if (err) return cb(err);
		for (var i = 0; i < addresses.length; i++){
			var result = checkIp(addresses[i], address);
			if (result) return cb(null, result);
		}
		cb(null, false);
	});
}

function isIp(address){
	if (!address) return false;
	var parts = address.split('.');
	if (parts.length != 4) return false;
	for (var i = 0; i < parts.length; i++){
		var number = parseInt(parts[i]);
		if (isNaN(number)) return false;
		if (number < 0) return false;
		if (number > 255) return false;
	}
	return true;
}

function check(address, cb){
	if (isIp(address)){
		return cb(null, checkIp(address, address));
	}
	checkDns(address, cb);
}

function save(address, ip, dc){

	function newId(){
		var date = new Date();
		return ("00000000000000" + date.getTime()).substr(-14) + '~' + uuid.v4();
	}
	var id = newId();

	if (!tableClient) return;
	var entity = {
		address : address,
		ip : ip,
		dc : dc,
		PartitionKey : id.substr(0,10),
		RowKey : id + "~" + uuid.v4(),
	};
	tableClient.insertEntity('azurelookup', entity, function(err){
		if (err) console.log(err);
	});
}

