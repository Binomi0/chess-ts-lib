import ChessBoard, { Position } from "./chessBoard";
import GameManager from "./gameManager";

class Game {
  chessBoard: ChessBoard;
  manager: GameManager;

  constructor(public notifier?: (message: string) => void) {
    this.notifier = notifier;
    this.manager = new GameManager();
    this.chessBoard = new ChessBoard(this.manager);
  }

  move(from: Position, to: Position) {
    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }
    if (this.manager.winner) {
      throw new Error("Game has already ended.");
    }
    if (this.manager.timeElapsed + 1000 < Date.now()) {
      throw new Error("Time limit exceeded.");
    }

    return this.chessBoard.handleMove(from, to);
  }

  start() {
    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }

    this.manager.startGame();
    this.notifier?.("Game started!");
  }

  get arePlayersReady(): boolean {
    if (!this.chessBoard) {
      throw new Error("Chess board is not initialized");
    }

    return this.manager.arePlayersReady;
  }
}

export default Game;
