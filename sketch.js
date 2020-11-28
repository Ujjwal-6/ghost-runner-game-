var climberImage , climber, climberGroup;
var doorImage , door , doorGroup;
var towerImage , tower;
var ghostImage , ghost_standing;
var invisbleblock , invisibleblockGroup;
var gameState  = "PLAY";
var backgroundSound;

function preload(){
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  backgroundSound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,20,20);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  
  
  doorGroup = new Group();
  climberGroup = new Group();
 
  invisibleblockGroup = new Group();
  
}

function draw(){
  background(0);
  if (gameState === "PLAY"){
    backgroundSound.loop();
  
  if(tower.y > 400){
    tower.y = 300;
  }
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  if (keyDown("right_arrow")){
    ghost.x += 3;
  }
  if (keyDown("left_arrow")){
    ghost.x -= 3;
  }
  if ( ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  if (invisibleblockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  }
  ghost.velocityY += 0.8
  
  spawnDoors();
  drawSprites();
  }
  if (gameState === "END"){
    stroke("yellow");
    textSize(50);
    text("GAME OVER",150,250);
  }
}

function spawnDoors(){
  if ( frameCount % 200 === 0){
    door = createSprite(200,-50,10,10);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 600;
    doorGroup.add(door);
    climber = createSprite(200,10,10,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 600;
    climberGroup.add(climber);
    invisibleblock = createSprite(200,15);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.visible = false;
    invisibleblock.lifetime = 600;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 2;
    invisibleblockGroup.add(invisibleblock);
  }
}
