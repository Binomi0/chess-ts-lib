import TurnManager from "./board/turnManager";
import Player from "./player";
import { IGameManager, PieceColor } from "./types";

class GameManager implements IGameManager {
  started = false;
  timeElapsed: number = 0;
  winner: PieceColor | undefined;
  players: Map<PieceColor, Player> = new Map();

  constructor(public turnManager: TurnManager) {}

  startGame() {
    if (this.started) {
      throw new Error("Game has already started.");
    }

    if (!this.arePlayersReady) {
      throw new Error("Please add both players before starting the game.");
    }

    this.timeElapsed = Date.now();
    this.started = true;
    this.winner = undefined;
    this.turnManager.resetTurn();
  }

  addPlayer(player: Player) {
    if (this.arePlayersReady) {
      throw new Error("Cannot add more than two players.");
    }

    const color = this.players.has(PieceColor.White)
      ? PieceColor.Black
      : PieceColor.White;
    this.players.set(color, player);
    this.players.get(color)?.addSide(color);
  }

  get arePlayersReady(): boolean {
    return (
      this.players.has(PieceColor.White) && this.players.has(PieceColor.Black)
    );
  }
}
export default GameManager;
