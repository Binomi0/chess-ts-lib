import { isInBounds, isSamePosition } from "../utils/helpers";
import StateManager from "./stateManager";
import { BoardCell, PieceColor, Position } from "../types";

class BoardValidations {
  static isKingInCheck(
    boardStateManager: StateManager,
    board: BoardCell[][],
    turn: PieceColor,
  ): boolean {
    const kingPosition = boardStateManager.findKing(turn);
    if (!kingPosition) {
      throw new Error("King not found");
    }

    const king = boardStateManager.getCell(kingPosition);
    if (!king) {
      throw new Error("King should exists");
    }

    let isCheck = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const enemy = boardStateManager.getCell(current);

        if (!enemy || enemy.color === king?.color) {
          continue;
        }

        if (enemy?.type === king?.type && enemy?.color === king?.color) {
          continue;
        }

        if (row === kingPosition[0] && col === kingPosition[1]) {
          continue;
        }

        const enemyMovements = enemy.getAllAvailableMoves(
          boardStateManager,
          current,
          enemy.directions,
        );

        enemyMovements.forEach((enemyMovement) => {
          if (isSamePosition(kingPosition, enemyMovement)) {
            isCheck = true;
          }
        });
      }
    }

    return isCheck;
  }

  static isCheckMate(
    boardStateManager: StateManager,
    turn: PieceColor,
  ): boolean {
    const kingPosition = boardStateManager.findKing(turn);
    if (!kingPosition) {
      throw new Error("King not found");
    }

    const king = boardStateManager.getCell(kingPosition);
    if (!king) {
      throw new Error("King should exists");
    }

    const scapeMoves = king.getAllAvailableMoves(
      boardStateManager,
      kingPosition,
      king.directions,
    );

    console.log({ scapeMoves });
    return scapeMoves.length === 0;
  }

  static isValidMove(
    boardStateManager: StateManager,
    from: Position,
    to: Position,
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = boardStateManager.getCell([fromRow, fromCol]);

    if (piece === undefined) {
      throw new Error("No piece at that position");
    }

    const destinationPiece = boardStateManager.getCell([toRow, toCol]);
    if (destinationPiece && destinationPiece.color === piece.color) {
      throw new Error("Can't capture own piece");
    }

    if (!isInBounds(from) || !isInBounds(to)) {
      throw new Error("Out of bounds");
    }

    return true;
  }
}

export default BoardValidations;
