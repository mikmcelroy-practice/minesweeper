export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  //function to allow the user to flip a tile
  flipTile(rowIndex, colIndex) {
    if (this._playerBoard[rowIndex][colIndex] !== ' ') {
      console.log("This tile has already been flipped. You need to move on");
      return;
    } else if (this._bombBoard[rowIndex][colIndex] == "B") {
      this._playerBoard[rowIndex][colIndex] = "B";
    } else {
      this._playerBoard[rowIndex][colIndex] = this.getNeighborBombs(rowIndex, colIndex);
    }
    this._numberOfTiles--;
  }
  //function to find the number of adjacent bombs
  getNeighborBombs(rowIndex, colIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      //so in this iterator, each "offset" is a little mini array from the big array
      //called neighborOffsets. Each mini array contains just two items, the row number
      //and then the column number.
      //so if we're going through the loop the first time, offset = [-1, -1], the next
      //time through it's [-1, 0]. Very clever.
      const neighborRowIndex = rowIndex + offset[0];
      //^this takes rowIndex, which was passed to this function, and looks at the row
      //either above, below or on the same line, depending where we're at in the loop.
      //might execute as 1 + -1, 1 + 0, or 1 + 1, depending where we're at
      const neighborColumnIndex = colIndex + offset[1];
      //^this takes colIndex, which was passed to this function, and looks at the column
      //either left, right or on the same column, depending where we're at in the loop
      //might execute as 1 + -1, 1 + 0, or 1 + 1, depending where we're at
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == "B") {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  //method to determine if the user has won. A user wins when there are no safe tiles left but they
  //haven't hit a bomb yet
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //function to print board passed to it as an array
  print() {
    return this._playerBoard.map(row => row.join(' | ')).join('\n');
  }

  //function to generate the player board of a specified size and number of bombs
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  //function to generate the bomb board of a specified size and number of bombs
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    //place bombs on the board by generating a location from a random coloumn and random row
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }

} //end of Board class