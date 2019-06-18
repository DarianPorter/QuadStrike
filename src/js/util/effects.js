export class DeathEffect {
    constructor(pos, color, size, canvas){
        this.pos = pos;
        this.color = color;
        this.size = size;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    draw(){
        this.ctx.beginPath();
        if(this.size >= 1){
            this.ctx.arc(this.pos.x, this.pos.y, this.size -= 1, 0, 2 * Math.PI);
        }
        this.ctx.shadowColor = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.closePath();
    }
}
export class StarEffect{
    constructor(){
        let colors = ["#6f367d", "#d1a0e2", "#9f86d7", "#5a3f93"]
        this.glowColor = colors[Math.floor(Math.random() * colors.length)]
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.maxSize = Math.floor(Math.random() * 10) + 10
        this.minSize =  10;
        this.size = this.minSize;
        this.shrink = false
        this.pos = this.getRandomPos();
    }

    draw(){
        this.ctx.beginPath()
        if(this.size < this.maxSize && this.shrink == false){
            this.ctx.arc(this.pos.x, this.pos.y, this.size += .1, 0, 2 * Math.PI);
            if(this.size >= this.maxSize){
                this.shrink = true
            }
        } else if (this.size > this.minSize && this.shrink == true) {
            this.ctx.arc(this.pos.x, this.pos.y, this.size -= .1, 0, 2 * Math.PI);
            if (this.size <= this.minSize) {
                this.shrink = false
            }
        }
        this.ctx.shadowColor = this.glowColor;
        this.ctx.shadowBlur = 15;
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = "none";
        this.ctx.closePath(); 
    }
    getRandomPos(){
        return {
            x: Math.floor(Math.random() * this.canvas.width),
            y: Math.floor(Math.random() * this.canvas.height),
        }
    }
} 