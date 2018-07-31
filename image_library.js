class Image_Library{
    constructor(jump_image_count, fall_image_count){
        this.jump_image_count = jump_image_count
        this.fall_image_count = fall_image_count
        this.load_images()
    }

    load_images(){
        this.full_life = loadImage("images/full_life.png")
        this.empty_life = loadImage("images/empty_life.png")
        this.load_jump_images()
    }

    resize_images(){
        this.full_life.resize(0.03 * innerHeight, 0.03 * innerHeight)
        this.empty_life.resize(0.03 * innerHeight, 0.03 * innerHeight)
        this.resize_jump_images()
    }

    load_jump_images(){
        this.squirrel.left.jump = []
        for(let i = 0; i < this.jump_image_count; i ++){
            let image = loadImage("images/left_squirrel_jump" + i + ".png")
            this.squirrel.left.jump.append(image)
        }

        this.squirrel.right.jump = []
        for(let i = 0; i < this.jump_image_count; i ++){
            let image = loadImage("images/right_squirrel_jump" + i + ".png")
            this.squirrel.right.jump.append(image)
        }
    }

    resize_jump_images(){
        for(let i = 0; i < this.jump_image_count; i ++){
            this.squirrel.left.jump[i].resize(0.30 *innerHeight, 0.18 * innerHeight)
        }

        for(let i = 0; i < this.jump_image_count; i ++){
            this.squirrel.right.jump[i].resize(0.30 *innerHeight, 0.18 * innerHeight)
        }
    }

    
}