class Graph {
    constructor() {
        this.AdjList = new Map();
        this.weightedAdjList = new Map();
    }
    addVertex(v) {
        this.AdjList.set(v, []);
        this.weightedAdjList.set(v, []);
    }
    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }
    addWeightedEdge(v,w,weight){
        this.weightedAdjList.get(v).push({node: w, weight: weight});
        this.weightedAdjList.get(w).push({node: v, weight: weight});
    }
    printGraph() {
        var get_keys = this.AdjList.keys();
        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            var conc = "";
            for (var j of get_values)
                conc += j + " ";
            console.log(i + " -> " + conc);
        }
    }
    async dijkstra(startingNode){
        var distance = {}
        for(let i of this.weightedAdjList.keys()){

            console.log('this is key ' + i);
            distance[i] = Infinity;
            let newNode = document.createElement('p');
            newNode.setAttribute('id','insideval'+i);
            newNode.innerHTML = Infinity;
            let v = document.getElementById(i.toString());
            document.getElementById(i.toString()).insertBefore(newNode, v.firstChild);
        }
        var visited = {};
        await sleep(500);
        distance[startingNode] = 0;
        document.getElementById('insideval' + startingNode).innerHTML = '0';
        await sleep(500);
        let pq = new PriorityQueue();
        console.log(this.weightedAdjList);  
        pq.enqueue(startingNode,0);
        
        for(let i of this.weightedAdjList.keys()){
            console.log('I am element');
            console.log(i);
            console.log(this.weightedAdjList.get(i));
        }
        while(pq.size > 0){
            let top_element = pq.dequeue();
            document.getElementById(top_element.val.toString()).style.backgroundColor = 'orange';
            
            await sleep(500);
            visited[top_element.val] = 1;
            console.log('I am inside loop of pq');
            console.log(top_element);
            let cur_distance = distance[top_element.val];
            for(let adjElement of this.weightedAdjList.get(top_element.val)){
                if(!visited[adjElement.node]){
                    pq.enqueue(adjElement.node,(cur_distance+adjElement.weight));
                    distance[adjElement.node] = Math.min(distance[adjElement.node],cur_distance+adjElement.weight);
                    document.getElementById('insideval'+ adjElement.node).innerHTML = distance[adjElement.node];
                    await sleep(500);
                }
            }

        }
        for(let value in distance){
            console.log(value);
            console.log(distance[value])
        }


    }
    async bfs(startingNode) {
        var visited = {};
        var q = new Queue();
        await sleep(500);
        visited[startingNode] = true;
        document.getElementById(startingNode).style.backgroundColor = 'orange';
        q.enqueue(startingNode);
        while (!q.isEmpty()) {
            var getQueueElement = q.dequeue();
            console.log(getQueueElement);
            await sleep(500);
            document.getElementById(getQueueElement).style.backgroundColor = 'red';
            var get_List = this.AdjList.get(getQueueElement);
            for (var i in get_List) {
                await sleep(500);
                var neigh = get_List[i];
                let edge = document.getElementById(getQueueElement + '_' + neigh);
                let clr;
                if (edge) {
                    clr = edge.style.borderColor;
                    edge.style.borderColor = 'blue';
                    await sleep(500);
                }
                else {
                    edge = document.getElementById(neigh + '_' + getQueueElement);
                    clr = edge.style.borderColor;
                    edge.style.borderColor = 'blue';
                    await sleep(500);
                }
                if (!visited[neigh]) {

                    visited[neigh] = true;
                    document.getElementById(neigh).style.backgroundColor = 'orange';
                    q.enqueue(neigh);
                    edge.style.borderColor = 'green';

                }
                else{
                    if(clr!='green'){
                        edge.style.borderColor = 'black';
                    }
                    else{
                        edge.style.borderColor = 'green';
                    }
                    
                    
                }

            }
            await sleep(500);
            document.getElementById(getQueueElement).style.backgroundColor = 'orange';

        }
        await sleep(500);
        $('.node').css('background-color','black');

        $('.edge').each(function(i,obj){
            console.log(obj);
            if(obj.style.borderColor=='black'){
                obj.style.display = "none";
            }
        })
    }
    async dfs(startingNode) {
        var visited = {};
        await this.DFSUtil(startingNode, visited);
        $('.node').css('background-color','black');
    }
    async DFSUtil(vert, visited) {

        visited[vert] = true;
        document.getElementById(vert).style.backgroundColor = 'red';
        await sleep(500);
        console.log(vert);
        var get_neighbours = this.AdjList.get(vert);
        console.log(get_neighbours);
        
        for (var i in get_neighbours) {
            await sleep(500);
            var neigh = get_neighbours[i];
            let edge = document.getElementById(vert + '_' + neigh);
            if (edge) {
                edge.style.borderColor = 'blue';
                await sleep(500);
            }
            else {
                edge = document.getElementById(neigh + '_' + vert);
                edge.style.borderColor = 'blue';
                await sleep(500);
            }
            var get_elem = get_neighbours[i];
            edge.style.borderColor = 'black';
            await sleep(500);
            
            document.getElementById(vert).style.backgroundColor = 'orange';
            if (!visited[get_elem]){
                await sleep(500);
                await this.DFSUtil(get_elem, visited);
                
                
            }
        }
    }
}
var g = new Graph();


