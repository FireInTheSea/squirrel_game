var game
var branch1

function preload(){
  branch1 = loadImage("images/branch1.png")
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  game = new Game()
  

}

function draw() {
  background(150)
  game.run()

}

function keyPressed(){
  if(key === " "  && game.current_level.squirrel.jupms_since_land < 2 && game.current_level.squirrel.motion != "jump"){
    game.current_level.squirrel.motion = "jump"
    game.current_level.squirrel.jupms_since_land += 1
  }
}
    