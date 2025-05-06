import ChessBoard from "./chessBoard";
import { PieceColor } from "./piece";
import Player from "./player";

class Game {
  chessBoard: ChessBoard = new ChessBoard();
  winner: PieceColor | undefined;
  started = false;
  timeElapsed: number = 0;

  constructor() {}

  addPlayer(player: Player) {
    if (!this.chessBoard) {
      throw new Error("Chess board is not initialized");
    }

    if (this.arePlayersReady) {
      throw new Error("Cannot add more than two players.");
    }

    const color = this.chessBoard.players.has(PieceColor.White)
      ? PieceColor.Black
      : PieceColor.White;
    this.chessBoard.players.set(color, player);
    this.chessBoard.players.get(color)?.addSide(color);
  }

  start() {
    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }

    if (!this.started) {
      console.log("Game has been started");
      this.timeElapsed = Date.now();
      this.started = true;
    } else {
      throw new Error("Game has already been started");
    }
  }

  get arePlayersReady(): boolean {
    if (!this.chessBoard) {
      throw new Error("Chess board is not initialized");
    }

    return (
      this.chessBoard.players.has(PieceColor.White) &&
      this.chessBoard.players.has(PieceColor.Black)
    );
  }
}

export default Game;
