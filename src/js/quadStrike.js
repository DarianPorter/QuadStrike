var lerp = require('lerp')
import Ship from './util/ship';
import UI from './util/uI'
import Projectile from './util/projectile'
import EnemySpawner from './util/spawnEnemy'
import { DeathEffect, StarEffect } from './util/effects'
import Ind from './util/arrowInd'
import { displayModel, clearModel} from './util/model'

let enemySpawner = null;
let ind = null;
let modelcleared = false;
let checked = false;
let ships = [];
let entities = [];
let effects  = [];
let time = 90;
let rail = 0;
let score = 0; 
let kills = 0;
let enemyCount = 1;
let ui = null;
let dir = "down"
let colors = ["#4deeea", "#74ee15", "#ffe700", "#f000ff"]
let e = null

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("myCanvas");
    document.addEventListener("click", fire.bind(this))
    init(canvas)
    enemySpawner = new EnemySpawner(canvas, colors)
    displayModel();
    mouseLocation();
    addArrowKeyListener(rail, dir);
    setUI(canvas);
    spawnStars(canvas);
    ind = new Ind();
    window.requestAnimationFrame(animate);
    spawnEnemies(enemyCount);
})
const spawnStars = (canvas)=>{
    for(let i = 0; i < 20; i++){
        let star = new StarEffect(canvas)
        effects.push(star)
    }
}

const mouseLocation = () => {
    document.addEventListener("mousemove", (event) => {
        e = event
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

const fire = () =>{
    
    let canvas = document.getElementById("myCanvas");
    let projectile =  new Projectile(ships[rail], dir, canvas);
    entities.push(projectile);
}


const animate = () =>{
    var canvas = document.getElementById("myCanvas");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
    ui.draw()
    if( e !== null){
        let axis = ships[rail].axis
        let position = {
            x: lerp(ships[rail].pos[axis], parseInt(e.clientX), .1),
            y: lerp(ships[rail].pos[axis], parseInt(e.clientY), .1)
        }
        ships[rail].pos[axis] = position[axis];
    }
    for(let i = 0; i < entities.length; i++){
        if (entities[i] !== undefined) {
            entities[i].draw()
        }
    }
    for(let i = 0; i < effects.length; i++){
        if(effects[i] !== undefined){
            effects[i].draw()
        }
    }
    collsion(entities);
    requestAnimationFrame(animate)
}
const addArrowKeyListener = () => {
    document.addEventListener("keyup", (event) => {
        switch (event.keyCode) {
            case 87:
            case 38:
                rail = "0";
                dir = "down";
                ind.changeStyleWithException(1);
                break;
            case 83:
            case 40:
                rail = "1";
                dir = "up";
                ind.changeStyleWithException(2);
                break;
            case 65:
            case 37:
                rail = "2";
                dir = "right";
                ind.changeStyleWithException(0);
                break;
            case 68:
            case 39:
                rail = "3";
                dir = "left";
                ind.changeStyleWithException(3);
                break;
            case 32:
                fire();
                break;
            case 81:
                if (modelcleared == false) { 
                    setInterval(()=>{
                        DecreaseTime(1)
                        if (time <= 0 && checked == false){
                            window.alert(`Game Over! \nyou scored ${score} Points!`)
                            location.reload();
                            checked = true;
                        }
                        if(kills == enemyCount){
                            enemyCount *= 2;
                            spawnEnemies(enemyCount);
                            kills = 0;
                        }
                    }, 1000)
                    clearModel();
                    modelcleared = true; 
                }
                break;
        }
    });
}

let obj1left = null
let obj1right = null
let obj1top = null
let obj1bottom = null
let obj2left = null
let obj2right = null
let obj2top = null
let obj2bottom = null

const checkCollision = (obj1, obj2) => {
    obj1left = obj1.pos.x; 
    obj1right = obj1.pos.x + obj1.size; 
    obj1top = obj1.pos.y;
    obj1bottom = obj1.pos.y + obj1.size;
    obj2left = obj2.pos.x; 
    obj2right = obj2.pos.x + obj2.size; 
    obj2top = obj2.pos.y;
    obj2bottom = obj2.pos.y + obj2.size;
    if (obj1.type === "enemy" || obj1.type === "playerProjectile" ){
        obj1left = obj1.pos.x - obj1.size;
        obj1right = obj1.pos.x + (obj1.size);
        obj1top = obj1.pos.y - obj1.size;
        obj1bottom = obj1.pos.y + (obj1.size);
    }
    if (obj2.type === "enemy" || obj2.type === "playerProjectile") {
        obj2left = obj2.pos.x - obj2.size;
        obj2right = obj2.pos.x + (obj2.size);
        obj2top = obj2.pos.y - obj2.size;
        obj2bottom = obj2.pos.y + (obj2.size);
    }
    
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    if(obj2left >= obj1left && obj2left <= obj1right){
        if(obj2top >= obj1top && obj2top <= obj1bottom){
                
            return true
        }
    } else if (obj2right >= obj1left && obj2right <= obj1right){
        if(obj2bottom <= obj1bottom && obj2bottom >= obj1top){
            return true
        }
    }
    return false
}

const collsion = (objs = entities) => {
    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            if(objs[i] !== undefined && objs[j] !== undefined){
                if (objs[i].type !== undefined && objs[j].type !== undefined) {
                    if (checkCollision(objs[i], objs[j])) {
                        collsionType(objs[i], objs[j], i, j)
                    }
                }
            }
        }
    }
}
const collsionType = (obj1, obj2, i, j) =>{
    let canvas = document.getElementById("myCanvas");
    if (obj1.type === "enemy" && obj2.type === "playerProjectile" || obj2.type === "enemy" && obj1.type === "playerProjectile"){
        if(obj1.color === obj2.color){
            kills+=1;
            obj1.dontDraw = true;
            obj2.dontDraw = true;
            delete entities[i]
            delete entities[j]
            score += 10;
            ui.score = score
        }else{
            if (obj1.type === "enemy"){
                if (obj1.maxSize < 100){
                    DecreaseTime(2)
                    obj1.maxSize += 5
                }
                if (obj2.type === "playerProjectile"){
                    delete entities[j]
                }
            }else if(obj2.type === "enemy"){
                if (obj1.maxSize < 100) {
                    DecreaseTime(2)
                    obj2.maxSize += 5
                }
                if (obj1.type === "playerProjectile") {
                    delete entities[i]
                }
            }
        }
        if (obj1.type === "enemy"){
            let effect = new DeathEffect(obj1.pos, obj2.color, obj1.size, canvas)
            effects.push(effect);
        }else if(obj2.type == "enemy"){
            let effect = new DeathEffect(obj2.pos, obj1.color, obj2.size, canvas)
            effects.push(effect);
        }
    }  
}

const setUI = (canvas) =>{
    ui = new UI(score, time, canvas);
}

const DecreaseTime = (ammount) =>{
    time -= ammount 
    ui.time = time;
}

const spawnEnemies = (ammount = 1) =>{
    enemySpawner.spawn(ammount).forEach(enemy => {
        entities.push(enemy)
    });
    DecreaseTime(-10)
}