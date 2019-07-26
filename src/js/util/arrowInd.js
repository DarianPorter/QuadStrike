export default class Ind {
    constructor(){
        this.colors = ["#ffe700", "#4deeea", "#74ee15", "#f000ff"];
        this.arrows = document.getElementsByClassName("fa");
        this.changeStyleWithException(1);
    }
    // keypress(keycode){
    //     switch(keycode){
    //         case 00:

    //             break;
    //         case 00:

    //             break;
    //         case 00:

    //             break;
    //         case 00:

    //             break;
    //     }
    // }
    changeStyleWithException(exception){
        for(let i = 0; i < this.arrows.length; i++ ){
            this.arrows[i].style.textShadow = `0 0 20px  ${this.colors[i]}`;
            if(i === exception){
                this.arrows[i].style.color = this.colors[i];
            }else{
                this.arrows[i].style.color = "white"
            }
        }
    }
}