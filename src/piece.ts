import { BoardCell, Movement, Position } from "./chessBoard";
import MultiMoveValidator from "./multiMoveValidator";
import SingleMoveValidator from "./singleMoveValidator";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

export enum PieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

interface Piece {
  color: PieceColor;
  type: PieceType;
  symbol: string;
  getAllAvailableMoves(
    board: BoardCell[][],
    from: Position,
    directions: Position[],
  ): Position[];
  validateMove(board: BoardCell[][], movement: Movement): boolean;
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
    directions: Position[],
  ) {
    const piece = board[from[0]][from[1]];
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      const newRow = from[0] + row;
      const newCol = from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target) || isCellCaptured(target, piece?.color)) {
          if (
            !validMoves.some((move) => move[0] === newRow && move[1] === newCol)
          ) {
            validMoves.push([newRow, newCol]);
          }
        }
      }
    }

    return validMoves;
  }
}

export default Piece;
