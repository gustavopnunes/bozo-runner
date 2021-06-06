const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "WV  W     W     W WVW",
    "W W W WWWVWWVWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WW WW WWWWW W W",
    "W W   W V W W     W W",
    "W WWWWW W W W WWWVW E",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W    VW W WV  W W W W",
    "W WWWWWWW WW WW W W V",
    "W       W     V W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const siFerro = [
    "vo vira jacaré talkei", 
    "o brasileiro não vai ser cobaia desses xing ling não",
    "tem que toma cloroquina talkei",
    "se tomar vacina e virar jacaré o problema é seu talkei",    
]

let balloon = document.createElement("div");
balloon.classList.add("balloon");
const maze = document.querySelector(".maze");

for (let i in map) {
    for (let j in map[i]) {
        if (map[i][j] === "W") {
            createWall(i, j);
        }
        else if (map[i][j] === " ") {
            createTrack(i, j);
        } else if (map[i][j] === "S") {
            createStart(i, j);
        } else if (map[i][j] === "V") {
            createVaccine(i, j);
        } else {
            createEnd(i, j);
        }
    }
}

createPlayer();
let line = 9;
let column = 0;

function createWall(line, column) {
    let wall = document.createElement("div");
    wall.classList.add("wall");
    wall.classList.add(`l${line}c${column}`)
    maze.append(wall);
}

function createTrack(line, column) {
    let track = document.createElement("div");
    track.classList.add("track");
    track.classList.add(`l${line}c${column}`)
    maze.append(track);
}

function createStart(line, column) {
    let block = document.createElement("div");
    block.classList.add("start")
    block.classList.add(`l${line}c${column}`)
    maze.append(block);
    startPoint = block;
}
function createEnd(line, column) {
    let block = document.createElement("div");
    block.classList.add("end")
    let cloroquina = document.createElement("img");
    cloroquina.src = "img/cloroquina.png";
    cloroquina.classList.add("cloroquina")
    block.classList.add(`l${line}c${column}`)
    block.append(cloroquina)
    maze.append(block);
}

function createVaccine(line, column) {
    let block = document.createElement("div");
    block.classList.add("track", "vaccine-space");
    block.classList.add(`l${line}c${column}`)
    let vacina = document.createElement("img");
    vacina.src = "img/vacina.png"
    vacina.classList.add("vaccine");
    block.append(vacina);
    maze.append(block)
}

function createPlayer() {
    let player = document.createElement("div");
    player.classList.add("player");
    let bozo = document.createElement("img");
    bozo.src = "img/bozominion.png"
    bozo.classList.add("bozo");
    player.append(bozo);
    startPoint.append(player);
}

document.addEventListener("keydown", (event) => {
    let keyname = event.key;
    switch (keyname) {
        case "ArrowUp":
            movement("up");
            break;
        case "ArrowDown": 
            movement("down")
            break;
        case "ArrowLeft": 
            movement("left")
            break;
        case "ArrowRight": 
            movement("right")
            break;
    }
})

function movement (direction) {
    let player = document.querySelector(".player");
    let nextBlock;
    if (direction === "up") {
        nextBlock = document.querySelector(`.l${line-1}c${column}`);
        if (nextBlock.classList.contains("track")) {
            nextBlock.append(player);
            checkVaccine(nextBlock);
            line--;
        } else {
            return;
        }
    }
    if (direction === "down") {
        nextBlock = document.querySelector(`.l${line+1}c${column}`);
        if (nextBlock.classList.contains("track")) {
            nextBlock.append(player);
            checkVaccine(nextBlock);
            line++;
        } else {
            return;
        }
    }
    if (direction === "left") {
        nextBlock = document.querySelector(`.l${line}c${column-1}`);
        if (nextBlock.classList.contains("track")) {
            nextBlock.append(player);
            checkVaccine(nextBlock);
            column--;
        } else {
            return;
        }
    }
    if (direction === "right") {
        nextBlock = document.querySelector(`.l${line}c${column+1}`);
        if (nextBlock.classList.contains("track")) {
            nextBlock.append(player);
            checkVaccine(nextBlock);
            column++;
        } 
        if (nextBlock.classList.contains("end")) {
            document.querySelector(".end").append(player);
            return displayModal("areUTryingToCheat?");
        }
        else {
            return;
        }
    }
}

function checkVaccine(block) {
    if (block.classList.contains("vaccine-space")) {
        let player = document.querySelector(".player");
        balloon.textContent = "";
        balloon.textContent = siFerro[Math.floor(Math.random()*4)]
        player.append(balloon);
        let lifes = document.querySelector(".lifesSpace");
        if (lifes.childElementCount == 0) {
            return displayModal();
        }
        else {
            if (lifes.childElementCount === 2) {
                let bozogator = document.querySelector(".bozo");
                bozogator.classList.add("bozogator")
                bozogator.src = "img/bozogator.png";
            }
        lifes.removeChild(lifes.lastElementChild);
        }
    }
}

function displayModal(condition) {
    let container = document.querySelector(".container")
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let text = document.createElement("h1");
    let text2 = document.createElement("p");
    let text3 = document.createElement("p");

    if (condition === "areUTryingToCheat?") {
    text.textContent = "VOCÊ CONSQUISTOU A CLOROQUINA!"
    text2.textContent = "Fique tranquilo! As chances de você se tornar um jacaré foram zeradas."
    text3.textContent = "Obrigado por jogar! E pelo amor de Deus não leve nada disso aqui a sério. "
    let bozo = document.createElement("img");
    bozo.src = "img/bolsimpson.png";
    modal.append(text, text2, text3, bozo);
    container.append(modal);
    } else {
        text.textContent = "QUE PENA, VOCÊ FOI VACINADO E VIROU UM JACARÉ..."
        text2.textContent = "Eu avisei..."
        text3.textContent = "Apesar de ter perdido no jogo, você ganhou na vida ao escolher a vacina em vez da cloroquina. Afinal, mais vale um jacaré com vida do que um ser humano sem..."
        let alligatornaro = document.createElement("img");
        alligatornaro.src = "img/alligatornaro.png";
        modal.append(text, text2, text3, alligatornaro);
        container.append(modal);
    }
}

