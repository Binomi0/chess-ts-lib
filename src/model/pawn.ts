import Piece from "./piece";
import { isCellEmpty, isCellCaptured, isInBounds } from "../utils/helpers";
import StateManager from "../board/stateManager";
import { Position, PieceColor, PieceType, Movement } from "../types";

export class Pawn extends Piece {
  readonly symbol: string;
  readonly directions: Position[] =
    this.color === PieceColor.Black
      ? [
          [1, 0],
          [1, 1],
          [1, -1],
        ]
      : [
          [-1, 0],
          [-1, -1],
          [-1, 1],
        ];
  private readonly pawnSymbols = {
    [PieceColor.White]: "♙",
    [PieceColor.Black]: "♟",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Pawn);
    this.symbol = this.pawnSymbols[color];
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const validMoves: Position[] = [];

    for (const [row, col] of this.directions) {
      const [fromRow, fromCol] = from;
      const newRow = fromRow + row;
      const newCol = fromCol + col;

      if (isInBounds([newRow, newCol])) {
        const piece = boardStateManager.getCell([fromRow, fromCol]);
        const target = boardStateManager.getCell([newRow, newCol]);

        if (isCellEmpty(target) || isCellCaptured(target, piece?.color)) {
          validMoves.push([newRow, newCol]);
        }
      }
    }

    const [row] = from;
    if (row === 1 && this.color === PieceColor.Black) {
      validMoves.push([row + 2, from[1]]);
    } else if (row === 6 && this.color === PieceColor.White) {
      validMoves.push([row - 2, from[1]]);
    }

    return validMoves;
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    const [fromRow, fromCol] = movement.from;
    const [toRow, toCol] = movement.to;
    const deltaRow = toRow - fromRow;
    const deltaCol = toCol - fromCol;

    const direction = this.color === PieceColor.White ? -1 : 1;
    const startRow = this.color === PieceColor.White ? 6 : 1;

    // Movimiento hacia delante
    if (deltaCol === 0) {
      if (
        deltaRow === direction &&
        isCellEmpty(boardStateManager.getCell([toRow, toCol]))
      ) {
        return true;
      }

      if (
        fromRow === startRow &&
        deltaRow === 2 * direction &&
        isCellEmpty(boardStateManager.getCell([fromRow + direction, toCol])) &&
        isCellEmpty(boardStateManager.getCell([toRow, toCol]))
      ) {
        return true;
      }
    }

    // Captura en diagonal
    if (
      Math.abs(deltaCol) === 1 &&
      deltaRow === direction &&
      !isCellEmpty(boardStateManager.getCell([toRow, toCol])) &&
      isCellCaptured(
        boardStateManager.getCell([toRow, toCol]),
        movement.piece.color,
      )
    ) {
      return true;
    }

    throw new Error("Invalid movement for pawn");
  }
}
