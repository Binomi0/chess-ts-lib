import MultiMove from "./multiMove";
import SingleMove from "./singleMove";
import { cloneBoard, isInBounds } from "../utils/helpers";
import StateManager from "./stateManager";
import { BoardCell, PieceColor, Position, PieceType } from "../types";

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

    let isValid = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const piece = board[row][col];

        if (piece?.type === PieceType.King) {
          continue;
        } else if (piece && piece.color !== turn) {
          const movements = piece.getAllAvailableMoves(
            boardStateManager,
            current,
            piece.directions,
          );
          for (const [row, col] of movements) {
            if (row === kingPosition[0] || col === kingPosition[1]) {
              console.log({ row, col, piece, kingPosition });
              isValid = true;
            }
          }
        }
      }
    }

    return isValid;
  }

  static isCheckMate(
    boardStateManager: StateManager,
    turn: PieceColor,
  ): boolean {
    const scapeMoves: Position[] = [];
    const board = boardStateManager.getBoardSnapshot();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardStateManager.getCell([row, col]);
        if (piece && piece.color === turn) {
          const from: Position = [row, col];
          let moves: Position[];
          if (
            [PieceType.Pawn, PieceType.King, PieceType.Knight].includes(
              piece.type,
            )
          ) {
            moves = SingleMove.getAvailableMoves(boardStateManager, {
              from,
              piece,
              to: [0, 0],
            });
          } else {
            moves = MultiMove.getAvailableMoves(boardStateManager, {
              from,
              piece,
              to: [0, 0],
            });
          }

          for (const to of moves) {
            const newRow = from[0] + to[0];
            const newCol = from[1] + to[1];

            if (!isInBounds([newRow, newCol])) continue;
            const tempBoard = cloneBoard(board);

            tempBoard[newRow][newCol] = piece;

            try {
              if (!this.isKingInCheck(boardStateManager, tempBoard, turn)) {
                scapeMoves.push(to);
              }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
            } catch (_) {}
          }
        }
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
