var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var dado,score = 0;
var gameState = "play";
var obstacleGroup;
var cloudGroup;
var gameOver, gameOverImg;
var restart, restartImg;
var jumpSound, dieSound, CheckPointSound;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  CheckPointSound = loadSound("checkpoint.mp3");
  
}

function setup() {
//createCanvas(600, 200);
createCanvas(windowWidth,windowHeight);

//crear sprite de Trex
trex = createSprite(50,windowHeight-40,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("die",trex_collided);
trex.scale = 0.5;
  
//crear sprite de suelo
ground = createSprite(200,windowHeight-30,400,20);
ground.addImage(groundImage);
ground.x = ground.width/2; 
invisibleGround = createSprite(200,windowHeight-20,400,10);
invisibleGround.visible = false;

obstacleGroup = new Group();
cloudGroup = new Group();

gameOver = createSprite(windowWidth/2,windowHeight/2);
gameOver.addImage(gameOverImg);

restart = createSprite(windowWidth/2,windowHeight/2+40);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//var numeroAleatorio = Math.round(random(0,10))
//console.log (numeroAleatorio)

trex.debug = false;

trex.setCollider("circle",0,0,40);

}

function draw() {
background(180);
text("Puntiación" + Math.round(score), windowWidth-150, 50);

if(gameState === "play"){
  ground.velocityX = -(4+3*score/100);
  score += 1/10;

 
  if ((keyDown("space")  || touches.lenght>0) && trex.y>windowHeight-70) {
    trex.velocityY = -13;
    jumpSound.play();
    touches = [];
  }   
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  spawnObstacules();
  spawnClouds();

  if(Math.round(score)%100 === 0){
    CheckPointSound.play();
    console.log("100");
  }

  if(trex.isTouching(obstacleGroup)){
    //trex.velocityY = -13;
    gameState = "end"
    dieSound.play();
  }   

}

if(gameState === "end"){
  trex.velocityY = 0;
  ground.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  gameOver.visible = true;
  restart.visible = true;
  obstacleGroup.setLifetimeEach(0.57);
  cloudGroup.setLifetimeEach(0.58);
  trex.changeAnimation("die",trex_collided);

 




if(mousePressedOver(restart) || touches.lenght>0){
  reset();
  touches = [];
}

}

trex.collide(invisibleGround);
  drawSprites();
}




function spawnClouds(){
  if(frameCount%60===0){
    var cloud  = createSprite(windowWidth,50,40,20);
    cloud.y = Math.round(random(10,windowHeight-80));
    cloud.velocityX = -(4+3*score/100); 
    cloud.addImage(cloudImage);
    cloud.scale = 0.15;
    trex.depth = cloud.depth + 1; 
    cloud.lifetime = 450;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacules(){
  if(frameCount%60 == 0){
    var obstacle = createSprite(windowWidth+100,windowHeight-40,20,40);
    obstacle.velocityX = -(4+3*score/100); 
    dado = Math.round(random(1,6));

    switch(dado){
      case  1: obstacle.addImage(obstacle1); break;
      case  2: obstacle.addImage(obstacle2); break;
      case  3: obstacle.addImage(obstacle3); break;
      case  4: obstacle.addImage(obstacle4); break;
      case  5: obstacle.addImage(obstacle5); break;
      case  6: obstacle.addImage(obstacle6); break;
    }
      obstacle.scale = 0.5;
    obstacle.lifetime = 450;
    obstacleGroup.add(obstacle);
  }

  
}


function reset(){
  score = 0;
  gameState = "play";
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  restart.visible = false;
  gameOver.visible = false;
}
