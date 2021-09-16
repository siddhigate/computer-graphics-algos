var canvas2 = document.querySelector("#canvas2");
var ctx2 = canvas2.getContext('2d');
canvas2.width = innerWidth;
canvas2.height = innerHeight;

const x1 = document.querySelector("#x1");
const y1 = document.querySelector("#y1");
const r = document.querySelector("#radius");

const subBtn = document.querySelector("#sub-btn");
const flowerBtn = document.querySelector("#flower-btn");
const concentricBtn = document.querySelector("#concentric-btn");
const petalBtn = document.querySelector("#petal-btn");



subBtn.addEventListener("click", function(){
    ctx2.clearRect(0,0,innerWidth, innerHeight);    
    bresCircle(x1.value,y1.value,r.value);
});

flowerBtn.addEventListener("click", drawFlower);
petalBtn.addEventListener("click", drawPetalShape);
concentricBtn.addEventListener("click", drawConcentricCircles);


function eightWaySymmetric(xc, yc, x, y){

  ctx2.fillRect(x + xc, y + yc, 1, 1); 
  ctx2.fillRect(x + xc, -y + yc, 1, 1); 
  ctx2.fillRect(-x + xc, -y + yc, 1, 1); 
  ctx2.fillRect(-x + xc, y + yc, 1, 1); 
  ctx2.fillRect(y + xc, x + yc, 1, 1); 
  ctx2.fillRect(y + xc, -x + yc, 1, 1); 
  ctx2.fillRect(-y + xc, -x + yc, 1, 1); 
  ctx2.fillRect(-y + xc, x + yc, 1, 1); 
}

function bresCircle(xc, yc, r){

  xc = parseInt(xc);
  yc = parseInt(yc);
  r = parseInt(r);

  var x = 0;
  var y = r;
  var d = 3 - (2*r)

  while( x <= y ){
    
    if(d <= 0 ){
      d=d+(4*x)+6; 
    }
    else  
    {  
      d=d+(4*x)-(4*y)+10;  
      y=y-1;  
    }  
     x=x+1;  
     eightWaySymmetric(xc,yc,x,y);  
  }  
}

function drawPetalShape(){
  ctx2.clearRect(0,0,innerWidth, innerHeight);    

  bresCircle(700,350,150);
  bresCircle(700,500,150);
  bresCircle(700,200,150);
  bresCircle(550,350,150);
  bresCircle(850,350,150);
}


function drawFlower(){
  ctx2.clearRect(0,0,innerWidth, innerHeight);    

  bresCircle(700, 350, 150);
  bresCircle(700, 500, 150);
  bresCircle(810, 270, 150);
  bresCircle(550, 280, 150);
  bresCircle(810, 425, 150);
  bresCircle(550, 420, 150);
  bresCircle(700, 200, 150);
}

function drawConcentricCircles(){

  ctx2.clearRect(0,0,innerWidth, innerHeight);    
  
  for(var i = 10; i< 250; i = i+10){
    bresCircle(700,350,i);
  }

}