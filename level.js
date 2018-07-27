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
    }

    get_coords_by_px(x_px, y_px){
        x_px -= this.x_offset
        let row = floor(x_px/this.grid_size)
        let col = floor(y_px/this.grid_size)
        col += this.grid_view
        
        let coords = [col, row]
        return coords
    }

    predict_land(){
        let coords = this.get_coords_by_px(this.squirrel.x, this.squirrel.y)
        let test_start_col = coords[0] + this.squirrel.height_in_cols - 1
        let test_start_row = coords[1]
        let test_row_length = this.squirrel.width_in_rows
        for(let test_col = test_start_col;  test_col < test_start_col + 10; test_col ++){
            for(let test_row = test_start_row; test_row < test_start_row + test_row_length; test_row ++){
                //fill("pink")
                //rect(test_row * this.grid_size + this.x_offset, (test_col - this.grid_view) * this.grid_size, this.grid_size, this.grid_size)
                if(test_col < this.grid_view + this.visible_grid_height && test_row >= 0 && test_row < this.grid_width){
                    if(this.grid[test_col][test_row] instanceof Branch) {return true}
                }
            }
            test_row_length ++
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

    display_squirrel(){
        this.squirrel.display()
    }

    display_all(){
        this.display_grid()
        this.display_objects()
        this.display_squirrel()
    }

    find_squirrel(){
        this.squirrel.bottom_col = floor(this.squirrel.y/this.grid_size + this.grid_view)
        this.squirrel.top_col = floor((this.squirrel.y - this.squirrel.height)/this.grid_size + this.grid_view)
        this.squirrel.left_row = floor((this.squirrel.x - this.x_offset)/this.grid_size)
        this.squirrel.right_row = floor((this.squirrel.x + this.squirrel.width - this.x_offset)/this.grid_size)
    }

    squirrel_on_branch(){ //depricated
        this.find_squirrel()
        if(this.squirrel.motion != "jump"){
            if(this.grid[this.squirrel.bottom_col][this.squirrel.left_row] instanceof Branch || this.grid[this.squirrel.bottom_col][this.squirrel.right_row] instanceof Branch){
                this.squirrel.jumps_since_land = 0
                this.squirrel.is_on_branch = true
            }
            else{
                this.squirrel.is_on_branch = false
            }
        }
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

    lethal_fall(){
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
        this.squirrel.y += this.squirrel.fall_speed_y
        if(keyIsDown(LEFT_ARROW)){
            this.squirrel.x -= this.squirrel.fly_speed_x
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.squirrel.x += this.squirrel.fly_speed_x
        }
    }

    squirrel_land(){

    }

    squirrel_jump(){
        if(this.squirrel.rise_since_jump >= this.squirrel.max_jump_height) {this.squirrel.motion = "fall"}
        
        else{ 
            if(keyIsDown(LEFT_ARROW)) {this.squirrel.x -= this.squirrel.fly_speed_x}
            if(keyIsDown(RIGHT_ARROW)) {this.squirrel.x += this.squirrel.fly_speed_x}

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
    }

    squirrel_walk(){

    }
  
    run(){
        if(this.lethal_fall === true) {this.kill()}

        else if(this.hit_enemy() === true) {this.kill()}

        else{
            if(this.squirrel.motion === "fall"){
                if(this.predict_land() === true) {this.squirrel.motion = "land"}
                else {this.squirrel_fall()}
            }
            if(this.squirrel.motion === "jump") {this.squirrel_jump()}
            if(this.squirrel.motion === "land") {this.squirrel_land()}
            if(this.squirrel.motion === "walk"){this.squirrel_walk()}
            if(this.squirrel.motion === null){/*break branch*/}
        }

        this.display_all()
    }
}
