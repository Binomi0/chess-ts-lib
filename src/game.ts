import TurnManager from "./board/turnManager";
import ChessBoard from "./board/chessBoard";
import GameManager from "./gameManager";
import Player from "./player";
import { IGame, PieceColor, Position } from "./types";

class Game implements IGame {
  board: ChessBoard;
  manager: GameManager;
  private turnManager: TurnManager;

  constructor(public notifier?: (message: string) => void) {
    this.turnManager = new TurnManager();
    this.manager = new GameManager(this.turnManager);
    this.board = new ChessBoard(this.manager);
  }

  get arePlayersReady(): boolean {
    return this.manager.arePlayersReady;
  }

  get turn() {
    return this.manager.turnManager.getCurrentTurn();
  }

  addPlayer(player: Player) {
    this.manager.addPlayer(player);
    this.notifier?.("Player added");
  }

  start() {
    this.manager.startGame();
    this.board.stateManager.initializeBoard();
    this.notifier?.("Game started!");
  }

  getWinner() {
    return this.manager.winner;
  }

  setWinner(color: PieceColor) {
    this.manager.winner = color;
  }

  move(from: Position, to: Position) {
    this.board.handleMove(from, to);
    this.notifier?.("Move executed");
  }
}

export default Game;
