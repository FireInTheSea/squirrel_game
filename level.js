class Level{
    constructor(grid_height){
        this.lives = 3
        this.squirrel = new Squirrel(500, 500)
        this.grid_size = innerHeight/24
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
    }

    display_grid(){
        fill(0, 255, 0)
        for(let col = 0; col < 24; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                rect(row * this.grid_size + this.x_offset, col * this.grid_size, this.grid_size, this.grid_size)
            }
        }
    }

    display_objects(){
        for(let col = 0; col < 24; col ++){
            for(let row = 0; row < this.grid_width; row ++){
                if(this.grid[this.grid_view + col][row] instanceof Branch){
                    this.grid[this.grid_view + col][row].display(this.grid_view, this.grid_size, this.x_offset, this.grid_view + col, row)
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
                console.log("ZEROED jumps_since_land in Level.squirrel_on_branch")
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
        }
        else if(this.squirrel.left_row >= 0 && this.squirrel.right_row <= this.grid_width){
            this.squirrel_on_branch()
            this.squirrel.move()
        }
        this.display_all()
    }
}
