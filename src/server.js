const init = require("./init");
const heap = require("heap");
const k = 20;
var express = require('express');
var app = express();


var engine = function(){
	
}
engine.prototype.start = function(done){
	var startTime = new Date().getTime();
	var self = this;
	init("./data/foods.txt", function(docs, tree){
		self.docs = docs;
		self.tree = tree;
		var endTime = new Date().getTime();	
		console.log("time taken is");
		console.log((endTime- startTime)/1000);
		
		done();
	})
			
}


engine.prototype.search = function(tokens){
	var score = {};
	//console.log(this.docs);
	//console.log(this.tree);
	var startTime = new Date().getTime();
	for(var i in tokens){
		var token = tokens[i].toLowerCase().trim();
		var leaves = this.tree.find(token);
		//console.log(leaves);
		if(leaves !== null){
			for(var i in leaves){
				if(score[i] === undefined){
					score[i] = 0;
				}
				score[i]++;
			}
		}

	}
	var matchedDocs = [];
	for(var i in score){
		this.docs[i].count = score[i];
		matchedDocs.push(this.docs[i]);
	}
	
	return heap.nlargest(matchedDocs, k, comp);
}

var comp = function(a, b){
	if(a.count > b.count){
		return 1;
	} else if(a.count < b.count){
		return -1;
	} else if(a.score > b.score){
		return 1;
	} else{
		return -1;
	}
}



var searchEngine = new engine();
app.get('/search', function (req, res) {
	var tokens;
	try{
		tokens = JSON.parse(req.query.tokens);
	}catch(e){
		 return res.status(400).send('Bad Request');
	}
	if(tokens === undefined){
		return  res.status(202).end();
	}
	
	startTime = new Date().getTime();
	docs = searchEngine.search(tokens);
	var endTime = new Date().getTime();	
	console.log(" query time taken is");
	console.log((endTime- startTime)/1000);
	return res.send(docs);
	//var docs = searchEngine.s
  
})

var server = app.listen(8080, function () {
	
	searchEngine.start(function(){
		var host = server.address().address
		var port = server.address().port
		console.log("Example app listening at http://%s:%s", host, port);
	});
})
