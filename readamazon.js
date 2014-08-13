var fs = require('fs');
var data = fs.readFileSync('amazon.txt').toString().split("\r\n");

var first = true;
var lastBlank = true;
var dc = "";
var output = {};
for (var i = 0; i < data.length; i++){
	var line = data[i];
	if (first){
		dc = "Amazon - " + line.replace(":", "");
	} else if (line !== ""){
		output[line.split(" ")[0]] = dc;
	}

	first = (line === "" && lastBlank);
	lastBlank = (line === "");
}
console.log(output);