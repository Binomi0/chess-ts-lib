import { BoardCell, Position } from "./chessBoard";
import Piece, { PieceColor } from "./piece";
import PieceDirections from "./pieces/directions";
import PieceFactory from "./pieces/factory";
import { cloneBoard, isInBounds } from "./utils/helpers";

class ChessBoardValidations {
  private constructor() {}

  static isKingInCheck(board: BoardCell[][], turn: PieceColor): boolean {
    const kingPosition = ChessBoardValidations.findKing(board, turn);
    if (!kingPosition) {
      throw new Error("King not found");
    }

    let isValid = false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const piece = board[row][col];

        if (piece && piece.color !== turn) {
          try {
            if (
              piece.validateMove(board, {
                from: current,
                to: kingPosition,
                piece,
              })
            ) {
              isValid = true;
            }
          } catch (_) {}
        }
      }
    }

    return isValid;
  }

  // This should work under check
  static isCheckMate(board: BoardCell[][], turn: PieceColor): boolean {
    // Buscar todas las piezas del jugador en jaque
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        // Look for own pieces
        if (piece && piece.color === turn) {
          const directions = PieceDirections.getPieceDirections(piece.type);
          const from: Position = [row, col];

          for (let [dr, dc] of directions) {
            let moves: Position[] = [];

            try {
              if (piece instanceof Piece) {
                moves = piece.getAllAvailableMoves(board, from, [[dr, dc]]);
              }
            } catch (_) {
              continue;
            }

            // Search for any move that can save king to be under check
            for (let to of moves) {
              const tempBoard = cloneBoard(board);

              tempBoard[to[0]][to[1]] = tempBoard[from[0]][from[1]];
              tempBoard[from[0]][from[1]] = undefined;

              try {
                if (!this.isKingInCheck(tempBoard, turn)) {
                  return false; // hay una jugada legal
                }
              } catch (_) {}
            }
          }
        }
      }
    }

    return true; // No hay movimientos legales y el rey está en jaque
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

  static isValidTurn(
    board: BoardCell[][],
    from: Position,
    turn: PieceColor
  ): boolean {
    const currentPiece = board[from[0]][from[1]];

    if (
      (turn === PieceColor.White && currentPiece?.color === PieceColor.White) ||
      (turn === PieceColor.Black && currentPiece?.color === PieceColor.Black)
    ) {
      return true;
    }

    throw new Error(`It's not ${turn}'s turn`);
  }

  static isValidMove(
    board: BoardCell[][],
    from: Position,
    to: Position
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = board[fromRow][fromCol];

    // La ficha no existe en esa posición
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
      movement
    );
  }
}

export default ChessBoardValidations;
