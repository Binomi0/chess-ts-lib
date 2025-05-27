import SingleMove from "../board/singleMove";
import StateManager from "../board/stateManager";
import Piece from "./piece";
import { Position, PieceColor, PieceType, Movement } from "../types";

export class Knight extends Piece {
  readonly symbol: string;

  constructor(color: PieceColor) {
    super(color, PieceType.Knight);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };
    return SingleMove.getAvailableMoves(boardStateManager, movement);
  }
}
