import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";
import PieceDirections from "../PieceDirections";

export class Knight extends Piece {
  protected readonly directions: Position[] = PieceDirections.Knight;

  constructor(color: PieceColor) {
    super(color, "Knight");
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateSingleMove(board, this.directions, movement);
  }
}

export class WhiteKnight extends Knight {
  constructor() {
    super("white");
  }
}

export class BlackKnight extends Knight {
  constructor() {
    super("black");
  }
}
