let Parent = require('./parent')
const io = require("./server");

module.exports = class Grass extends Parent {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0
    }
    mul() {
        
        this.multiply++;
        
        var newCell = this.selectRandomCell(0);
        
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            statisticsObj.grass++;
            ;
            
            
            io.emit("change statistics", statisticsObj);

        }
    }

}


