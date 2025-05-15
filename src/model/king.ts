import SingleMove from "../board/singleMove";
import PieceDirections from "./directions";
import StateManager from "../board/stateManager";
import Piece from "./piece";
import { Position, PieceColor, PieceType, Movement } from "../types";
import { isSamePosition } from "../utils/helpers";

export class King extends Piece {
  readonly symbol: string;
  directions: Position[] = PieceDirections.King;
  private readonly kingSymbols = {
    [PieceColor.White]: "♔",
    [PieceColor.Black]: "♚",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.King);
    this.symbol = this.kingSymbols[color];
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };
    const kingMoves = SingleMove.getAvailableMoves(boardStateManager, movement);

    const king = boardStateManager.getCell(from);
    let availableMoves: Position[] = [];

    boardStateManager.removePiece(from);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const enemy = boardStateManager.getCell([row, col]);
        if (!enemy || enemy.color === king?.color) {
          continue;
        }
        if (enemy?.type === king?.type && enemy?.color === king?.color) {
          continue;
        }

        if (row === from[0] && col === from[1]) {
          continue;
        }

        kingMoves.forEach((kingMove) => {
          if (isSamePosition(kingMove, [row, col])) {
            return;
          }
          const current = boardStateManager.getCell(kingMove);
          boardStateManager.placePiece(kingMove, king!);

          const enemyMovements = enemy.getAllAvailableMoves(
            boardStateManager,
            [row, col],
            enemy.directions,
          );

          const canCheck = enemyMovements.some((enemyMove) =>
            isSamePosition(kingMove, enemyMove),
          );

          if (canCheck) {
            availableMoves = availableMoves.filter(
              (am) => !isSamePosition(am, kingMove),
            );
            boardStateManager.removePiece(kingMove);
            if (current) {
              boardStateManager.placePiece(kingMove, current);
            }
            return;
          }

          // Avoid duplicates
          if (!availableMoves.some((move) => isSamePosition(move, kingMove))) {
            availableMoves.push(kingMove);
          }

          boardStateManager.removePiece(kingMove);
          if (current) {
            boardStateManager.placePiece(kingMove, current);
          }
        });
      }
    }

    boardStateManager.placePiece(from, king!);
    return availableMoves;
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    return SingleMove.validateMove(boardStateManager, movement);
  }
}
