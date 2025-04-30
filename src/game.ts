import ChessBoard from "./chessBoard";
import { PieceColor } from "./piece";

class Game {
  chessBoard: ChessBoard;
  winner: PieceColor | null = null;

  constructor() {
    this.chessBoard = new ChessBoard();
    console.log("Game initialized");
  }

  start() {
    console.log("Game started");
  }
}

export default Game;
