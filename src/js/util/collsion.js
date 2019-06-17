
const typeCheck = (type1, type2)=>{
    if (type1.type == "playerProjectile" || type1.type == "enemy"){
        type1.dontDraw = true
        type2.dontDraw = true
        return 10
    }
}

const checkCollision = (obj1, obj2) =>{
    let pos1 = obj1.pos
    let pos2 = obj2.pos
    if(pos1.x > pos2.x && pos1.x < pos2.x + obj2.size){
        if(pos1.y > pos2.y && pos1.y < pos2.y + obj2.size){
            return true
        }
    } else if (pos2.x > pos1.x && pos2.x < pos1.x + obj1.size){
        if (pos2.y > pos1.y && pos2.y < pos1.y + obj1.size) {
            return true
        }
    }else{
        return false
    }
}
// if type is ship decrement health
const collsion = (objs)=>{
    for(let i = 0; i < objs.length; i++){
        for(let j = i + 1; i < objs.length; i++ ){
            if(objs[i].type !== undefined && objs[j].type !== undefined){
                if (checkCollision(objs[i], objs[j]) === true){
                    objs[i].dontDraw = true;
                    objs[i].type = undefined
                    objs[j].dontDraw = true;
                    objs[j].type = undefined
                    return 10;
                }
            }
        }
    }
    return 0;
}
export default collsion