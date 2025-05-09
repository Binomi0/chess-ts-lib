import TurnManager from "./board/turnManager";
import ChessBoard from "./chessBoard";
import GameManager from "./gameManager";
import Player from "./player";
import { IGame, Position } from "./types";

class Game implements IGame {
  chessBoard: ChessBoard;
  manager: GameManager;
  turnManager: TurnManager;

  constructor(public notifier?: (message: string) => void) {
    this.turnManager = new TurnManager();
    this.manager = new GameManager(this.turnManager);
    this.chessBoard = new ChessBoard(this.manager);
  }

  start() {
    this.manager.startGame();
    this.chessBoard.stateManager.initializeBoard();
    this.notifier?.("Game started!");
  }

  addPlayer(player: Player) {
    this.manager.addPlayer(player);
    this.notifier?.("Player added");
  }

  move(from: Position, to: Position) {
    this.chessBoard.handleMove(from, to);
    this.notifier?.("Move executed");
  }

  get arePlayersReady(): boolean {
    return this.manager.arePlayersReady;
  }
}

export default Game;
