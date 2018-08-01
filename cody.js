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
        let main_width = 45 * this.width/100
        let main_height = this.height/3
        this.main_start_y = this.y + this.height/20
        this.main_end_y = this.main_start_y + main_height

        this.foot_y = this.y + this.height/2

        if(this.facing === "right"){
            this.main_start_x = this.x - this.width/20
            this.main_end_x = this.main_start_x + main_width
            
            this.back_foot_x = this.x
            this.front_foot_x = this.x + 0.3 * this.width
        }

        else if(this.facing === "left"){
            this.main_end_x = this.x + this.width/20
            this.main_start_x = this.main_end_x - main_width

            this.back_foot_x = this.x
            this.front_foot_x = this.x - 0.3 * this.width
        }
    }

    in_hit_box(x, y){
        this.find_hit_boxes()
        if(x > this.main_start_x && x < this.main_end_x && y > this.main_start_y && y < this.main_end_y){
            return true
        }
        return false
    }
}



