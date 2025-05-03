import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { type PieceColor } from "../piece";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "../utils/helpers";

export class Pawn extends Piece {
  constructor(color: PieceColor) {
    super(color, "Pawn");
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    const piece = board[movement.from[0]][movement.from[1]];

    if (piece?.color === "black") {
      return BlackPawn.validateMove(board, movement);
    }

    if (piece?.color === "white") {
      return WhitePawn.validateMove(board, movement);
    }

    throw new Error("Invalid piece color");
  }
}

export class WhitePawn extends Pawn {
  private static readonly START_ROW = 6;
  private static readonly directions: Position[] = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];

  constructor() {
    super("white");
  }

  private static isFirstMove(movement: Movement): boolean {
    const [fromRow] = movement.from;
    const [toRow] = movement.to;
    return fromRow === this.START_ROW && toRow === this.START_ROW - 2;
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    if (this.isFirstMove(movement)) {
      return true;
    }

    const validMoves: Position[] = [];

    for (const [row] of this.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1];

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }
    for (const [row, col] of this.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (!isCellEmpty(target) && isCellCaptured(target, movement)) {
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

export class BlackPawn extends Pawn {
  private static readonly START_ROW = 1;

  private static readonly directions: Position[] = [
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  constructor() {
    super("black");
  }

  private static isFirstMove(movement: Movement): boolean {
    const [fromRow] = movement.from;
    const [toRow] = movement.to;
    return fromRow === this.START_ROW && toRow === this.START_ROW + 2;
  }

  static validateMove(board: BoardCell[][], movement: Movement): boolean {
    if (this.isFirstMove(movement)) {
      return true; // First move can be two squares forward
    }

    const validMoves: Position[] = [];

    for (const [row] of this.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1];

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }
    for (const [row, col] of this.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (!isCellEmpty(target) && isCellCaptured(target, movement)) {
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
