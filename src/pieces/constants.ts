import { PieceColor, PieceType } from "../piece";
import PieceFactory from "./factory";

export const blackPawn = PieceFactory.getPiece(
  PieceType.Pawn,
  PieceColor.Black,
);
export const blackRook = PieceFactory.getPiece(
  PieceType.Rook,
  PieceColor.Black,
);
export const blackKnight = PieceFactory.getPiece(
  PieceType.Knight,
  PieceColor.Black,
);
export const blackBishop = PieceFactory.getPiece(
  PieceType.Bishop,
  PieceColor.Black,
);
export const blackKing = PieceFactory.getPiece(
  PieceType.King,
  PieceColor.Black,
);
export const blackQueen = PieceFactory.getPiece(
  PieceType.Queen,
  PieceColor.Black,
);

export const whitePawn = PieceFactory.getPiece(
  PieceType.Pawn,
  PieceColor.White,
);
export const whiteRook = PieceFactory.getPiece(
  PieceType.Rook,
  PieceColor.White,
);
export const whiteKnight = PieceFactory.getPiece(
  PieceType.Knight,
  PieceColor.White,
);
export const whiteBishop = PieceFactory.getPiece(
  PieceType.Bishop,
  PieceColor.White,
);
export const whiteKing = PieceFactory.getPiece(
  PieceType.King,
  PieceColor.White,
);
export const whiteQueen = PieceFactory.getPiece(
  PieceType.Queen,
  PieceColor.White,
);
