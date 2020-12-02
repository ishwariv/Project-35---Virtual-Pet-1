//global variables
var dog,happyDog;
var dogImg,happyDogImg;
var foodS,foodStock;
var database;
var name,nameButton,nameBox;
var milk,milkImg;

function preload()
{
  //preloading all images
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
  milkImg=loadImage("images/milk.png");
}

function setup() {
  createCanvas(500, 500);
  
  //dog sprite
  dog=createSprite(250,250);
  dog.addImage("normal",dogImg);
  dog.scale=0.35;

  database = firebase.database();

  //foodStock
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  database.ref("/").update({
    "Food": 20
  });
  
  //additional part
  //name button
  nameBox = createInput("Name");
  nameBox.position(375, 75);

  nameButton = createButton("Update");
  nameButton.position(375, 100);
  nameButton.mousePressed(() => {
    name = nameBox.value();
  });
}


function draw() {  
  background(46,139,87);

  //UP_Arrow Pressed
  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    milk=createSprite(140,320);
    milk.addImage(milkImg);
    milk.scale=0.30;
    dog.addImage(happyDogImg);
    if(foodS!==0){
      textSize(20);
      fill(255);
      textFont('Georgia');
      text("Fed Milk",400,75);
    }
  }
  
  drawSprites();

  //styles 
  textSize(20);
  fill(255);
  textFont('Georgia');
  textAlign(CENTER,CENTER);
  text("Note: Press UP-ARROW Key To Feed Milk",245,465);
  text(name, 245, 400);
  text("Food remaining: "+foodS,400,35);
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
