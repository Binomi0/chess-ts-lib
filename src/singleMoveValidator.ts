import { BoardCell, Position, Movement } from "./chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

class SingleMoveValidator {
  static validateMove(
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
}

export default SingleMoveValidator;
