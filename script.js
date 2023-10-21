var matrix = []
var side = 60;
var sideX = 15;
var sideY = 18;
const socket = io()


var side = 60;


function setup() { console.log(5555)
    createCanvas(sideX * side, sideY * side);
    background('#acacac'); 

}


function drawGame(matrix) {

    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
                fill("white");
            }

            rect(x * side, y * side, side, side);

        }
    }

    

}
socket.on('update matrix', drawGame)
