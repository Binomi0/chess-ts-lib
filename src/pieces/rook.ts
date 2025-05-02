import { BoardCell, Movement } from "../chessBoard";
import Piece, { Position, type PieceColor } from "../piece";
import {
  isCellEmpty,
  isCellCaptured,
  isInBounds,
  isValidDestination,
} from "../utils/helpers";

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
