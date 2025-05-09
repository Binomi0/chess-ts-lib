import { Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../board/multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";
import StateManager from "../board/stateManager";

export class Rook extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Rook;

  constructor(color: PieceColor) {
    super(color, PieceType.Rook);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    return MultiMoveValidator.getAvailableMoves(
      boardStateManager,
      this.directions,
      from,
    );
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    return MultiMoveValidator.validateMove(
      boardStateManager,
      this.directions,
      movement,
    );
  }
}
