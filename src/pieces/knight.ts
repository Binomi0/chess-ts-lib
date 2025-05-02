import { BoardCell, Movement } from "../chessBoard";
import Piece, { PieceColor, Position } from "../piece";
import {
  isCellEmpty,
  isCellLocked,
  isInBounds,
  isValidDestination,
} from "../utils/helpers";

export class Knight extends Piece {
  private static readonly directions: [number, number][] = [
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
    const validMoves: Position[] = [];

    for (const [row, col] of this.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target) || isCellLocked(target?.color!, movement)) {
          validMoves.push([newRow, newCol]);
        }
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
