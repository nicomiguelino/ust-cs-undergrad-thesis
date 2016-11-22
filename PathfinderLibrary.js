/*
Pathfinder V4
March 20, 2016
*/

//Node class
function Node(nodeNumber, latitude, longitude, description)
{
	this.nodeNumber = nodeNumber;
	this.latitude = latitude;
	this.longitude = longitude;
	this.description = description;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.visited = false;
	this.closed = false;
	this.parent = null;

	this.toString = function()
	{
		var string = "";
		string += "Node number: " + this.nodeNumber + "\n";
		string += "Latitude: " + this.latitude + "\n";
		string += "Longitude: " + this.longitude + "\n";
		string += "Description: " + this.description + "\n";
		string += "Node's f-cost: " + this.f + "\n";
		string += "Node's g-cost: " + this.g + "\n";
		string += "Node's h-cost: " + this.h + "\n";
		string += "Visited: " + this.visited + "\n";
		string += "Closed: " + this.closed + "\n";

		if(this.parent === null)
		{
			string += "Parent: " + "null" + "\n";
		}
		else
		{
			string += "Parent: " + this.closed + "\n";
		}

		return string;
	};
}

//Graph class
function Graph()
{
	this.matrix = null; //this.matrix refers to the distance matrix.
	this.nodeList = [];

	this.addNode = function(node)
	{
		this.nodeList.push(node);
	};

	this.newMatrix = function()
	{
		this.matrix = new Array(this.nodeList.length);

		for(var i = 0; i < this.matrix.length; i++)
		{
			this.matrix[i] = new Array(this.nodeList.length);

			for(var j = 0; j < this.matrix[i].length; j++)
			{
				if(i == j)
				{
					this.matrix[i][j] = 0;
				}
				else
				{
					this.matrix[i][j] = Number.POSITIVE_INFINITY;
				}
			}
		}
	};

	this.getNodeAtIndex = function(index)
	{
		return this.nodeList[index];
	};

	this.getIndexAtNode = function(node)
	{
		var index = -1; //Returns -1 if the node is not found.
		
		for(var i = 0; i < this.nodeList.length; i++)
		{
			if(node === this.nodeList[i])
			{
				index = i;
				break;
			}
		}

		return index;
	};

	this.getNeighbors = function(node)
	{
		//Find the index of the node.
		var index = this.getIndexAtNode(node);

		//Get the neighbors thru the matrix.
		var neighbors = [];

		for(var i = 0; i < this.matrix[index].length; i++)
		{
			if(this.matrix[index][i] !== 0 && this.matrix[index][i] !== Number.POSITIVE_INFINITY)
			{
				neighbors.push(this.getNodeAtIndex(i));
			}
		}

		return neighbors;
	};

	//The cost or weight of getting from nodeA to nodeB
	this.getCost = function(nodeA, nodeB)
	{
		var indexA = this.getIndexAtNode(nodeA);
		var indexB = this.getIndexAtNode(nodeB);

		return this.matrix[indexA][indexB];
	};

	//Get heuristic value.
	this.getHeuristic = function(currNode, endNode)
	{
		// var d1 = Math.abs(currNode.latitude - endNode.latitude);
		// var d2 = Math.abs(currNode.longitude - endNode.longitude);
		// return d1 + d2;

		var d1 = Math.pow(currNode.latitude - endNode.latitude, 2);
		var d2 = Math.pow(currNode.longitude - endNode.longitude, 2);
		return Math.sqrt(d1 + d2);
	};

	//Reset the attributes of each nodes.
	this.resetNodes = function()
	{
		for(var i = 0; i < this.nodeList.length; i++)
		{
			this.nodeList[i].f = 0;
			this.nodeList[i].g = 0;
			this.nodeList[i].h = 0;
			this.nodeList[i].visited = false;
			this.nodeList[i].closed = false;
			this.nodeList[i].parent = null;
		}
	};
}

