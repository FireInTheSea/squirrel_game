var game
var branch1


function preload(){
  branch1 = loadImage("images/branch1.png")
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  imageMode(CENTER) 
  frameRate(60)
  game = new Game()
  branch1.resize(50, 50)
}

function draw() {
  background(150)
  game.run()
  //image(branch1, 500, 500)
  //console.log(frameRate())
  //clear()
}

function keyPressed(){
  if(key === " "  && (game.current_level.squirrel.motion === "walk" || game.current_level.squirrel.motion === null || game.current_level.squirrel.motion === "land")){
    game.current_level.squirrel.motion = "jump"
    game.current_level.squirrel.current_branch = null
    game.current_level.squirrel.y_speed = game.current_level.squirrel.min_y_speed
  }
}
    