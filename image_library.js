class Image_Library{
    constructor(jump_image_count, stand_image_count){
        this.jump_image_count = jump_image_count
        this.stand_image_count = stand_image_count

        this.squirrel = {}
        this.squirrel.right = {}
        this.squirrel.left = {}
        this.branches = {}

        this.load_images()
    }

    load_images(){
        this.full_life = loadImage("images/full_life.png")
        this.empty_life = loadImage("images/empty_life.png")
        this.load_branch_images()
        this.load_jump_images()
        this.load_stand_images()
    }

    resize_images(){
        this.full_life.resize(0.03 * innerHeight, 0.03 * innerHeight)
        this.empty_life.resize(0.03 * innerHeight, 0.03 * innerHeight)
        this.resize_branch_images()
        this.resize_jump_images()
        this.resize_stand_images()
    }

    load_branch_images(){
        this.branches.right = [null, null]
        this.branches.left = [null, null]
        for(let i = 2; i <= 6; i ++){
            let image1 = loadImage("images/tree/branch_" + i + "_right.png")
            this.branches.right[i] = image1
            let image2 = loadImage("images/tree/branch_" + i + "_left.png")
            this.branches.left[i] = image2
        }
    }

    load_jump_images(){
        this.squirrel.left.jump = []
        this.squirrel.right.jump = []
        for(let i = 0; i < this.jump_image_count; i ++){
            let image1 = loadImage("images/squirrel/jump/s_l_jump_" + i + ".png")
            this.squirrel.left.jump.push(image1)
            let image2 = loadImage("images/squirrel/jump/s_r_jump_" + i + ".png")
            this.squirrel.right.jump.push(image2)
        }
    }

    load_stand_images(){
        this.squirrel.right.stand = []
        this.squirrel.left.stand = []
        for(let i  = 0; i < this.stand_image_count; i++){
            let image1 = loadImage("images/squirrel/stand/s_r_stand_" + i + ".png")
            this.squirrel.right.stand.push(image1)
            let image2 = loadImage("images/squirrel/stand/s_l_stand_" + i + ".png")
            this.squirrel.left.stand.push(image2)
        }

    }

    resize_branch_images(){
        for(let i = 2; i <= 6; i ++){
            this.branches.right[i].resize( 0.02 * innerHeight * i * 5, 0.02 * innerHeight * i)
            this.branches.left[i].resize( 0.02 * innerHeight * i * 5, 0.02 * innerHeight * i)
        }
    }

    resize_jump_images(){
        for(let i = 0; i < this.jump_image_count; i ++){
            this.squirrel.right.jump[i].resize(squirrel_width, squirrel_height)
            this.squirrel.left.jump[i].resize(squirrel_width, squirrel_height)
        }
    }

    resize_stand_images(){
        for(let i  = 0; i < 1; i++){
            this.squirrel.right.stand[i].resize(squirrel_width, squirrel_height)
            this.squirrel.left.stand[i].resize(squirrel_width, squirrel_height)
        }
    }
    
}