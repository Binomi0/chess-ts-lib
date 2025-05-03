import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { type PieceColor } from "../piece";

export class Rook extends Piece {
  private static readonly directions: Position[] = [
    [-1, 0], // ↑
    [1, 0], // ↓
    [0, -1], // ←
    [0, 1], // →
  ];

  constructor(color: PieceColor) {
    super(color, "Rook");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateMultiMove(board, Rook.directions, movement);
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
