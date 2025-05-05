import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";
import PieceDirections from "../PieceDirections";

export class Queen extends Piece {
  protected readonly directions: Position[] = PieceDirections.queen;

  constructor(color: PieceColor) {
    super(color, "Queen");
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return super.validateMultiMove(board, this.directions, movement);
  }
}

export class WhiteQueen extends Queen {
  constructor() {
    super("white");
  }
}

export class BlackQueen extends Queen {
  constructor() {
    super("black");
  }
}
