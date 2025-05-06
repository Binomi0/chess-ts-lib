import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Rook extends Piece {
  protected readonly directions: Position[] = PieceDirections.Rook;

  constructor(color: PieceColor) {
    super(color, PieceType.Rook);
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateMultiMove(board, this.directions, movement);
  }
}

export class WhiteRook extends Rook {
  constructor() {
    super(PieceColor.White);
  }
}

export class BlackRook extends Rook {
  constructor() {
    super(PieceColor.Black);
  }
}
