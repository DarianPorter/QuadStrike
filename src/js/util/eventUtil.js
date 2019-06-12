
export const addArrowKeyListener = (rail)=>{
    document.addEventListener("keydown",(event)=>{
        switch(event.keyCode){
            case 38 || 87:
                rail = "0";
                break;
            case 40 || 83:
                rail = "1";
                break;
            case 37 || 65:
                rail = "2";
                break;
            case 68 || 39:
                rail = "3";
                break;
    
        }
    });
}

