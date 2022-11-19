export const n=35

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

export function connecting_nodes(node,maze,directions) {

const canvas_directions=[]

for(var i=0;i<2*n+1;i++){
    var lefts = [];
    var ups = [];
    if(i%2==0){
        for (var j=0;j<n+1;j++) {
            lefts.push('|');
            }
        canvas_directions.push(lefts)
        
    }
    else{
        for (var j=0;j<n+1;j++) {
            ups.push('_');
            }
        canvas_directions.push(ups)
    }
}

   
    
    var free_neighbors = [];
    var counter = 1;
    while (counter != (n + 1) ** 2) {
      
        free_neighbors=free(node,maze)
        if (free_neighbors.length != 0) {
            //choose an element randomly
            const random = Math.floor(Math.random() * (free_neighbors.length));

            maze.push({ x: free_neighbors[random].x, y: free_neighbors[random].y });
             
            if(maze[maze.length-1].x>node.x){
                //Down 
                directions.push("down")
   
                canvas_directions[1+2*node.x][node.y]='.'
            }
            else if(maze[maze.length-1].x<node.x){
                //Up
                directions.push("up")

                canvas_directions[1+2*(node.x-1)][node.y]='.'
            }
            else if(maze[maze.length-1].y>node.y){
                //Right
                directions.push("right")

                canvas_directions[2*node.x][node.y+1]='.'
            }
            else if(maze[maze.length-1].y<node.y){
                //Left
                directions.push("left")

                canvas_directions[2*node.x][node.y]='.'
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

    
    }

    return canvas_directions

}
var node = {
    x: 0,
    y: 0,
}
const directions=[];
var maze = [{
    x: 0,
    y: 0,
}]
connecting_nodes(node,maze,directions);