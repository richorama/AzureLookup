var xml2js = require('xml2js');
var fs = require('fs');
var xml = fs.readFileSync('ranges.xml').toString();


xml2js.parseString(xml, function(err, json){
	var output = {};
	json.AzurePublicIpAddresses.Region.forEach(function(x){
		//console.log(x.$.Name);
		x.IpRange.forEach(function(z){
			output[z.$.Subnet] = x.$.Name;
		});
	});
	console.log(output)
});
