//function to generate the player board of a specified size and number of bombs
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    let row = [];
    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++){
        row.push(' ');
    }
    board.push(row);
  }
  return board;
}

//function to generate the bomb board of a specified size and number of bombs
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
 let board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    let row = [];
    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++){
        row.push(null);
    }
    board.push(row);
  }

  //place bombs on the board by generating a location from a random coloumn and random row
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColIndex] !== 'B'){
      board[randomRowIndex][randomColIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
}

//function to find the number of adjacent bombs
const getNeighborBombs = (bombBoard, rowIndex, colIndex) => {
  const neighborOffsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],  [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
   //so in this iterator, each "offset" is a little mini array from the big array
   //called neighborOffsets. Each mini array contains just two items, the row number
   //and then the column number.
   //so if we're going through the loop the first time, offset = [-1, -1], the next
   //time through it's [-1, 0]. Very clever.
   const neighborRowIndex = rowIndex + offset[0];
   //^this takes rowIndex, which was passed to this function, and looks at the row
   //either above, below or on the same line, depending where we're at in the loop
   //might execute as 1 + -1, 1 + 0, or 1 + 1, depending where we're at
   const neighborColumnIndex = colIndex + offset[1];
   //^this takes colIndex, which was passed to this function, and looks at the column
   //either left, right or on the same column, depending where we're at in the loop
   //might execute as 1 + -1, 1 + 0, or 1 + 1, depending where we're at
   if (neighborRowIndex >= 0
   && neighborRowIndex < numberOfRows
   && neighborColumnIndex >=0
   && neighborColumnIndex < numberOfColumns){
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == "B"){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

//function to allow the user to flip a tile
const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if (playerBoard[rowIndex][colIndex] !== ' '){
    console.log("This tile has already been flipped. You need to move on");
    return;
  } else if (bombBoard[rowIndex][colIndex] == "B"){
    playerBoard[rowIndex][colIndex] = "B";
  } else {
    playerBoard[rowIndex][colIndex] = getNeighborBombs(bombBoard, rowIndex, colIndex);
  }
}

//function to print board passed to it as an array
const printBoard = board => {
  return board.map(row => row.join(' | ')).join('\n');
}

let playerBoard = generatePlayerBoard(3, 4, 5);
let bombBoard = generateBombBoard(3, 4, 5);

//print what we got so far
console.log("Player Board:")
console.log(printBoard(playerBoard)+'\n');
console.log("Bomb Board:")
console.log(printBoard(bombBoard));

//send in a user input, update the board, and print again
flipTile(playerBoard, bombBoard, 2, 3);
console.log('\n'+"Updated Player Board:");
console.log(printBoard(playerBoard));
