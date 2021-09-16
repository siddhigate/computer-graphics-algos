const canvas1 = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let particlesArray;

function brezLine(x1,y1,x2,y2){
    
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0; //no float values!
    
    var dx = x2 - x1, dy = y2 - y1; //find delta x,y
    
    var sx = (dx > 0) - (dx < 0), sy = (dy > 0) - (dy < 0); //sign of delta values +1 or 0 or -1
    
    dx *= sx; dy *= sy; //convert dx,dy to abs values use the multiple with sign
    
    ctx.fillRect(x1, y1, 1, 1); //start point draw always
    
    if( !(dx || dy) )return;    //if no any delta dx or dy stop
    
    var d = 0, x = x1, y = y1, v;
    if(dy < dx) //if abs delta Y less then abs delta X - iterate by X += sign of delta X (+1 or -1)
      for(v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) //v is Tan() = y/x scaled by * 32768 (sub grid step) 
        ctx.fillRect(x, y += (d += v) >> 15, 1, 1); //d accumulate += grid step, so Y take +1px for each 32768 steps.
    else //else if abs delta X less then abs delta Y - iterate by Y += sign of delta Y (+1 or -1)
      for(v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) //v is Ctn() = x/y scaled by * 32768 (sub grid step)
        ctx.fillRect(x += (d += v) >> 15, y, 1, 1); // d &= 32767 is accumulator partial emptyer
};


// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas1.height/80) * (canvas1.width/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

// create particle
class Particle {

    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }


    // method to draw individual particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#D1D5DB';
        ctx.fill();
    }

    // check particle position, check mouse position, move the particle, draw the particle
    update() {

        // check if particle is still within canvas
        if(this.x > canvas1.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        if(this.y > canvas1.width || this.y < 0){
            this.directionY = -this.directionY;
        }

        // check collision detection - mouse position/particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy)

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas1.width - this.size * 10){
                this.x += 10;
            }

            if(mouse.y < this.y && this.y < canvas1.height - this.size * 10){
                this.y += 10;
            }

            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }

            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }

        }
        
            // move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // draw particle
            this.draw();
    }
}

// create particle array
function init(){
    particlesArray = [];

    let numberOfParticles = (canvas1.height * canvas1.width) / 9000;

    for(let i = 0; i < numberOfParticles/1.2; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;

        let color = '#D1D5DB';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}


// check if particles are close enough to draw lines between them
function connect(){
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            let distance = (( particlesArray[a].x -particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y -particlesArray[b].y));
            if(distance < (canvas1.width/9) * (canvas1.height/9)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle= 'rgba(209,213,219' + opacityValue +')' ;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ddalinealgo(particlesArray[a].x, particlesArray[a].y, particlesArray[b].x, particlesArray[b].y)
                ctx.stroke();
            }
        }
    }
}
function animate(){
    
    // setTimeout(animate, 30);
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);    

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function(){
    canvas1.width = innerWidth;
    canvas1.height = innerHeight;
    mouse.radius = ((canvas1.height/80) * (canvas1.height/80));
    init();
})

window.addEventListener('mouseout', 
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

// init();
// animate();


function ddalinealgo(x1,y1,x2,y2){

    x1 = parseInt(x1)
    y1 = parseInt(y1)
    x2 = parseInt(x2)
    y2 = parseInt(y2)
  
    //find delta x, y
    var dx = x2 - x1;
    var dy = y2 - y1; 
  
    var sx = (dx > 0) - (dx < 0), sy = (dy > 0) - (dy < 0); //sign of delta values +1 or 0 or -1
    
    dx *= sx; dy *= sy; //convert dx,dy to abs values use the multiple with sign
  
    var length = 0;
    if(dx >=dy){
      length = dx;
    }
    else{
      length = dy;
    }
  
    dx = (x2-x1)/length;
    dy = (y2-y1)/length;
    
    x = x1 + 0.5;
    y = y1 + 0.5;
  
    var i = 1;
  
    while(i <=length){
      ctx.fillRect(x, y, 1, 1);
  
      x = x+dx;
      y = y+dy;
  
      i = i+1;
    }
  
  }
  
  