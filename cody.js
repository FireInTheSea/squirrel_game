class Squirrel {
    constructor(left_x, bottom_y) {
        this.x = left_x
        this.y = bottom_y
        this.width = 40
        this.height = 40
        this.motion = null
        this.path_startX = this.x
        this.path_startY = this.y
    
    }  

  
    /*set_coords(){
      this.endX = this.startX + this.width
      this.endY = this.endY + this.height
    }*/

    display(){
        fill(0, 255, 255)
        rect(this.x, this.y -  this.height, this.width, this.height)
    }

    jump(){
        if(this.motion === "jumping"){
            if(this.y > this.path_startY - 50){
                this.y -= 3
                if(keyIsDown(LEFT_ARROW)){
                    this.x -= 5
                }
                if (keyIsDown(RIGHT_ARROW)){
                    this.x += 5
                }
            }
            else{
                this.motion = null
                this.path_startX = this.x
                this.path_startY = this.y
            }
        }
        
    }
}



