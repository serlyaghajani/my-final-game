// Define the Mushroom class
class Mushroom {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.directions = [];
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
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

