class Game{
    constructor(){
        this.acorns = 0
        this.level1 = new Level(1000)
        this.current_level = this.level1
        this.level1.load_level1()
        this.level1.place_squirrel()
    }
    run(){
        this.current_level.run()
    }
}