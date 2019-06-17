// export const addArrowKeyListener = (rail, dir) => {
//     document.addEventListener("keyup", (event) => {
//         switch (event.keyCode) {
//             case 87:
//             case 38:
//                 rail = "0";
//                 dir = "down";
//                 break;
//             case 83:
//             case 40:
//                 rail = "1";
//                 dir = "up";
//                 break;
//             case 65:
//             case 37:
//                 rail = "2";
//                 dir = "right";
//                 break;
//             case 68:
//             case 39:
//                 rail = "3";
//                 dir = "left";
//                 break;
//             case 32:
//                 fire(ships[rail], dir);
//                 break;
//             case 81:
//                 if (modelcleared == false) {
//                     clearModel();
//                     modelcleared = true;
//                     spawned = true;
//                 }
//                 break;
//         }
//     });
// }

export const mouseLocation = (canvas) => {
    init(canvas);
    canvas.addEventListener("mousemove", (e) => {
        let position = { x: parseInt(e.clientX), y: parseInt(e.clientY) }
        let axis = ships[rail].axis
        ships[rail].pos[axis] = position[axis];
    })
}