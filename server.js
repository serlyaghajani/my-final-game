const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server)
module.exports = io


matrix = []
grassArr = [];
grassEaterArr = [];
predatorArr = [];
rainArr = [];
mushroomArr = [];
let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")
let Rain = require("./rain")
let Mushroom = require("./mushroom")

app.use(express.static('.'))
app.get('/', function (req, res) {
    res.redirect('index.html')
})

matrix = []
const sideX = 15;
const sideY = 18;

statisticsObj = {
    grass: 0,
    grassEater: 0,
    predator: 0,
    mushroom: 0,
}

function random(min, max) {
    if (min === undefined && max === undefined) {
        return Math.random();
    } else if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function character(char, quantity) {
    let initialNumber = 0;
    while (initialNumber < quantity) {
        let x = Math.floor(random(sideX));
        let y = Math.floor(random(sideY));
        if (matrix[y][x] == 0) {
            matrix[y][x] = char;
        }
        initialNumber++;
    }
}

for (let i = 0; i < sideY; i++) {
    matrix.push([]);
    for (let j = 0; j < sideX; j++) {
        matrix[i].push(0);
    }
}

function initGame() {
   matrix=[]
   for (let i = 0; i < sideY; i++) {
    matrix.push([]);
    for (let j = 0; j < sideX; j++) {
        matrix[i].push(0);
    }
}
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    rainArr = [];
    mushroomArr = [];
    character(1, 150);
    character(2, 10);
    character(3, 7)
    character(4, 7)
    startInterval();
    initArrays();
}
function initArrays() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    rainArr = [];
    mushroomArr = [];
    for (var y = 0; y < sideX; ++y) {
        for (var x = 0; x < sideY; ++x) {
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
let speed = 300
let intName;
function startInterval() {
    clearInterval(intName)
    intName = setInterval(function () {
        playGame()
    }, speed)
}
function playGame() {
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
    io.emit('update matrix', matrix)
}
function handleChangeSeason(season) {

}
io.on('connection', function (socket) {
    socket.emit('update matrix', matrix)
    initGame()
    socket.on('change seasons', handleChangeSeason)
    socket.on('restart game', handleRestartGame)
})
function handleRestartGame() {
    clearInterval(intName)
    initGame()
}
function handleChangeSeason(season) {
    if (season == 1) {
        speed = 1000
    }
    else if (season == 2 || season == 4) {
        speed = 700
    }
    else {
        speed = 300
    }
    startInterval()

}
server.listen(3000, () => {
    console.log('server is listening to port 3000')
})