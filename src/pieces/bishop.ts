import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Bishop extends Piece {
  protected readonly directions: Position[] = PieceDirections.Bishop;

  constructor(color: PieceColor) {
    super(color, PieceType.Bishop);
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateMultiMove(board, this.directions, movement);
  }
}
