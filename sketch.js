
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup;
var obstacleGroup;
var score;
var ground;
var survivalRate=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 
}



function setup() {
  createCanvas(400,400);
  
   ground = createSprite(300,350,600,15);
  ground.shapeColor="gray";
   monkey = createSprite(100,300,30,30);
 monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.2;

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("lightblue");
  monkey.collide(ground);
  textSize=25;
  text("Survival Rate:"+survivalRate,300,30);
if(ground.x<0){
                ground.x=ground.width/2;
}
              if(keyDown("space")&&monkey.y>150){
                monkey.velocityY=-15; 
                  monkey.velocityY=monkey.velocityY+4;
          
                }
  monkey.collide(ground);
  monkey.velocityY=monkey.velocityY+0.5;
 
 
  
   food();
  obstacle();

   if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    survivalRate=survivalRate+2;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    survivalRate = survivalRate - 3;
    FoodGroup.destroyEach();
    ground.velocity=0;
    obstacle.velocity=0;
  }
  
  drawSprites();
}

function food(){
  if(frameCount % 80===0){
    var rand = random(120,200);
    banana=createSprite(600,30,30,30);
    banana.y=Math.round(rand);
  banana.velocityX=-6;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.setLifetime=100;
    var direction=Math.round(random(1,2));
    if(direction===1){
     banana.velocityX=-7;
      banana.x=400;
       }
    else{banana.velocityX=7;
        banana.x=0;}
    FoodGroup.add(banana);
  }
  }
function obstacle(){
if(frameCount % 300===0){
  var obstacle = createSprite(400,325,30,30);
  obstacle.debug=false;
  obstacle.setCollider("rectangle",0,0,50,50);

  obstacle.addImage("obstacle", obstacleImage);
  obstacleGroup.add(obstacle);
  obstacle.scale=0.2;
  obstacle.velocityX=-(4+ survivalRate/4);
}
}






