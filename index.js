// n is refering to an n+1 sized maze
const n = 5;

var maze = [{
    x: 0,
    y: 0,
}]


var body = window.document.getElementById("body");



for(var i=0;i<(n+1);i++){
    var main_div = window.document.createElement("div");
    main_div.className="line";
    // main_divs.push(main_div)
    for(var j=0;j<(n+1);j++){
        var div = window.document.createElement("div");
        div.classList.add("rect")
        div.id=`${i},${j}`      
        main_div.appendChild(div);

    }
    body.appendChild(main_div);
}
const directions=[];
function free(node,maze) {
    var neighbors = [];
    var free_neighbors = [];
    if (node.x == 0 || node.x == n) {
        neighbors.push({ x: node.x + 1 - 2 * node.x / n, y: node.y });
        if (node.y == 0 || node.y == n) {
            neighbors.push({ x: node.x, y: node.y + 1 - 2 * node.y / n });
        }
        else {
            neighbors.push({ x: node.x, y: node.y + 1 });
            neighbors.push({ x: node.x, y: node.y - 1 });
        }
    }
    else {
        neighbors.push({ x: node.x + 1, y: node.y });
        neighbors.push({ x: node.x - 1, y: node.y });
        if (node.y == 0 || node.y == n) {
            neighbors.push({ x: node.x, y: node.y + 1 - 2 * node.y / n });
        }
        else {
            neighbors.push({ x: node.x, y: node.y + 1 });
            neighbors.push({ x: node.x, y: node.y - 1 });
        }
    }

    var found = 0;
    for (var i = 0; i < neighbors.length; i++) {
        found = 0;
        for (var j = 0; j < maze.length; j++) {
            if (neighbors[i].x === maze[j].x && neighbors[i].y === maze[j].y) {
                found = 1;
                break;
            }

        }
        if (found === 0) {

            free_neighbors.push(neighbors[i]);
        }

    }
    return free_neighbors;
}

function connecting_nodes(node,maze,directions) {
    console.log("_______________________________________________________________________________");
    
    var free_neighbors = [];
    var counter = 1;
    while (counter != (n + 1) ** 2) {
        console.log(node);
        // console.log(counter);
        free_neighbors=free(node,maze)
        if (free_neighbors.length != 0) {
            //choose an element randomly
            const random = Math.floor(Math.random() * (free_neighbors.length));

            maze.push({ x: free_neighbors[random].x, y: free_neighbors[random].y });
            var div1 = window.document.getElementById(`${node.x},${node.y}`)
            var div2 = window.document.getElementById(`${free_neighbors[random].x},${free_neighbors[random].y}`)
            div.classList.add("rect")
            if(maze[maze.length-1].x>node.x){
                //Down 
                directions.push("down")
                div1.classList.add("down")
                div2.classList.add("up")
            }
            else if(maze[maze.length-1].x<node.x){
                //Up
                directions.push("up")
                div1.classList.add("up")
                div2.classList.add("down")
            }
            else if(maze[maze.length-1].y>node.y){
                //Right
                directions.push("right")
                div1.classList.add("right")
                div2.classList.add("left")
            }
            else if(maze[maze.length-1].y<node.y){
                //Left
                directions.push("left")
                div1.classList.add("left")
                div2.classList.add("right")
            }
            node = { x: free_neighbors[random].x, y: free_neighbors[random].y };
            counter++;

        }
        else {
            for(var i=0;i<maze.length;i++){
                if(maze[i].x==node.x && maze[i].y==node.y){
                    node = maze[i - 1];
                    break
                }
            }
            
            
            
        }
    console.log({maze})

    console.log("_______________________________________________________________________________");
    
    }
    // console.log(maze);

}
var node = {
    x: 0,
    y: 0,
}
connecting_nodes(node,maze,directions);

var div_last = window.document.getElementById(`${maze[maze.length-1].x},${maze[maze.length-1].y}`)
if(directions[maze.length-2]=="right"){
    div_last.classList.add("right")
}
else if(directions[maze.length-2]=="left"){
    div_last.classList.add("left")
}
else if(directions[maze.length-2]=="down"){
    div_last.classList.add("down")
}
else if(directions[maze.length-2]=="up"){
    div_last.classList.add("up")
}
console.log(directions)
console.log(maze)