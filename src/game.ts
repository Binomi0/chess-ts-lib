import ChessBoard from "./chessBoard";
import GameManager from "./gameManager";

class Game {
  chessBoard: ChessBoard;
  manager: GameManager;

  constructor(public notifier?: (message: string) => void) {
    this.notifier = notifier;
    this.manager = new GameManager();
    this.chessBoard = new ChessBoard(this.manager);
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
