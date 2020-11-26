var dog,happyDog;
var dogImg,happyDogImg;
var foodS,foodStock;
var database;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,350);
  dog.addImage("normal",dogImg);

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  database.ref("/").update({
    "Food": 20
  });
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();

  //add styles here
  textSize(20);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Note: Press UP_ARROW Key To Feed Milk",200,85);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}