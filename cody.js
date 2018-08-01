class Squirrel {
    constructor(center_x, center_y, grid_size, width, height) {
        this.x = center_x
        this.y = center_y
        this.width = width 
        this.height = height
        this.height_in_cols = 4 // distance in collumns from image center to bottom
        this.width_in_rows = 7 // distance in rows from image center to front of front feet hit box

        this.facing = "right"
        this.state = "standing"
        //this.current_branch = null
        
        this.loadImages()
        this.set_moition_rules(grid_size)
    } 

    loadImages(){ //temporary test method
       this.hit_box_right = loadImage("/images/hit_box_right.png", img => {img.resize(this.width, this.height)})
       this.hit_box_left = loadImage("/images/hit_box_left.png", img => {img.resize(this.width, this.height)})
    }

    set_moition_rules(grid_size){
        this.motion = null

        this.max_x_speed= 0.01 * innerHeight
        this.min_x_speed = -1 * this.max_x_speed
        this.x_acceleration_per_frame = 0.005 * innerHeight
        this.x_speed = 0
       
        this.min_y_speed = -0.03 * innerHeight
        this.max_y_speed = 0.09 * innerHeight
        this.y_accelartion_jump = 0.93
        this.y_accelartion_fall = 1.05
        this.y_speed = 0
    }

    find_hit_boxes(){
        this.main_start_y = this.y + 0.1 * this.height
        this.main_end_y = this.y + 0.4 * this.height

        this.foot_y = this.y + 0.48 * this.height

        if(this.facing === "right"){
            this.main_start_x = this.x + 0.27 * this.width
            this.main_end_x = this.x - 0.1 * this.width
            
            this.back_foot_x = this.x - 0.05 * this.width
            this.front_foot_x = this.x + 0.27 * this.width
        }

        else if(this.facing === "left"){
            this.main_start_x = this.x - 0.27 * this.width
            this.main_end_x = this.x + 0.1 * this.width
            

            this.back_foot_x = this.x + 0.05 * this.width
            this.front_foot_x = this.x - 0.27 * this.width
        }
        /*rectMode(CORNERS)
        fill("purple")
        rect(this.main_start_x, this.main_start_y, this.main_end_x, this.main_end_y)
        rectMode(CORNER)
        fill("red")
        ellipse(this.back_foot_x, this.foot_y, 8, 8)
        ellipse(this.front_foot_x, this.foot_y, 8, 8)*/


    }

    in_hit_box(x, y){
        this.find_hit_boxes()
        if(x > this.main_start_x && x < this.main_end_x && y > this.main_start_y && y < this.main_end_y){
            return true
        }
        return false
    }
}



