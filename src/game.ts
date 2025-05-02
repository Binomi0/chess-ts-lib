import ChessBoard from "./chessBoard";
import { PieceColor } from "./piece";
import Player, { type Players } from "./player";

class Game {
  chessBoard: ChessBoard;
  winner: PieceColor | null = null;
  players: Map<keyof Players, Player> = new Map();

  constructor() {
    this.chessBoard = new ChessBoard();
    console.log("Game initialized");
  }

  addPlayer(player: Player) {
    if (this.isPlayersFilled) return;

    const isWhiteSelected = this.players.has("white");
    this.players.set(isWhiteSelected ? "black" : "white", player);
    console.log("Added player", player.name);
  }

  start() {
    if (this.isPlayersFilled) console.log("Game started");
  }

  get isPlayersFilled() {
    return this.players.has("white") && this.players.has("black");
  }
}

export default Game;
