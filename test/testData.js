const parser = require("../src/parser");
var fs = require('fs');
var dictionary = {};
var docNumber = -1;
const totalDocCount = 560000;
var docIndex = {};

for(var i = 0; i < 100000; i++){
	var randomIndex = Math.floor(Math.random()*totalDocCount);
	//console.log(randomIndex);
	docIndex[randomIndex] = true;
}

var docAvailable = function(doc){
		docNumber++;
		if(docIndex[docNumber] === undefined){
			return;
		}
	
		var words = [];
		if(doc.summary != undefined){
			words = doc.summary.split(/[-:',.%)/(!"?*\s><]+/).filter(function(item) { return item !== '' });
		}
		for(var i in words){
			dictionary[words[i]] = true;
		}
		
		words =  [];
		if(doc.text != undefined){
			words = doc.text.split(/[-:',.%)/(!"?*\s><]+/).filter(function(item) { return item !== '' });
		}
		for(var i in words){
			dictionary[words[i]] = true;
		}


}

parser.parse("../data/foods.txt", docAvailable, function(){
	//console.log(docNumber);
	delete(docIndex);
	generateTokens();
});

function generateTokens(){
	var stream = fs.createWriteStream("./testData.txt");
	var l = Object.keys(dictionary).length;
	console.log(l);
	var i = 0;
	var data = [];
	keys = Object.keys(dictionary);

	console.log("writing");
	var write = function(){
		var count = Math.floor(Math.random()*9)+1;
		//console.log(i);
		var tokens = [];
		for(var j = 0; j < count; j++){
			var index = Math.floor(Math.random()*l);
			tokens.push(keys[index]);
		}
		
		stream.write(JSON.stringify(tokens)+"\n", function(){
			if(i < 10000){
				i++;
				write();
			}else{
				stream.close();
			}
		});
	}
	write();
	
}


