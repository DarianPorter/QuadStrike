let rail;

const init = (canvas, ctx) =>{
    let buffer = 10;
    let width = canvas.width;
    let height = canvas.height;
    let positions = [
        { x: width/2, y: 0 },
        { x: width/2, y: height - buffer },
        { x: 0, y: height/2 },
        { x: width - buffer, y: height / 2 }
    ]
    for(let i = 0; i < positions.length; i++){
        ctx.beginPath();
        ctx.rect(
            positions[i].x,
            positions[i].y,
            buffer,
            buffer
        );
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }
}

const mouseLocation = ()=>{
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    init(canvas,ctx);
    canvas.addEventListener("mousemove", (e)=>{
        let position = {x: e.clientX, y: e.clientY}
        moveQuad(position)
    })
}
const moveQuad = (pos)=>{
    switch(rail){
        case "up":
            draw( "up", pos);
            break;
        case "down": 
            draw("down", pos);
            break;
        case "left":
            draw("left", pos);
            break;
        case "right":
            draw("right", pos);
            break;
    }
}

document.addEventListener("keydown",(event)=>{
    switch(event.keyCode){
        case 38 || 87:
            rail = "up";
            break;
        case 40 || 83:
            rail = "down";
            break;
        case 37 || 65:
            rail = "left";
            break;
        case 68 || 39:
            rail = "right";
            break;

    }

})

const PositiveOrNegative = (oldPos, newPos)=>{
    let oldVSum = oldPos.x + oldPos.y;
    let newVSum = newPos.x + newPos.y;
    return newVSum <= oldVSum ? "positive" : "negative"
}

window.addEventListener('DOMContentLoaded', (event) => {
    mouseLocation();
})
