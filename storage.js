var graphStructure = {
   
	"v":{
		"edgelist":{
			"u":true,
			}
	},

	"u":{
		"edgelist":{
			"v":true,
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
}
/**
 * Remove stored graph data
 */
function removeStoredData(){
	localStorage.removeItem('graph');
}

function retrieveData(){
	var retrievedObject = localStorage.getItem('graph');
	return JSON.parse(retrievedObject);
}