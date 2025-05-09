import { Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../board/multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";
import BoardStateManager from "../board/boardStateManager";

export class Bishop extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Bishop;

  constructor(color: PieceColor) {
    super(color, PieceType.Bishop);
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
