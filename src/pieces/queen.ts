import ChessBoard, { Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
import {
  isCellEmpty,
  isCellLocked,
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

  static validateMove(board: ChessBoard["board"], movement: Movement): boolean {
    const validMoves: Position[] = [];

    for (const [dx, dy] of this.directions) {
      let newRow = movement.from[0] + dx;
      let newCol = movement.from[1] + dy;

      while (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        } else if (isCellLocked(target?.color!, movement)) {
          validMoves.push([newRow, newCol]);
          break;
        } else {
          break;
        }

        newRow += dx;
        newCol += dy;
      }
    }

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`
    );
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
