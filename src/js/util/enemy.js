export default class Enemy {
    constructor(pos, canvas, color, bounds){
        this.color = color
        this.pos = pos;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.size = 1;
        this.bounds = bounds;
        this.moveDir = 0;//Math.round(Math.random() * 4)
        this.change = Math.random() >= 0.5;
        this.vel = Math.floor(Math.random() * 2)
    }

    draw(){
        this.ctx.beginPath();
        if (this.size < 25){
            this.ctx.arc(this.pos.x, this.pos.y , this.size += 1, 0, 2 * Math.PI);
        }else{
            this.ctx.arc(this.pos.x, this.pos.y , this.size, 0, 2 * Math.PI);
        }
        this.ctx.fillStyle = this.color
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.move();
    }

    move(){
        console.log(this.bounds.minW, this.bounds.maxW, this.pos.x)
        switch(this.moveDir){
            case 0:
                if(this.pos.x >= this.bounds.minW && this.change == false){
                    this.pos.x -= (1 + this.vel)
                    if (this.pos.x < this.bounds.minW){
                        this.change = true;
                    }
                } else if (this.pos.x < this.bounds.maxW && this.change == true){
                    this.pos.x += (1 + this.vel)
                    if (this.pos.x >= this.bounds.maxW) {
                        this.change = false;
                    }
                }
                break;
        }
    }

    fire(){

    }
}