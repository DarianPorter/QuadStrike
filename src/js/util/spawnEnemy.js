
import Enemy from "./enemy"
export default class EnemySpawner{
    constructor(canvas, colors){
        this.colors = colors
        this.canvas = canvas;
    }

    spawn(ammount){
        let enemies = []
        let locations = this.locationType(1,ammount)
        for(let i = 0; i < locations.length; i++){
            let randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
            let enemy = new Enemy(locations[i], this.canvas, randomColor, this.bounds)
            enemies.push(enemy)
        } 
        return enemies
    }

    locationType(type, count){
        let bounds = this.loactionBounds();
        this.bounds = bounds;
        switch(type){
            case 1:
                let locations = []
                for(let i = 0; i < count; i++){
                    locations.push({
                        x: Math.floor(Math.random() * (bounds.maxW - bounds.minW) + bounds.minW),
                        y: Math.floor(Math.random() * (bounds.maxH - bounds.minH) + bounds.minH)
                    })
                }
                return locations
        }
    }

    loactionBounds(){
        let width = Math.floor(this.canvas.width);
        let height = Math.floor(this.canvas.height);
        let widthBuffer = Math.floor(width * .15);
        let heightBuffer = Math.floor(height * .15);
        return {
            maxW: width - widthBuffer,
            minW: widthBuffer,
            maxH: height - heightBuffer,
            minH: heightBuffer,
        }
    }
} 