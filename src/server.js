const init = require("./init");
const heap = require("heap");
const k = 20;
var express = require('express');
var app = express();
//var compression = require('compression');


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


engine.prototype.getScores = function(tokens, done){
	var score = {};
	//console.log(this.docs);
	//console.log(this.tree);
	//
	//console.log(tokens);
	var self = this;
	var find = function(counter){
		//console.log(tokens.length);
		//console.log(tokens);
		//console.log(counter);
		if(counter < tokens.length){
			//console.log('finding');
			var leaves = self.tree.find(tokens[counter]);
			if(leaves !== null){
				for(var i in leaves){
					if(score[i] === undefined){
						score[i] = 0;
					}
					score[i]++;
				}
			}
			setImmediate(find, counter+1);
		}else{
			done(score);
		}
	}
	find(0);
}

engine.prototype.getTopKResults = function(score, done){
	var self = this;
	setImmediate(function(){
		var matchedDocs = [];
		for(var i in score){
			self.docs[i].count = score[i];
			matchedDocs.push(self.docs[i]);
		}
		done(heap.nlargest(matchedDocs, k, comp));
	})
		
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
function parseTokens(s){
	//console.log(s);
	
	var tokens = s.split(" ");
	for(var i in tokens){
		tokens[i] = tokens[i].toLowerCase().trim();
	}
	return tokens;
}

//app.use(compression());
app.use('/search', function(req, res, next){
	var tokens;
	try{
		tokens = parseTokens(req.query.tokens);
	}catch(e){
		 return res.status(400).send('Bad Request');
	}
	if(tokens === undefined){
		return  res.status(400).send('Empty tokens Request');
	}
	req.tokens = tokens;
	next();
})

app.use('/search', function(req, res, next){
	searchEngine.getScores(req.tokens, function(score){
		req.score = score;
		//console.log(score);
		next();
	
	});
});

app.use('/search', function(req, res, next){
	searchEngine.getTopKResults(req.score, function(docs){
		req.docs = docs;
		next();
	});
});

app.get('/search', function (req, res) {
	function writeData(counter){
		if(counter < req.docs.length){
			//console.log(counter);
			var r = res.write(JSON.stringify(req.docs[counter]));
			if(r === false){
				res.on("drain", writeData, counter+1);
			}else{
				setImmediate(writeData, counter+1);
			}
		}else{
			res.end();
		}
	}
	writeData(0);
})

var server = app.listen(8080, function () {
	
	searchEngine.start(function(){
		var host = server.address().address
		var port = server.address().port
		console.log("Example app listening at http://%s:%s", host, port);
	});
})
