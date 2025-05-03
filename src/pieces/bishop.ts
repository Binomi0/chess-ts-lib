import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor } from "../piece";

export class Bishop extends Piece {
  private static readonly directions: Position[] = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  constructor(color: PieceColor) {
    super(color, "Bishop");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
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
