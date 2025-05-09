import Piece from "../piece";
import { Pawn } from "./pawn";
import { Rook } from "./rook";
import { Knight } from "./knight";
import { Queen } from "./queen";
import { King } from "./king";
import { Bishop } from "./bishop";
import { PieceType, PieceColor } from "../types";

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
      case PieceType.Pawn:
        return new Pawn(color);
      case PieceType.Rook:
        return new Rook(color);
      case PieceType.Bishop:
        return new Bishop(color);
      case PieceType.King:
        return new King(color);
      case PieceType.Queen:
        return new Queen(color);
      case PieceType.Knight:
        return new Knight(color);
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default PieceFactory;
