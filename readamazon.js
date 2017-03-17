var fs = require('fs');
var data = JSON.parse(fs.readFileSync('aws-ip-ranges.json').toString());

data.prefixes.forEach(record => {
	console.log(`'${record.ip_prefix}' : 'Amazon - ${record.service} - ${record.region}',`);
});
