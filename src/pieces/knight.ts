import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";

export class Knight extends Piece {
  private static readonly directions: Position[] = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  constructor(color: PieceColor) {
    super(color, "Knight");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    return Piece.validateSingleMove(board, this.directions, movement);
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
