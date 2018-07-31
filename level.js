class Level{
    constructor(grid_height){
        this.lives = 3
        
        this.grid_height = grid_height
        this.grid_width = 65
        this.visible_grid_height = 50
        this.grid_size = (innerHeight - 4)/this.visible_grid_height
        this.grid = []
        let add_col_num
        for(add_col_num = 0; add_col_num < this.grid_height; add_col_num ++){
            this.grid[add_col_num] = new Array(this.grid_width)
        }
        this.grid_view = this.grid_height - this.visible_grid_height //will not stay as int after scrolling
        this.x_offset = innerWidth/2 - this.grid_size * this.grid_width/2

        this.squirrel = new Squirrel(innerWidth/2, 0.8 * innerHeight, this.grid_size)
    }

    load_level1(){
        this.grid[953][10] = new Branch(this.grid, this.grid_size, 953, 10, 2, 'left', branch1)
        this.grid[960][25] = new Branch(this.grid, this.grid_size, 960, 25, 2, 'left', branch1)
        this.grid[975][40] = new Branch(this.grid, this.grid_size, 975, 40, 3, 'right', branch1)
        this.grid[985][30] = new Branch(this.grid, this.grid_size, 985, 30, 2, 'left', branch1)

    }

    get_coords_by_px(x_px, y_px){  // DEPRICATED?
        x_px -= this.x_offset
        let row = floor(x_px/this.grid_size)
        let col = floor(y_px/this.grid_size)
        col += floor(this.grid_view)
        return [col, row]
    }

    get_px_by_coords(col, row){  // DEPRICATED?
       let y_px = (col - floor(this.grid_view)) * this.grid_size
       let x_px = (row * this.grid_size + this.x_offset)
       return [x_px, y_px]
    }


    display_grid(){
        fill(0, 255, 0)
        stroke("blue")
        for(let col = 0; col < this.visible_grid_height; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                rect(row * this.grid_size + this.x_offset, col * this.grid_size, this.grid_size, this.grid_size)
            }
        }
    }


    get_y_plot(x_plot, branch){
        let y1_col
        let y2_col
        let x1_row
        let x2_row

        if(branch.direction === "right"){
            y1_col = branch.col + 1 - floor(this.grid_view)
            x1_row = branch.row
            y2_col = branch.col - branch.size + 1 - floor(this.grid_view)
            x2_row =  branch.row + branch.size * branch.angle
        }
        else{
            y1_col = branch.col + 1 - floor(this.grid_view)
            x1_row = branch.row + 1
            y2_col = branch.col - branch.size + 1 - floor(this.grid_view)
            x2_row =  branch.row - branch.size * branch.angle + 1
        }

        let slope_by_coords = (y2_col - y1_col) / (x2_row - x1_row)

        let y1_px = y1_col * this.grid_size
        let y2_px = y2_col * this.grid_size
        let x1_px = x1_row * this.grid_size + this.x_offset
        let x2_px = x2_row * this.grid_size + this.x_offset

        let y_plot = slope_by_coords * (x_plot - x2_px) + y2_px

        return y_plot
    }

    display_objects(){
        for(let col = 0; col < this.visible_grid_height; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[floor(this.grid_view) + col][row] instanceof Branch){
                    this.grid[floor(this.grid_view) + col][ row].display(floor(this.grid_view), this.grid_size, this.x_offset, floor(this.grid_view) + col, row)
                    for(let x_plot = row * this.grid_size + this.x_offset; x_plot < (row + 1) * this.grid_size + this.x_offset; x_plot += 1){
                        ellipse(x_plot, this.get_y_plot(x_plot, this.grid[floor(this.grid_view) + col][row]), 1, 1)

                    }
                }
            }
        }
    }

    display_all(){
        this.display_grid()
        this.display_objects()
    }

    hit_enemy(){  // DEPRICATED?
        this.squirrel.find_hit_boxes()
        for(let col = 0; col < this.visible_grid_height; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[col][row] instanceof Owl || this.grid[col][row] instanceof Pinecone){
                    col_px = col * this.grid_size
                    row_px = row * this.grid_size + this.x_offset
                    if(this.squirrel.in_hit_box(row_px, col_px, this.squirrel.main_box_start_x, this.squirrel.main_box_start_y, this.squirrel.main_box_end_x, this.squirrel.main_box_start_y) === true){
                        return true
                    }
                }
            }
        }
        return false
    }

    lethal_fall(){  // DEPRICATED
        this.find_squirrel() 
        if(this.squirrel.bottom_col > floor(this.grid_view) + this.visible_grid_height - 1){
            this.kill()
        }
    }

    kill(){
        this.lives -= 1
        this.squirrel.y = innerHeight/2
        this.squirrel.x = innerWidth/2
    }

    squirrel_fall1(){  // DEPRICATED

        
            /* this.squirrel.y += this.squirrel.fall_speed_y
            if(keyIsDown(LEFT_ARROW)){
                this.squirrel.x -= this.squirrel.fly_speed_x
                this.squirrel.facing = "left"
            }
            if (keyIsDown(RIGHT_ARROW)){
                this.squirrel.x += this.squirrel.fly_speed_x
                this.squirrel.facing = "right"
            }
            if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
            else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)} */
    }

    

    squirrel_land(){  // DEPRICATED
        let displayed_land = false
        if(this.predict_land() != false){
            let branch_coords = this.predict_land()
            let branch_pointer = this.grid[branch_coords[0]][branch_coords[1]]
            //let branch_pixles = this.get_px_by_coords(branch_coords[0], branch_coords[1])
            //let branch_y_plot = this.get_y_plot(branch_pixles[0], branch_pointer)
            let branch_y_plot = this.get_y_plot(this.squirrel.x, branch_pointer)
            
            this.squirrel.find_hit_boxes()
            let y_dist = floor(branch_y_plot - this.squirrel.feet_box_end_y)
            for(let i = this.squirrel.start_land_dist; i >= 0; i -= 1){
                if(i === y_dist){
                    if(this.squirrel.feet_box_end_y + this.squirrel.fall_speed_y <= branch_y_plot){
                        this.squirrel.y += this.squirrel.fall_speed_y
                        //image(this.land_sequence[i], this.squirrel.x, this.squirrel.y)
                        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
                        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
                        displayed_land = true
                    }
                    else if(this.squirrel.feet_box_end_y + this.squirrel.fall_speed_y/2 <= branch_y_plot){
                        this.squirrel.y += this.squirrel.fall_speed_y/2
                        //image(this.land_sequence[i], this.squirrel.x, this.squirrel.y)
                        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
                        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
                        displayed_land = true
                    }
                    else{
                        this.squirrel.y = branch_y_plot - this.squirrel.height/2
                        this.squirrel.current_branch = branch_pointer
                        this.squirrel.facing = branch_pointer.direction
                        this.squirrel.motion = "climb"
                        this.squirrel_climb()
                    }


                }
            }            
        }

        if(displayed_land === false && this.squirrel.motion === "land"){
            this.squirrel.motion = "fall"
            this.squirrel_fall()
        }
    }


    squirrel_jump(){
        if(keyIsDown(LEFT_ARROW)) {
            if(this.squirrel.x_speed - this.squirrel.x_acceleration_per_frame > this.squirrel.min_x_speed){this.squirrel.x_speed -= this.squirrel.x_acceleration_per_frame}}
        if(keyIsDown(RIGHT_ARROW)) {
            if(this.squirrel.x_speed + this.squirrel.x_acceleration_per_frame < this.squirrel.max_x_speed){this.squirrel.x_speed += this.squirrel.x_acceleration_per_frame}} 
        if(this.squirrel.x + this.squirrel.x_speed > this.x_offset && this.squirrel.x + this.squirrel.x_speed < this.grid_width * this.grid_size + this.x_offset){
            this.squirrel.x += this.squirrel.x_speed
        }
        this.squirrel.facing = (this.squirrel.x_speed > 0) ? "right" : "left"

      
        this.squirrel.y_speed *= this.squirrel.y_accelartion_jump
        if(ceil(this.squirrel.y_speed) === -1) {
            this.squirrel.y_speed = 5
            this.squirrel.motion = "fall"
            return
        }
        else{
            if(this.squirrel.y > 0.6 * innerHeight) {this.squirrel.y += this.squirrel.y_speed}
            else{this.grid_view += this.squirrel.y_speed/this.grid_size}
        }
        
        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
    }

    squirrel_fall(){
        if(keyIsDown(LEFT_ARROW)) {
            if(this.squirrel.x_speed - this.squirrel.x_acceleration_per_frame > this.squirrel.min_x_speed){this.squirrel.x_speed -= this.squirrel.x_acceleration_per_frame}}
        if(keyIsDown(RIGHT_ARROW)) {
            if(this.squirrel.x_speed + this.squirrel.x_acceleration_per_frame < this.squirrel.max_x_speed){this.squirrel.x_speed += this.squirrel.x_acceleration_per_frame}} 
        if(this.squirrel.x + this.squirrel.x_speed > this.x_offset && this.squirrel.x + this.squirrel.x_speed < this.grid_width * this.grid_size + this.x_offset){
            this.squirrel.x += this.squirrel.x_speed
        }
        this.squirrel.facing = (this.squirrel.x_speed > 0) ? "right" : "left"

        if(this.squirrel.y_speed * this.squirrel.y_accelartion_fall < this.squirrel.max_y_speed) {this.squirrel.y_speed *= this.squirrel.y_accelartion_fall}
        for(let w = 0; w < this.squirrel.y_speed; w ++){
            let coords = this.get_coords_by_px(this.squirrel.back_foot_x, this.squirrel.foot_y + w + (this.grid_view - floor(this.grid_view)) * this.grid_size)
            if(this.grid[coords[0]][coords[1]] instanceof Branch){
                if(this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - (this.grid_view - floor(this.grid_view)) * this.grid_size > this.squirrel.foot_y){
                    if((this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size) - this.squirrel.y <= this.squirrel.y_speed){
                        this.squirrel.y = this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size
                        this.squirrel.motion = "land"
                        this.squirrel.x_speed = 0
                        return
                    }
                    else{
                        this.squirrel.y = this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size - this.squirrel.y_speed/20
                    }
                }
                
            }
            coords = this.get_coords_by_px(this.squirrel.front_foot_x, this.squirrel.foot_y + (this.grid_view - floor(this.grid_view)) * this.grid_size + w)
            console.log(coords)
            console.log(this.grid[coords[0]][coords[1]])
            if(this.grid[coords[0]][coords[1]] instanceof Branch){
                console.log("got branch")
                if(this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - (this.grid_view - floor(this.grid_view)) * this.grid_size > this.squirrel.foot_y){
                    this.squirrel.y = this.get_y_plot(this.squirrel.x, this.grid[coords[0]][coords[1]]) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size
                    this.squirrel.motion = "land"
                    this.squirrel.x_speed = 0
                    return
                }
            }
        }
        this.squirrel.y += this.squirrel.y_speed

       
        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
    }

    squirrel_climb(){ // DEPRICATED
        this.squirrel.find_hit_boxes()
        let b = this.squirrel.current_branch

        let base = this.get_px_by_coords(b.col, b.row)
        let base_x = base[0]

        let end_col = b.col - b.size
        let end_row = (b.direction === 'right') ? b.row + b.size * b.angle : b.row - b.size * b.angle
        let end = this.get_px_by_coords(end_col, end_row)
        let end_x = end[0]

        if(b.size > 1){
            let distance_off

            if(b.direction === "right"){
                if(base_x - 1 < this.squirrel.feet_box_start_x && end_x + 1 > this.squirrel.feet_box_end_x){ 
                    this.squirrel.motion = null
                    this.squirrel_null()
                }
                else{
                    if(base_x > this.squirrel.feet_box_start_x){
                        distance_off = base_x - this.squirrel.feet_box_start_x
                        this.squirrel.x += ceil(distance_off/8)
                    }
                    else{
                        distance_off = this.squirrel.feet_box_end_x - end_x
                        this.squirrel.x -= ceil(distance_off/8)
                    }
                    this.squirrel.y = this.get_y_plot(this.squirrel.x, this.squirrel.current_branch) - this.squirrel.height/2
                    image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)
                }
            }

            else{
                if(end_x - 1 < this.squirrel.feet_box_start_x && base_x + 1 > this.squirrel.feet_box_end_x){
                    this.squirrel.motion = null
                    this.squirrel_null()
                }
                else{
                    if(end_x > this.squirrel.feet_box_start_x){
                        distance_off = end_x - this.squirrel.feet_box_start_x
                        this.squirrel.x += ceil(distance_off/8)
                    }
                    else{
                        distance_off = this.squirrel.feet_box_end_x - base_x
                        this.squirrel.x -= ceil(distance_off/8)
                    }
                    this.squirrel.y = this.get_y_plot(this.squirrel.x, this.squirrel.current_branch) - this.squirrel.height/2
                    image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)
                }
            }
        }
        /*
        else if(b.size === 1){
            let center_x = (b.direction === "right") ? base_x + (end_x - base_x)/2 : end_x + (base_x - end_x)/2
            let x_off = this.squirrel.x - center_x 
                this.squirrel.x += ceil(x_off/8)
                this.squirrel.y = this.get_y_plot(this.squirrel.x, this.squirrel.current_branch) - this.squirrel.height/2
                image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)
        }
        */
    }

    squirrel_walk(){
        //if walk off branch change this.squirrel.current branch to null
        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}    }

    squirrel_null(){

        /* hit box visualizton

        this.squirrel.find_hit_boxes()
        fill("yellow")
        rect(this.squirrel.main_box_start_x, this.squirrel.main_box_start_y, this.squirrel.main_box_end_x - this.squirrel.main_box_start_x, this.squirrel.main_box_end_y - this.squirrel.main_box_start_y)
        fill("orange")
        rect(this.squirrel.feet_box_start_x, this.squirrel.feet_box_start_y, this.squirrel.feet_box_end_x - this.squirrel.feet_box_start_x, this.squirrel.feet_box_end_y - this.squirrel.feet_box_start_y)
        */

       if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
       else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}    }
  
    run(){
        this.squirrel.find_hit_boxes()
        this.display_all()
        if(this.lethal_fall === true) {this.kill()}

        else if(this.hit_enemy() === true) {this.kill()}

        else{
            if(this.squirrel.motion === "jump") {this.squirrel_jump()}
            if(this.squirrel.motion === "fall") {this.squirrel_fall()}
            if(this.squirrel.motion === null) {this.squirrel_null()}
            if(this.squirrel.motion != "jump" && this.squirrel.motion != "fall" && this.squirrel.motion != null){
                if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
                else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
            }

            /*if(this.squirrel.motion === "land") {this.squirrel_land()}
            else if(this.squirrel.motion === "climb") {this.squirrel_climb()}
            else if(this.squirrel.motion === "fall") {this.squirrel_fall()}
            else if(this.squirrel.motion === "jump") {this.squirrel_jump()}
            else if(this.squirrel.motion === "walk"){this.squirrel_walk()}
            else if(this.squirrel.motion === null){this.squirrel_null()}*/
        }

    }
}
