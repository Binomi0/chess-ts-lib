import { BoardCell, Castling, Position } from "../chessBoard";
import { PieceColor, PieceType } from "../piece";

export type CastlingType = [PieceColor, Castling];

class BoardMovements {
  private readonly board: BoardCell[][];

  constructor(board: BoardCell[][]) {
    this.board = board;
  }

  isCastlingMove(from: Position, to: Position): CastlingType | undefined {
    const isWhiteQueenCastle: Position[] = [
      [7, 4],
      [7, 0],
    ];
    const isWhiteKingCastle: Position[] = [
      [7, 4],
      [7, 7],
    ];
    const isBlackQueenCastle: Position[] = [
      [0, 4],
      [0, 0],
    ];
    const isBlackKingCastle: Position[] = [
      [0, 4],
      [0, 7],
    ];

    const index = [
      isWhiteQueenCastle,
      isWhiteKingCastle,
      isBlackQueenCastle,
      isBlackKingCastle,
    ].findIndex(
      (castlingMove) =>
        castlingMove[0][0] === from[0] &&
        castlingMove[0][1] === from[1] &&
        castlingMove[1][0] === to[0] &&
        castlingMove[1][1] === to[1],
    );

    switch (index) {
      case 0:
        return [PieceColor.White, Castling.Queen];
      case 1:
        return [PieceColor.White, Castling.King];
      case 2:
        return [PieceColor.Black, Castling.Queen];
      case 3:
        return [PieceColor.Black, Castling.King];
      default:
        return undefined;
    }
  }

  isPromotion(to: Position, type: PieceType, color: PieceColor): boolean {
    if (type !== PieceType.Pawn) {
      throw new Error("Only Pawn can promotion");
    }

    const promotionRow = color === PieceColor.White ? 0 : 7;
    const [toRow] = to;

    return toRow === promotionRow;
  }
}

export default BoardMovements;
