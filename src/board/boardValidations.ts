import { isInBounds, isSamePosition } from "../utils/helpers";
import StateManager from "./stateManager";
import { PieceColor, Position } from "../types";

class BoardValidations {
  static isKingInCheck(
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

    let isCheck = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const enemy = boardStateManager.getCell(current);
        // Casilla vacia
        if (!enemy) continue;

        // Casilla con ficha amiga
        if (enemy.color === king.color) {
          continue;
        }

        // Esto nunca deberia saltar si ya hemos descartado todas nuestras fichas
        if (isSamePosition(kingPosition, [row, col])) {
          console.error("Error: King should not be in its own position");
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

    const moves = king.getAllAvailableMoves(
      boardStateManager,
      kingPosition,
      king.directions,
    );

    const scapeMoves: Position[] = [];
    for (const move of moves) {
      const stateManager = new StateManager();
      stateManager.setBoard(boardStateManager.getBoardSnapshot());
      stateManager.removePiece(kingPosition);
      stateManager.placePiece(move, king);

      const isCheck = BoardValidations.isKingInCheck(stateManager, turn);
      if (!isCheck) {
        scapeMoves.push(move);
      }
    }

    return scapeMoves.length === 0;
  }

  static isValidMove(
    boardStateManager: StateManager,
    from: Position,
    to: Position,
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const fromPiece = boardStateManager.getCell([fromRow, fromCol]);

    if (fromPiece === undefined) {
      throw new Error("No piece at that position");
    }

    if (!isInBounds(from) || !isInBounds(to)) {
      throw new Error("Out of bounds");
    }

    const destinationPiece = boardStateManager.getCell([toRow, toCol]);

    if (destinationPiece && destinationPiece.color === fromPiece.color) {
      throw new Error("Can't capture own piece");
    }

    return !BoardValidations.isKingInCheck(boardStateManager, fromPiece.color);
  }
}

export default BoardValidations;
