import Piece from "./piece";
import { isCellEmpty, isCellCaptured, isInBounds } from "../utils/helpers";
import StateManager from "../board/stateManager";
import { Position, PieceColor, PieceType } from "../types";

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

  constructor(color: PieceColor) {
    super(color, PieceType.Pawn);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const [fromRow, fromCol] = from;
    const piece = boardStateManager.getCell([fromRow, fromCol]);
    if (!piece) return []; // Si no hay pieza, no hay movimientos

    if (this.type !== PieceType.Pawn || piece.type !== PieceType.Pawn) {
      throw new Error("Invalid piece type");
    }

    const moves: Position[] = [];
    const color = piece.color;

    for (const [row, col] of this.directions) {
      const newRow = fromRow + row;
      const newCol = fromCol + col;

      if (isInBounds([newRow, newCol])) {
        const target = boardStateManager.getCell([newRow, newCol]);

        if (isCellEmpty(target) || isCellCaptured(target, color)) {
          moves.push([newRow, newCol]);
        }
      }
    }

    if (
      (fromRow === 1 && this.color === PieceColor.Black) ||
      (fromRow === 6 && this.color === PieceColor.White)
    ) {
      const direction = color === PieceColor.Black ? 1 : -1;
      const intermediateRow = fromRow + direction;
      const finalRow = fromRow + 2 * direction;

      // Verificar que las casillas intermedias estén vacías
      if (
        isInBounds([intermediateRow, fromCol]) &&
        isInBounds([finalRow, fromCol]) &&
        isCellEmpty(boardStateManager.getCell([intermediateRow, fromCol])) &&
        isCellEmpty(boardStateManager.getCell([finalRow, fromCol]))
      ) {
        moves.push([finalRow, fromCol]);
      }
    }

    return moves;
  }
}
