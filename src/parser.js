var fs = require('fs');
const readline = require('readline');
module.exports.parse = function(file, documentAvailable, done){
	var stream = fs.createReadStream(file, "utf8");
	//	console.log(data.length);
	const rl = readline.createInterface({
	  input: stream
	});
	var lineCount = 0;
	//var documents = [];
	var doc = {};
	rl.on('line', (line) => {
		if(line.length == 0){
			return;
		}
		
		lineCount++;
		var x = split(line);
		doc[x[0]] = x[1];
		if(lineCount == 8){
			lineCount = 0;
			documentAvailable(doc);
			doc = {};
		}
		
	 // console.log(`Received: ${line}`);
	});
	rl.on('close', function(){
		if(lineCount == 8){
			documentAvailable(doc);
		}
		done();
	});
	
}
function split(s){
	var index = s.indexOf("/");
	var s = s.substr(index+1);
	return s.split(":");
}



