import { Position, Movement } from "../chessBoard";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "../utils/helpers";
import StateManager from "./stateManager";

class MultiMove {
  static getAvailableMoves(
    boardStateManager: StateManager,
    movement: Movement,
  ) {
    const validMoves: Position[] = [];
    const piece = boardStateManager.getCell([
      movement.from[0],
      movement.from[1],
    ]);

    for (const [row, col] of movement.piece.directions) {
      let newRow = movement.from[0] + row;
      let newCol = movement.from[1] + col;

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

  static validateMove(boardStateManager: StateManager, movement: Movement) {
    const validMoves = this.getAvailableMoves(boardStateManager, movement);

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`,
    );
  }
}

export default MultiMove;
