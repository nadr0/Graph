var Graph = Class.extend({
    init: function(graphStructure){
        this.data = graphStructure;
    },
    insertVertex: function(label){
        this.data[label] = {
            "edgelist":[]
        }
    }

});