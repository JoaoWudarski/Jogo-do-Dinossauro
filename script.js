const dino = document.querySelector(".dino");
const backg = document.querySelector(".backg");

let jumping = false
let position = 0;
let pont = 0;
let controlGame = false;

function spaceKey(event){
    if(event.keyCode == 32){
        if(jumping == false)
            jump();
    }
        
}

function jump(){

    jumping = true;

    var upInterval = setInterval(() => {
        
        if(position >= 200){
            
            clearInterval(upInterval);
            var downInterval = setInterval(() =>{
                
                if(position <= 0){
                    clearInterval(downInterval);
                    jumping = false;
                }
                else{
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
               
            }, 25)
        }
        else{
            position += 20;
            dino.style.bottom = position + "px";
        }   

    },25)
}

function generateCactus(){
    console.log("abriu");
    if(controlGame == false)
        return;

    const cactus = document.createElement("div");
    let cactusPosition = 1600;
    let randomCactus = Math.random() * aumentaPorcentagem();

    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    backg.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if(controlGame == false){
            console.log("fechou");
            clearInterval(leftInterval);
            cactus.style.display = "none";
            return;
        }
            

        if(cactusPosition <= -60){
            clearInterval(leftInterval);
            backg.removeChild(cactus);
        } 
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);
            document.getElementById("game-over").innerHTML = "Fim de Jogo";
            document.getElementById("pontuacao").innerHTML = "Pontuação alcançada: " + pont;
            cactus.style.display = "none";
            document.getElementById("game-over").style.display = "block";
            document.getElementById("botao").style.display = "block";
            controlGame = false;
        }
        else{
            cactusPosition -=10;
            cactus.style.left = cactusPosition + "px";
            pont += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação Atual: " + pont;
        }
        
        
    }, aumentaVelocidade())
    
    setTimeout(setTimeout(generateCactus, randomCactus), 2000);
}

function aumentaVelocidade(){
    var val = pont / 10000;
    val = parseInt(val);
    //console.log(val);

    if(val * 30 <= 999)
        document.getElementById("bk").style.animation = "slideright " + (1000 - (val*30)) + "s infinite linear"
    return 30 - val;
}

function aumentaPorcentagem(){
    var val = pont / 10000;
    val = parseInt(val);
    val *= 50;
    console.log(val);
    return 5000 - val;
}

function iniciarGame(){
    document.getElementById("game-over").style.display = "none";
    document.getElementById("botao").style.display = "none";
    jumping = false
    position = 0;
    pont = 0;
    controlGame = false;
    controlGame = true;
    generateCactus();
}


document.addEventListener("keypress", spaceKey);