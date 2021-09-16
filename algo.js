var canvas2 = document.querySelector("#canvas2");
var ctx2 = canvas2.getContext('2d');
canvas2.width = innerWidth;
canvas2.height = innerHeight;

const x1 = document.querySelector("#x1");
const y1 = document.querySelector("#y1");
const x2 = document.querySelector("#x2");
const y2 = document.querySelector("#y2");

const subBtn = document.querySelector("#sub-btn");

subBtn.addEventListener("click", function(){
    ctx2.clearRect(0,0,innerWidth, innerHeight);    
    ddaline(x1.value,y1.value,x2.value,y2.value);
});

function ddaline(x1,y1,x2,y2){

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
      ctx2.fillRect(x, y, 1, 1);
  
      x = x+dx;
      y = y+dy;
  
      i = i+1;
    }
  
  }
  
  