import { BoardCell, Position, Movement } from "./chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

class MultiMoveValidator {
  static validateMove(
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

export default MultiMoveValidator;
