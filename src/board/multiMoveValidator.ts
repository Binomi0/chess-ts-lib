import { BoardCell, Position, Movement } from "../chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "../utils/helpers";

class MultiMoveValidator {
  static getAvailableMoves(
    board: BoardCell[][],
    directions: Position[],
    from: Position,
  ) {
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      let newRow = from[0] + row;
      let newCol = from[1] + col;
      const piece = board[from[0]][from[1]];

      while (isInBounds([newRow, newCol])) {
        const target = board[newRow][newCol];

        if (isCellEmpty(target)) {
          validMoves.push([newRow, newCol]);
        } else if (isCellCaptured(target, piece?.color)) {
          validMoves.push([newRow, newCol]);
          break;
        } else {
          break;
        }

        newRow += row;
        newCol += col;
      }
    }
    return validMoves;
  }

  static validateMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement,
  ) {
    const validMoves = this.getAvailableMoves(board, directions, movement.from);

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`,
    );
  }
}

export default MultiMoveValidator;
