class Game{
    constructor(){
        this.lives = 3
        this.acorns = 0
        this.cody = cody
        this.level1 = new Level(1000)
        this.level1.load_level1()
    }
    display(){
        this.level1.display_grid()
        this.level1.display_objects()
    }
}