//Binary Heap
function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            }
            else {
                this.bubbleUp(i);
            }
        }
    },
    size: function() {
        return this.content.length;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1,
                parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }

            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function(n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while(true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore){
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};

//DStar
function DStar()
{
	this.heap = function()
	{
		return new BinaryHeap(function(node){
			return node.f;
		});
	};

	this.search = function(graph, start, end)
	{
			graph.resetNodes();

			var openHeap = this.heap();
			openHeap.push(start);

			while(openHeap.size() > 0)
			{
				//Grab the lowest f(x) to process next. Heap keeps this sorted for us.
				var currentNode = openHeap.pop();

				//End case: Result has been found, return to the traced path.
				if(currentNode === end)
				{
					var curr = currentNode;
					var ret = [];
					while(curr.parent)
					{
						ret.push(curr);
						curr = curr.parent;
					}
					//ret.push(start);
					return ret.reverse();
				}

				//Normal case: Move currentNode from open to closed, process each of its neighbors.
				currentNode.closed = true;

				//Find all neighbors for the current node.
				var neighbors = graph.getNeighbors(currentNode);

				for(var i = 0; i < neighbors.length; i++)
				{
					var neighbor = neighbors[i];

					if(neighbor.closed)
					{
						//Not a valid node to process, skip to the next neighbor.
						continue;
					}

					//The g-score is the shortest distance from start to current node.
					//We need to check if the path we have arrived at this neighbor is 
					//the shortest one we have seen yet.
					var gScore = currentNode.g + graph.getCost(currentNode, neighbor);
					var beenVisited = neighbor.visited;

					if(!beenVisited || gScore < neighbor.g)
					{
						//Found an optimal (so far) path to this node.
						//Take score for node to see how good it is.
						neighbor.visited = true;
						neighbor.parent = currentNode;
						neighbor.h = graph.getHeuristic(neighbor, end);
						//neighbor.h = 0;
						neighbor.g = gScore;
						neighbor.f = neighbor.g + neighbor.h;

						if(!beenVisited)
						{
							//Pushing to heap will put it in proper place based on the 'f' value.
							openHeap.push(neighbor);
						}
						else
						{
							//Already seen the node. But since it has been rescored, we need
							//to reorder it in the heap.
							openHeap.rescoreElement(neighbor);
						}
					}
				}
			}

			//No result was found: Empty array signifies failure to find path.
			return [];
	};
}



// //TEST
// var g = new Graph();
// g.addNode(new Node(0, 14.5809, 120.98185, "[0]: Maria Y. Orosa, United Nations Ave."));
// g.addNode(new Node(1, 14.58249, 120.98465, "[1]: United Nations Ave., Taft Ave., General Luna St."));
// g.addNode(new Node(2, 14.58196, 120.98127, "[2]:Kalaw Ave., Maria Y. Orosa"));
// g.addNode(new Node(3, 14.58154, 120.98054, "[3]:Kalaw Ave., Jorge Bocobo"));
// g.addNode(new Node(4, 14.58108, 120.97971, "[4]:Kalaw Ave., A. Mabini (Outside scope)"));
// //Nodes na imbento lang.
// g.addNode(new Node(5, 14.58128, 120.98027, "[5]:Kalaw Ave., San Carlos"));
// g.addNode(new Node(6, 14.5832, 120.98345, "[6]:Kalaw Ave., General Luna St."));
// g.addNode(new Node(7, 14.58357, 120.98398, "[7]:Kalaw Ave., Taft Avenue (Downstream)"));
// g.newMatrix();

// //Set weights and adjacencies.
// // g.matrix[0][1] = 0.079;
// // g.matrix[1][0] = 0.079;
// // g.matrix[1][2] = 0.074;
// // g.matrix[2][1] = 0.074;
// // g.matrix[2][3] = 0.080;
// // g.matrix[3][2] = 0.080;
// // g.matrix[3][4] = 0.078;
// // g.matrix[4][3] = 0.078;
// g.matrix[0][1] = 1;
// g.matrix[0][4] = 1;
// g.matrix[1][2] = 3;
// g.matrix[2][3] = 2;
// g.matrix[3][7] = 1;
// g.matrix[4][5] = 3;
// g.matrix[5][6] = 2;
// g.matrix[6][7] = 1;

// //DStar algorithm.
// var a = new DStar();
// var path = a.search(g, g.getNodeAtIndex(0), g.getNodeAtIndex(7));

// var string = "";
// for(var i = 0; i < path.length; i++)
// {
// 	string += path[i].toString() + "\n";
// }
// console.log(string);