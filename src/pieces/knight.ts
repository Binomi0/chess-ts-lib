import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Knight extends Piece {
  protected readonly directions: Position[] = PieceDirections.Knight;

  constructor(color: PieceColor) {
    super(color, PieceType.Knight);
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateSingleMove(board, this.directions, movement);
  }
}
