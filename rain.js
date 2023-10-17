let Parent = require('./parent')
module.exports = class Rain extends Parent{
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
    
    blossom() {
        let target = this.chooseCell(1)
        let TargetMushroom = random(target)
        if (TargetMushroom) {
            let newX = TargetMushroom[0]
            let newY = TargetMushroom[1]
            matrix[newY][newX] = 5
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
        }
        else {
            this.move()
        }
    }
    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }

    }




}