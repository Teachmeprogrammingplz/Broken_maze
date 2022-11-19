// n is refering to an n+1 sized maze
import {connecting_nodes} from './maze_mapper.js'
import {n} from './maze_mapper.js'


var node = {
    x: 0,
    y: 0,
}
const directions=[];
var maze = [{
    x: 0,
    y: 0,
}]
const canvas_directions=connecting_nodes(node,maze,directions);

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


export function draw_maze(){
    

c.fillStyle='rgba(0,255,0,0.5)'

var head=[]
for (var j=0;j<n+1;j++) {
    head.push('_');
    }
var canvas_directions1=[]
canvas_directions1.push(head)
for(i of canvas_directions){
    canvas_directions1.push(i)
}
      
var slider = document.getElementById("slider");
// const ups_size=slider.value;
const ups_size=parseInt(slider.value)
const lefts_size=ups_size+10;
let canvas_center={x:canvas.clientWidth/2,y:canvas.clientHeight/2}
let maze_center={x:ups_size*(n+1)/2,y:(lefts_size-10)*(n+1)/2}



c.fillStyle='rgba(0,255,0,0.5)'

for(var i=0;i<canvas_directions1.length;i++){
    for(var j=0;j<n+1;j++){
        //position.x position.y width height
        if(canvas_directions1[i][j]=='_'){
            
            c.fillRect(canvas_center.x-maze_center.x+ups_size*j,canvas_center.y-maze_center.y+i*(ups_size/2),ups_size,10)
        }
        else if (canvas_directions1[i][j]=='|'){
            c.fillRect(canvas_center.x-maze_center.x+(lefts_size-10)*(j),canvas_center.y-maze_center.y+(i-1)*((lefts_size-10)/2),10,lefts_size)
        }
        else if (canvas_directions1[i][j]=='.'){
            continue;
        }
        

    }
}
for(var j=0;j<n+1;j++){
    c.fillRect(canvas_center.x-maze_center.x+ups_size*j,canvas_center.y-maze_center.y+canvas_directions1.length*(ups_size/2),ups_size,10)
}
for(var j=0;j<n+1;j++){
    c.fillRect(canvas_center.x-maze_center.x+(lefts_size-10)*(n+1),canvas_center.y-maze_center.y+(j)*((lefts_size-10)),10,lefts_size)
}


return canvas_directions
}
