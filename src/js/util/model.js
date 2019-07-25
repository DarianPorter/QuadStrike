export const displayModel = ()=>{
    let model = document.createElement("div");
    document.body.appendChild(model)
    model.setAttribute("id", "model")
    model.style.position = "absolute"
    model.style.background = "rgba(0,0,0,.95)"
    model.style.width = window.innerWidth
    model.style.height = window.innerHeight * 2
    model.style.display = "flex"
    model.style.alignItems = "center"
    model.style.top = "0px"
    let instructions = document.createElement("p");
    instructions.style.color = "white";
    instructions.style.textShadow = "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue";
    instructions.style.fontSize = "30px"
    instructions.style.textAlign = "center"
    instructions.style.verticalAlign = "middle"
    instructions.style.width = "100vw"
    instructions.style.margin = "auto"
    instructions.style.height = "100vh"
    instructions.innerHTML = "Instructions: <br/> ------------------------ <br> * WASD changes control of each ship <br/> * Space or mouse click fires <br/> * Use the mouse to move your selected ship <br/> * Match the color of your ship to the enemy to destroy the enemy <br/> * Game is over when time hits 0! <br/> ----------------- <br/> Press Q to start"
    model.appendChild(instructions)
}

export const clearModel = ()=>{
    let model = document.getElementById("model")
    model.parentNode.removeChild(model)
}

export const gameOverModal = ()=>{
    window.alert("ahhhhhhhhh")
} 
