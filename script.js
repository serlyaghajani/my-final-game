var matrix = [];
var side = 60;
var n = 15;
var m = 18;

for (let i = 0; i < n; i++) {
    matrix.push([])
    for (let j = 0; j < m; j++) {
        matrix[i].push(0)
    }
}
function characters(index, count) {
    for (let a = 0; a < count; a++) {
        var v = Math.floor(random(0, n))
        var w = Math.floor(random(0, m))
        matrix[v][w] = index;
    }
}

var side = 60;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var rainArr = [];
var mushroomArr = [];

function setup() {
    characters(1,150)
    characters(2,10)
    characters(3,7)
    characters(4,7)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grE = new GrassEater(x, y, 2);
                grassEaterArr.push(grE);
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 3);
                predatorArr.push(pre);
            }
            else if (matrix[y][x] == 4) {
                var rn = new Rain(x, y, 4);
                rainArr.push(rn);
            }
            else if (matrix[y][x] == 5) {
                var mush = new Mushroom(x, y, 5);
                mushroomArr.push(mush);
            }
        }
    }

}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

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

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in rainArr) {
        rainArr[i].blossom();
    }

}
