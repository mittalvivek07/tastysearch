
const suffixTree = require("./suffixTree");
const parser = require("./parser");

var trees = {};
var docIndex = {};
var docs = {};
var docNumber = -1;
const totalDocCount = 560000;
module.exports = function(file, done){
	for(var i = 0; i < 100000; i++){
		var randomIndex = Math.floor(Math.random()*totalDocCount);
		//console.log(randomIndex);
		docIndex[randomIndex] = true;
	}
	
	parser.parse(file, docAvailable, function(){
		console.log(docNumber);
		delete(docIndex);
		done(docs, trees);
	});
}


var docAvailable = function(doc){
		docNumber++;
		if(docIndex[docNumber] === undefined){
			return;
		}
		//var d = {};
		//d.score = doc.score;
		docs[docNumber] = doc;
		var tree = new suffixTree();

		var words = [];
		if(doc.summary != undefined){
			words = doc.summary.split(/[-:',."?\s><]+/).filter(function(item) { return item !== '' });
		}
		for(var i in words){
			tree.add(words[i]);
		}
		
		words =  [];
		if(doc.text != undefined){
			words = doc.text.split(/[-:',."?\s><]+/).filter(function(item) { return item !== '' });
		}
		
		for(var j in words){
			//tree.add(words[j]);
		}
		//console.log(tree.count());
		trees[docNumber] = tree;

}



