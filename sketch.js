var cody
var game
var branch1

function preload(){
  branch1 = loadImage("images/branch1.png")
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  cody = new Squirrel(innerWidth/2, 500)
  game = new Game()
  

}

function draw() {
  background(150)
  cody.move()
  game.display()
  cody.display()


}

function keyPressed(){
  if(key === " "){
    cody.motion = "jump"
  }
}
    