export default class UI{
    constructor(score, time, canvas){
        this.score = score;
        this.time = time;
        this.canvas = canvas;
    }
    draw(){
        let ctx = this.canvas.getContext("2d");
        ctx.font = "40px Courier New, Courier, monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(240,0,255,1)"
        ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 1.75);
        ctx.fillText("--------------------", this.canvas.width / 2, this.canvas.height / 2);
        ctx.fillText(`Time Left: ${this.time}`, this.canvas.width / 2, this.canvas.height / 2.25);
    }
}