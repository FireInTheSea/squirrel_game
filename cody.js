class Squirrel {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 40
        this.height = 40
        this.motion = null
        this.path_startX = this.x
        this.path_startY = this.y
        /*
        this.endX = this.startX + this.width / 2
        this.endY = this.startY + this.height
        */
    }  

  
    /*set_coords(){
      this.endX = this.startX + this.width
      this.endY = this.endY + this.height
    }*/

    display(){
        //image(this.background, 0, 0)
        fill(0, 255, 255)
        ellipse(this.x, this.y, this.width, this.height)
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



