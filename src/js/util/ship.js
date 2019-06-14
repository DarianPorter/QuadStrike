export default class Ship{
    constructor(pos,axis,canvas, buffer, color){
        this.pos = pos;
        this.oldPos = null;
        this.selected = false;
        this.axis = axis 
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        this.size = buffer;
        this.color = color;
        this.draw = this.draw.bind(this)
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.pos.x, this.pos.y, this.size, this.size);
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.shadowBlur = 0;
    }

}