var Disjointset = Class.extend({
    init: function(){
    	// Set to store the nodes
        this.set =[];
        this.elements = 0;
    },
    addElements: function(numberOfElements){
    	for (var i = 0; i < numberOfElements; i++) {
    		this.elements++;
    		this.set.push(-1);
    	};
    },
    find: function(element){
    	if(this.set[element] < 0){
    		return element;
    	}else{
    		return this.set[element] = this.find(this.set[element]);
    	}
    },
    setUnion: function(a, b){
    	var a = this.find(a);
    	var b = this.find(b);

    	if(a != b){
    		var newSize = (this.set[a] + this.set[b]);
    		if(this.compareSize(a,b)){
    			this.set[b] = a;
    			this.set[a] = newSize;
    		}else{
    			this.set[a] = b;
    			this.set[b] = newSize;
    		}
    	}
    },
    compareSize: function(a, b){
    	if(this.set[a] === this.set[b]){
    		return true;
    	}else if(this.set[a] < this.set[b]){
    		return true;
    	}else{
    		return false;
    	}
    }
});