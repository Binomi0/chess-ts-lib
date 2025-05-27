import MultiMove from "../board/multiMove";
import StateManager from "../board/stateManager";
import Piece from "./piece";
import { Position, PieceColor, PieceType, Movement } from "../types";

export class Queen extends Piece {
  readonly symbol: string;

  constructor(color: PieceColor) {
    super(color, PieceType.Queen);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };
    return MultiMove.getAvailableMoves(boardStateManager, movement);
  }
}
