import {n} from './maze_mapper.js'
export class ball {
    constructor(ups_size,lefts_size,radius,collisions_matrix) {
      this.radius=radius
      this.x=(ups_size)/2;
      this.y=(lefts_size)/2;
      this.xleft=0;
      this.xright=0;
      this.yup=0;
      this.ydown=0;
      this.collisions_matrix=collisions_matrix
    }


    draw(canvas_center,maze_center,c){
        c.beginPath();
        c.arc(canvas_center.x-maze_center.x+this.x,canvas_center.y-maze_center.y+this.y,this.radius, 0, Math.PI * 2);
        c.fillStyle = "rgb(2, 99, 168)";
        c.fill();
        c.closePath();
    }
    update(canvas_center,maze_center,ups_size,c){
      
   

      //Horizental borders   
      if((this.x<=10+this.radius+Math.floor(this.x/ups_size)*ups_size) && this.collisions_matrix[2*Math.floor(this.y/ups_size)][Math.floor(this.x/ups_size)]=='|'){
        this.xleft=0
        this.x=10+this.radius+Math.floor(this.x/ups_size)*ups_size
      }
      if (ups_size*(Math.floor(this.x/ups_size)+1)-this.radius<=this.x && this.collisions_matrix[2*Math.floor(this.y/ups_size)][Math.floor(this.x/ups_size)+1]=='|'){
        this.xright=0
        this.x=ups_size*(Math.floor(this.x/ups_size)+1)-this.radius
      }
    
      // Vertical borders
      if(Math.floor(this.y/ups_size)>0){
        if ((this.y<=10+this.radius+Math.floor(this.y/ups_size)*ups_size) && this.collisions_matrix[2*Math.floor(this.y/ups_size)-1][Math.floor(this.x/ups_size)]=='_'){
          this.yup=0
          this.y=10+this.radius+Math.floor(this.y/ups_size)*ups_size
        }
      }

      if(Math.floor(this.y/ups_size)<n){
        if ((Math.floor(this.y/ups_size)+1)*ups_size-this.radius<=this.y && this.collisions_matrix[2*Math.floor(this.y/ups_size)+1][Math.floor(this.x/ups_size)]=='_'){
          this.ydown=0
          this.y=(Math.floor(this.y/ups_size)+1)*ups_size-this.radius
        }
      }
      
      //Last.x border(top right)
      if (ups_size*(n+1)-this.radius<=this.x){
        this.xright=0
        this.x=ups_size*(n+1)-this.radius
      }
      //Last.y border(top bottom)
      if (ups_size*(n+1)-this.radius<=this.y){
        this.ydown=0
        this.y=ups_size*(n+1)-this.radius
      }
      //Last.y border(top top)
      if (this.y<=10+this.radius){
        this.yup=0
        this.y=10+this.radius
      }

        console.log(this.y)
        console.log(10+this.radius/2)
        this.x+=this.xleft;
        this.x+=this.xright;
        this.y+=this.yup;
        this.y+=this.ydown;
        this.draw(canvas_center,maze_center,c); 
      
    }
  }