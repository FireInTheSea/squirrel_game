class Level{
    constructor(grid_height){
        this.lives = 3
        this.state = "level"
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

        this.squirrel = new Squirrel(innerWidth/2, 0.8 * innerHeight, this.grid_size, squirrel_width, squirrel_height)
    }

    place_objects(level_num){
        if(level_num === 1) {this.load_level1()}
    }

    load_level1(){
        this.grid[745][10] = new Branch(this.grid, this.grid_size, 745, 10, 6, 'right')
        this.grid[755][10] = new Branch(this.grid, this.grid_size, 755, 10, 5, 'right')
        this.grid[765][10] = new Branch(this.grid, this.grid_size, 765, 10, 4, 'right')
        this.grid[775][10] = new Branch(this.grid, this.grid_size, 775, 10, 3, 'right')
        this.grid[785][10] = new Branch(this.grid, this.grid_size, 785, 10, 2, 'right')

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

    display_objects(){
        for(let col = 0; col < this.visible_grid_height; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[floor(this.grid_view) + col][row] instanceof Branch){
                    this.grid[floor(this.grid_view) + col][ row].display(this.grid_view, this.grid_size, this.x_offset, floor(this.grid_view) + col, row)
                    for(let x_plot = row * this.grid_size + this.x_offset; x_plot < (row + 1) * this.grid_size + this.x_offset; x_plot += 1){
                        //ellipse(x_plot, this.get_y_plot(x_plot, this.grid[floor(this.grid_view) + col][row]), 1, 1)

                    }
                }
            }
        }
    }

    display_all(){
        //this.display_grid()
        this.display_objects()
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
    
    place_squirrel(){
        for(let col = this.visible_grid_height - 1; col > 0; col -= 1){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[floor(this.grid_view) + col][row] instanceof Branch){
                    let branch = this.grid[floor(this.grid_view) + col][row]
                    let center_row = (branch.direction === "right") ? branch.row + (branch.size * branch.angle)/2 : branch.row - (branch.size * branch.angle)/2
                    let center_x = center_row * this.grid_size + this.x_offset
                    let center_y = this.get_y_plot(center_x, branch)
                    this.squirrel.x = center_x
                    this.squirrel.y = center_y - this.squirrel.height/2
                    this.squirrel.facing = branch.direction
                    this.squirrel.motion = null
                    this.squirrel.x_speed = 0
                    this.squirrel.y_speed = 0
                    //this.squirrel.current_branch = branch
                    //adjust position so that both feet are on branch
                    return
                }
            }
        }
    }

    fly_horizontally(){
        this.squirrel.x_speed = (keyIsDown(LEFT_ARROW)) ? this.squirrel.min_x_speed : 0
        this.squirrel.x_speed = (keyIsDown(RIGHT_ARROW)) ? this.squirrel.max_x_speed : this.squirrel.x_speed
        if(this.squirrel.x + this.squirrel.x_speed > this.x_offset && this.squirrel.x + this.squirrel.x_speed < this.grid_width * this.grid_size + this.x_offset){
            this.squirrel.x += this.squirrel.x_speed
        }
        if(this.squirrel.x_speed < 0) {this.squirrel.facing = "left"}
        else if(this.squirrel.x_speed > 0) {this.squirrel.facing = "right"}
    }
    
    squirrel_jump(){
        this.fly_horizontally()
        this.squirrel.y_speed *= this.squirrel.y_accelartion_jump
        if(ceil(this.squirrel.y_speed) >= -2) {
            this.squirrel.y_speed = 5
            this.squirrel.motion = "fall"
            return
        }
        else{
            if(this.squirrel.y > 0.5 * innerHeight) {this.squirrel.y += this.squirrel.y_speed}
            else{this.grid_view += this.squirrel.y_speed/this.grid_size}
        }
        
        if(this.squirrel.facing === "right") {image(images.squirrel.right.jump[0], this.squirrel.x, this.squirrel.y)}
        else{image(images.squirrel.left.jump[0], this.squirrel.x, this.squirrel.y)}    
    }

    end_fall_if_at_branch(square){
        if(square instanceof Branch){
            if(this.get_y_plot(this.squirrel.x, square) - (this.grid_view - floor(this.grid_view)) * this.grid_size > this.squirrel.foot_y){
                if((this.get_y_plot(this.squirrel.x, square) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size) - this.squirrel.y <= this.squirrel.y_speed){
                    this.squirrel.y = this.get_y_plot(this.squirrel.x, square) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size
                    this.squirrel.motion = "land"
                    this.squirrel.x_speed = 0
                    this.squirrel.y_speed = 0
                    return "landed"
                }
                else{
                    this.squirrel.y = this.get_y_plot(this.squirrel.x, square) - this.squirrel.height/2 - (this.grid_view - floor(this.grid_view)) * this.grid_size - this.squirrel.y_speed/20
                }
            }
            
        }
    }

    squirrel_fall(){
        this.fly_horizontally()
        if(this.squirrel.y_speed * this.squirrel.y_accelartion_fall < this.squirrel.max_y_speed) {this.squirrel.y_speed *= this.squirrel.y_accelartion_fall}
        for(let w = 0; w < this.squirrel.y_speed; w ++){
            let coords = this.get_coords_by_px(this.squirrel.back_foot_x, this.squirrel.foot_y + w + (this.grid_view - floor(this.grid_view)) * this.grid_size)
            if(this.end_fall_if_at_branch(this.grid[coords[0]][coords[1]]) === "landed") {return}
            coords = this.get_coords_by_px(this.squirrel.front_foot_x, this.squirrel.foot_y + (this.grid_view - floor(this.grid_view)) * this.grid_size + w)
            if(this.end_fall_if_at_branch(this.grid[coords[0]][coords[1]]) === "landed") {return}
        }

        this.squirrel.y += this.squirrel.y_speed
        if(this.squirrel.facing === "right") {image(images.squirrel.right.jump[0], this.squirrel.x, this.squirrel.y)}
        else{image(images.squirrel.left.jump[0], this.squirrel.x, this.squirrel.y)} 
    }

    squirrel_land(){
        this.squirrel.motion = null
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

    squirrel_walk(){ //placeholder
        if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
        else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}    
    }
     
    squirrel_null(){ //placeholder
       if(this.squirrel.facing === "right") {image(images.squirrel.right.stand[0], this.squirrel.x, this.squirrel.y)}
       else{image(images.squirrel.left.stand[0], this.squirrel.x, this.squirrel.y)}    
    }
  

    lethal_fall(){ 
        this.squirrel.find_hit_boxes()
        return (this.squirrel.foot_y > 0.99 * innerHeight) ? true : false
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

    kill(){
        this.lives -= 1
        if(this.lives > 0){
            this.place_squirrel() //if no branches on screen, takes all lives
        }
        else{
            this.state = "lose"
        }
    }
    
    run(){
        for(let q = 0; q < 10; q ++){
            this.get_y_plot(500, this.grid[785][10])
        }
        this.display_all()

        if(this.lethal_fall() === true) {this.kill()}
        //else if(this.hit_enemy() === true) {this.kill()}

        else{
            if(this.squirrel.motion === "jump") {this.squirrel_jump()}
            if(this.squirrel.motion === "fall") {this.squirrel_fall()}
            if(this.squirrel.motion === "land") {this.squirrel_land()}
            if(this.squirrel.motion === null) {this.squirrel_null()}
            if(this.squirrel.motion != "jump" && this.squirrel.motion != "fall" && this.squirrel.motion != null){
                if(this.squirrel.facing === "right") {image(this.squirrel.hit_box_right, this.squirrel.x, this.squirrel.y)}
                else{image(this.squirrel.hit_box_left, this.squirrel.x, this.squirrel.y)}
            }
        }

        return this.state
    }
}
