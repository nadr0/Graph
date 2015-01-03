/** 
 * Makes the div draggable with mouse
 * @param {event} event
 * @param {div} div
 */
function dragDiv(event, div){
  // Drag set to false
  var drag = false;
  var angle = 0;
  // Mouse down event listener
  div.addEventListener("mousedown", function( event ) {   
    // If mouse is down, drag is set to true
    drag = true;
    // Gets local of the div
    var top = event.clientY - div.style.top;
    var left = event.clientX - div.style.left;

    // Adds mouse move event listener to the body
    document.body.addEventListener("mousemove", function( event ) { 
      // If mouse is down
      if(drag){
        // Move the div with mouse
        div.style.top = event.clientY - top;
        div.style.left = event.clientX - left;
        updateEdges(div.textContent);
      }
    }, false);
    // Add mouse up event listener
    div.addEventListener("mouseup", function( event ) {   
      // If mouse is released, drag is set to false
      drag = false;
    }, false);


  }, false);
};

// http://stackoverflow.com/questions/814564/inserting-html-elements-with-javascript
function create(htmlStr) {
  var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
  }
  return frag;
}

/** 
 * Takes the JSON graph data and turns it into the HTML div's
 * @param {graph} graph
 */
function createHTMLGraph(graph){
  // Goes through each vertex in the JSON 
  for (var vertex in graph.data)
  { 
    var backgroundColors = ["","#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6"];
    var borderColors = ["","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"];
    // Create a fragment for the new div to add to the body
    var fragment = create('<div id="'+vertex+'"class="vertex">'+vertex+'</div>');    
    // Insert the fragment to the body
    document.body.insertBefore(fragment,document.body.childNodes[0]);

    // Choose random color index
    var randomColorIndex = Math.floor((Math.random() * 10) + 1);
    // Set the border color
    document.body.childNodes[0].style.borderColor = borderColors[randomColorIndex];
    // Set the background color
    document.body.childNodes[0].style.backgroundColor = backgroundColors[randomColorIndex];
    // Make the newly added div to be draggable
    dragDiv(event,document.body.childNodes[0]);
  }
  createEdges(graph);
}

function createEdges(graph){
  for (var vertex in graph.data)
  { 
    var v = document.getElementById(vertex);
    var adjvertices = graph.adjcentVertices(vertex);
    for (var i = 0; i < adjvertices.length; i++) {
      var u = document.getElementById(adjvertices[i]);
      createEdge(v, u);
    };
  }
}

function updateEdges(vertex){
  var v = document.getElementById(vertex);
  var newGraph = new Graph(retrieveData());
  var adjvertices = newGraph.adjcentVertices(vertex);
  for (var i = 0; i < adjvertices.length; i++) {
    var edge = document.getElementById(vertex + adjvertices[i]);
    var u = document.getElementById(adjvertices[i]);
      // Get the position of the v vertex
    var vX = parseInt(v.style.left,10) + 25;
    var vY = parseInt(v.style.top,10) + 25;
    // Get the position of the u vertex
    var uX = parseInt(u.style.left,10) + 25;
    var uY = parseInt(u.style.top,10) + 25;


    // Get the width between the two vertices
    var width = Math.abs(uX - vX);
    // Get the height between the two vertices
    var height = Math.abs(uY - vY);

    var edgeLeft = 0;
    var edgeTop = 0;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;

    if(uX < vX){
      edgeLeft = uX;
    }else{
      edgeLeft = vX;
    }

    if(uY > vY){
      edgeTop = vY;
    }else{
      edgeTop = uY;
    }

    if(uX < vX && uY < vY){
      y1 = 0;
      x2 = width;
      y2 = height;
    }else if(vX < uX && vY < uY){
      y1 = 0;
      x2 = width;
      y2 = height;
    }else if(uX < vX && uY > vY){
      y1 = height;
      x2 = width;
      y2 = 0;
    }else if(vX < uX && vY > uY){
      y1 = height;
      x2 = width;
      y2 = 0;
    }
  edge.style.left = edgeLeft+"px";
  edge.style.top = edgeTop+"px";
  edge.style.width = width + "px";
  edge.style.height = height + "px";
  // edge.childNodes[1].x1.baseVal.value = x1;
  // edge.childNodes[1].y1.baseVal.value = y1;
  // edge.childNodes[1].x2.baseVal.value = x2;
  // edge.childNodes[1].y2.baseVal.value = y2;

  };
}

function createEdge(v,u){
  // Create edge label
  var edgeLabel = v.innerHTML + u.innerHTML;

  // Get the position of the v vertex
  var vX = parseInt(v.style.left,10) + 25;
  var vY = parseInt(v.style.top,10) + 25;
  // Get the position of the u vertex
  var uX = parseInt(u.style.left,10) + 25;
  var uY = parseInt(u.style.top,10) + 25;

  // Get the width between the two vertices
  var width = Math.abs(uX - vX);
  // Get the height between the two vertices
  var height = Math.abs(uY - vY);

  var edgeLeft = 0;
  var edgeTop = 0;
  var x1 = 0;
  var y1 = 0;
  var x2 = 0;
  var y2 = 0;

  if(uX < vX){
    edgeLeft = uX;
  }else{
    edgeLeft = vX;
  }

  if(uY > vY){
    edgeTop = vY;
  }else{
    edgeTop = uY;
  }

  if(uX < vX && uY < vY){
    y1 = 0;
    x2 = width;
    y2 = height;
  }else if(vX < uX && vY < uY){
    y1 = 0;
    x2 = width;
    y2 = height;
  }else if(uX < vX && uY > vY){
    y1 = height;
    x2 = width;
    y2 = 0;
  }else if(vX < uX && vY > uY){
    y1 = height;
    x2 = width;
    y2 = 0;
  }
  
  // SVG Draw Line x1="0" y1="100" x2="200" y2="0" 
  var line = '<svg class="edge"> <line id="'+edgeLabel+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"  /> </svg>'
  var fragment = create(line);    
  document.body.insertBefore(fragment,document.body.childNodes[0]);
  document.body.childNodes[0].style.left = edgeLeft;
  document.body.childNodes[0].style.top = edgeTop;
  document.body.childNodes[0].style.width = width + "px";
  document.body.childNodes[0].style.height = height + "px";


}
