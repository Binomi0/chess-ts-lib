import { BlackPawn, WhitePawn } from "./pawn";
import { BlackRook, WhiteRook } from "./rook";
import { BlackKnight, WhiteKnight } from "./knight";
import { BlackBishop, WhiteBishop } from "./bishop";
import { BlackQueen, WhiteQueen } from "./queen";
import { BlackKing, WhiteKing } from "./king";
import Piece, { PieceColor, PieceType } from "../piece";

class PieceFactory {
  private static piece: Map<PieceType, Map<PieceColor, Piece>> = new Map();

  static getPiece(type: PieceType, color: PieceColor) {
    if (!type || !color) throw new Error("Invalid piece type or color");

    if (!this.piece.has(type)) {
      this.piece.set(type, new Map());
    }

    const typeMap = this.piece.get(type)!;
    if (!typeMap.has(color)) {
      const piece = this.getPieceInstance(type, color);
      typeMap.set(color, piece);
    }

    return typeMap.get(color)!;
  }

  private static getPieceInstance(type: PieceType, color: PieceColor) {
    switch (type) {
      case "Pawn":
        return color === "white" ? new WhitePawn() : new BlackPawn();
      case "Rook":
        return color === "white" ? new WhiteRook() : new BlackRook();
      case "Bishop":
        return color === "white" ? new WhiteBishop() : new BlackBishop();
      case "King":
        return color === "white" ? new WhiteKing() : new BlackKing();
      case "Queen":
        return color === "white" ? new WhiteQueen() : new BlackQueen();
      case "Knight":
        return color === "white" ? new WhiteKnight() : new BlackKnight();
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default PieceFactory;
