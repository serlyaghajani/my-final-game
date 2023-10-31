let Parent = require('./parent')
const io = require("./server");

// let random = require("./random");
module.exports = class Mushroom extends Parent {
  constructor(x, y, index) {
    super(x, y, index)
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
    var newCell = this.selectRandomCell(0);
    console.log('mashroom');
    
    if (newCell) {
      var newMushroom = new Mushroom(newCell[0], newCell[1], this.index);
      mushroomArr.push(newMushroom);
      matrix[newCell[1]][newCell[0]] = 4;
      // console.log(statisticsObj);
      
      // statisticsObj.mushroom++;
      // io.emit("change statistics", statisticsObj);
    }
  }
}

