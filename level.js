class Level{
    constructor(grid_height){
        this.lives = 3
        this.squirrel = new Squirrel(innerWidth/2, innerHeight/2)
        this.grid_height = grid_height
        this.grid_width = 65
        this.visible_grid_height = 50
        this.grid_size = (innerHeight - 4)/this.visible_grid_height
        this.grid = []
        let add_col_num
        for(add_col_num = 0; add_col_num < this.grid_height; add_col_num ++){
            this.grid[add_col_num] = new Array(this.grid_width)
        }
        this.grid_view = this.grid_height - this.visible_grid_height
        this.x_offset = innerWidth/2 - this.grid_size * this.grid_width/2
    }

    load_level1(){
        this.grid[953][10] = new Branch(this.grid, this.grid_size, 953, 10, 2, 'left', branch1)
        this.grid[960][25] = new Branch(this.grid, this.grid_size, 960, 25, 2, 'left', branch1)
        this.grid[975][40] = new Branch(this.grid, this.grid_size, 975, 40, 3, 'right', branch1)
        this.grid[985][30] = new Branch(this.grid, this.grid_size, 985, 30, 2, 'left', branch1)

    }

    get_coords_by_px(x_px, y_px){
        x_px -= this.x_offset
        let row = floor(x_px/this.grid_size)
        let col = floor(y_px/this.grid_size)
        col += this.grid_view
        return [col, row]
    }

    get_px_by_coords(col, row){
       let y_px = (col - this.grid_view) * this.grid_size
       let x_px = (row * this.grid_size + this.x_offset)
       return [x_px, y_px]
    }

    predict_land(){
        let coords = this.get_coords_by_px(this.squirrel.x, this.squirrel.y)
        let test_start_col = coords[0] + this.squirrel.height_in_cols - 1
        let test_start_row = coords[1]
        let test_row_length = this.squirrel.width_in_rows
        if(this.squirrel.facing === "right"){
            for(let test_col = test_start_col;  test_col < test_start_col + 10; test_col ++){
                for(let test_row = test_start_row; test_row < test_start_row + test_row_length; test_row ++){
                    //fill("pink")
                    //rect(test_row * this.grid_size + this.x_offset, (test_col - this.grid_view) * this.grid_size, this.grid_size, this.grid_size)
                    if(test_col < this.grid_view + this.visible_grid_height && test_row >= 0 && test_row < this.grid_width){
                        if(this.grid[test_col][test_row] instanceof Branch) {return [test_col, test_row]}
                    }
                }
                test_row_length ++
            }
        }
        else{
            for(let test_col = test_start_col;  test_col < test_start_col + 10; test_col ++){
                for(let test_row = test_start_row; test_row > test_start_row - test_row_length; test_row -= 1){
                    //fill("pink")
                    //rect(test_row * this.grid_size + this.x_offset, (test_col - this.grid_view) * this.grid_size, this.grid_size, this.grid_size)
                    if(test_col < this.grid_view + this.visible_grid_height && test_row >= 0 && test_row < this.grid_width){
                        if(this.grid[test_col][test_row] instanceof Branch) {return [test_col, test_row]}
                    }
                }
                test_row_length ++
            }
        }
        return false
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
            y1_col = branch.col + 1 - this.grid_view
            x1_row = branch.row
            y2_col = branch.col - branch.size + 1 - this.grid_view 
            x2_row =  branch.row + branch.size * branch.angle
        }
        else{
            y1_col = branch.col + 1 - this.grid_view
            x1_row = branch.row + 1
            y2_col = branch.col - branch.size + 1 - this.grid_view 
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
                if(this.grid[this.grid_view + col][row] instanceof Branch){
                    this.grid[this.grid_view + col][ row].display(this.grid_view, this.grid_size, this.x_offset, this.grid_view + col, row)
                    for(let x_plot = row * this.grid_size + this.x_offset; x_plot < (row + 1) * this.grid_size + this.x_offset; x_plot += 1){
                        ellipse(x_plot, this.get_y_plot(x_plot, this.grid[this.grid_view + col][row]), 1, 1)

                    }
                }
            }
        }
    }

    display_all(){
        this.display_grid()
        this.display_objects()
    }

    hit_enemy(){
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

    lethal_fall(){ // calls depricated method => disfunctional
        this.find_squirrel() 
        if(this.squirrel.bottom_col > this.grid_view + this.visible_grid_height - 1){
            this.kill()
        }
    }

    kill(){
        this.lives -= 1
        this.squirrel.y = innerHeight/2
        this.squirrel.x = innerWidth/2
    }

    squirrel_fall(){
        let branch_coords = this.predict_land()
        if(branch_coords != false){
            let branch_pointer = this.grid[branch_coords[0]][branch_coords[1]]
            //let branch_pixles = this.get_px_by_coords(branch_coords[0], branch_coords[1])
            //let branch_y_plot = this.get_y_plot(branch_pixles[0], branch_pointer)
            let branch_y_plot = this.get_y_plot(this.squirrel.x, branch_pointer)
            this.squirrel.find_hit_boxes()
            let y_dist = floor(branch_y_plot - this.squirrel.feet_box_end_y)    
            if(y_dist - this.squirrel.fall_speed_y < this.squirrel.start_land_dist) {
                this.squirrel.y = floor(branch_y_plot - this.squirrel.start_land_dist - this.squirrel.height/2)
                this.squirrel.motion = 'land'
                this.squirrel_land()
            }
        }
        //add counter for distance fallen and adjust speed accordingly
        if(this.squirrel.motion === "fall"){
            this.squirrel.y += this.squirrel.fall_speed_y
            if(keyIsDown(LEFT_ARROW)){
                this.squirrel.x -= this.squirrel.fly_speed_x
                this.squirrel.facing = "left"
            }
            if (keyIsDown(RIGHT_ARROW)){
                this.squirrel.x += this.squirrel.fly_speed_x
                this.squirrel.facing = "right"
            }
            if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
            else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
        }
    }

    squirrel_land(){
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
        if(this.squirrel.rise_since_jump >= this.squirrel.max_jump_height) {this.squirrel.motion = "fall"; this.squirrel_fall()}
        
        else{ 
            if(keyIsDown(LEFT_ARROW)) {this.squirrel.x -= this.squirrel.fly_speed_x; this.squirrel.facing = "left"}
            if(keyIsDown(RIGHT_ARROW)) {this.squirrel.x += this.squirrel.fly_speed_x; this.squirrel.facing = "right"}

            if(this.squirrel.rise_since_jump < 90 * this.squirrel.max_jump_height/100){
                this.squirrel.y -= this.squirrel.jump_speed_y
                this.squirrel.rise_since_jump += this.squirrel.jump_speed_y
            }
            else if(this.squirrel.rise_since_jump < 95 * this.squirrel.max_jump_height/100){
                this.squirrel.y -= 2 * this.squirrel.jump_speed_y/3
                this.squirrel.rise_since_jump +=  2 * this.squirrel.jump_speed_y/3
            }
            else if(this.squirrel.rise_since_jump < 98 * this.squirrel.max_jump_height/100){
                this.squirrel.y -= this.squirrel.jump_speed_y/3
                this.squirrel.rise_since_jump += this.squirrel.jump_speed_y/3
            }
            else{
                this.squirrel.y -= this.squirrel.jump_speed_y/10
                this.squirrel.rise_since_jump += this.squirrel.jump_speed_y/10
            }
        }
        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
    }

    squirrel_climb(){ //adjusts position after landing so that both feet are on branch
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
        this.display_all()
        if(this.lethal_fall === true) {this.kill()}

        else if(this.hit_enemy() === true) {this.kill()}

        else{
            if(this.squirrel.motion === "land") {this.squirrel_land()}
            else if(this.squirrel.motion === "climb") {this.squirrel_climb()}
            else if(this.squirrel.motion === "fall") {this.squirrel_fall()}
            else if(this.squirrel.motion === "jump") {this.squirrel_jump()}
            else if(this.squirrel.motion === "walk"){this.squirrel_walk()}
            else if(this.squirrel.motion === null){this.squirrel_null()}
        }

    }
}
