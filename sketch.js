var Monkey , Monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gamever,gameover_img;
var score = 0; 
var gameState = "play";
function preload(){
  Monkey_running = loadAnimation( "Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 gameover_img = loadImage("gameOver.png");
  
background_img = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(800,400);
  
   Monkey=createSprite(100,340,20,50);
   Monkey.addAnimation("moving", Monkey_running);
   Monkey.scale = 0.1;
  
  gameover = createSprite(400,200,100,100);
  gameover.visible = false;
  gameover.scale = 1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  gameState = "play";
}


function draw() {
background(background_img);  
  stroke("white");
  textSize(20);
  fill("white");
   text("score: "+ score, 400,40);
  
  
  if(ground.x >  0) {
    ground.x=ground.width/2;
  }
   
if(Monkey.isTouching(FoodGroup))
  {
   score = score + 2;
   Monkey.scale = Monkey.scale += + 0.001 ;
   FoodGroup.destroyEach(1);
  }
  
   if(keyDown("a")){
    Monkey.velocityY = -10;
    Monkey.velocityX = 10;
   }
    if(keyDown("space") ) {
      Monkey.velocityY = -10;
    }
    Monkey.velocityY = Monkey.velocityY + 0.8;
    //Monkey.debug = true;
    Monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(Monkey)){
      gameState = "game over";
    }
   
    if(gameState === "game over"){
      Monkey.velocityY = 0;
      Monkey.scale = 0.2;
      ground.velocityX = 0;
      Monkey.velocityY = 0;
      obstaclesGroup.destroyEach(0);
      FoodGroup.destroyEach(0);                   

      gameover.addImage(gameover_img);
      gameover.visible = true;
      
      ground.velocityX=0;

      fill("black");
      strokeWeight(10);
      fill("blue");
      text("This game is made by Junaid\n\n\ncopyright of MONKEY GO HAPPY part-1.", 300,300);
      }
 if(keyDown("g")){
  gameState = "game over";
 }
  drawSprites();

}



function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    Monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
    banana.setCollider("circle",0,0, 30);
    //banana.debug = true;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;   
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,250);
    //obstacle.debug = true;
  }
}





