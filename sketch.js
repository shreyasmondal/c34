var dog, dogImg, happyDog, foodS, foodStock

function preload()
{
	dogImg = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(width/2,height/2+50,20,20)
  dog.addImage(dogImg)
  dog.scale = 0.5
  
  database = firebase.database()
  foodStock = database.ref('food')
  foodStock.on("value", readStock)
}


function draw() {  
  background (46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }



  drawSprites();

  fill(255)
  text("Remaining food:" + foodS, 200, 200)
}

function readStock(data) {
  foodS = data.val()
}

function writeStock(x) {

  if (x<=0) {
    x = 0
  } else {
    x = x-1
  }

  database.ref('/').update({
    food:x
  })
}
