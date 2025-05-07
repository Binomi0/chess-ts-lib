import { BoardCell, Position, Movement } from "./chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "./utils/helpers";

class SingleMoveValidator {
  static getAvailableMoves(
    board: BoardCell[][],
    directions: Position[],
    from: Position,
  ) {
    const validMoves: Position[] = [];

    for (const [row, col] of directions) {
      const newRow = from[0] + row;
      const newCol = from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const piece = board[from[0]][from[1]];
        const target = board[newRow][newCol];

        if (isCellEmpty(target) || isCellCaptured(target, piece?.color)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    return validMoves;
  }

  static validateMove(
    board: BoardCell[][],
    directions: Position[],
    movement: Movement,
  ): boolean {
    const validMoves = this.getAvailableMoves(board, directions, movement.from);

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`,
    );
  }
}

export default SingleMoveValidator;
