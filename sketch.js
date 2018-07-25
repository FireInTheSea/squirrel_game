var cody
var game

function preload(){
  //var arrow_img = loadImage("./images/left_arrow.png")
}

function setup() {
  createCanvas(innerWidth, innerHeight - 1)
  cody = new Squirrel(innerWidth/2, 500)
  game = new Game()

}

function draw() {
  print("NEW FRAME")
  background(150)
  cody.jump()
  game.display()
  cody.display()
}

function keyPressed(){
  if(key === " "){
    cody.motion = "jumping"
  }
}
    