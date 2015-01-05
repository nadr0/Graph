function addVertex(){
	var button = document.getElementById("AddVertexField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(!newGraph.data[vertex] && vertex != ""){
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

	if(edge != ""){
		newGraph.insertEdge(v.innerHTML,u.innerHTML);
		createEdge(v,u);
	}
	button.value = "";
}

function removeEdge(){
	var button = document.getElementById("RemoveEdgeField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var edge = button.value;
	var vertices = edge.split(",");
	var v = document.getElementById(vertices[0]);
	var u =  document.getElementById(vertices[1]);

	if(edge != ""){
		if(document.getElementById(v.innerHTML + u.innerHTML)){
			var edgeHTML = document.getElementById(v.innerHTML + u.innerHTML);
		}else{
			var edgeHTML = document.getElementById(u.innerHTML + v.innerHTML);
		}
		edgeHTML.parentNode.parentNode.removeChild(edgeHTML.parentNode);
		newGraph.deleteEdge(v.innerHTML, u.innerHTML);
	}
	button.value = "";
}

function keyBoardInit(event){
	document.body.addEventListener("keypress", function(event){
		if(event.keyCode === 13 ){
			if(document.activeElement.parentNode.id === "AddVertexField"){
				addVertex();
			}else if(document.activeElement.parentNode.id === "RemoveVertexField"){
				removeVertex();
			}else if(document.activeElement.parentNode.id === "AddEdgeField"){
				addEdge();
			}else if(document.activeElement.parentNode.id === "RemoveEdgeField"){
				removeEdge();
			}else if(document.activeElement.parentNode.id === "BFSinputField"){
				BFS();
			}else if(document.activeElement.parentNode.id === "DFSinputField"){
				DFS();
			}
		}
	},false);
}

function BFS(){
	var button = document.getElementById("BFSinputField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(vertex != ""){
		newGraph.BFS(vertex);
	}
	button.value = "";
}

function DFS(){
	var button = document.getElementById("DFSinputField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(vertex != ""){
		newGraph.DFS(vertex);
	}
	button.value = "";
}