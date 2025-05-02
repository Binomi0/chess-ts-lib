import { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
import {
  isCellEmpty,
  isCellCaptured,
  isInBounds,
  isValidDestination,
} from "../utils/helpers";

export class Queen extends Piece {
  private static readonly directions: Position[] = [
    [-1, 0], // ↑
    [1, 0], // ↓
    [0, -1], // ←
    [0, 1], // →
    [-1, -1], // ↖️
    [-1, 1], // ↗️
    [1, -1], // ↙️
    [1, 1], // ↘️
  ];

  constructor(color: PieceColor) {
    super(color, "Queen");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    return this.validateMultiMove(board, Queen.directions, movement);
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
