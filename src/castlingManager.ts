import { BoardCell, Castling, Position } from "./chessBoard";
import Piece, { PieceColor } from "./piece";
import { King } from "./pieces/king";

type CastlingData = [Position, Position[], Position, Position];

class CastlingManager {
  private static castlingRights: Record<PieceColor, boolean> = {
    [PieceColor.White]: true,
    [PieceColor.Black]: true,
  };

  static castle(board: BoardCell[][], color: PieceColor, side: Castling) {
    if (!this.castlingRights[color]) return false;

    if (this.canCastle(board, color, side)) {
      const [rookPos, _, newKingPos, newRookPos] = this.getCastlingData(
        color,
        side,
      );

      this.execCastling(board, color, rookPos, newKingPos, newRookPos);
      this.setCastlingLocked(color);

      return true;
    }

    throw new Error("Invalid castling move");
  }

  static canCastle(board: BoardCell[][], color: PieceColor, side: Castling) {
    if (!this.castlingRights[color]) return false;

    const [rookPos, emptySquares, newKingPos, newRookPos] =
      this.getCastlingData(color, side);

    return this.validateConditions(board, color, rookPos, emptySquares);
  }

  private static getCastlingData(
    color: PieceColor,
    side: Castling,
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
    color: PieceColor,
    rookPos: Position,
    emptySquares: Position[],
  ): boolean {
    const [rookRow, rookCol] = rookPos;
    const rook = board[rookRow][rookCol];

    // Verificar que la torre exista y sea del mismo color
    if (!rook || rook.type !== "Rook" || rook.color !== color) {
      return false;
    }

    // Verificar que las casillas intermedias estén vacías
    return emptySquares.every(([row, col]) => !board[row][col]);
  }

  private static execCastling(
    board: BoardCell[][],
    color: PieceColor,
    rookPos: Position,
    newKingPos: Position,
    newRookPos: Position,
  ): void {
    if (color === PieceColor.White) {
      board[7][4] = undefined;
    } else if (color === PieceColor.Black) {
      board[0][4] = undefined;
    }

    board[newRookPos[0]][newRookPos[1]] = board[rookPos[0]][rookPos[1]];
    board[rookPos[0]][rookPos[1]] = undefined;

    const piece = new King(color);
    board[newKingPos[0]][newKingPos[1]] = piece;
  }

  private static setCastlingLocked(color: PieceColor): void {
    this.castlingRights[color] = false;
  }
}

export default CastlingManager;
