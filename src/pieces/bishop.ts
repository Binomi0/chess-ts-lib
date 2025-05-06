import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";
import PieceDirections from "../PieceDirections";

export class Bishop extends Piece {
  protected readonly directions: Position[] = PieceDirections.Bishop;

  constructor(color: PieceColor) {
    super(color, "Bishop");
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateMultiMove(board, this.directions, movement);
  }
}

export class WhiteBishop extends Bishop {
  constructor() {
    super("white");
  }
}

export class BlackBishop extends Bishop {
  constructor() {
    super("black");
  }
}
