import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { type PieceColor } from "../piece";
import PieceDirections from "../PieceDirections";

export class Rook extends Piece {
  protected readonly directions: Position[] = PieceDirections.Rook;

  constructor(color: PieceColor) {
    super(color, "Rook");
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
    super("white");
  }
}

export class BlackRook extends Rook {
  constructor() {
    super("black");
  }
}
