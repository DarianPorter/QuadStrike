export const displayModel = ()=>{
    let model = document.createElement("div");
    document.body.appendChild(model)
    model.setAttribute("id", "model")
    model.style.position = "absolute"
    model.style.background = "rgba(0,0,0,.85)"
    model.style.width = "100vw"
    model.style.height = "100vh"
    model.style.display = "flex"
    model.style.alignItems = "center"
    model.style.top = "0px"
    let instructions = document.createElement("p");
    instructions.style.color = "white";
    instructions.style.textShadow = "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue";
    instructions.style.fontSize = "30px"
    instructions.style.textAlign = "center"
    instructions.style.verticalAlign = "middle"
    instructions.style.width = "500px"
    instructions.style.margin = "auto"
    instructions.style.height = "50%"
    instructions.innerHTML = "Instructions: <br/> ------------------------ <br> WASD changes controll of each ship <br/> space or mouse click fires <br/> use the mouse to move your ship <br/> match the color of your ship to te enemy to destroy the enemy <br/> and dont let your health reach 0%! <br/> ----------------- <br/> press Q to start"
    model.appendChild(instructions)
}

export const clearModel = ()=>{
    let model = document.getElementById("model")
    model.parentNode.removeChild(model)
}

export const gameOverModal = ()=>{
    window.alert("ahhhhhhhhh")
} 

export const refresh=()=>{
    location.reload();
}