var tower,towerimage
var doorimage, doorsgroup,door
var climber,climberimage,climbersgroup
var ghost,ghoststandingimage
var invisibleBlockGroup, invisibleBlock;

var gameState = "play"

function preload(){
  towerimage=loadImage("tower.png")
  doorimage=loadImage("door.png")
   climberimage = loadImage("climber.png");
  ghoststandingimage=loadImage("ghost-standing.png")
  
  
  doorsgroup=new Group()
  climbersgroup=new Group()
  invisibleBlockGroup = new Group();
}


function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage("tower",towerimage)
  tower.velocityY=1;
  
  ghost=createSprite(200,200)
  ghost.addImage("ghost",ghoststandingimage)
  ghost.scale=0.5
  
  
}

function draw(){
  background(0)
  
  if(gameState==="play"){
  if(tower.y >400){
    tower.y=300
  }
  if(keyDown("left_arrow")) {
        ghost.x =ghost.x-5;
    }
  if(keyDown("right_arrow")) {
        ghost.x =ghost.x+5;
    }
  if(keyDown("space")) {
        ghost.velocityY =-5;
    }
  ghost.velocityY=ghost.velocityY+0.2
  
  if(climbersgroup.isTouching(ghost)){
    ghost.velocityY=0
  
  }
   spawnDoors();  
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){ ghost.destroy(); 
    gameState="end"}
  }
 
  
  drawSprites();
  
  if (gameState === "end"){ 
    stroke("yellow");
    fill("yellow");
    textSize(30); 
    text("Game Over", 230,250)
  }

}
  

function spawnDoors(){
  if(frameCount% 240===0){
     var door = createSprite(200,-50)
     var climber = createSprite(200,10);
    
     door.addImage(doorimage)
     climber.addImage(climberimage);
    
    var invisibleBlock = createSprite(200,15); 
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x=Math.round(random(120,400))
     climber.x = door.x;
    
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = false;
    
    door.velocityY=1
    climber.velocityY = 1;
    ghost.depth=door.depth
    ghost.depth+=1
    
    var invisibleBlock = createSprite(200,15); 
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
    
   climber.lifetime = 800;
    door.lifetime=800;
    
    doorsgroup.add(door)
    climbersgroup.add(climber);
    
    invisibleBlockGroup.add(invisibleBlock);
  }
  }
