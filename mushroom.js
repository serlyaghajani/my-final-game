let Parent = require('./parent')
module.exports = class Mushroom extends Parent{
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
    var newCell = random(this.chooseCell(0));
    if (newCell) {
      var newMushroom = new Mushroom(newCell[0], newCell[1], this.index);
      mushroomArr.push(newMushroom);
      matrix[newCell[1]][newCell[0]] = 4;
    }
  }
}

