import ChessBoard, { Position } from "./chessBoard";
import { PieceColor } from "./piece";
import Player from "./player";

class Game {
  chessBoard: ChessBoard;
  static winner: PieceColor | undefined;
  started = false;
  timeElapsed: number = 0;
  notifier?: (message: string) => void;

  constructor(chessBoard?: ChessBoard, notifier?: (message: string) => void) {
    this.notifier = notifier;
    this.chessBoard = chessBoard || new ChessBoard();
  }

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

  move(from: Position, to: Position) {
    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }
    if (Game.winner) {
      throw new Error("Game has already ended.");
    }
    if (this.timeElapsed + 1000 < Date.now()) {
      throw new Error("Time limit exceeded.");
    }

    return this.chessBoard.handleMove(from, to);
  }

  start() {
    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }

    if (!this.started) {
      this.timeElapsed = Date.now();
      this.started = true;
      this.notifier?.("Game started!");
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
