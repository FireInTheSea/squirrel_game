class Branch{
    constructor(grid, grid_size, base_col, base_row, height_in_cols, direction){
        this.grid = grid
        this.grid_size = grid_size
        this.col = base_col
        this.row = base_row
        this.size = height_in_cols //minimum 2 
        this.direction = direction
        this.angle = 5 // horizontal : vertical

        let index_row = this.row
        for(let c = 0; c < this.size; c++){
            if(this.direction === "right"){
                for(let r = 0; r < this.angle; r++){
                    this.grid[this.col - c][index_row + r] = this
                }
                index_row += this.angle
            }
            else{
                for(let r = 0; r < this.angle; r++){
                    this.grid[this.col - c][index_row - r] = this
                }
                index_row -= this.angle
            }
        }
    }

    display(grid_view, grid_size, x_offset, col, row){
        fill(200, 200, 50)
        rect(row * this.grid_size + x_offset, (col - floor(grid_view)) * this.grid_size, this.grid_size, this.grid_size)

        if((col === this.col && row === this.row) || 1 === 1){
            if(this.direction === "right"){
                imageMode(CORNER)
                image(images.branches[this.size], this.row * grid_size + x_offset, (this.col - grid_view) * grid_size - this.size * grid_size * 0.58)
                imageMode(CENTER)
            }
        } 
    }
}