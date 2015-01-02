var graphStructure = {
   
	"a":{
		"edgelist":{
			"c":false,
			"b":true,
			}
	},

	"b":{
		"edgelist":{
			"a":true,
			"c":true,
			}
	},
   
	"c":{
		"edgelist":{
			"a":false,
			"b":true,
			}
	},
};

/**
 * Stores the graph data in local storage
 * @param {graph} graph
 */
function storeData(graph)
{
	localStorage.setItem('graph', JSON.stringify(graph));
	var retrievedObject = localStorage.getItem('graph');
}
/**
 * Remove stored graph data
 */
function removeStoredData(){
	localStorage.removeItem('graph');
}
