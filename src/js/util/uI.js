export default class UI{
    constructor(score, health, canvas){
        this.score = score;
        this.health = health;
        this.canvas = canvas;
    }
    draw(){
        let ctx = this.canvas.getContext("2d");
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 1.75);
        ctx.fillText("-----------------------------", this.canvas.width / 2, this.canvas.height / 2);
        ctx.fillText(`Health: %${this.health}`, this.canvas.width / 2, this.canvas.height / 2.25);
    }
}