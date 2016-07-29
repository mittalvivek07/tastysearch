const init = require("./init");
const heap = require("heap");
const k = 20;
var server = function(){
	
}
server.prototype.start = function(){
	var startTime = new Date().getTime();
	var self = this;
	init("./data/foods.txt", function(docs, trees){
		self.docs = docs;
		self.trees = trees;
		var endTime = new Date().getTime();	
		console.log("time taken is");
		console.log((endTime- startTime)/1000);
		startTime = new Date().getTime();
		console.log(self.search(["cat", "processed", "bad", "good"]));
		var endTime = new Date().getTime();	
		console.log(" query time taken is");
		console.log((endTime- startTime)/1000);
	})
			
}


server.prototype.search = function(tokens){
	var score = {};
	//console.log(this.docs);
	//console.log(this.trees);
	var startTime = new Date().getTime();
	for(var i in tokens){
		var token = tokens[i].toLowerCase();
		for(var j in this.docs){
			var doc = this.docs[j];
			var tree = this.trees[j];
			//console.log(doc);
			//console.log(tree);
			
			if(tree.find(token)){
				if(score[j] == undefined){
					score[j] = 0;
				}
				score[j]++;
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
new server().start();
