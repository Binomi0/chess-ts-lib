import MultiMove from "../board/multiMove";
import Piece from "./piece";
import PieceDirections from "./directions";
import StateManager from "../board/stateManager";
import { Position, PieceColor, PieceType, Movement } from "../types";

export class Bishop extends Piece {
  readonly symbol: string;
  readonly directions: Position[] = PieceDirections.Bishop;

  constructor(color: PieceColor) {
    super(color, PieceType.Bishop);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };

    return MultiMove.getAvailableMoves(boardStateManager, movement);
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    return MultiMove.validateMove(boardStateManager, movement);
  }
}
