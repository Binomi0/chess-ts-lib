import { BoardCell, Castling, Position } from "./chessBoard";
import { PieceColor } from "./piece";
import { BlackKing, WhiteKing } from "./pieces/king";

type CastlingData = [Position, Position[], Position, Position];

class CastlingManager {
  private static castlingRights: Record<PieceColor, boolean> = {
    [PieceColor.White]: true,
    [PieceColor.Black]: true,
  };

  static castle(
    board: BoardCell[][],
    piece: WhiteKing | BlackKing,
    side: Castling
  ) {
    if (!this.castlingRights[piece.color]) return false;

    if (this.canCastle(board, piece, side)) {
      const [rookPos, _, newKingPos, newRookPos] = this.getCastlingData(
        piece.color,
        side
      );

      this.execCastling(board, piece, rookPos, newKingPos, newRookPos);
      this.setCastlingLocked(piece.color);

      return true;
    }

    return false;
  }

  static canCastle(
    board: BoardCell[][],
    piece: WhiteKing | BlackKing,
    side: Castling
  ) {
    if (!this.castlingRights[piece.color]) return false;

    const [rookPos, emptySquares, newKingPos, newRookPos] =
      this.getCastlingData(piece.color, side);

    return this.validateConditions(board, piece, rookPos, emptySquares);
  }

  private static getCastlingData(
    color: PieceColor,
    side: Castling
  ): CastlingData {
    const isWhite = color === PieceColor.White;
    const backRank = isWhite ? 7 : 0;

    if (side === "king") {
      return this.getKingSideData(backRank);
    } else if (side === "queen") {
      return this.getQueenSideData(backRank);
    }

    throw new Error("Wrong side for castling");
  }

  private static getKingSideData(backRank: number): CastlingData {
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

  private static getQueenSideData(backRank: number): CastlingData {
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

  private static validateConditions(
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

  private static execCastling(
    board: BoardCell[][],
    piece: WhiteKing | BlackKing,
    rookPos: Position,
    newKingPos: Position,
    newRookPos: Position
  ): void {
    if (piece.color === PieceColor.White) {
      board[7][4] = undefined;
    } else if (piece.color === PieceColor.Black) {
      board[0][4] = undefined;
    }

    board[newRookPos[0]][newRookPos[1]] = board[rookPos[0]][rookPos[1]];
    board[rookPos[0]][rookPos[1]] = undefined;
    board[newKingPos[0]][newKingPos[1]] = piece;
  }

  private static setCastlingLocked(color: PieceColor): void {
    this.castlingRights[color] = false;
  }
}

export default CastlingManager;
