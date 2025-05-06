import { BoardCell, Movement, Position } from "./chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

export type PieceColor = "black" | "white";
export type PieceType =
  | "Pawn"
  | "Rook"
  | "Knight"
  | "Bishop"
  | "Queen"
  | "King";

interface Piece {
  color: Readonly<PieceColor>;
  type: Readonly<PieceType>;
  validateMove(board: BoardCell[][], movement: Movement): boolean;
  validateSingleMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement
  ): boolean;
  validateMultiMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement
  ): boolean;
}

class Piece implements Piece {
  color: PieceColor;
  type: PieceType;

  constructor(color: PieceColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  getAllAvailableMoves(
    board: BoardCell[][],
    from: Position,
    directions: Position[]
  ) {
    const piece = board[from[0]][from[1]];
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      const newRow = from[0] + row;
      const newCol = from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target) || isCellCaptured(target, piece?.color)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    return validMoves;
  }

  validateSingleMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement
  ): boolean {
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (
          isCellEmpty(target) ||
          isCellCaptured(target, movement.piece.color)
        ) {
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

  validateMultiMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement
  ) {
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      let newRow = movement.from[0] + row;
      let newCol = movement.from[1] + col;

      while (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        } else if (isCellCaptured(target, movement.piece.color)) {
          validMoves.push([newRow, newCol]);
          break;
        } else {
          break;
        }

        newRow += row;
        newCol += col;
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

export default Piece;
