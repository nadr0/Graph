/** 
 * Makes the div draggable with mouse
 * @param {event} event
 * @param {div} div
 */
function dragDiv(event, div){
  // Drag set to false
  var drag = false;

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
    var fragment = create('<div class="vertex">'+vertex+'</div>');    
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
}

function drawEdge(){
  var currentEdge = document.getElementById("myEdge");
  var vertices = document.getElementsByClassName("vertex");

  var v  = vertices[0];
  var u = vertices[1];

  // console.log(u.style.left - v.style.left);

  // -ms-transform: rotate(7deg)
  // -webkit-transform: rotate(7deg)

  var left = parseInt(v.style.left,10) + 25;
  var top = parseInt(v.style.top,10) + 25;

  var topU = parseInt(u.style.top,10) + 25;
  var leftU = parseInt(u.style.left,10) + 25;
 
  var widthUV = (parseInt(u.style.left,10)) - (parseInt(v.style.left,10));
  
  var width = Math.sqrt((topU*topU) + (widthUV*widthUV));

  var angle = -Math.atan(topU/leftU) * 180 / Math.PI;
  currentEdge.style.webkitTransform = "rotate("+ angle+"deg"+")";
  currentEdge.style.top = top + "px";
  currentEdge.style.left = left + "px";
  currentEdge.style.width = width + "px";
}
