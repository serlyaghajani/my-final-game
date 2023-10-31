var matrix = []
var side = 60;
var sideX = 15;
var sideY = 18;
const socket = io()
const restartBtn = document.querySelector('#restart')
restartBtn.addEventListener("click",handleRestartGame)
function handleRestartGame(){
    socket.emit('restart game')
}


var side = 60;


//statistics part
socket.on("change statistics", handleAddStatistics);
const grass = document.querySelector("#grass");
const grassEater = document.querySelector("#grassEater");
const predator = document.querySelector("#predator");
// const mushroom = document.querySelector("#mushroom");

function handleAddStatistics(obj) {
grass.innerText = "New grasses: " + obj.grass;
grassEater.innerText = "New grass eaters: " + obj.grassEater;
predator.innerText = "New predators: " + obj.predator;
// mushroom.innerText = "New mushrooms: " + obj.mushroom;
}

const seasonBtn = document.querySelector('#seasons')


seasonBtn.addEventListener('click', handleChangeSeason)
let season = 0
function handleChangeSeason() {
    if (season < 4) {
        season++
    }
    else {
        season = 1
    }
    socket.emit('change seasons', season)
    if (season == 1) {
        seasonBtn.textContent = 'Winter'
    }
    else if (season == 2) {
        seasonBtn.textContent = 'Spring'
    }
    else if (season == 3) {
        seasonBtn.textContent = 'Summer'
    }
    else if (season == 3) {
        seasonBtn.textContent = 'Autumn'
    }
}



function setup() {

    createCanvas(sideX * side, sideY * side);
    background('#acacac');

}


function drawGame(matrix) {

    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {

            if (matrix[y][x] == 1) {

                if (season == 1) {
                    fill('white')
                }
                else if (season == 2) {
                    fill('pink')
                }
                else if (season == 4) {
                    fill('brown')
                }
                else {
                    fill('green')
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");

            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
            }

            rect(x * side, y * side, side, side);

        }
    }

}
socket.on('update matrix', drawGame)
