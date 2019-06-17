import Ship from './util/ship';
import UI from './util/uI'
import Projectile from './util/projectile'
import EnemySpawner from './util/spawnEnemy'
// import collsion from './util/collsion'
// import {addClickListner} from './util/listners'
// import { addArrowKeyListener, mouseLocation } from './util/eventUtil'
import { displayModel, clearModel, gameOverModel, refresh} from './util/model.js'

let enemySpawner = null;
let modelcleared = false;
let ships = [];
let entities = [];
let health = 100;
let rail = 0;
let score = 0; 
let ui = null;
let dir = "down"
let colors = ["#4deeea", "#74ee15", "#ffe700", "#f000ff"]
let spawned = false;

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("myCanvas");
    init(canvas)
    enemySpawner = new EnemySpawner(canvas, colors)
    displayModel();
    setIntervalCreator();
    mouseLocation(canvas);
    addArrowKeyListener(rail, dir);
    // addClickListner(fire);
    setUI(canvas);
    spawnEnemies();
    window.requestAnimationFrame(animate);
    
})
if(spawned == false && modelcleared == true){
    spawnEnemies(2);
}
const mouseLocation = (canvas) => {
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

const setIntervalCreator = ()=>{
    setInterval(spawnEnemies, 20000)
}

const animate = () =>{
    var canvas = document.getElementById("myCanvas");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
    ui.draw()
    for(let i = 0; i < entities.length; i++){
        entities[i].draw()
    }
    increaseScore(collsion(entities));
    requestAnimationFrame(animate)
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
                if (modelcleared == false) { 
                     clearModel();
                     modelcleared = true; 
                     spawned = true;
                }
                break;
        }
    });
}

const checkCollision = (obj1, obj2) => {
    let pos1 = obj1.pos
    let pos2 = obj2.pos
    console.log("hiiiiiii")
    if (pos1.x >= pos2.x && pos1.x <= pos2.x + obj2.size) {
        if (pos1.y > pos2.y && pos1.y < pos2.y + obj2.size) {
            return true
        }
    } else if (pos2.x > pos1.x && pos2.x < pos1.x + obj1.size) {
        if (pos2.y > pos1.y && pos2.y < pos1.y + obj1.size) {
            return true
        }
    } 
    return false
}
// if type is ship decrement health
const collsion = (objs = entities) => {
    for (let i = 0; i < objs.length; i++) {
        for (let j = i + i; i < objs.length; i++) {
            if (objs[i].type !== undefined && objs[j].type !== undefined) {
                let coll = checkCollision(objs[i], objs[j])
                if (coll) {
                    collsionType(objs[i])
                    collsionType(objs[j])
                    return 10;
                }
            }
        }
    }
    return 0;
}
const collsionType = (obj) =>{
    if (obj.type === "enemy" || obj.type === "playerProjectile"){
        obj.dontDraw = true;
    }
    if (obj.type == "ship"){
        health -= 10;
    }
}

const setUI = (canvas) =>{
    ui = new UI(score, health, canvas);
}

const increaseScore = (points) =>{
    // console.log("adding points!!!")
    score += points
    ui.score = score;
}
const DecreaseHealth = (ammount) =>{
    health -= ammount 
    ui.health = health;
}

const spawnEnemies = (ammount = 1) =>{
    enemySpawner.spawn(ammount).forEach(enemy => {
        entities.push(enemy)
    });
}