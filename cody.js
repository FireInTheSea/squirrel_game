class Squirrel {
    constructor(center_x, center_y) {
        this.x = center_x
        this.y = center_y
        this.width = 30 * innerHeight/100
        this.height = 18 * innerHeight/100
        this.height_in_cols = 4 // distance in collumns from image center to bottom
        this.width_in_rows = 7 // distance in rows from image center to front of front feet hit box

        this.facing = "right"
        this.state = "standing"
        
        this.loadImages()
        this.set_moition_rules()
    } 

    loadImages(){
        /*this.stand_cycle_right = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.stand_cycle_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.run_cycle_right = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.run_cycle_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.jump_cycle_right = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.jump_cycle_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.fall_cycle_right = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.fall_cycle_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.land_cycle_right = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.land_cycle_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
        this.die_cycle = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]*/
       //this.hit_box_left = [loadImage("/images/.png", img => {img.resize(this.width, this.height)})]
       this.hit_box_right = loadImage("/images/hit_box_right.png", img => {img.resize(this.width, this.height)})
    }

    set_moition_rules(){
        this.motion = null

        this.fly_speed_x = 2 * innerHeight/100

        this.max_jumps_since_land = 1 //depricated
        this.jumps_since_land = 0 // depricated
        this.max_jump_height = 200
        this.jump_speed_y = 2 * innerHeight/100
        this.rise_since_jump = 0
        
        this.fall_speed_y = 3 * innerHeight/100

        this.walk_speed_x = 4
    }

    find_hit_boxes(){
        let back_feet_width = this.width/5
        let back_feet_height = 30 * this.height/100
        this.back_feet_start_x = this.x - back_feet_width/2
        this.back_feet_end_x = this.x + back_feet_width/2
        this.back_feet_end_y = this.y + this.height/2
        this.back_feet_start_y = this.back_feet_end_y - back_feet_height

        if(this.facing === "right"){
            let front_feet_width = this.width/5
            let front_feet_height = this.height/3
            this.front_feet_start_x = this.x + this.width/5
            this.front_feet_end_x = this.front_feet_start_x + front_feet_width
            this.front_feet_start_y = this.y + this.height/8
            this.front_feet_end_y = this.front_feet_start_y + front_feet_height

            let main_box_width = 45 * this.width/100
            let main_box_height = this.height/2
            this.main_box_start_x = this.x - this.width/20
            this.main_box_end_x = this.main_box_start_x + main_box_width
            this.main_box_start_y = this.y - this.height/10
            this.main_box_end_y = this.main_box_start_y + main_box_height

        }

        else if(this.facing === "left"){
            let front_feet_width = this.width/5
            let front_feet_height = this.height/3
            this.front_feet_end_x = this.x - this.width/5
            this.front_feet_start_x = this.front_feet_end_x - front_feet_width
            this.front_feet_start_y = this.y + this.height/8
            this.front_feet_end_y = this.front_feet_start_y + front_feet_height

            let main_box_width = 45 * this.width/100
            let main_box_height = this.height/2
            this.main_box_end_x = this.x + this.width/20
            this.main_box_start_x = this.main_box_end_x - main_box_width
            this.main_box_start_y = this.y - this.height/10
            this.main_box_end_y = this.main_box_start_y + main_box_height
        }
    }

    in_hit_box(x, y, box_start_x, box_start_y, box_end_x, box_end_y){
        if(x > box_start_x && x < box_end_x && y > box_start_y && y < box_end_y){
            return true
        }
        return false
    }



    display(){
        //fill(0, 255, 255)
        //rect(this.x, this.y -  this.height, this.width, this.height)
        this.find_hit_boxes()
        fill("gray")
        if(this.in_hit_box(mouseX, mouseY, this.back_feet_start_x, this.back_feet_start_y, this.back_feet_end_x, this.back_feet_end_y) === true){
            rect(this.back_feet_start_x, this.back_feet_start_y, this.back_feet_end_x - this.back_feet_start_x, this.back_feet_end_y - this.back_feet_start_y)
        }
        if(this.in_hit_box(mouseX, mouseY, this.front_feet_start_x, this.front_feet_start_y, this.front_feet_end_x, this.front_feet_end_y) === true){
            rect(this.front_feet_start_x, this.front_feet_start_y, this.front_feet_end_x - this.front_feet_start_x, this.front_feet_end_y - this.front_feet_start_y)
        }
        if(this.in_hit_box(mouseX, mouseY, this.main_box_start_x, this.main_box_start_y, this.main_box_end_x, this.main_box_end_y) === true){
            rect(this.main_box_start_x, this.main_box_start_y, this.main_box_end_x - this.main_box_start_x, this.main_box_end_y - this.main_box_start_y)
        }
        image(this.hit_box_right, this.x, this.y)
    }

    move(){ //in process of being replaced
        console.log("called depricated method Squirrel.move()")
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

    jump(){ //in process of being replaced
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

    fall(){ //in process of being replaced
        this.y += this.fall_speed_y
        if(keyIsDown(LEFT_ARROW)){
            this.x -= this.fly_speed_x
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.x += this.fly_speed_x
        }
            
        
    }
}



