var game
var branch1

function preload(){
  branch1 = loadImage("images/branch1.png")
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  imageMode(CENTER)
  game = new Game()
  branch1.resize(50, 50)
  
}

function draw() {
  background(150)
  game.run()
  image(branch1, 500, 500)
}

function keyPressed(){
  if(key === " "  && game.current_level.squirrel.jumps_since_land < game.current_level.squirrel.max_jumps_since_land){
    game.current_level.squirrel.jumps_since_land += 1
    game.current_level.squirrel.motion = "jump"
    game.current_level.squirrel.rise_since_jump = 0
  }

}
    