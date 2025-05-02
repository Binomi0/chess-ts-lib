import ChessBoard, { BoardCell, Movement } from "./chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

export type Position = [number, number];
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
}

class Piece implements Piece {
  color: PieceColor;
  type: PieceType;

  constructor(color: PieceColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  validateSingleMove() {}
  static validateMultiMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement
  ) {
    const validMoves: Position[] = [];

    for (const [dx, dy] of directions) {
      let newRow = movement.from[0] + dx;
      let newCol = movement.from[1] + dy;

      while (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        } else if (isCellCaptured(target, movement)) {
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

export default Piece;
