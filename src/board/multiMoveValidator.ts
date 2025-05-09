import { Position, Movement } from "../chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "../utils/helpers";
import StateManager from "./stateManager";

class MultiMoveValidator {
  static getAvailableMoves(
    boardStateManager: StateManager,
    directions: Position[],
    from: Position,
  ) {
    const validMoves: Position[] = [];
    const piece = boardStateManager.getCell([from[0], from[1]]);

    for (const [row, col] of directions) {
      let newRow = from[0] + row;
      let newCol = from[1] + col;

      while (isInBounds([newRow, newCol])) {
        const target = boardStateManager.getCell([newRow, newCol]);

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
    boardStateManager: StateManager,
    directions: Position[],
    movement: Movement,
  ) {
    const validMoves = this.getAvailableMoves(
      boardStateManager,
      directions,
      movement.from,
    );

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`,
    );
  }
}

export default MultiMoveValidator;
