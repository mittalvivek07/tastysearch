
const trie = require("./trie");
const parser = require("./parser");

var tree = new trie();
var docIndex = {};
var docs = {};
var docNumber = -1;
const totalDocCount = 560000;
const samples = 50000;
module.exports = function(file, done){
	//Randomly pick documents for initial data
	for(var i = 0; i < samples; i++){
		var randomIndex = Math.floor(Math.random()*totalDocCount);
		docIndex[randomIndex] = true;
	}
	
	// Parse the file and return the trie and docs in callback
	parser.parse(file, docAvailable, function(){
		console.log(docNumber);
		delete(docIndex);
		done(docs, tree);
	});
}

/**
* On availability of a document add the content to the trie.
**/
var docAvailable = function(doc){
		docNumber++;
		if(docIndex[docNumber] === undefined){
			return;
		}
		//var d = {};
		//d.score = doc.score;
		docs[docNumber] = doc;
		

		var words = [];
		if(doc.summary != undefined){
			words = doc.summary.split(/[-:',.%);/$~(!"?*\s><]+/).filter(function(item) { return item !== '' });
		}
		for(var i in words){
			tree.add(words[i], docNumber);
		}
		
		words =  [];
		if(doc.text != undefined){
			words = doc.text.split(/[-:',.%);/$~(!"?*\s><]+/).filter(function(item) { return item !== '' });
		}
		
		for(var i in words){
			tree.add(words[i], docNumber);
		}
		//console.log(tree.count());
		//trees[docNumber] = tree;

}



