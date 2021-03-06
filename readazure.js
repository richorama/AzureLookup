var xml2js = require('xml2js');
var fs = require('fs');
var xml = fs.readFileSync('azure.xml').toString();



var names = {
    europewest : "Europe West",
    useast : "US East",
    useast2 : "US East 2",
    uswest :  "US West",
    usnorth : "US North Central",
    europenorth : "Europe North",
    uscentral : "US Central",
    asiaeast : "Asia Pacific East",
    asiasoutheast : "Asia Pacific Southeast",
    ussouth : "US South Central",
    japanwest : "Japan West",
    japaneast : "Japan East",
    brazilsouth : "Brazil South",
    australiaeast : "Australia East",
    australiasoutheast : "Australia Southeast",
    indiacentral : "India Central",
    indiawest : "India West",
    indiasouth : "India South",
    canadaeast : "Canada East",
    canadacentral : "Canada Central",
    uswest2 : "US West 2",
    uswestcentral : "US West Central",
    ukwest : "UK West",
    uksouth : "UK South",
    uscentraleuap : "US Central EUAP",
    useast2euap : "US East 2 EUAP",
    koreasouth : "Korea South",
    koreacentral : "Korea Central"
};

xml2js.parseString(xml, function(err, json){
	var output = {};
	json.AzurePublicIpAddresses.Region.forEach(function(x){
		//console.log(x.$.Name);
		x.IpRange.forEach(function(z){
			output[z.$.Subnet] = "Azure - " + names[x.$.Name];
		});
	});
	console.log(output)
});
