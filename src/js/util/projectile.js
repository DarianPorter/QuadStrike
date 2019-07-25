export default class Projectile{
    constructor(ship, dir, canvas){
        this.pos = ship.pos;
        this.dir = dir;
        this.pos = this.offSet(ship.size);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.size = 10;
        this.color = ship.color;
        this.additive = Math.random() * 5;
        this.dontDraw = false;
        this.type = "playerProjectile"
    }

    draw(){
        if (this.dontDraw == false){
            let direction = this.movePos();
            this.ctx.beginPath();
            this.ctx.arc(
                direction.x ,
                direction.y ,
                this.size,
                0,
                2 * Math.PI
            );
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.color;
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
            this.ctx.closePath();
            this.pos = direction;
        }
        this.checkDelete()
    }

    movePos(){
        switch(this.dir){
            case "left":
                return { 
                    x: this.pos.x - (7 + this.additive) , 
                    y: this.pos.y
                };
            case "right":
                return {
                    x: this.pos.x + (7 + this.additive),
                    y: this.pos.y
                };
            case "up":
                return {
                    x: this.pos.x ,
                    y: this.pos.y - (7 + this.additive)
                };
            case "down":
                return {
                    x: this.pos.x ,
                    y: this.pos.y + (7 + this.additive)
                };
            default:
                console.log("whahatttt tfff")
                debugger
        }
    }
    offSet(size){
        switch (this.dir) {
            case "left":
                return {
                    x: this.pos.x ,
                    y: this.pos.y + size / 2
                };
            case "right":
                return {
                    x: this.pos.x,
                    y: this.pos.y + size / 2
                };
            case "up":
                return {
                    x: this.pos.x + size / 2,
                    y: this.pos.y 
                };
            case "down":
                return {
                    x: this.pos.x + size / 2,
                    y: this.pos.y
                };
            default:
                console.log("whahatttt tfff")
                debugger
        }
    }
    checkDelete(){
        if(this.pos.x > this.canvas.width){
            this.dontDraw = true
        }else if (this.pos.y > this.canvas.height){
            this.dontDraw = true
        }else if (this.pos.x < 0){
            this.dontDraw = true
        } else if (this.pos.y < 0){
            this.dontDraw = true
        }
    }
}