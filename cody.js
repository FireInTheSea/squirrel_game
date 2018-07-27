class Squirrel {
    constructor(center_x, center_y) {
        this.x = center_x
        this.y = center_y
        this.width = 80        
        this.height = 140

        this.facing = "right"
        this.state = "standing"
        
        this.loadImages()
        this.set_moition_rules()
    } 

    loadImages(){
        /*this.stand_cycle_right = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.stand_cycle_left = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.run_cycle_right = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.run_cycle_left = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.jump_cycle_right = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.jump_cycle_left = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.fall_cycle_right = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.fall_cycle_left = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.land_cycle_right = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.land_cycle_left = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        this.die_cycle = [loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage(), loadImage()]
        */
       //this.hit_box_right = loadImage("/images/hit_box_right.png", this.hit_box_right.resize(10 * innerHeight/100, 8 * innerHeight/100))
       //this.hit_box_left = loadImage("/images/hit_box_left.png")
       this.hit_box_right = loadImage("/images/hit_box_right.png", this.resize_squirrel())
    }
    resize_squirrel(){
        this.hit_box_right.resize(200, 100)
    }

    set_moition_rules(){
        this.motion = null

        this.fly_speed_x = 2 * innerHeight/100

        this.max_jumps_since_land = 1
        this.jumps_since_land = 0
        this.max_jump_height = 200
        this.jump_speed_y = 2 * innerHeight/100
        this.rise_since_jump = 0
        
        this.fall_speed_y = 3 * innerHeight/100

        this.walk_speed_x = 4
    }

    display(){
        //fill(0, 255, 255)
        //rect(this.x, this.y -  this.height, this.width, this.height)
        image(this.hit_box_right, this.x, this.y)
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



