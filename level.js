class Level{
    constructor(grid_height){
        this.grid_size = (innerHeight -1 )/24
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

    add_5_branches(direction, col1, row1, size1, col2, row2, size2, col3, row3, size3, col4, row4, size4, col5, row5, size5){
        //this.grid[col1][row1] = new Branch(this.grid, this.grid_size, col1, row1, size1, direction)
        //this.grid[col2][row2] = new Branch(this.grid, this.grid_size, col2, row2, size2, direction)
        //this.grid[col3][row3] = new Branch(this.grid, this.grid_size, col3, row3, size3, direction)
        //this.grid[col4][row4] = new Branch(this.grid, this.grid_size, col4, row4, size4, direction)
        //this.grid[col5][row5] = new Branch(this.grid, this.grid_size, col5, row5, size5, direction)

    }

    load_level1(){
        this.grid[990][10] = new Branch(this.grid, this.grid_size, 990, 10, 3, 'right')
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
                if(this.grid[this.grid_view + col][row] instanceof Array){
                    print("is array")
                this.grid[this.grid_view + col][row][0].display(this.grid_view, this.grid_size, this.x_offset)
               }
            }
        }
    }
}
