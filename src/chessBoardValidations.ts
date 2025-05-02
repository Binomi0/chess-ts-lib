import { BoardCell } from "./chessBoard";
import { PieceColor, Position } from "./piece";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { isInBounds } from "./utils/helpers";

class ChessBoardValidations {
  private constructor() {}

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
    from: [number, number],
    to: [number, number]
  ): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // La ficha no existe en esa posición
    if (board[fromRow][fromCol] === undefined) {
      throw new Error("No piece at that position");
    }

    const piece = board[fromRow][fromCol];
    const destinationPiece = board[toRow][toCol];

    if (destinationPiece && destinationPiece.color === piece.color) {
      throw new Error("Can't capture own piece");
    }

    if (!isInBounds(from) || !isInBounds(to)) {
      throw new Error("Out of bounds");
    }

    const isWhite = piece.color === "white";
    const movement = { from, to, piece };

    switch (piece.type) {
      case "Pawn": // Peón
        return Pawn.validateMove(board, movement, isWhite);
      case "Rook": // Torre
        return Rook.validateMove(board, movement);
      case "Knight": // Caballo
        return Knight.validateMove(board, movement);
      case "Bishop": // Bispo
        return Bishop.validateMove(board, movement);
      case "Queen": // Reina
        return Queen.validateMove(board, movement);
      case "King": // Rey
        return King.validateMove(board, movement);
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default ChessBoardValidations;
