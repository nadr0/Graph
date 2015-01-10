var Graph = Class.extend({
    /**
     * Loads the graphStructure JSON object
     * @param {graph} graphStructure
     */
    init: function(graphStructure){
        // Sets local data to the passed in structure
        this.data = graphStructure;
        this.DFSvertexSet = {};
        this.DFSedgeSet = {};
    },
    /**
     * Inserts a vertex into the graph with a label
     * @param {vertex} label
     */
    insertVertex: function(label){
        // Inserts the new vertex into the JSON object
        this.data[label] = {
            // Blank edgelist
            "edgelist":{},
            "edgeweight":{}
        }
        // Update local storage
        updateData(this.data);
    },
    /**
     * Inserts an edge between two vertices
     * @param {vertex} v
     * @param {vertex} u
     */
    insertEdge: function(v,u){
        // Adds edge between v to u
        this.data[v].edgelist[u] = true;
        // Adds edge between u to v
        this.data[u].edgelist[v] = true;
        // Set edge weight
        this.data[v].edgeweight[u] = 1;
        this.data[u].edgeweight[v] = 1;
        // Update local storage
        updateData(this.data);
    },
    /**
     * Deletes the vertex from the graph
     * @param {vertex} v
     */
    deleteVertex: function(v){
        // Deletes all edges to v
        this.deleteEdges(v);
        // Deletes v from graph
        delete this.data[v];
        // Update local storage
        updateData(this.data);
    },
    /** 
     * Deletes all edges incident v
     * @param {vertex} v
     */
    deleteEdges: function(v){
        // Gets the adjcent vertices on v
        var vertices = this.adjcentVertices(v);
        // For each vertex in vertices
        for(var i = 0; i < vertices.length; i++){
            // Delete the edge between vertex and v
            delete this.data[vertices[i]].edgelist[v];
            delete this.data.Edges[v + vertices[i]];
            delete this.data.Edges[vertices[i] + v];
        }
        // Update local storage
        updateData(this.data);
    },
    /**
     * Deletes edge between v and u
     * @param {vertex} v
     * @param {vertex} u
     */
    deleteEdge: function(v,u){
        // Removes edge between v to u
        delete this.data[v].edgelist[u];
        // Removes edge between u to v
        delete this.data[u].edgelist[v];
        delete this.data.Edges[v+u];
        delete this.data.Edges[u+v];
        // Update local storage
        updateData(this.data);
    },
    /** 
     * Returns array of adjcent vertices
     * @param {vertex} v
     */
    adjcentVertices: function(v){
        // Store vertices
        var vertices = [];
        // For each edge incident v
        for (var vertex in this.data[v].edgelist)
        {
            // Push the vertex into vertices
            vertices.push(vertex);
        }
        // return the vertices
        return vertices;
    },
    setEdgeWeight: function(v,u,weight){
        this.data[v].edgeweight[u] = weight;
        this.data[u].edgeweight[v] = weight;
        updateData(this.data);
    },
    clearMST: function(){
        this.data.MST = {};
        updateData(this.data);
    },
    clearCross: function(){
        this.data.Cross = {};
        updateData(this.data);
    },
    BFS: function(startingVertex){
        this.clearMST();
        this.clearCross();
        var startingvertex = startingVertex;
        var Q = [];
        var vertexSet = {};
        var edgeSet = {};
        Q.push(startingvertex);

        while(Q.length > 0){
            var currentVertex = Q.shift();   
            var adjVertices = this.adjcentVertices(currentVertex);
            for(var i = 0; i < adjVertices.length; i++){
                if(!vertexSet[adjVertices[i]]){
                   if(document.getElementById(currentVertex + adjVertices[i])){
                      var edge = document.getElementById(currentVertex + adjVertices[i]);
                    }else{
                      var edge = document.getElementById(adjVertices[i] + currentVertex);
                    }
                    edge.style.stroke = "green";
                    this.data.MST[edge.id] = true;
                    vertexSet[adjVertices[i]] = true;
                    edgeSet[currentVertex+adjVertices[i]] = true;
                    edgeSet[adjVertices[i]+currentVertex] = true;
                    Q.push(adjVertices[i]);
                }else if(!edgeSet[currentVertex+adjVertices[i]]){
                   if(document.getElementById(currentVertex + adjVertices[i])){
                      var edge = document.getElementById(currentVertex + adjVertices[i]);
                    }else{
                      var edge = document.getElementById(adjVertices[i] + currentVertex);
                    }
                    this.data.Cross[edge.id] = true;
                    edge.style.stroke = "red";
                }
            }

        }
        updateData(this.data);
    },
    DFS: function(vertex){
        this.DFSvertexSet[vertex] = true;
        var adjVertices = this.adjcentVertices(vertex);
        for (var i = 0; i < adjVertices.length; i++) {
            if(!this.DFSvertexSet[adjVertices[i]]){
                this.DFSedgeSet[vertex + adjVertices[i]] = true;
                this.DFSedgeSet[adjVertices[i] + vertex] = true;
                if(document.getElementById(vertex + adjVertices[i])){
                  var edge = document.getElementById(vertex + adjVertices[i]);
                }else{
                  var edge = document.getElementById(adjVertices[i] + vertex);
                }
                edge.style.stroke = "green";
                this.data.MST[edge.id] = true;
                this.DFS(adjVertices[i]);
            }else if(!this.DFSedgeSet[vertex + adjVertices[i]]){
                if(document.getElementById(vertex + adjVertices[i])){
                  var edge = document.getElementById(vertex + adjVertices[i]);
                }else{
                  var edge = document.getElementById(adjVertices[i] + vertex);
                }
                this.data.Cross[edge.id] = true;

                edge.style.stroke = "red";
            }
        };
        updateData(this.data);
    },
    getEdges: function(){
        var edgeData = retrieveData().Edges;
        var edges = [];
        for (var edge in edgeData)
        {
            var edgeToPush = {};
            var edgeDataForEdgeToPush = {};
            edgeDataForEdgeToPush["weight"] = edgeData[edge].weight;
            edgeDataForEdgeToPush["source"] = edgeData[edge].source;
            edgeDataForEdgeToPush["dest"] = edgeData[edge].dest;
            edgeToPush[edge] = edgeDataForEdgeToPush;
            edges.push(edgeToPush);
        }
        return edges;
    },
    firstObject: function(object){
        for(var first in object) return first;
    },
    Kruskal: function(){
        this.clearCross();
        this.clearMST();
        var vertices = document.getElementsByClassName("vertex");
        var edges = this.getEdges();
        var obj = this.firstObject(edges[0]);
        var currentGraph = this;
        edges.sort(function(a, b) {
            var ObjA = currentGraph.firstObject(a);
            var ObjB = currentGraph.firstObject(b);
            return a[ObjA].weight - b[ObjB].weight;
        });

        var vertexToIndex = {};
        for(var i = 0; i < vertices.length; i++){
            vertexToIndex[vertices[i].id] = i;
        }
        var set = new Disjointset();

        set.addElements(vertices.length);

        for(var i = 0; i < edges.length - 1; i++){
            var objI = this.firstObject(edges[i]);

            var vertexA = edges[i][objI].source;
            var vertexB = edges[i][objI].dest;

            var indexA = vertexToIndex[vertexA];
            var indexB = vertexToIndex[vertexB];

            if(document.getElementById(vertexA + vertexB)){
              var edge = document.getElementById(vertexA + vertexB);
            }else{
              var edge = document.getElementById(vertexB + vertexA);
            }

            edge.style.stroke = "red";

            if(set.find(indexA) != set.find(indexB)){
                set.setUnion(indexA,indexB);
                edge.style.stroke = "green";
                this.data.MST[edge.id] = true;
            }else{
                edge.style.stroke = "red";
                this.data.Cross[edge.id] = true;

            }
        }

        var lastEdgeObj = this.firstObject(edges[edges.length-1]);
        var lastEdge = document.getElementById(lastEdgeObj);
        lastEdge.style.stroke = "red";
        this.data.Cross[lastEdge.id] = true;
        updateData(this.data);
    },
    lowestEdgeWeight: function(vertex, Vset){
         var adjVertices = this.adjcentVertices(vertex);
         var lowestEdge;
         var lowestVertex;
         var lowestWeight = "infinity";
         for (var i = 0; i < adjVertices.length; i++) {
            if(!Vset[adjVertices[i]]){
                if(lowestWeight === "infinity" ||this.data[vertex].edgeweight[adjVertices[i]] < lowestWeight){
                    lowestVertex = adjVertices[i];
                    lowestEdge = vertex + adjVertices[i];
                    lowestWeight = this.data[vertex].edgeweight[adjVertices[i]];
                }
            }
         };
         Vset[lowestVertex] = true;
         var edgeData = {};
         edgeData["edge"] = lowestEdge;
         edgeData["vertex"] = lowestVertex;
         edgeData["weight"] = lowestWeight;
         return edgeData;
    },
    Prim: function(){
        this.clearCross();
        this.clearMST();
        var Vset = {};
        var Eset = {};
        var V = {};
        var VsetAmount = 0;
        var vertices = document.getElementsByClassName("vertex");
        var edges = document.getElementsByClassName("edge");
        var vertexAmount = vertices.length;

        var currentVertex = vertices[0].id;
        Vset[currentVertex] = true;
        VsetAmount++;
        for (var i = 0; i < vertices.length; i++) {
            V[vertices[i].id] = true;
        };

        for (var i = 0; i < edges.length; i++) {
            this.data.Cross[edges[i].childNodes[0].id] = true;
            var crossEdge = document.getElementById(edges[i].childNodes[0].id);
            crossEdge.style.stroke = "red";
        };


        while(VsetAmount != vertexAmount){
            Vset[currentVertex] = true;
            delete V[currentVertex];
            var lowestEdge = this.lowestEdgeWeight(currentVertex,Vset);

            if(document.getElementById(currentVertex + lowestEdge.vertex)){
              var edge = document.getElementById(currentVertex + lowestEdge.vertex);
            }else{
              var edge = document.getElementById(lowestEdge.vertex + currentVertex);
            }
            if(edge){
                edge.style.stroke = "green";
                Eset[edge.id] = true;
                this.data.MST[edge.id] = true;
                delete this.data.Cross[edge.id];
                VsetAmount++;
                currentVertex = lowestEdge.vertex;
            }else{
                VsetAmount++;
                currentVertex = this.firstObject(V);
                delete V[currentVertex];
                var lastVertexAdj = this.adjcentVertices(currentVertex);
                var lastVertexWeight = "infinity";
                var lastEdge;
                var lastVertex;
                for (var i = 0; i < lastVertexAdj.length; i++) {
                    if(lastVertexWeight === "infinity" ||this.data[currentVertex].edgeweight[lastVertexAdj[i]] < lastVertexWeight){
                        lastVertex = lastVertexAdj[i];
                        lastEdge = currentVertex + lastVertexAdj[i];
                        lastVertexWeight = this.data[currentVertex].edgeweight[lastVertexAdj[i]];
                    }
                };

                if(document.getElementById(currentVertex + lastVertex)){
                  var lastEdgeHTML = document.getElementById(currentVertex + lastVertex);
                }else{
                  var lastEdgeHTML = document.getElementById(lastVertex + currentVertex);
                }
                lastEdgeHTML.style.stroke = "green";
                Eset[lastEdgeHTML.id] = true;
                this.data.MST[lastEdgeHTML.id] = true;
                delete this.data.Cross[lastEdgeHTML.id];
            }
        }
        updateData(this.data);
    }

});