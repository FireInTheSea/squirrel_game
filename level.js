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

    display_grid(){
        fill(0, 255, 0)
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

    squirrel_on_branch(){
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
  
    run(){
        this.find_squirrel()
        if(this.squirrel.bottom_col > this.grid_view + this.visible_grid_height - 1){
            this.lives -= 1
            this.squirrel.y = innerHeight/2
            this.squirrel.x = innerWidth/2
        }
        else if(this.squirrel.left_row >= 0 && this.squirrel.right_row <= this.grid_width){
            this.squirrel_on_branch()
            this.squirrel.move()
        }
        this.display_all()
    }
}
