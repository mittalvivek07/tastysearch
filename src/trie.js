/**
* This is a unified trie for all the documents.
* To which document a word belongs is denoted by the list of the leaf document nodes
* in the node representing end of a word. 
**/
var trie = module.exports = function(){
    this.root = new node("");
}
trie.prototype.log = function(){
    this.root.log();
}
trie.prototype.find = function(s){
    return this.root.find(s);
}
trie.prototype.add = function(s, docNumber){
	s = s.toLowerCase();
	this.root.add(s, docNumber);
}

trie.prototype.count = function(){
	return this.root.count();
}


var node = function(s){
    this.value = s;
    this.children = {};
}

node.prototype.add = function(s, docNumber){
    if(s.length === 0){
		if(this.leafs === undefined){
			this.leafs = {};
		}
		this.leafs[docNumber] = true;
        return;
    }
	
    if(this.children[s[0]] === undefined){
        this.children[s[0]] = new node(s[0]);
    }
    this.children[s[0]].add(s.substr(1), docNumber);
}

node.prototype.find = function(s){
    if(s.length === 0){
		if(this.leafs === undefined){
			return null;
		}else{
			return this.leafs;
		}
    } else if(this.children[s[0]] === undefined){
        return null;
    } else{
        return this.children[s[0]].find(s.substr(1));
    }
}

node.prototype.count = function(){
	var count = 1;
	for(var i in this.children){
		count += this.children[i].count();
	}
	return count;
}

node.prototype.log = function(){
    console.log(this.value);
    for(var prop in this.children){
        this.children[prop].log();
    }
    console.log("----  " + this.value);
    
}