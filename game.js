class Game{
    constructor(){
        this.acorns = 0
        this.level1 = new Level(1000)
        this.level1.load_level1()
        this.current_level = this.level1
    }
    run(){
        this.current_level.run()
    }
}