let playground = document.getElementById('playground');
console.log(document);
let startEdgeX, startEdgeY, endEdgeX, endEdgeY, node1, node2;
let currentState = 0;
let currentNodeCount = 1;
let isDijkstra = 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function drawline() {
    let line = document.createElement('div');
    let xmid = (startEdgeX + endEdgeX) / 2;
    let ymid = (startEdgeY + endEdgeY) / 2;
    let distance = Math.sqrt((endEdgeY - startEdgeY) * (endEdgeY - startEdgeY) + (endEdgeX - startEdgeX) * (endEdgeX - startEdgeX));
    let leftval = xmid - distance / 2
    line.setAttribute('class', 'edge');
    line.style.left = leftval.toString() + 'px';
    line.style.top = ymid.toString() + 'px';
    line.style.width = distance.toString() + 'px';
    
    line.setAttribute('id', node1 + '_' + node2);
    if(isDijkstra){
        let newButton = document.createElement('button');
        newButton.innerHTML = 'Add Value';
        newButton.setAttribute('id','value-trigger');
        document.getElementById('buttons').appendChild(newButton);
        let weight = document.createElement('h1');
        let valueTrigger= document.getElementById('value-trigger');
        valueTrigger.addEventListener('click',async ()=>{
            let value = document.getElementById('value');
            weight.innerHTML = value.value;
            console.log(Number(value.value));
            line.appendChild(weight);
            console.log(value.value);
            g.addWeightedEdge(node1,node2,Number(value.value));
            let slopeinRadian = Math.atan2(endEdgeY - startEdgeY, endEdgeX - startEdgeX);
            let slopeinDegree = (slopeinRadian * 180) / Math.PI;
            line.style.transform = "rotate(" + slopeinDegree + "deg)";
            await playground.appendChild(line);
            valueTrigger.remove();
        });

        
    }else{
        g.addEdge(node1, node2);
        let slopeinRadian = Math.atan2(endEdgeY - startEdgeY, endEdgeX - startEdgeX);
        let slopeinDegree = (slopeinRadian * 180) / Math.PI;
        line.style.transform = "rotate(" + slopeinDegree + "deg)";
        await playground.appendChild(line);
    }

}
playground.addEventListener('click', (event) => {
    if (toggleedge.innerHTML == 'Add Edge') {
        g.addVertex(currentNodeCount.toString());
        let newNode = document.createElement('div');
        newNode.setAttribute('class', 'node');
        let x_cord = event.pageX - 30;
        let y_cord = event.pageY - 30;
        newNode.style.left = x_cord.toString() + 'px';
        newNode.style.color = 'white';
        newNode.setAttribute('id', currentNodeCount);
        console.log(newNode.style.left);
        newNode.innerHTML = currentNodeCount;
        currentNodeCount++;
        newNode.style.backgroundColor = 'black';
        newNode.style.top = y_cord.toString() + 'px';
        playground.appendChild(newNode);
        newNode.addEventListener('click', async (event) => {
            if (toggleedge.innerHTML == 'Add Node') {
                console.log('I was clicked');
                console.log(currentState);
                if (currentState == 0) {
                    startEdgeX = event.pageX;
                    startEdgeY = event.pageY;
                    currentState = 1;
                    node1 = event.target.id;

                }
                else {

                    endEdgeX = event.pageX;
                    endEdgeY = event.pageY;
                    node2 = event.target.id;
                    if(node2!=node1){

                        await drawline();
                        currentState = 0;
                    }
                }

            }
        })
    }

});

let nodes = document.getElementsByClassName('node');

let bfs = document.getElementById('bfs');
bfs.addEventListener('click', (event) => {
    g.bfs('1');
})

let dfs = document.getElementById('dfs');
dfs.addEventListener('click', (event) => {
    g.dfs('1');
})
let dijkstra_start =document.getElementById('dijkstra-start');
dijkstra_start.addEventListener('click',()=>{
    isDijkstra = 1;
})
let dijkstra = document.getElementById('dijkstra');
dijkstra.addEventListener('click',()=>{
    console.log('Dijkstra was clicked')
    g.dijkstra('1');
})
let toggleedge = document.getElementById('toggleedge');
toggleedge.addEventListener('click', (event) => {
    if (toggleedge.innerHTML == 'Add Edge') {
        toggleedge.innerHTML = 'Add Node';
    }
    else {
        toggleedge.innerHTML = 'Add Edge';
    }
})