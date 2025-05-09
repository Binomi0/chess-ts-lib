import { BoardCell, Position } from "../chessBoard";
import MultiMoveValidator from "../board/multiMoveValidator";
import { PieceColor, PieceType } from "../piece";
import PieceDirections from "../pieces/directions";
import PieceFactory from "../pieces/factory";
import SingleMoveValidator from "../board/singleMoveValidator";
import { cloneBoard, isInBounds } from "../utils/helpers";

class BoardValidations {
  static isKingInCheck(board: BoardCell[][], turn: PieceColor): boolean {
    const kingPosition = this.findKing(board, turn);
    if (!kingPosition) {
      throw new Error("King not found");
    }

    let isValid = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const piece = board[row][col];

        if (piece && piece.color !== turn) {
          const movements = piece.getAllAvailableMoves(
            board,
            current,
            PieceDirections.getPieceDirections(piece.type),
          );
          for (const [row, col] of movements) {
            if (row === kingPosition[0] || col === kingPosition[1]) {
              isValid = true;
            }
          }
        }
      }
    }

    return isValid;
  }

  static isCheckMate(board: BoardCell[][], turn: PieceColor): boolean {
    const scapeMoves: Position[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === turn) {
          const directions = PieceDirections.getPieceDirections(piece.type);
          const from: Position = [row, col];
          let moves: Position[];
          if (
            [PieceType.Pawn, PieceType.King, PieceType.Knight].includes(
              piece.type,
            )
          ) {
            moves = SingleMoveValidator.getAvailableMoves(
              board,
              directions,
              from,
            );
          } else {
            moves = MultiMoveValidator.getAvailableMoves(
              board,
              directions,
              from,
            );
          }

          for (const to of moves) {
            const newRow = from[0] + to[0];
            const newCol = from[1] + to[1];

            if (!isInBounds([newRow, newCol])) continue;
            const tempBoard = cloneBoard(board);

            tempBoard[newRow][newCol] = piece;

            try {
              if (!this.isKingInCheck(tempBoard, turn)) {
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

  static findKing(board: BoardCell[][], turn: PieceColor): Position | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          board[row][col]?.color === turn &&
          board[row][col]?.type === "King"
        ) {
          return [row, col];
        }
      }
    }
    return null;
  }

  static isValidMove(
    board: BoardCell[][],
    from: Position,
    to: Position,
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];

    if (piece === undefined) {
      throw new Error("No piece at that position");
    }

    const destinationPiece = board[toRow][toCol];

    if (destinationPiece && destinationPiece.color === piece.color) {
      throw new Error("Can't capture own piece");
    }

    if (!isInBounds(from) || !isInBounds(to)) {
      throw new Error("Out of bounds");
    }

    const movement = { from, to, piece };

    return PieceFactory.getPiece(piece.type, piece.color).validateMove(
      board,
      movement,
    );
  }
}

export default BoardValidations;
