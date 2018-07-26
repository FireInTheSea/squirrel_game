class Squirrel {
    constructor(left_x, bottom_y) {
        this.x = left_x
        this.y = bottom_y
        this.width = 80        
        this.height = 140
        
        this.set_moition_rules()
    } 

    set_moition_rules(){
        this.motion = null

        this.fly_speed_x = 2 * innerHeight/100

        this.jupms_since_land = 0
        this.max_jump_height = 200
        this.jump_speed_y = 2 * innerHeight/100
        this.rise_since_jump = 0
        
        this.fall_speed_y = 3 * innerHeight/100

        this.walk_speed_x = 4
    }

    display(){
        fill(0, 255, 255)
        rect(this.x, this.y -  this.height, this.width, this.height)
    }

    move(){
        if(this.motion === "jump"){
            this.jump()
        }
        else if(this.motion === "fall"){
            if(this.is_on_branch === true){
                this.motion = null
            }
            else{
                this.fall()
            }
        }
    }

    jump(){
        if(this.rise_since_jump < this.max_jump_height){
            if(this.rise_since_jump < 0.9 * this.max_jump_height){
                this.y -= this.jump_speed_y
                this.rise_since_jump += this.jump_speed_y
            }
            else{
                this.y -= this.jump_speed_y/2
                this.rise_since_jump += this.jump_speed_y/2
            }
            if(keyIsDown(LEFT_ARROW)){
                this.x -= this.fly_speed_x
            }
            if (keyIsDown(RIGHT_ARROW)){
                this.x += this.fly_speed_x
            }
        }
        else{
            this.motion = "fall"
            this.rise_since_jump = 0
        }
        
        
    }

    fall(){
        this.y += this.fall_speed_y
        if(keyIsDown(LEFT_ARROW)){
            this.x -= this.fly_speed_x
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.x += this.fly_speed_x
        }
            
        
    }
}



