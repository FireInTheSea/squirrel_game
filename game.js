class Game{
    constructor(){        
        this.gs = "level"
        this.acorns = 0

        this.level1 = new Level(800, level_images, squirrel_images, owl_images, pinecone_images, acorn_images)
        this.level2 = new Level(1200, level_images, squirrel_images, owl_images, pinecone_images, acorn_images)
        this.level3 = new Level(1800, level_images, squirrel_images, owl_images, pinecone_images, acorn_images)

        this.current_level = this.level1
        this.level_num = 1       
    }

    initialize_level(){
        //handle acorns in either game or level
        this.current_level.place_objects(this.level_num)
        this.current_level.place_squirrel()
    }

    run(){
        if(this.gs === "level"){
            this.gs = this.current_level.run()
        }
        else if(this.gs === "lose"){
            background("red")
        }
        
    }
}