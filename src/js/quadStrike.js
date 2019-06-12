import Ship from './util/ship';
import UI from './util/uI'
import Projectile from './util/projectile'
import { displayModel, clearModel, gameOverModel, refresh} from './util/model.js'

let modelcleared = false;
let ships = [];
let entities = [];
let health = 100;
let rail = 0;
let score = 0; 
let ui = null;
let dir = "down"
let colors = ["#4deeea", "#74ee15", "#ffe700", "#f000ff"]

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("myCanvas");
    displayModel();
    mouseLocation(canvas);
    addArrowKeyListener();
    addClickListner();
    setUI(canvas);
    setIntervalCreator(canvas)
})
const mouseLocation = (canvas) => {
    init(canvas);
    canvas.addEventListener("mousemove", (e) => {
        let position = { x: parseInt(e.clientX ), y: parseInt(e.clientY ) }
        let axis = ships[rail].axis
        ships[rail].pos[axis] = position[axis];
    })
}
const init = (canvas) => {
    let h = window.innerHeight
    let w = window.innerWidth;
    canvas.setAttribute("height", h);
    canvas.setAttribute("width", w);
    let buffer = 50;
    let width = canvas.width;
    let height = canvas.height;
    let positions = [
        { x: width / 2 - buffer, y: 0 },
        { x: width / 2 - buffer, y: height - buffer },
        { x: 0, y: (height / 2) - buffer  },
        { x: width - buffer, y: (height / 2) - buffer }
    ]
    for (let i = 0; i < positions.length; i++) {
        if (i < 2){
            let ship = new Ship(positions[i], "x", canvas, buffer, colors[i]);
            ships.push(ship);
            entities.push(ship)
        }else{
            let ship = new Ship(positions[i], "y", canvas, buffer, colors[i]);
            ships.push(ship);
            entities.push(ship)
        }
    }
}

const fire = (ship, dir) =>{
    let canvas = document.getElementById("myCanvas");
    let projectile =  new Projectile(ship, dir, canvas);
    entities.push(projectile);
}

const setIntervalCreator = (canvas)=>{
    setInterval(
        ()=>{
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < entities.length; i++){
                entities[i].draw()
            }
        }, 10
    );
}
const addArrowKeyListener = () => {
    document.addEventListener("keyup", (event) => {
        switch (event.keyCode) {
            case 87:
            case 38:
                rail = "0";
                dir = "down";
                break;
            case 83:
            case 40:
                rail = "1";
                dir = "up";
                break;
            case 65:
            case 37:
                rail = "2";
                dir = "right";
                break;
            case 68:
            case 39:
                rail = "3";
                dir = "left";
                break;
            case 32:
                fire(ships[rail], dir);
                break;
            case 81:
                if (modelcleared == false){clearModel();}
                break;
        }
    });
}
const addClickListner = ()=>{
    document.addEventListener("click", ()=>{
        fire(ships[rail],dir);
    })
}

const setUI = (canvas) =>{
    ui = new UI(score, health, canvas);
    entities.push(ui)
}

const increaseScore = (points) =>{
    score += points
    ui.score = score;
}
const DecreaseHealth = (ammount) =>{
    health -= ammount 
    ui.health = health;
}