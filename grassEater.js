let Parent = require('./parent')
const io = require("./server");

module.exports = class GrassEater extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }

    mul() {
        var newCell = this.selectRandomCell(this.chooseCell(0));//[5,4]
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            statisticsObj.grassEater++;
            io.emit("change statistics", statisticsObj);
        }
    }

    eat() {
        // let foods = this.chooseCell(1)
        // let MushroomFood = this.chooseCell(5)
        // let PredatorFood = this.chooseCell(3)
        let Randomfood = this.selectRandomCell(1)
        let RandomMushroom = this.selectRandomCell(5)
        let RandomPredator = this.selectRandomCell(3)
        if (Randomfood) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = Randomfood[0]
            let newY = Randomfood[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (RandomMushroom) {
            this.energy += 5
            matrix[this.y][this.x] = 0
            let newX = RandomMushroom[0]
            let newY = RandomMushroom[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in mushroomArr) {
                if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
                    mushroomArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (RandomPredator && this.energy >= 10) {
            this.energy++
            matrix[this.y][this.x] = 0
            let newX = RandomPredator[0]
            let newY = RandomPredator[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        }
        else {
            this.move()
        }
        if (this.energy >= 20) {
            this.mul()
        }


    }

    move() {
        this.energy--;
        // let emptyCells = this.chooseCell(0)
        let newCell = this.selectRandomCell(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }



    }
}
