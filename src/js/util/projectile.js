export default class Projectile{
    constructor(ship, dir, canvas){
        this.pos = ship.pos;
        this.dir = dir;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.size = 10;
        this.color = ship.color;
        this.additive = Math.random();
    }

    draw(){
        let direction = this.movePos();
        this.ctx.beginPath();
        this.ctx.arc(
            direction.x + (50 / 2) ,
            direction.y + (50 / 2) ,
            this.size,
            0,
            2 * Math.PI
        );
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        this.pos = direction;
    }

    movePos(){
        switch(this.dir){
            case "left":
                return { 
                    x: this.pos.x - (5 + this.additive) , 
                    y: this.pos.y
                };
            case "right":
                return {
                    x: this.pos.x + (5 + this.additive),
                    y: this.pos.y
                };
            case "up":
                return {
                    x: this.pos.x ,
                    y: this.pos.y - (5 + this.additive)
                };
            case "down":
                return {
                    x: this.pos.x ,
                    y: this.pos.y + (5 + this.additive)
                };
            default:
                console.log("whahatttt tfff")
                debugger
        }
    }
}