let Parent = require('./parent')
module.exports = class Grass extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}