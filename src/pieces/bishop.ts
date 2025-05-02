import { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
import {
  isCellEmpty,
  isCellLocked,
  isValidDestination,
} from "../utils/helpers";

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
    const validMoves: Position[] = [];

    for (const [dx, dy] of this.directions) {
      let newRow = movement.from[0] + dx;
      let newCol = movement.from[1] + dy;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        } else if (isCellLocked(target?.color!, movement)) {
          validMoves.push([newRow, newCol]);
          break;
        } else {
          break; // Bloqueado por una pieza del mismo color
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
