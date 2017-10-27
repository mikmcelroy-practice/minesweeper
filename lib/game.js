// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit

import { Board } from './board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, colIndex) {
    this._board.flipTile(rowIndex, colIndex);
    if (this._board.playerBoard[rowIndex][colIndex] === "B") {
      console.log("You blew up. Game Over.");
      console.log(this._board.print());
      return false;
    } else if (!this._board.hasSafeTiles) {
      console.log("You won! You killed all the bombs.");
      console.log(this._board.print());
      return true;
    } else {
      console.log("Current Board:");
      console.log(this._board.print());
      return null;
    }
  } //end of playMove
} //end of Game class