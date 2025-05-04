import { BoardCell, Castling, Position } from "./chessBoard";
import { PieceColor } from "./piece";
import { BlackKing, WhiteKing } from "./pieces/king";

type CastlingData = [Position, Position[], Position, Position];

class CastlingManager {
  static canCastle(
    board: BoardCell[][],
    king: BlackKing | WhiteKing,
    side: Castling
  ) {
    if (!king.castlingRights) return false;

    const [rookPos, emptySquares, newKingPos, newRookPos] =
      this.getCastlingData(king.color, side);

    return this.validateConditions(board, king, rookPos, emptySquares);
  }

  static getKingSideData(backRank: number): CastlingData {
    return [
      [backRank, 7], // Rook position
      [
        [backRank, 5],
        [backRank, 6],
      ], // Squares that must be empty
      [backRank, 6], // New king position
      [backRank, 5], // New rook position
    ];
  }

  static getQueenSideData(backRank: number): CastlingData {
    return [
      [backRank, 0],
      [
        [backRank, 1],
        [backRank, 2],
        [backRank, 3],
      ],
      [backRank, 2],
      [backRank, 3],
    ];
  }

  static getCastlingData(color: PieceColor, side: Castling): CastlingData {
    const isWhite = color === "white";
    const backRank = isWhite ? 7 : 0;

    if (side === "king") {
      return this.getKingSideData(backRank);
    } else if (side === "queen") {
      return this.getQueenSideData(backRank);
    }

    throw new Error("Wrong side for castling");
  }

  static validateConditions(
    board: BoardCell[][],
    king: WhiteKing | BlackKing,
    rookPos: Position,
    emptySquares: Position[]
  ): boolean {
    const [rookRow, rookCol] = rookPos;
    const rook = board[rookRow][rookCol];

    // Verificar que la torre exista y sea del mismo color
    if (!rook || rook.type !== "Rook" || rook.color !== king.color) {
      return false;
    }

    // Verificar que las casillas intermedias estén vacías
    return emptySquares.every(([row, col]) => !board[row][col]);
  }
}

export default CastlingManager;
