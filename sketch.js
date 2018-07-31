var game
var images

function preload(){
  //images = new Image_Library()
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  imageMode(CENTER) 
  frameRate(60)
  //images.resize_images()
  game = new Game()
}

function draw() {
  background(150)
  game.run()
  //console.log(frameRate())
  //clear()
}

function keyPressed(){
  if(key === " "  && (game.current_level.squirrel.motion === "walk" || game.current_level.squirrel.motion === null || game.current_level.squirrel.motion === "land")){
    game.current_level.squirrel.motion = "jump"
    game.current_level.squirrel.y_speed = game.current_level.squirrel.min_y_speed
    game.current_level.squirrel.current_branch = null
  }
}
    