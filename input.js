function addVertex(){
	var button = document.getElementById("AddVertexField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(!newGraph.data[vertex]){
		newGraph.insertVertex(vertex);
		addVertexToHTMLGraph(vertex);
	}
	button.value = "";
}

function removeVertex(){
	var button = document.getElementById("RemoveVertexField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(newGraph.data[vertex]){
		var adjvertices = newGraph.adjcentVertices(vertex);
		  for (var i = 0; i < adjvertices.length; i++) {
		    if(document.getElementById(vertex + adjvertices[i])){
		      var edge = document.getElementById(vertex + adjvertices[i]);
		    }else{
		      var edge = document.getElementById(adjvertices[i] + vertex);
		    }
		    edge.parentNode.removeChild(edge);
		}
		newGraph.deleteVertex(vertex);
		var vertexHTML = document.getElementById(vertex);
		vertexHTML.parentNode.removeChild(vertexHTML);

	}
	button.value = "";

}

function addEdge(){
	var button = document.getElementById("AddEdgeField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var edge = button.value;
	var vertices = edge.split(",");
	var v = document.getElementById(vertices[0]);
	var u =  document.getElementById(vertices[1]);

	newGraph.insertEdge(v.innerHTML,u.innerHTML);
	createEdge(v,u);

	button.value = "";
}

function removeEdge(){
	var button = document.getElementById("RemoveEdgeField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var edge = button.value;
	var vertices = edge.split(",");
	var v = document.getElementById(vertices[0]);
	var u =  document.getElementById(vertices[1]);

	if(document.getElementById(v.innerHTML + u.innerHTML)){
		var edgeHTML = document.getElementById(v.innerHTML + u.innerHTML);
	}else{
		var edgeHTML = document.getElementById(u.innerHTML + v.innerHTML);
	}
	edgeHTML.parentNode.removeChild(edgeHTML);
	newGraph.deleteEdge(v.innerHTML, u.innerHTML);
	button.value = "";
}