function addVertex(){
	var button = document.getElementById("AddVertexField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(!newGraph.data[vertex] && vertex != ""){
		success(button.parentNode)
		// button.parentNode.style.borderColor = "green";
		newGraph.insertVertex(vertex);
		addVertexToHTMLGraph(vertex);
	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);
}

function removeVertex(){
	var button = document.getElementById("RemoveVertexField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(newGraph.data[vertex]){
		success(button.parentNode);
		var adjvertices = newGraph.adjcentVertices(vertex);
		  for (var i = 0; i < adjvertices.length; i++) {
		    if(document.getElementById(vertex + adjvertices[i])){
		      var edge = document.getElementById(vertex + adjvertices[i]);
		    }else{
		      var edge = document.getElementById(adjvertices[i] + vertex);
		    }
    		var edgeWeightHTML = document.getElementById(edge.id + "EW");
			edgeWeightHTML.parentNode.removeChild(edgeWeightHTML);
			edge.parentNode.parentNode.removeChild(edge.parentNode);
		}
		newGraph.deleteVertex(vertex);
		var vertexHTML = document.getElementById(vertex);
		vertexHTML.parentNode.removeChild(vertexHTML);

	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);

}

function addEdge(){
	var button = document.getElementById("AddEdgeField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var edge = button.value;
	var vertices = edge.split(",");
	var v = document.getElementById(vertices[0]);
	var u =  document.getElementById(vertices[1]);
	var weight = 1;
	if(vertices[2]){
		weight = parseInt(vertices[2],10);
	}
	if(edge != ""&& v && u && vertices[2] != "weight"){
		success(button.parentNode);
		newGraph.insertEdge(v.innerHTML,u.innerHTML);
		newGraph.setEdgeWeight(v.innerHTML, u.innerHTML, weight);
		createEdge(v,u);
		if(document.getElementById(v.innerHTML + u.innerHTML + "EW")){
			var edgeWeightHTML = document.getElementById(v.innerHTML + u.innerHTML + "EW");
		}else{
			var edgeWeightHTML = document.getElementById(u.innerHTML + v.innerHTML + "EW");
		}
		edgeWeightHTML.innerHTML = weight;
		var data = retrieveData();
		if(data.Edges[u.innerHTML + v.innerHTML]){
			data.Edges[u.innerHTML + v.innerHTML].weight = weight;
		}else{
			data.Edges[v.innerHTML + u.innerHTML].weight = weight;
		}
		updateData(data);
	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);
}

function removeEdge(){
	var button = document.getElementById("RemoveEdgeField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var edge = button.value;
	var vertices = edge.split(",");
	var v = document.getElementById(vertices[0]);
	var u =  document.getElementById(vertices[1]);

	if(v && u){
		success(button.parentNode);
		if(document.getElementById(v.innerHTML + u.innerHTML)){
			var edgeHTML = document.getElementById(v.innerHTML + u.innerHTML);
		}else{
			var edgeHTML = document.getElementById(u.innerHTML + v.innerHTML);
		}
		var edgeWeightHTML = document.getElementById(edgeHTML.id + "EW");
		edgeWeightHTML.parentNode.removeChild(edgeWeightHTML);
		edgeHTML.parentNode.parentNode.removeChild(edgeHTML.parentNode);
		newGraph.deleteEdge(v.innerHTML, u.innerHTML);
	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);
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
			}else if(document.activeElement.parentNode.id === "PriminputField"){
				Prim();
			}
		}
	},false);
}

function success(div){
	div.style.borderColor = "#27ae60";
}

function retry(div){
	div.style.borderColor = "#c0392b";
}

function reset(div) {
	console.log("2quik");
	div.style.borderColor = "gray";
}


function BFS(){
	var button = document.getElementById("BFSinputField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(vertex != ""){
		success(button.parentNode);
		newGraph.BFS(vertex);
		mstEdgeOpacity("1.0");
		var checkbox = document.getElementById("MSTCheck");
		showMST(checkbox);
	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);
}

function DFS(){
	var button = document.getElementById("DFSinputField").childNodes[1];
	var newGraph = new Graph(retrieveData());
	var vertex = button.value;
	if(vertex != ""){
		success(button.parentNode);
    	newGraph.clearMST();
    	newGraph.clearCross();
		newGraph.DFS(vertex);
		mstEdgeOpacity("1.0");
		var checkbox = document.getElementById("MSTCheck");
		showMST(checkbox);
	}else{
		retry(button.parentNode);
	}
	button.value = "";
	setTimeout(function(){ button.parentNode.style.borderColor = "gray"}, 2000);
}

function showMST(checkBox){
	if(checkBox.checked){
		crossEdgeOpacity("0.1");
	}else if(!checkBox.checked){
		crossEdgeOpacity("1.0");
	}
}

function Kruskal(){
	var newGraph = new Graph(retrieveData());
	newGraph.Kruskal();
}

function Prim(){
	var newGraph = new Graph(retrieveData());
	newGraph.Prim();
}

function switchUI(div){
  var creationDiv = document.getElementById("creation");
  var algorithms = document.getElementById("algorithms");
  var creationTab = document.getElementById("creationTab");
  var functionTab = document.getElementById("functionTab");

  var fill1 = document.getElementById("fill1");
  var fill2 = document.getElementById("fill2");
  var fill3 = document.getElementById("fill3");
  var fill4 = document.getElementById("fill4");

  var ui = document.getElementById("ui");

  if(div.id === "functionTab"){

  	ui.style.height = "400px";

    fill1.style.display  = "inline";
    fill2.style.display = "none";
    fill3.style.display = "inline";
    fill4.style.display = "none";

    functionTab.className = "active";
    creationTab.className = "inactive";

    algorithms.style.display = "none";
    creationDiv.style.display = "inline";
    functionTab.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    creationTab.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

  }else if(div.id === "creationTab"){

  	ui.style.height = "480px";


    fill1.style.display  = "none";
    fill2.style.display = "inline";
    fill3.style.display = "none";
    fill4.style.display = "inline";

    functionTab.className = "inactive";
    creationTab.className = "active";

    creationDiv.style.display = "none";
    algorithms.style.display = "inline";
    creationTab.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    functionTab.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

  }
}