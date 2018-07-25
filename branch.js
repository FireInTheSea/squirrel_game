class Branch{
    constructor(grid, grid_size, base_col, base_row, height_in_cols, direction, image){
        this.grid = grid
        this.grid_size = grid_size
        this.col = base_col
        this.row = base_row
        this.size = height_in_cols
        this.direction = direction
        this.angle = 5 // horizontal : vertical
        this.img = image
        this.img_col = this.col - this.size

        if(this.direction === "right"){
            this.img_row = this.row 
        }
        else{
            this.img_row = this.row - this.size * this.angle
        }

        for(let col_change = 0; col_change < this.size; col_change ++){
            for(let row_change = 0; row_change < 5; row_change ++){
                if(this.direction === "right"){
                    this.grid[this.col - col_change][this.row + row_change] = this
                }
                else{
                    this.grid[this.col - col_change][this.row - row_change] = this
                }
            }
        }
    }

    display(grid_view, grid_size, x_offset, col, row){
        if(col === this.col && row === this.row){
            this.img.resize(this.size * this.grid_size * this.angle, this.size * this.grid_size)
            //image(this.img, this.img_row * grid_size + x_offset, (this.img_col - grid_view) * grid_size)
        fill(200, 200, 50)
        } 
        rect(row * this.grid_size + x_offset, (col - grid_view) * this.grid_size, this.grid_size, this.grid_size)
    }
}