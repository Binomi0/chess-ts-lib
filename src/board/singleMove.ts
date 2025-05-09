import { Movement, Position } from "../types";
import {
  isInBounds,
  isCellEmpty,
  isCellCaptured,
  isValidDestination,
} from "../utils/helpers";
import StateManager from "./stateManager";

class SingleMove {
  static getAvailableMoves(
    boardStateManager: StateManager,
    movement: Movement,
  ) {
    const validMoves: Position[] = [];

    for (const [row, col] of movement.piece.directions) {
      const newRow = movement.from[0] + row;
      const newCol = movement.from[1] + col;

      if (isInBounds([newRow, newCol])) {
        const piece = boardStateManager.getCell([
          movement.from[0],
          movement.from[1],
        ]);
        const target = boardStateManager.getCell([newRow, newCol]);

        if (isCellEmpty(target) || isCellCaptured(target, piece?.color)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    return validMoves;
  }

  static validateMove(
    boardStateManager: StateManager,
    movement: Movement,
  ): boolean {
    const validMoves = this.getAvailableMoves(boardStateManager, movement);

    if (isValidDestination(validMoves, movement.to)) {
      return true;
    }

    throw new Error(
      `Invalid move for ${movement.piece.type} from ${movement.from} to ${movement.to}`,
    );
  }
}

export default SingleMove;
