var minHeap = Class.extend({
    init: function(){
    	this.root = 1;
    	this.elements = [];
        this.elements.push("null");
        this.size = 0;
    },
    leftChild: function(index){
   		return(index * 2);
    },
    rightChild: function(index){
    	return (2*index) + 1;
    },
    parent: function(index){
    	return Math.floor(index/2);	
    },
    hasAChild: function(index){
    	if(this.leftChild(index) <= this.elements.length - 1){
    		return true;
    	}else{
    		return false;
    	}
    },
    minChild: function(index){
    	var leftchild = this.leftChild(index);
    	var rightchild = this.rightChild(index);

    	if(leftchild <= this.elements.length - 1 && rightchild <= this.elements.length - 1){
    		if(this.elements[leftchild].weight < this.elements[rightchild].weight){
    			return leftchild;
    		}else{
    			return rightchild;
    		}
    	}else{
    		return leftchild;
    	}

    },
    heapifyDown: function(index){
    	if(this.hasAChild(index)){
    		var minChildIndex = this.minChild(index);
    		if(this.elements[index].weight > this.elements[minChildIndex].weight){
				var b = this.elements[index];
				this.elements[index] = this.elements[minChildIndex];
				this.elements[minChildIndex] = b;
    			this.heapifyDown(minChildIndex);
    		}
    	}else{
    		return;
    	}
    },
    heapifyUp: function(index){
    	if(index > 1){
    		if(this.elements[index].weight < this.elements[this.parent(index)].weight){
				var b = this.elements[index];
				this.elements[index] = this.elements[this.parent(index)];
				this.elements[this.parent(index)] = b;
    			this.heapifyUp(this.parent(index));
    		}
    	}
    },
    buildHeap: function(){
    	for (var i = this.parent(this.elements.length - 1); i > 0; i--) {
    		this.heapifyDown(i);
    	};
    },
    insert: function(element){
        this.size += 1;
    	this.elements.push(element);
    	this.heapifyUp(this.elements.length - 1);
    },
    removeMin: function(){
        this.size -= 1;
    	var minimum = this.elements[this.root];
    	this.elements[this.root] = this.elements[this.elements.length - 1];
    	this.elements.splice(this.elements.length - 1, 1);
    	this.heapifyDown(this.root);
        return minimum;
     },
    empty: function(){
        if(this.size >= 1){
            return false;
        }else{
            return true;
        }
    }
});