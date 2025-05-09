import { Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../board/multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";
import BoardStateManager from "../board/boardStateManager";

export class Queen extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Queen;

  constructor(color: PieceColor) {
    super(color, PieceType.Queen);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: BoardStateManager, from: Position) {
    return MultiMoveValidator.getAvailableMoves(
      boardStateManager,
      this.directions,
      from,
    );
  }

  validateMove(
    boardStateManager: BoardStateManager,
    movement: Movement,
  ): boolean {
    return MultiMoveValidator.validateMove(
      boardStateManager,
      this.directions,
      movement,
    );
  }
}
