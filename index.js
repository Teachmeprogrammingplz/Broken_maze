import {draw_maze} from "./maze.js";
import {ball} from "./ball.js"
import {n} from './maze_mapper.js'

const speed=4
var canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


var slider = document.getElementById("slider");

const ups_size=parseInt(slider.value)
const lefts_size=ups_size+10;
let canvas_center={x:canvas.clientWidth/2,y:canvas.clientHeight/2}
let maze_center={x:ups_size*(n+1)/2,y:(lefts_size-10)*(n+1)/2}

// const player = new ball(0,0,40);
const collisions_matrix=draw_maze()
const player = new ball(ups_size,lefts_size,10,collisions_matrix);




function animate(){
    
    c.clearRect(0,0,innerWidth,innerHeight)
    c.beginPath();
    c.fillStyle = "rgb(2, 99, 168)";
    c.fill();
    c.closePath();
    draw_maze()
    player.update(canvas_center,maze_center,ups_size,c);
   
    requestAnimationFrame(animate)
}

animate()


// Event Listening AKA Controlls 
window.addEventListener('keydown',({key})=>{
    switch(key){
        case 'w':
            player.yup=-speed
            player.ydown=0
            player.xleft=0
            player.xright=0
            break
        case 'a':
            player.xleft=-speed
            player.yup=0
            player.ydown=0
            player.xright=0
            break
        case 's':
            player.ydown=speed
            player.yup=-0
            player.xleft=0
            player.xright=0
            break
        case 'd':
            player.xright=speed
            player.yup=0
            player.ydown=0
            player.xleft=0
            break
        }
    }
)
window.addEventListener('keyup',({key})=>{
    switch(key){
        case 'w':
            player.yup=0
            break
        case 'a':
            player.xleft=0
            break
        case 's':
            player.ydown=0
            break
        case 'd':
            player.xright=0
            break
        }
    }
)