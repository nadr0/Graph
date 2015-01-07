var graphStructure = {
   
	"v":{
		"edgelist":{
			"u":true,
		},
		"edgeweight":{
			"u":1,
		}
	},

	"u":{
		"edgelist":{
			"v":true,
		},
		"edgeweight":{
			"v":1,
		}
	},
	"MST": {
		
	},
	"Cross":{

	},
	"Edges":{
		
	}
};

/**
 * Stores the graph data in local storage
 * @param {graph} graph
 */
function storeData(graph)
{
	localStorage.setItem('graph', JSON.stringify(graph));
}
/**
 * Remove stored graph data
 */
function removeStoredData(){
	localStorage.removeItem('graph');
}
/**
 * Returns the stored data
 */
function retrieveData(){
	var retrievedObject = localStorage.getItem('graph');
	return JSON.parse(retrievedObject);
}
/**
 * Updates the stored data
 */
function updateData(graph){
	removeStoredData();
	storeData(graph);
}