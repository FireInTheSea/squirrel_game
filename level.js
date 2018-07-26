class Level{
    constructor(grid_height){
        this.lives = 3
        this.squirrel = new Squirrel(innerWidth/2, innerHeight/2)
        this.grid_size = (innerHeight - 4)/24
        this.grid_height = grid_height
        this.grid_width = 30
        this.grid = []
        let add_col_num
        for(add_col_num = 0; add_col_num < this.grid_height; add_col_num ++){
            this.grid[add_col_num] = new Array(this.grid_width)
        }
        this.grid_view = this.grid_height - 24
        this.x_offset = innerWidth/2 - this.grid_size * this.grid_width/2
    }

    load_level1(){
        this.grid[990][10] = new Branch(this.grid, this.grid_size, 990, 10, 3, 'right', branch1)
        this.grid[980][20] = new Branch(this.grid, this.grid_size, 980, 20, 2, 'left', branch1)
        this.grid[977][9] = new Branch(this.grid, this.grid_size, 977, 9, 2, 'left', branch1)
    }

    display_grid(){
        fill(0, 255, 0)
        for(let col = 0; col < 24; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                rect(row * this.grid_size + this.x_offset, col * this.grid_size, this.grid_size, this.grid_size)
                stroke('red')
                ellipse(row * this.grid_size + this.x_offset, col * this.grid_size, 3, 3)
                stroke('black')
            }
        }
    }

    get_y_plot1(x_plot, branch){
        let slope
        let y_adjust
        if(branch.direction === "right"){
            slope = -1/branch.angle
            y_adjust = branch.row/branch.angle //y intercept in cols relative to branch.col
            y_adjust ++ // to plot from bottom of square
        }
        else{
            slope = 1/branch.angle
            y_adjust = - branch.row/branch.angle
        }
        let y_intercept_col = branch.col + y_adjust
        let y_intercept_col_in_screen = (y_intercept_col - this.grid_view)
        let y_intercept_pixel = y_intercept_col_in_screen * this.grid_size
        let y_plot = slope * x_plot + y_intercept_pixel
        fill('purple')
        ellipse(x_plot, y_intercept_pixel, 3, 3)
        fill('black')
        return y_plot
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

        console.log(y1_col, x1_row, y2_col, x2_row)

        let slope_by_coords = (y2_col - y1_col) / (x2_row - x1_row)

        let y1_px = y1_col * this.grid_size
        let y2_px = y2_col * this.grid_size
        let x1_px = x1_row * this.grid_size + this.x_offset
        let x2_px = x2_row * this.grid_size + this.x_offset
        console.log(x1_px, y1_px, x2_px, y2_px)
        let slope = (branch.direction === "right") ? -0.2 : 0.2

        //let y_plot = slope_by_coords * (x_plot - x1_px) + y1_px


        let y_plot = slope * (x_plot - x2_px) + y2_px
        print("Y Plot: " + y_plot)

        return y_plot
    }

    display_objects(){
        for(let col = 0; col < 24; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[this.grid_view + col][row] instanceof Branch){
                    this.grid[this.grid_view + col][ row].display(this.grid_view, this.grid_size, this.x_offset, this.grid_view + col, row)
                    for(let x_plot = row * this.grid_size + this.x_offset; x_plot < (row + 1) * this.grid_size + this.x_offset; x_plot += 1){
                        console.log("X_Plot: " + x_plot)
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
                this.squirrel.jupms_since_land = 0
                this.squirrel.is_on_branch = true
            }
            else{
                this.squirrel.is_on_branch = false
            }
        }
    }
  
    run(){
        this.find_squirrel()
        if(this.squirrel.bottom_col > this.grid_view + 24 - 1){
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
