import ChessBoard from "./chessBoard";
import { PieceColor } from "./piece";
import Player from "./player";

class Game {
  chessBoard: ChessBoard | undefined;
  winner: PieceColor | undefined;

  constructor() {
    this.chessBoard = new ChessBoard();
  }

  addPlayer(player: Player) {
    if (this.isPlayersFilled) {
      throw new Error("Cannot add more than two players.");
    }

    const color = this.chessBoard?.players.has("white") ? "black" : "white";
    this.chessBoard?.players.set(color, player);
    this.chessBoard?.players.get(color)?.addSide(color);
  }

  start() {
    if (!this.isPlayersFilled) {
      throw new Error("Please add both players before starting the game.");
    }

    console.log("Game started");
  }

  get isPlayersFilled() {
    return (
      this.chessBoard?.players.has("white") &&
      this.chessBoard?.players.has("black")
    );
  }
}

export default Game;
