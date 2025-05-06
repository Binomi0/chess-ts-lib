import { BoardCell, Position } from "./chessBoard";
import Piece, { PieceColor } from "./piece";
import PieceDirections from "./PieceDirections";
import { Bishop, BlackBishop, WhiteBishop } from "./pieces/bishop";
import { BlackKing, King, WhiteKing } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { BlackPawn, Pawn, WhitePawn } from "./pieces/pawn";
import { BlackQueen, Queen, WhiteQueen } from "./pieces/queen";
import { BlackRook, Rook, WhiteRook } from "./pieces/rook";
import { cloneBoard, isInBounds, isValidDestination } from "./utils/helpers";

class ChessBoardValidations {
  private constructor() {}

  static isKingInCheck(board: BoardCell[][], turn: PieceColor): boolean {
    // Buscamos al rey del color opuesto
    const kingPosition = ChessBoardValidations.findKing(board, turn);
    if (!kingPosition) {
      throw new Error("King not found");
    }

    let isValid = false;

    // Recorro todo el tablero
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const current: Position = [row, col];
        const piece = board[row][col];

        // Busco si existe alguna pieza en la casilla
        if (piece) {
          // Si la pieza es del turno del jugador que le toca mover
          if (piece.color !== turn) {
            try {
              if (
                piece.validateMove(board, {
                  from: current,
                  to: kingPosition,
                  piece,
                })
              ) {
                // Si la pieza puede moverse a la posición del rey
                console.log(
                  `${piece.color}-${piece.type} can capture enemy king`
                );
                isValid = true;
              } else {
                console.log(`${piece.type} cannot capture enemy king`);
              }
            } catch (_) {}
          }
        }
      }
    }

    return isValid;
    // throw new Error("Checkmate not found");
  }

  static isCheckMate(board: BoardCell[][], turn: PieceColor): boolean {
    // Buscar todas las piezas del jugador en jaque
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
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

  static findEnemyKing(
    board: BoardCell[][],
    turn: PieceColor
  ): Position | null {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          board[row][col]?.color !== turn &&
          board[row][col]?.type === "King"
        ) {
          return [row, col];
        }
      }
    }
    return null;
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
      (turn === "white" && currentPiece?.color === "white") ||
      (turn === "black" && currentPiece?.color === "black")
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

    const isWhite = piece.color === "white";
    switch (piece.type) {
      case "Pawn": // Peón
        return isWhite
          ? new WhitePawn().validateMove(board, movement)
          : new BlackPawn().validateMove(board, movement);
      case "Rook": // Torre
        return new Rook(piece.color).validateMove(board, movement); // Torre
      // return isWhite
      //   ? new WhiteRook().validateMove(board, movement)
      //   : new BlackRook().validateMove(board, movement);
      case "Knight": // Caballo
        return new Knight(piece.color).validateMove(board, movement); // Caballo
      // return isWhite
      //   ? new WhiteKing().validateMove(board, movement)
      //   : new BlackKing().validateMove(board, movement);
      case "Bishop": // Bispo
        return new Bishop(piece.color).validateMove(board, movement); // Bispo
      // return isWhite
      //   ? new WhiteBishop().validateMove(board, movement)
      //   : new BlackBishop().validateMove(board, movement);
      case "Queen": // Reina
        return new Queen(piece.color).validateMove(board, movement); // Reina
      // return isWhite
      //   ? new WhiteQueen().validateMove(board, movement)
      //   : new BlackQueen().validateMove(board, movement);
      case "King": // Rey
        return new King(piece.color).validateMove(board, movement); // Rey
      // return isWhite
      //   ? new WhiteKing().validateMove(board, movement)
      //   : new BlackKing().validateMove(board, movement);
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default ChessBoardValidations;
