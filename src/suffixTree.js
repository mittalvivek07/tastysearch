var suffixTree = module.exports = function(){
    this.root = new node("");
    //console.log(s);

}
suffixTree.prototype.log = function(){
    this.root.log();
}
suffixTree.prototype.find = function(s){
    return this.root.find(s);
}
suffixTree.prototype.add = function(s){
	s.toLowerCase();
	//console.log(s);
	this.root.add(s);
}

suffixTree.prototype.count = function(){
	return this.root.count();
}


var node = function(s){
    this.value = s;
    this.children = {};
}

node.prototype.add = function(s){
   // console.log(s);
    if(s.length === 0){
		this.leaf = true;
        return;
    }
    if(this.children[s[0]] === undefined){
        this.children[s[0]] = new node(s[0]);
    }
    this.children[s[0]].add(s.substr(1));
}

node.prototype.find = function(s){
    if(s.length === 0){
		if(this.leaf === true){
			return true;
		}else{
			return false;
		}
    } else if(this.children[s[0]] === undefined){
        return false;
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