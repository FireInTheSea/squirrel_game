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
        this.squirrel_col = floor(this.squirrel.y/this.grid_size + this.grid_view)
        this.squirrel_row = floor((this.squirrel.x - this.x_offset)/this.grid_size)
    }

    squirrel_on_branch(){
        this.find_squirrel()
        if(this.grid[this.squirrel_col][this.squirrel_row] instanceof Branch){
            this.squirrel.jupms_since_land = 0
            return true
        }
        return false
    }

    move_squirrel(){
        this.squirrel.move(this.squirrel_on_branch())
        //if squirrel is_on_enemy is false
            //if motion is not null
                //squirrel.move(is_on_branch?)
    }

    run(){
        console.log(this.squirrel.jupms_since_land)
        this.find_squirrel()
        if(this.squirrel_col > this.grid_view + 24){
            this.lives -= 1
        }
        else if(this.squirrel_row >= 0 && this.squirrel_row <= this.grid_width){
            this.move_squirrel()
        }
        this.display_all()
    }
}
