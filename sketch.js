var game
var branch1
var frames


function preload(){
  branch1 = loadImage("images/branch1.png")
}


function setup() {
  createCanvas(innerWidth, innerHeight - 4)
  imageMode(CENTER) 
  frameRate(60)
  game = new Game()
  branch1.resize(50, 50)
  frames = 0
}

function draw() {
  background(150)
  game.run()
  //image(branch1, 500, 500)
  frames ++
  if(frames > 100) {console.log(frameRate())}

}

function keyPressed(){
  if(key === " "  && (game.current_level.squirrel.motion === "walk" || game.current_level.squirrel.motion === null || game.current_level.squirrel.motion === "climb")){
    game.current_level.squirrel.motion = "jump"
    game.current_level.squirrel.rise_since_jump = 0
    game.current_level.squirrel.current_branch = null
    game.current_level.squirrel.jump_type = (game.current_level.squirrel.y > 0.75 * innerHeight) ? "pixels" : "cols"
    game.current_level.squirrel.jump_type = "cols" //debug only
    game.current_level.squirrel.y_speed_px = (game.current_level.squirrel.jump_type === "pixels") ? game.current_level.squirrel.min_y_speed_px : null
    game.current_level.squirrel.y_speed_cols = (game.current_level.squirrel.jump_type === "cols") ? game.current_level.squirrel.min_y_speed_cols : null
  }

}
    