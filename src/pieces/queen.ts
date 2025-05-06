import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Queen extends Piece {
  protected readonly directions: Position[] = PieceDirections.Queen;

  constructor(color: PieceColor) {
    super(color, PieceType.Queen);
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return super.validateMultiMove(board, this.directions, movement);
  }
}

export class WhiteQueen extends Queen {
  constructor() {
    super(PieceColor.White);
  }
}

export class BlackQueen extends Queen {
  constructor() {
    super(PieceColor.Black);
  }
}
